"use client";

import type {
  PromptOptimization,
} from "@/types/ai";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertCircle,
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
  useState,
  type FormEvent,
} from "react";

const EXAMPLE_PROMPT =
  "Create a one-week active-recall study plan for a medical student learning cardiovascular semiology. Include daily objectives, practice questions, and review sessions.";

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

export function PromptOptimizer() {
  const [prompt, setPrompt] =
    useState("");

  const [result, setResult] =
    useState<PromptOptimization | null>(
      null
    );

  const [error, setError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

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

  function resetOptimizer() {
    setPrompt("");
    setResult(null);
    setError(null);
    setCopied(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WandSparkles className="size-5 text-primary" />
            Your prompt
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
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
                placeholder="Paste the prompt you want PromptVault to analyze..."
                className="min-h-96 resize-y"
                maxLength={20000}
                disabled={isLoading}
              />

              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
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
                  className="font-medium text-primary hover:underline disabled:opacity-50"
                >
                  Use example
                </button>

                <span>
                  {prompt.length.toLocaleString()}
                  /20,000
                </span>
              </div>
            </div>

            {error ? (
              <div className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{error}</p>
              </div>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                prompt.trim().length < 10
              }
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Analyzing prompt...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Optimize Prompt
                </>
              )}
            </Button>

            {(result || prompt) &&
            !isLoading ? (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={resetOptimizer}
              >
                <RotateCcw className="size-4" />
                Start over
              </Button>
            ) : null}
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {isLoading ? (
          <Card>
            <CardContent className="flex min-h-[520px] flex-col items-center justify-center p-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <LoaderCircle className="size-8 animate-spin text-primary" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Analyzing your prompt
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                PromptVault is evaluating
                clarity, context, constraints,
                formatting, and consistency.
              </p>
            </CardContent>
          </Card>
        ) : result ? (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex size-24 shrink-0 flex-col items-center justify-center rounded-full border-8 border-primary/15 bg-primary/5">
                    <span className="text-3xl font-bold">
                      {result.score}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      / 100
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {getScoreLabel(
                        result.score
                      )}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Prompt quality score
                    </h2>

                    <p className="mt-2 leading-7 text-muted-foreground">
                      {result.summary}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <FeedbackCard
                title="Strengths"
                icon={
                  <CheckCircle2 className="size-5 text-emerald-600" />
                }
                items={result.strengths}
              />

              <FeedbackCard
                title="Weaknesses"
                icon={
                  <XCircle className="size-5 text-destructive" />
                }
                items={result.weaknesses}
              />
            </div>

            <FeedbackCard
              title="Recommendations"
              icon={
                <Lightbulb className="size-5 text-amber-500" />
              }
              items={result.suggestions}
            />

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  Optimized prompt
                </CardTitle>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={
                    copyOptimizedPrompt
                  }
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copy
                    </>
                  )}
                </Button>
              </CardHeader>

              <CardContent>
                <div className="max-h-[600px] overflow-y-auto whitespace-pre-wrap rounded-xl border bg-muted/30 p-5 text-sm leading-7">
                  {result.optimizedPrompt}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="flex min-h-[520px] flex-col items-center justify-center p-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="size-8 text-primary" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Ready to improve your prompt
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Paste a prompt to receive a
                quality score, detailed
                feedback, recommendations, and
                a stronger optimized version.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

type FeedbackCardProps = {
  title: string;
  icon: React.ReactNode;
  items: string[];
};

function FeedbackCard({
  title,
  icon,
  items,
}: FeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 text-sm leading-6 text-muted-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}