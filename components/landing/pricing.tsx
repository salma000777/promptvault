import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const freeFeatures = [
  "Unlimited prompt storage",
  "Collections",
  "Favorites",
  "Basic search",
];

const proFeatures = [
  "Everything in Free",
  "AI prompt optimization",
  "Advanced search",
  "Priority updates",
  "Future premium features",
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-6 py-28"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">
          Simple pricing.
        </h2>

        <p className="mt-4 text-slate-400">
          Start free. Upgrade only when you need AI power.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Free
          </p>

          <h3 className="mt-3 text-5xl font-bold text-white">
            $0
          </h3>

          <p className="mt-2 text-slate-400">
            Forever.
          </p>

          <div className="mt-8 space-y-4">
            {freeFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3"
              >
                <Check className="size-4 text-primary" />
                <span className="text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Link href="/signup">
            <Button className="mt-10 w-full">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="relative rounded-3xl border-2 border-primary bg-slate-900 p-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
            MOST POPULAR
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Pro
          </p>

          <h3 className="mt-3 text-5xl font-bold text-white">
            $9
            <span className="text-lg text-slate-400">
              /month
            </span>
          </h3>

          <div className="mt-8 space-y-4">
            {proFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3"
              >
                <Check className="size-4 text-primary" />
                <span className="text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Link href="/signup">
            <Button className="mt-10 w-full">
              Upgrade to Pro
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}