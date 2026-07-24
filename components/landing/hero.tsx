import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
        <div className="mb-6 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
          <Sparkles className="size-4 text-primary" />
          AI Prompt Management
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
          Your AI Prompt
          <span className="block text-primary">
            Operating System.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
          Store, organize, search and optimize every AI prompt you create.
          Never lose another great prompt again.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/signup">
            <Button size="lg">
              Start Free
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>

          <Link href="/pricing">
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}