from fastapi import FastAPI, Request, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import stripe


import os



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

class Item(BaseModel):
    amount: int
    quantity: int
    price: int
    
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





    





