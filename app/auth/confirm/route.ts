import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

type EmailOtpType =
  | "signup"
  | "recovery"
  | "invite"
  | "email"
  | "email_change";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const tokenHash =
    requestUrl.searchParams.get("token_hash");

  const type =
    requestUrl.searchParams.get("type") as
      | EmailOtpType
      | null;

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      new URL(
        "/login?error=confirmation_failed",
        request.url
      )
    );
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

  if (error) {
    console.error(
      "Email confirmation failed:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=confirmation_failed",
        request.url
      )
    );
  }

  if (
    type === "signup" ||
    type === "email" ||
    type === "email_change"
  ) {
    return NextResponse.redirect(
      new URL(
        "/auth/confirmed",
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL("/dashboard", request.url)
  );
}