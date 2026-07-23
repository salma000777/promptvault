import { Check, Sparkles } from "lucide-react";

import { PaddleCheckoutButton } from "@/components/billing/paddle-checkout-button";
import { Button } from "@/components/ui/button";

const freeFeatures = [
  "Save and organize prompts",
  "Create collections",
  "Search your prompt library",
  "Basic prompt management",
];

const proFeatures = [
  "Everything in Free",
  "AI prompt optimization",
  "Unlimited prompts",
  "Unlimited collections",
  "Advanced prompt workflows",
  "Future Pro features included",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            Simple pricing
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Upgrade your prompt workflow
          </h1>

          <p className="mt-5 text-lg text-muted-foreground">
            Start free and upgrade when you need the full power of PromptVault.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl border bg-card p-8 shadow-sm">
            <div>
              <h2 className="text-2xl font-semibold">Free</h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need to start building your prompt library.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-muted-foreground"> forever</span>
            </div>

            <Button className="mt-8 w-full" variant="outline" disabled>
              Current free plan
            </Button>

            <ul className="mt-8 space-y-4">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="relative rounded-3xl border-2 border-primary bg-card p-8 shadow-lg">
            <div className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Most popular
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Pro</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Unlock AI optimization and the complete PromptVault experience.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-5xl font-bold">$9</span>
              <span className="text-muted-foreground"> / month</span>
            </div>

            <div className="mt-8">
              <PaddleCheckoutButton />
            </div>

            <ul className="mt-8 space-y-4">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}