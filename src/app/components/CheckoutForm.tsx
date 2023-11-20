"use client";

import { calculateOrderAmount, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const cartStore = useCartStore();

  const totalPrice = calculateOrderAmount(cartStore.cart);
  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe || !clientSecret) return;
  }, [clientSecret, stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success");
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1>{`Total: ${formattedPrice}`}</h1>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="bg-teal-600 text-white py-2 px-4 rounded-md"
      >
        {isLoading ? "Carrengando..." : "Finalizar Compra"}
      </button>
    </form>
  );
}
