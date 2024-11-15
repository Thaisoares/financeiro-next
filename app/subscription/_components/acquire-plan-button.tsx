"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_action/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not foud");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Could not load Stripe");
    }

    await stripe.redirectToCheckout({ sessionId });
  };
  return (
    <Button className="w-[300px] rounded-full" onClick={handleAcquirePlanClick}>
      Fazer upgrade do plano
    </Button>
  );
};

export default AcquirePlanButton;