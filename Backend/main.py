import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, Depends, Response, status, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated, Optional
from supabase import create_client, Client
from models import Item, Barber, Barbers, Services, BookingRequest
from datetime import datetime, timedelta, date, time
# from square import Client as SquareClient


load_dotenv()
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key) 
# square_client = SquareClient(access_token=os.getenv("SQUARE_ACCESS_TOKEN"), environment="sandbox")


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

@app.get("/barber_bookings")
def get_barber_bookings():
    response = supabase.table("barber_bookings").select("*").execute()
    return response



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


# @app.get("/barbers_sqaure")
# async def get_barbers():
#     try:
#         response = square_client.team_api.list_team_members()
#         if response.is_success():
#             return response.body['team_members']
#         else:
#             raise HTTPException(status_code=500, detail=response.errors)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/book")
# async def create_booking(request: BookingRequest):
#     try:
#         booking_body = {
#             "booking": {
#                 "customer_id": request.customer_email,
#                 "start_at": request.booking_date.isoformat(),
#                 "service_variation_id": request.service_id,
#                 "team_member_id": request.barber_id,
#                 "customer_note": f"Booking for {request.customer_name}"
#             }
#         }

#         response = square_client.bookings.create_booking(booking_body)
#         if response.is_success():
#             # Insert booking into Supabase
#             booking_date_str = request.booking_date.isoformat()
#             response = supabase.rpc("insert_booking_appointment", {
#                 "barber_id": request.barber_id,
#                 "service_id": request.service_id,
#                 "customer_name": request.customer_name,
#                 "customer_phone": request.customer_phone,
#                 "customer_email": request.customer_email,
#                 "booking_date": booking_date_str,
#             }).execute()

#             if response.error:
#                 raise HTTPException(status_code=500, detail=response.error.message)
            
#             return {"message": "Booking created successfully"}
#         else:
#             raise HTTPException(status_code=500, detail=response.errors)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))




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

