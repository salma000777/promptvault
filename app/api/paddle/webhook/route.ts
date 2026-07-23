import { NextResponse } from "next/server";

import { paddle } from "@/lib/paddle";
import { supabaseAdmin } from "@/lib/supabase/admin";

type SubscriptionWebhookData = {
  id: string;
  customerId: string;
  status: string;
  customData?: {
    user_id?: string;
  } | null;
};

function hasProAccess(status: string) {
  return status === "active" || status === "trialing";
}

export async function POST(request: Request) {
  const signature = request.headers.get("paddle-signature");
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Paddle signature" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    console.error("Missing PADDLE_WEBHOOK_SECRET");

    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();

  try {
    const event = await paddle.webhooks.unmarshal(
      rawBody,
      webhookSecret,
      signature
    );

    if (
      event.eventType !== "subscription.created" &&
      event.eventType !== "subscription.updated"
    ) {
      return NextResponse.json({ received: true });
    }

    const subscription = event.data as SubscriptionWebhookData;
    const userId = subscription.customData?.user_id;

    if (!userId) {
      console.error("Paddle subscription is missing customData.user_id", {
        subscriptionId: subscription.id,
        eventType: event.eventType,
      });

      return NextResponse.json({ received: true });
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        is_pro: hasProAccess(subscription.status),
        subscription_status: subscription.status,
        paddle_customer_id: subscription.customerId,
        paddle_subscription_id: subscription.id,
      })
      .eq("id", userId);

    if (error) {
      console.error("Failed to update Supabase profile:", error);

      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Invalid Paddle webhook:", error);

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }
}