import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_APIKEY_FRONTEND);
const StripeTest = () => {
  const [clientSecret, setClientSecret] = useState("");

  const fetchData = async () => {
    const url = "http://127.0.0.1:4242/create-payment-intent";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setClientSecret(data.clientSecret);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default StripeTest;
