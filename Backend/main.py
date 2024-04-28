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


    

    
def calculate_order_amount(items: List[Item]):
    return sum(item.price * item.quantity for item in items)

@app.get("/")
def hello_world():
    return {"message": "hello world"}

@app.post("/create-payment-intent")
async def create_payment_intent(items: List[Item]):
    try:
        total_amount = calculate_order_amount(items)
        payment_intent = stripe.PaymentIntent.create(
            amount=int(total_amount * 100 ),
            currency="usd",
        )
        return payment_intent
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


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

# @app.post("/register")
# def sign_up(user: Barber):
#     try:
#         res = supabase.auth.sign_up({
#            "email": user.email,
#            "password": user.password,
#             "options": {
#                 "data": {
#                    "display_name": user.first_name + " " + user.last_name
                   
#                 }
#             }
#         })
        
#         return {"message": "User registered successfully"}
#     except Exception as e: 
#         return {"message": str(e)}
    
    
@app.post("/register")
def register_user(request: Barber):
    email = request.email
    password = request.password
    response = supabase.auth.sign_up({
        "email": email, 
        "password": password,
    })
    return response
    




