
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./stripeForm";

const PUBLIC_KEY ="pk_test_51GxrgnJjT1M3ZAOSLSz7QMUEmhim5MKh9xcwOdQDwmZgMRZeefa7rkvolkuCidgx2wtmWAYeN3tI46FUt3xWIRfO00hb1onjbQ";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;