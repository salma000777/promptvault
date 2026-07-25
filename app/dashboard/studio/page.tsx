import { PromptOptimizer } from "@/components/studio/prompt-optimizer";
import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export default function StudioPage() {
  return (
    <div className="relative mx-auto max-w-7xl pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[420px] rounded-full bg-violet-500/[0.08] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-40 size-96 rounded-full bg-fuchsia-500/[0.05] blur-[140px]"
      />

      <header className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200">
          <Sparkles className="size-3" />
          AI workspace
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              Turn rough ideas into precise prompts.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Analyze, score, and improve your prompts
              inside a focused AI workspace built for
              clearer instructions and more consistent
              results.
            </p>
          </div>

          <div className="hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10 text-violet-200">
                <BrainCircuit className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Prompt intelligence
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Structure, clarity, context, and output
                  quality in one workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mt-10">
        <PromptOptimizer />
      </div>
    </div>
  );
}