from fastapi import FastAPI, Request, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe
from stripe_test import stripe_key


app = FastAPI()
templates = Jinja2Templates(directory="templates")
stripe.api_key = stripe_key


origins = [
    "http://localhost",
    "http://localhost:5137",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
async def calculate_order_amount(items):
    return sum(item["amount"] * item["quantity"] for item in items)

@app.get("/")
def hello_world():
    return {"message": "hello world"}

@app.post("/create-checkout-session")
async def create_payment(request: Request):
    try: 
        data = await request.json()
        amount = await calculate_order_amount(data['items'])
        intent = stripe.PaymentIntent.create(
            amount=amount, 
            currency='usd',
            automatic_payment_methods={'enabled': True},
        )
        return JSONResponse({
            'clientSecret': intent['client_secret']
        })
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred processing your payment.")

if __name__ == '__main__':
    app.run(port=4242)
    





