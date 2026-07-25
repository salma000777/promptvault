import { PromptOptimizer } from "@/components/studio/prompt-optimizer";
import {
  ArrowUpRight,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

export default function StudioPage() {
  return (
    <div className="relative isolate mx-auto max-w-7xl px-6 pb-24 pt-4 lg:px-8">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/[0.07] blur-[180px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-32 h-[420px] w-[420px] rounded-full bg-fuchsia-500/[0.05] blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-56 h-[420px] w-[420px] rounded-full bg-sky-500/[0.04] blur-[170px]"
      />

      {/* Hero */}
      <header className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-3xl lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_60%)]" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-200">
              <Sparkles className="size-3.5" />
              PromptVault Studio
            </div>

            <h1 className="mt-8 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Build prompts
              <br />
              that perform.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Analyze, optimize and refine prompts inside a
              distraction-free AI workspace designed for
              professionals who care about better outputs.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <BrainCircuit className="size-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  AI Optimization Engine
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Analyze clarity, context, structure,
                  specificity and expected output quality.
                </p>
              </div>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Workflow
                </p>

                <p className="mt-2 text-sm font-medium text-slate-200">
                  Analyze → Improve
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Focus
                </p>

                <p className="mt-2 text-sm font-medium text-slate-200">
                  Prompt Quality
                </p>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-violet-300">
              Premium Workspace
              <ArrowUpRight className="size-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <section className="relative mt-12">
        <PromptOptimizer />
      </section>
    </div>
  );
}