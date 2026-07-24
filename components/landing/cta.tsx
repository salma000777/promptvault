import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h2 className="text-5xl font-bold text-white">
        Ready to organize your prompts?
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
        Start for free today and build your personal AI prompt library.
      </p>

      <div className="mt-10">
        <Link href="/signup">
          <Button size="lg">
            Start Free
          </Button>
        </Link>
      </div>
    </section>
  );
}