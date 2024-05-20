import stripe
import os
from fastapi import FastAPI, Request, HTTPException, Depends, Response, status, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Annotated
from supabase import create_client, Client
from models import Item, Barber, Barbers, Services

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key) 

stripe.api_key = os.getenv("STRIPE_APIKEY_BACKEND")

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
    ]


auth_properties = dir(supabase.auth)


public_properties  = [prop for prop in auth_properties if not prop.startswith("_")]

public_properties.sort()

print("Public properties and methods of auth objects: ")
print(public_properties)

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

@app.put("/update_service/{id}")
def update_service(id: str, request: Services):
    data, count = (supabase.table('services')
                   .update({'service': request.service, 'price': request.price})
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
    data, count = (supabase.table('barbers')
                   .update({'first_name': request.first_name, 'last_name': request.last_name, 'email': request.email, 'phone': request.phone, 'bio': request.bio})
                   .eq('id', id)
                   .execute())
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
def login_user(request: Barber):
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
    token = data.get("refresh_token")
    
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

class ServiceUpdateRequest(BaseModel):
    name: str
    price: float

