"use client";

import type { PromptOptimization } from "@/types/ai";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
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
  type ReactNode,
} from "react";

const EXAMPLE_PROMPT =
  "Create a one-week active-recall study plan for a medical student learning cardiovascular semiology. Include daily objectives, practice questions, and review sessions.";

const LOADING_STEPS = [
  "Understanding your intent",
  "Evaluating context and constraints",
  "Improving structure and precision",
  "Generating the optimized version",
];

function getScoreLabel(score: number) {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Strong";
  }

  if (score >= 60) {
    return "Good foundation";
  }

  if (score >= 40) {
    return "Needs improvement";
  }

  return "Weak";
}

function getScoreDescription(score: number) {
  if (score >= 90) {
    return "Your prompt is highly specific, structured, and ready for reliable AI output.";
  }

  if (score >= 75) {
    return "Your prompt is effective, with a few opportunities to improve precision.";
  }

  if (score >= 60) {
    return "The core idea is solid, but clearer instructions would improve the result.";
  }

  if (score >= 40) {
    return "The prompt needs more context, constraints, and output direction.";
  }

  return "The prompt is too open-ended to consistently produce a useful result.";
}

export function PromptOptimizer() {
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
        if (currentStep >= LOADING_STEPS.length - 1) {
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
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prompt: cleanPrompt,
          }),
        }
      );

      const body = (await response.json()) as {
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

  function useOptimizedPrompt() {
    if (!result) {
      return;
    }

    setPrompt(result.optimizedPrompt);
    setResult(null);
    setCopied(false);
    setError(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetOptimizer() {
    setPrompt("");
    setResult(null);
    setError(null);
    setCopied(false);
    setLoadingStep(0);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-40 top-24 size-80 rounded-full bg-violet-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-[28rem] size-96 rounded-full bg-fuchsia-500/5 blur-[140px]" />

      <div className="relative grid items-start gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <section className="xl:sticky xl:top-6">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                  <WandSparkles className="size-4 text-violet-300" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Prompt input
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Describe exactly what you need
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-muted-foreground sm:flex">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                AI ready
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-5"
            >
              <div className="relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/10 transition focus-within:border-violet-400/30 focus-within:bg-black/20 focus-within:ring-4 focus-within:ring-violet-500/[0.06]">
                <Textarea
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value);

                    if (error) {
                      setError(null);
                    }
                  }}
                  placeholder="Paste your prompt here. Include the goal, context, constraints, preferred format, and anything the AI should avoid..."
                  className="min-h-[480px] resize-none border-0 bg-transparent px-5 py-5 text-[15px] leading-7 shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0 sm:min-h-[540px] sm:px-6 sm:py-6"
                  maxLength={20000}
                  disabled={isLoading}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.02] px-4 py-3 sm:px-5">
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt(EXAMPLE_PROMPT);
                      setResult(null);
                      setError(null);
                    }}
                    disabled={isLoading}
                    className="text-xs font-medium text-violet-300 transition hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Use an example
                  </button>

                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span
                      className={
                        prompt.length > 18000
                          ? "text-amber-400"
                          : ""
                      }
                    >
                      {prompt.length.toLocaleString()}
                    </span>

                    <span className="text-muted-foreground/40">
                      /
                    </span>

                    <span>20,000 characters</span>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3.5 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />

                  <p className="leading-6">
                    {error}
                  </p>
                </div>
              ) : null}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    prompt.trim().length < 10
                  }
                  className="h-13 flex-1 rounded-2xl bg-violet-600 px-6 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Analyzing prompt
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Analyze &amp; optimize
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>

                {(result || prompt) &&
                !isLoading ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetOptimizer}
                    className="h-13 rounded-2xl border-white/10 bg-white/[0.03] px-5 hover:bg-white/[0.06]"
                  >
                    <RotateCcw className="size-4" />
                    Reset
                  </Button>
                ) : null}
              </div>
            </form>
          </div>
        </section>

        <section className="min-w-0">
          {isLoading ? (
            <LoadingWorkspace
              activeStep={loadingStep}
            />
          ) : result ? (
            <ResultWorkspace
              result={result}
              copied={copied}
              onCopy={copyOptimizedPrompt}
              onUseOptimized={useOptimizedPrompt}
            />
          ) : (
            <EmptyWorkspace />
          )}
        </section>
      </div>
    </div>
  );
}

type LoadingWorkspaceProps = {
  activeStep: number;
};

function LoadingWorkspace({
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
              <p className="text-sm font-semibold">
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
            <h2 className="text-2xl font-semibold tracking-tight">
              Engineering a stronger prompt
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              We are reviewing clarity, context,
              constraints, structure, and expected
              output quality.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {LOADING_STEPS.map(
              (step, index) => {
                const isComplete =
                  index < activeStep;

                const isActive =
                  index === activeStep;

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
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/60">
          This usually takes only a few seconds.
        </p>
      </div>
    </div>
  );
}

function EmptyWorkspace() {
  const capabilities = [
    "Quality and clarity score",
    "Strength and weakness analysis",
    "Actionable recommendations",
    "Production-ready rewrite",
  ];

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <div className="flex min-h-[690px] flex-col">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
              <Sparkles className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-semibold">
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

          <h2 className="max-w-md text-3xl font-semibold tracking-tight">
            Turn rough ideas into precise,
            production-ready prompts.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            Paste a prompt into the editor and
            PromptVault will analyze how effectively
            it communicates intent to an AI model.
          </p>

          <div className="mt-9 grid w-full max-w-lg gap-3 sm:grid-cols-2">
            {capabilities.map(
              (capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-left"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                    <Check className="size-3.5 text-violet-300" />
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {capability}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type ResultWorkspaceProps = {
  result: PromptOptimization;
  copied: boolean;
  onCopy: () => void;
  onUseOptimized: () => void;
};

function ResultWorkspace({
  result,
  copied,
  onCopy,
  onUseOptimized,
}: ResultWorkspaceProps) {
  return (
    <div className="space-y-6">
      <ScorePanel result={result} />

      <div className="grid gap-4 lg:grid-cols-2">
        <FeedbackPanel
          title="Strengths"
          description="What is already working"
          icon={
            <CheckCircle2 className="size-4 text-emerald-400" />
          }
          items={result.strengths}
          tone="positive"
        />

        <FeedbackPanel
          title="Weaknesses"
          description="What limits the output"
          icon={
            <XCircle className="size-4 text-red-400" />
          }
          items={result.weaknesses}
          tone="negative"
        />
      </div>

      <FeedbackPanel
        title="Recommendations"
        description="The highest-impact improvements"
        icon={
          <Lightbulb className="size-4 text-amber-300" />
        }
        items={result.suggestions}
        tone="recommendation"
      />

      <OptimizedPromptPanel
        prompt={result.optimizedPrompt}
        copied={copied}
        onCopy={onCopy}
        onUseOptimized={onUseOptimized}
      />
    </div>
  );
}

type ScorePanelProps = {
  result: PromptOptimization;
};

function ScorePanel({
  result,
}: ScorePanelProps) {
  const safeScore = Math.min(
    100,
    Math.max(0, result.score)
  );

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] shadow-xl shadow-black/10 backdrop-blur-2xl">
      <div className="p-6 sm:p-7">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
          <div className="relative flex size-32 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-2xl" />

            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(rgb(139 92 246) ${safeScore * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
              }}
            />

            <div className="absolute inset-[7px] rounded-full bg-background/95" />

            <div className="relative text-center">
              <span className="block text-4xl font-semibold tracking-tight">
                {result.score}
              </span>

              <span className="text-[11px] text-muted-foreground">
                out of 100
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {getScoreLabel(result.score)}
              </span>

              <span className="text-xs text-muted-foreground">
                Prompt quality score
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              {getScoreDescription(result.score)}
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {result.summary}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Overall prompt quality
                </span>

                <span className="font-medium text-foreground">
                  {safeScore}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400 transition-all duration-1000"
                  style={{
                    width: `${safeScore}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type FeedbackPanelProps = {
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
  tone:
    | "positive"
    | "negative"
    | "recommendation";
};

function FeedbackPanel({
  title,
  description,
  icon,
  items,
  tone,
}: FeedbackPanelProps) {
  const toneClasses = {
    positive:
      "border-emerald-400/10 bg-emerald-500/[0.035]",
    negative:
      "border-red-400/10 bg-red-500/[0.035]",
    recommendation:
      "border-amber-400/10 bg-amber-500/[0.025]",
  };

  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04]">
          {icon}
        </div>

        <div>
          <h3 className="text-base font-semibold">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={`rounded-2xl border px-4 py-3.5 ${toneClasses[tone]}`}
            >
              <div className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current opacity-60" />

                <p className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 text-sm text-muted-foreground">
            No items were identified.
          </div>
        )}
      </div>
    </div>
  );
}

type OptimizedPromptPanelProps = {
  prompt: string;
  copied: boolean;
  onCopy: () => void;
  onUseOptimized: () => void;
};

function OptimizedPromptPanel({
  prompt,
  copied,
  onCopy,
  onUseOptimized,
}: OptimizedPromptPanelProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-violet-400/15 bg-white/[0.025] shadow-2xl shadow-violet-950/10 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
            <Sparkles className="size-4 text-violet-300" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Optimized prompt
            </h3>

            <p className="text-xs text-muted-foreground">
              Ready to use with your preferred AI
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopy}
            className="rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onUseOptimized}
            className="rounded-xl bg-violet-600 text-white hover:bg-violet-500"
          >
            Use as original
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/20">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />

            <span className="ml-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/50">
              Prompt output
            </span>
          </div>

          <div className="max-h-[720px] overflow-y-auto whitespace-pre-wrap px-5 py-5 text-sm leading-7 text-foreground/90 sm:px-6 sm:py-6">
            {prompt}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-muted-foreground">
          <span>
            {prompt.length.toLocaleString()} characters
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            Optimization complete
          </span>
        </div>
      </div>
    </div>
  );
}