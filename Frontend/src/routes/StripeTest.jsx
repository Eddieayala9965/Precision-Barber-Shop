import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_APIKEY_FRONTEND);
const StripeTest = () => {
  const [clientSecret, setClientSecret] = useState("");

  const fetchData = async () => {
    const items = [
      { name: "Product 1", amount: 1099, quantity: 2 },
      { name: "Product 2", amount: 599, quantity: 1 },
    ];
    const url = "http://127.0.0.1:8000/create-payment-intent";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
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
    <div className="">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
export default StripeTest;
