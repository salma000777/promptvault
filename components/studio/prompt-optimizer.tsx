"use client";

import type { PromptOptimization } from "@/types/ai";

import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Crown,
  Lightbulb,
  LoaderCircle,
  RotateCcw,
  Sparkles,
  WandSparkles,
  XCircle,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  getScoreDescription,
  getScoreLabel,
} from "./studio-utils";

const EXAMPLE_PROMPT =
  "Create a one-week active-recall study plan for a medical student learning cardiovascular semiology. Include daily objectives, practice questions, and review sessions.";

const LOADING_STEPS = [
  "Understanding your intent",
  "Evaluating context and constraints",
  "Improving structure and precision",
  "Generating the optimized version",
];

export function PromptOptimizer({
  isPro,
}: {
  isPro: boolean;
}) {
  const [prompt, setPrompt] = useState("");

  const [result, setResult] =
    useState<PromptOptimization | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [loadingStep, setLoadingStep] =
    useState(0);

  useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingStep((currentStep) => {
        if (
          currentStep >=
          LOADING_STEPS.length - 1
        ) {
          return currentStep;
        }

        return currentStep + 1;
      });
    }, 900);

    return () => {
      window.clearInterval(interval);
    };
  }, [isLoading]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanPrompt = prompt.trim();
    
    if (!isPro) {
    setError(
      "AI optimization is a Pro feature. Upgrade to Pro to use Studio."
     );

     return;
   }
   
   if (cleanPrompt.length < 10) {
      setError(
        "Enter a prompt containing at least 10 characters."
      );

      return;
    }

    setError(null);
    setCopied(false);
    setIsLoading(true);
    setLoadingStep(0);

    try {
      const response = await fetch(
        "/api/optimize",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt: cleanPrompt,
          }),
        }
      );

      const body =
        (await response.json()) as {
          data?: PromptOptimization;
          error?: string;
        };

      if (!response.ok || !body.data) {
        throw new Error(
          body.error ??
            "The optimizer could not process your prompt."
        );
      }

      setResult(body.data);
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOptimizedPrompt() {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        result.optimizedPrompt
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "Your browser could not copy the prompt."
      );
    }
  }

  function resetOptimizer() {
    setPrompt("");
    setResult(null);
    setError(null);
    setCopied(false);
    setLoadingStep(0);
  }

  const safeScore = result
    ? Math.min(
        100,
        Math.max(0, result.score)
      )
    : 0;

  return (
    <div className="relative mx-auto w-full max-w-[1800px] pb-10">
      <div className="pointer-events-none absolute -left-24 top-24 size-80 rounded-full bg-violet-600/[0.06] blur-[140px]" />

      <div className="pointer-events-none absolute -right-28 top-48 size-96 rounded-full bg-fuchsia-500/[0.04] blur-[150px]" />

      <div className="relative">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10">
              <Sparkles className="size-5 text-violet-300" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Studio
              </h1>

              <p className="mt-0.5 text-sm text-muted-foreground">
                Analyze and optimize your prompts
                for better results
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-stretch gap-4 2xl:grid-cols-[0.9fr_1fr_1.12fr] xl:grid-cols-[0.95fr_1.05fr_1.1fr]">
          {/* =====================================================
              COLUMN 1 — ORIGINAL PROMPT
          ====================================================== */}

          <section className="flex min-h-[720px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.022] shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  1
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Your prompt
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Describe exactly what you need
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-500/[0.07] px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                AI ready
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col p-4"
            >
              <div className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-white/[0.07] bg-black/10 transition focus-within:border-violet-400/25 focus-within:ring-4 focus-within:ring-violet-500/[0.05]">
                <Textarea
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(
                      event.target.value
                    );

                    if (error) {
                      setError(null);
                    }
                  }}
                  placeholder="Paste your prompt here. Include the goal, context, constraints, preferred format, and anything the AI should avoid..."
                  className="min-h-[470px] flex-1 resize-none border-0 bg-transparent px-5 py-5 text-[14px] leading-7 text-white shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
                  maxLength={20000}
                  disabled={isLoading}
                />

                <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.018] px-4 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt(
                        EXAMPLE_PROMPT
                      );
                      setResult(null);
                      setError(null);
                    }}
                    disabled={isLoading}
                    className="text-xs font-medium text-violet-300 transition hover:text-violet-200 disabled:opacity-50"
                  >
                    Use an example
                  </button>

                  <span className="text-[11px] text-muted-foreground">
                    {prompt.length.toLocaleString()}{" "}
                    / 20,000
                  </span>
                </div>
              </div>

              {error ? (
                <div className="mt-3 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-xs text-red-300">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />

                  <p className="leading-5">
                    {error}
                  </p>
                </div>
              ) : null}

              <div className="mt-4 flex gap-3">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    prompt.trim().length < 10
                  }
                  className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 font-semibold text-white shadow-lg shadow-violet-950/25 hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    <>
                      <WandSparkles className="size-4" />
                      Analyze &amp; optimize
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>

                {(prompt || result) &&
                !isLoading ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetOptimizer}
                    className="h-12 rounded-2xl border-white/10 bg-white/[0.025] px-4 hover:bg-white/[0.06]"
                  >
                    <RotateCcw className="size-4" />
                    Reset
                  </Button>
                ) : null}
              </div>
            </form>
          </section>

          {/* =====================================================
              COLUMN 2 — OPTIMIZED PROMPT
          ====================================================== */}

          <section className="flex min-h-[720px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.022] shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  2
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Optimized prompt
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Ready for your AI model
                  </p>
                </div>
              </div>

              {result ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={
                    copyOptimizedPrompt
                  }
                  className="rounded-xl border-white/10 bg-white/[0.025] hover:bg-white/[0.06]"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
              {isLoading ? (
                <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] border border-white/[0.06] bg-black/10 px-8 text-center">
                  <div className="relative flex size-20 items-center justify-center">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-violet-500/15 blur-2xl" />

                    <LoaderCircle className="relative size-7 animate-spin text-violet-300" />
                  </div>

                  <p className="mt-5 text-base font-semibold text-white">
                    Building your optimized prompt
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {
                      LOADING_STEPS[
                        loadingStep
                      ]
                    }
                  </p>
                </div>
              ) : result ? (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full border border-emerald-400/10 bg-emerald-500/[0.08] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                      Optimized
                    </span>

                    <span className="rounded-full border border-violet-400/10 bg-violet-500/[0.08] px-2.5 py-1 text-[11px] font-medium text-violet-300">
                      Ready to use
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto whitespace-pre-wrap rounded-[20px] border border-white/[0.07] bg-black/10 px-5 py-5 text-sm leading-7 text-white/90">
                    {result.optimizedPrompt}
                  </div>

                  <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
                    <span>
                      {result.optimizedPrompt.length.toLocaleString()}{" "}
                      characters
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      Optimization complete
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center rounded-[20px] border border-dashed border-white/[0.07] bg-black/5 px-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-[22px] border border-violet-400/10 bg-violet-500/[0.06]">
                    <Sparkles className="size-6 text-violet-300" />
                  </div>

                  <p className="mt-5 text-base font-semibold text-white">
                    Your optimized prompt
                    will appear here
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    Add a prompt and run the
                    optimizer to generate a clearer,
                    more precise version.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* =====================================================
              COLUMN 3 — ANALYSIS
          ====================================================== */}

          <section className="flex min-h-[720px] min-w-0 flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.022] shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  3
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Analysis
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Prompt quality breakdown
                  </p>
                </div>
              </div>

              {result ? (
                <span className="rounded-full border border-violet-400/15 bg-violet-500/[0.09] px-3 py-1 text-[11px] font-medium text-violet-300">
                  {getScoreLabel(
                    safeScore
                  )}
                </span>
              ) : null}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <LoaderCircle className="size-7 animate-spin text-violet-300" />

                  <p className="mt-4 text-sm font-medium text-white">
                    Analyzing prompt quality
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Scoring clarity, structure,
                    context and precision.
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-3.5">
                  <div className="rounded-[20px] border border-white/[0.07] bg-black/10 p-5">
                    <div className="flex items-center gap-5">
                      <div className="relative flex size-24 shrink-0 items-center justify-center">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `conic-gradient(rgb(139 92 246) ${
                              safeScore *
                              3.6
                            }deg, rgba(255,255,255,.055) 0deg)`,
                          }}
                        />

                        <div className="absolute inset-[6px] rounded-full bg-[#090a14]" />

                        <div className="relative text-center">
                          <span className="block text-3xl font-bold text-white">
                            {safeScore}
                          </span>

                          <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                            out of 100
                          </span>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold leading-6 text-white">
                          {getScoreDescription(
                            safeScore
                          )}
                        </h2>

                        <p className="mt-2 line-clamp-4 text-xs leading-5 text-muted-foreground">
                          {result.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">
                          Overall prompt quality
                        </span>

                        <span className="font-semibold text-white">
                          {safeScore}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400"
                          style={{
                            width: `${safeScore}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <AnalysisCard
                    title="Strengths"
                    icon={
                      <CheckCircle2 className="size-4 text-emerald-400" />
                    }
                    items={result.strengths}
                    tone="positive"
                  />

                  <AnalysisCard
                    title="Weaknesses"
                    icon={
                      <XCircle className="size-4 text-red-400" />
                    }
                    items={result.weaknesses}
                    tone="negative"
                  />

                  <AnalysisCard
                    title="Suggestions"
                    icon={
                      <Lightbulb className="size-4 text-amber-300" />
                    }
                    items={result.suggestions}
                    tone="recommendation"
                  />
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-[22px] border border-white/[0.07] bg-white/[0.025]">
                    <WandSparkles className="size-6 text-violet-300" />
                  </div>

                  <p className="mt-5 text-base font-semibold text-white">
                    Analysis will appear here
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    Get your score, strengths,
                    weaknesses and actionable
                    recommendations.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* =====================================================
            PRO CTA
        ====================================================== */}

        <section className="mt-4 overflow-hidden rounded-[24px] border border-violet-400/[0.12] bg-[linear-gradient(110deg,rgba(124,58,237,.12),rgba(255,255,255,.025),rgba(168,85,247,.07))]">
          <div className="flex flex-col gap-5 px-6 py-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10">
                <Crown className="size-5 text-violet-300" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Upgrade to Pro
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Higher limits, priority AI
                  access and advanced features.
                </p>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {[
                "Higher AI usage limits",
                "Advanced prompt analysis",
                "Priority AI processing",
                "Export & history access",
              ].map((feature) => (
                <span
                  key={feature}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Check className="size-3.5 text-violet-300" />
                  {feature}
                </span>
              ))}
            </div>

            <Link
              href="/pricing"
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 font-semibold text-white shadow-lg shadow-violet-950/20 hover:opacity-90"
            >
              Upgrade to Pro
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

type AnalysisCardProps = {
  title: string;
  icon: React.ReactNode;
  items: string[];
  tone:
    | "positive"
    | "negative"
    | "recommendation";
};

function AnalysisCard({
  title,
  icon,
  items,
  tone,
}: AnalysisCardProps) {
  const styles = {
    positive:
      "border-emerald-400/[0.10] bg-emerald-500/[0.025]",
    negative:
      "border-red-400/[0.10] bg-red-500/[0.025]",
    recommendation:
      "border-amber-400/[0.10] bg-amber-500/[0.02]",
  };

  return (
    <div
      className={`rounded-[20px] border p-4 ${styles[tone]}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg border border-white/[0.06] bg-black/10">
            {icon}
          </div>

          <p className="text-sm font-semibold text-white">
            {title}
          </p>
        </div>

        <span className="flex size-6 items-center justify-center rounded-full bg-white/[0.05] text-[10px] font-medium text-muted-foreground">
          {items.length}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            className="flex gap-2.5 text-xs leading-5 text-muted-foreground"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-current opacity-60" />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromptOptimizer;