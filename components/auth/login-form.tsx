"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signIn,
    initialState
  );

  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-2xl">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          PromptVault
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your prompt workspace.
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
            autoComplete="current-password"
            placeholder="••••••••"
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
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}