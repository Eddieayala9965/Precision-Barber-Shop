import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const StripeTest = () => {
  useEffect(() => {
    const initStripe = async () => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_APIKEY_FRONTEND
      );
      console.log(stripe);
    };
    initStripe();
  }, []);
  return (
    <div>
      <h1>Stripe Test</h1>
      <Elements stripe={stripe}>
        <CheckoutForm />
    </div>
  );
};
export default StripeTest;
//
