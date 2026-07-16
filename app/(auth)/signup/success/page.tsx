import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SignupSuccessPage() {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-2xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-2xl text-emerald-500">
        ✓
      </div>

      <h1 className="mt-6 text-3xl font-bold">
        Check your email
      </h1>

      <p className="mt-3 text-muted-foreground">
        Confirm your email address before signing in.
      </p>

      <Link
        href="/login"
        className={cn(
          buttonVariants(),
          "mt-8 inline-flex"
        )}
      >
        Go to login
      </Link>
    </div>
  );
}