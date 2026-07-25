"use client";

import { Check, Sparkles, WandSparkles } from "lucide-react";

const capabilities = [
  "Quality and clarity score",
  "Strength and weakness analysis",
  "Actionable recommendations",
  "Production-ready rewrite",
];

export default function EmptyWorkspace() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex min-h-[690px] flex-col">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <Sparkles className="size-4 text-violet-300" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Analysis workspace
              </p>

              <p className="text-xs text-muted-foreground">
                Results will appear here
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            Waiting
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative flex size-20 items-center justify-center rounded-[24px] border border-violet-400/15 bg-violet-500/[0.08]">
              <WandSparkles className="size-8 text-violet-300" />
            </div>
          </div>

          <span className="mb-4 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300">
            AI Prompt Studio
          </span>

          <h2 className="max-w-md text-3xl font-semibold tracking-tight text-white">
            Turn rough ideas into precise,
            production-ready prompts.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            Paste a prompt into the editor and PromptVault will analyze
            how effectively it communicates intent to an AI model.
          </p>

          <div className="mt-9 grid w-full max-w-lg gap-3 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-left"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                  <Check className="size-3.5 text-violet-300" />
                </div>

                <span className="text-sm text-zinc-300">
                  {capability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}