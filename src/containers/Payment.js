import React from "react";
import CheckoutForm from "../components/CheckoutForm";
// Payment Mgt
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Payment Mgt

//Clé publique
const stripePromise = loadStripe(process.env.STRIPE_KEY);

const Payment = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
