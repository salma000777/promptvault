"use client";

import type { PromptOptimization } from "@/types/ai";

import { useEffect, useState, type FormEvent } from "react";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  LoaderCircle,
  RotateCcw,
  Sparkles,
  WandSparkles,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import LoadingWorkspace from "./loading-workspace";
import EmptyWorkspace from "./empty-workspace";
import FeedbackPanel from "./feedback-panel";
import ScorePanel from "./score-panel";
import OptimizedPromptPanel from "./optimized-prompt-panel";

const EXAMPLE_PROMPT =
  "Create a one-week active-recall study plan for a medical student learning cardiovascular semiology. Include daily objectives, practice questions, and review sessions.";

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
        if (currentStep >= 3) {
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
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length < 10) {
      setError(
        "Enter a prompt containing at least 10 characters.",
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
        },
      );

      const body =
        (await response.json()) as {
          data?: PromptOptimization;
          error?: string;
        };

      if (!response.ok || !body.data) {
        throw new Error(
          body.error ??
            "The optimizer could not process your prompt.",
        );
      }

      setResult(body.data);
    } catch (caughtError) {
      setResult(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong.",
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
        result.optimizedPrompt,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "Your browser could not copy the prompt.",
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

                    <span>
                      20,000 characters
                    </span>

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
                      Analyze & optimize
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
    onCopy={copyOptimizedPrompt}
    onUseOptimized={useOptimizedPrompt}
  />
</div>
          ) : (
            <EmptyWorkspace />
          )}

        </section>

      </div>

    </div>
  );
}

export default PromptOptimizer;