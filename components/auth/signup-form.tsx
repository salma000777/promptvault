"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp, type AuthState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthState = {
  error: null,
};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signUp,
    initialState
  );

  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-2xl">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          PromptVault
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Start building and improving your prompts.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            placeholder="At least 6 characters"
            required
          />
        </div>

        {state.error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
          size="lg"
        >
          {pending
            ? "Creating account..."
            : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}