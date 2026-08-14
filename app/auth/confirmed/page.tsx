import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function EmailConfirmedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[160px]" />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
          <div className="mx-auto flex size-16 items-center justify-center rounded-[22px] border border-emerald-400/15 bg-emerald-500/[0.08]">
            <CheckCircle2 className="size-7 text-emerald-400" />
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            <Sparkles className="size-3.5" />
            PromptVault
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Email confirmed
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Your account is ready. Sign in using
            the email address and password you
            created during registration.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:opacity-90"
          >
            Continue to sign in
            <ArrowRight className="size-4" />
          </Link>

          <p className="mt-4 text-xs text-muted-foreground/70">
            You can safely close the confirmation
            email now.
          </p>
        </div>
      </div>
    </main>
  );
}