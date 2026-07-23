"use client";

import { useEffect, useState } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
const paddleEnvironment =
  process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
    ? "production"
    : "sandbox";

export function PaddleCheckoutButton() {
  const [paddle, setPaddle] = useState<Paddle>();
  const [isLoading, setIsLoading] = useState(Boolean(clientToken));
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!clientToken) {
      console.error("Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN");
      return;
    }

    let isCancelled = false;

    initializePaddle({
      token: clientToken,
      environment: paddleEnvironment,
    })
      .then((paddleInstance) => {
        if (!isCancelled) {
          setPaddle(paddleInstance);
        }
      })
      .catch((error) => {
        console.error("Failed to initialize Paddle:", error);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  async function openCheckout() {
    if (!paddle) {
      console.error("Paddle has not initialized");
      return;
    }

    if (!priceId) {
      console.error("Missing NEXT_PUBLIC_PADDLE_PRICE_ID");
      return;
    }

    setIsOpening(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("You must be logged in before upgrading.", error);
        return;
      }

      paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
        customData: {
          user_id: user.id,
        },
        customer: user.email
          ? {
              email: user.email,
            }
          : undefined,
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
          successUrl: `${window.location.origin}/dashboard/settings?checkout=success`,
        },
      });
    } catch (error) {
      console.error("Failed to open Paddle checkout:", error);
    } finally {
      setIsOpening(false);
    }
  }

  const buttonLabel = !clientToken
    ? "Checkout unavailable"
    : isLoading
      ? "Loading checkout..."
      : isOpening
        ? "Opening checkout..."
        : "Upgrade to Pro";

  return (
    <Button
      type="button"
      className="w-full"
      size="lg"
      onClick={openCheckout}
      disabled={!clientToken || !priceId || isLoading || isOpening || !paddle}
    >
      {buttonLabel}
    </Button>
  );
}