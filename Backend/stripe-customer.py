import os
import stripe


stripe.api_key = os.getenv("STRIPE_APIKEY_BACKEND")

customers = stripe.Customer.list()

for customer in customers:
    print(customer)