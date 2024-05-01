import stripe
import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from supabase import create_client, Client
from models import Item, Barber

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key) 

stripe.api_key = os.getenv("STRIPE_APIKEY_BACKEND")

app = FastAPI()
templates = Jinja2Templates(directory="templates")


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



@app.get("/")
def hello_world():
    return {"message": "hello world"}


@app.get("/barbers")
def get_barbers():
  response = supabase.table('barbers').select("*").execute()
  return response

# make sure to filter and grab client name and phone number
@app.get("/appointments")
def get_appointments():
  response = supabase.table('appointments').select("*").execute()
  return response

@app.get("/customers")
def get_customers():
    response = supabase.table("customers").select("*").execute()
    return response

@app.get("/services")
def get_services():
    response = supabase.table("services").select("*").execute()
    return response

@app.get("/bookings")
def get_bookings():
    response = supabase.table("bookings").select("*").execute()
    return response

        
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






