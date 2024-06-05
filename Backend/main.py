import os
from fastapi import FastAPI, Request, HTTPException, Depends, Response, status, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated, Optional
from supabase import create_client, Client
from models import Item, Barber, Barbers, Services
from datetime import datetime, timedelta, date, time
from ics import Calendar, Event
from datetime import datetime, timedelta
from sib_api_v3_sdk import ApiClient, Configuration, TransactionalEmailsApi
from sib_api_v3_sdk.rest import ApiException
from sib_api_v3_sdk.models import SendSmtpEmail, SendSmtpEmailSender, SendSmtpEmailTo

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key) 



app = FastAPI()
templates = Jinja2Templates(directory="templates")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


app.add_middleware(
    CORSMiddleware,
    allow_origins="*", # origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://localhost",
    "http://localhost:5137",
    "http://192.168.1.228:5173/"
    ]



def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = supabase.auth.get_user()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    supabase.postgrest.auth(
        token=token
    )  
    return user

@app.get("/")
def hello_world():
    return {"message": "hello world"}


@app.get("/barbers")
def get_barbers():
    response = supabase.table("barbers").select("*").execute()
    return response



@app.get("/services")
def get_services():
    response = supabase.table("services").select("*").execute()
    return response

@app.get("/barber_service")
def get_barber_service():
  response = supabase.table("barber_service_view").select("*").execute()
  return response

from fastapi import FastAPI, HTTPException
from datetime import datetime, timedelta

app = FastAPI()

def get_supabase():
    # Your connection logic here
    pass

@app.get("/available-times")
async def get_available_times(barber_id: str, date: str):
    supabase = get_supabase()
    
    booking_date = datetime.strptime(date, "%Y-%m-%d")
    
    start_time = booking_date.replace(hour=10, minute=0)
    end_time = booking_date.replace(hour=19, minute=0)
    time_slots = []
    current_time = start_time
    
    while current_time < end_time:
        time_slots.append(current_time.strftime("%H:%M"))
        current_time += timedelta(minutes=30)
    
    response = supabase.table('bookings').select('booking_date').eq('barber_id', barber_id).gte('booking_date', start_time).lt('booking_date', end_time).execute()
    
    if response.error:
        raise HTTPException(status_code=400, detail=response.error.message)
    
    booked_times = {datetime.strptime(booking['booking_date'], "%Y-%m-%dT%H:%M:%S").strftime("%H:%M") for booking in response.data}
    
    available_times = [time for time in time_slots if time not in booked_times]
    
    return {"available_times": available_times}


@app.get("/appointments")
async def get_appointments():
    query = """
        SELECT 
            a.id AS appointment_id,
            b.customer_name,
            b.customer_phone,
            b.customer_email,
            b.booking_date AS appointment_date,
            s.service AS service_name,
            a.appointment_date AS appointment_date_full
        FROM 
            appointments a
        JOIN 
            bookings b ON a.booking_id = b.id
        JOIN 
            services s ON a.service_id = s.id;
    """
    response = supabase.rpc('execute_query', {'query': query}).execute()
    return response

@app.put("/update_service/{id}")
def update_service(id: str, request: Services):
    update_data = request.model_dump(exclude_unset=True, exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No data provided for update")
    
    data, count = (supabase.table('services')
                   .update(update_data)
                   .eq('id', id)
                   .execute())
    if count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return data


@app.delete("/delete_service/{id}")
def delete_service(id: str):
    data, count = (supabase.table('services')
                   .delete()
                   .eq('id', id)
                   .execute())
    if count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return data


@app.put("/update_user/{id}")
def update_user(id: str, request: Barbers):
    update_data = request.model_dump(exclude_unset=True, exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No data provided for update")
    
    data, count = (supabase.table('barbers')
                   .update(update_data)
                   .eq('id', id)
                   .execute())
    if count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return data


@app.post("/register")
def register_user(request: Barber):
    email = request.email
    password = request.password
    response = supabase.auth.sign_up({
        "email": email, 
        "password": password,
    })
    return response

@app.post("/login")
def login_user(request: Barber, response: Response):
    email = request.email
    password = request.password
    response = supabase.auth.sign_in_with_password({
        "email": email, 
        "password": password,
    })
    return response


@app.post("/logout")
def logout_user():
    response = supabase.auth.sign_out()
    return response


@app.post("/refresh")
async def refresh_token(request: Request):
    data = await request.json()
    token = data.get('refresh_token')

    session = supabase.auth.refresh_session(token)
    if session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid session",
        )
    return session


@app.get("/protected")
async def protected_route(user: Barber = Depends(get_current_user)):
    if user is not None:
        return {"detail": "PROTECTED ROUTE IS ACCESSIBLE!"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )


