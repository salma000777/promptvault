"use client";

import { Check, LoaderCircle, Sparkles } from "lucide-react";

const LOADING_STEPS = [
  "Understanding your intent",
  "Evaluating context and constraints",
  "Improving structure and precision",
  "Generating the optimized version",
];

type LoadingWorkspaceProps = {
  activeStep: number;
};

export default function LoadingWorkspace({
  activeStep,
}: LoadingWorkspaceProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex min-h-[690px] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <LoaderCircle className="size-5 animate-spin text-violet-300" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                PromptVault AI
              </p>

              <p className="text-xs text-muted-foreground">
                Analysis in progress
              </p>
            </div>
          </div>

          <span className="rounded-full border border-violet-400/15 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300">
            Processing
          </span>
        </div>

        <div className="mx-auto w-full max-w-md py-16">
          <div className="mb-8 flex justify-center">
            <div className="relative flex size-24 items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-violet-500/15 blur-2xl" />

              <div className="absolute inset-2 rounded-full border border-violet-400/15" />

              <div className="absolute inset-5 rounded-full border border-violet-400/20" />

              <Sparkles className="relative size-8 text-violet-300" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Engineering a stronger prompt
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              We are reviewing clarity, context,
              constraints, structure, and expected
              output quality.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {LOADING_STEPS.map((step, index) => {
              const isComplete = index < activeStep;
              const isActive = index === activeStep;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-500 ${
                    isActive
                      ? "border-violet-400/25 bg-violet-500/[0.08]"
                      : isComplete
                        ? "border-white/[0.07] bg-white/[0.025]"
                        : "border-transparent bg-transparent opacity-40"
                  }`}
                >
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${
                      isComplete
                        ? "border-emerald-400/20 bg-emerald-500/10"
                        : isActive
                          ? "border-violet-400/25 bg-violet-500/10"
                          : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : isActive ? (
                      <LoaderCircle className="size-3.5 animate-spin text-violet-300" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                    )}
                  </div>

                  <span
                    className={`text-sm ${
                      isActive
                        ? "font-medium text-white"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
                  </div>

        <p className="text-center text-xs text-muted-foreground/60">
          This usually takes only a few seconds.
        </p>
      </div>
    </div>
  );
}