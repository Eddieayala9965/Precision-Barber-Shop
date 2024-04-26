import os
import stripe


stripe.api_key = os.getenv("STRIPE_APIKEY_BACKEND")
stripe_key = stripe.api_key
