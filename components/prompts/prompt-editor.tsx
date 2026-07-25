"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  ArrowLeft,
  Check,
  Circle,
  FileText,
  Hash,
  Loader2,
  Save,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type PromptEditorProps = {
  mode: "create" | "edit";
  action: (formData: FormData) => void | Promise<void>;
  title?: string;
  category?: string;
  content?: string;
  error?: string;
};

type SubmitButtonProps = {
  mode: PromptEditorProps["mode"];
};

function SubmitButton({ mode }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-violet-400/25 bg-violet-500/15 px-6 text-sm font-semibold text-violet-100 shadow-[0_12px_35px_rgba(124,58,237,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/35 hover:bg-violet-500/25 hover:text-white hover:shadow-[0_18px_45px_rgba(124,58,237,0.22)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="size-4 transition-transform duration-300 group-hover:scale-110" />

          {mode === "create"
            ? "Create Prompt"
            : "Save Changes"}
        </>
      )}
    </button>
  );
}

export default function PromptEditor({
  mode,
  action,
  title = "",
  category = "General",
  content = "",
  error,
}: PromptEditorProps) {
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const formRef =
    useRef<HTMLFormElement>(null);

  const [titleValue, setTitleValue] =
    useState(title);

  const [categoryValue, setCategoryValue] =
    useState(category);

  const [contentValue, setContentValue] =
    useState(content);

  const [dirty, setDirty] =
    useState(false);

  const titleLimit = 120;
  const categoryLimit = 60;

  const characterCount =
    contentValue.length;

  const wordCount = useMemo(() => {
    const trimmedContent =
      contentValue.trim();

    if (!trimmedContent) {
      return 0;
    }

    return trimmedContent
      .split(/\s+/)
      .filter(Boolean).length;
  }, [contentValue]);

  const estimatedTokens =
    Math.ceil(characterCount / 4);

  useEffect(() => {
    const textarea =
      textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height =
      `${Math.max(
        textarea.scrollHeight,
        420
      )}px`;
  }, [contentValue]);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        (event.metaKey ||
          event.ctrlKey) &&
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();

        formRef.current?.requestSubmit();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
    <div className="relative mx-auto max-w-6xl pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-violet-500/[0.08] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-72 size-72 rounded-full bg-fuchsia-500/[0.05] blur-[120px]"
      />

      <Link
        href="/dashboard/prompts"
        className="group relative inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-200"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Back to Prompt Library
      </Link>

      <header className="relative mt-8 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            <Sparkles className="size-3" />
            Prompt workspace
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
            {mode === "create"
              ? "Create something worth reusing."
              : "Refine your prompt."}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
            Write, organize, and polish a reusable
            instruction for your favorite AI tools.
          </p>
        </div>

        <div className="hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:block">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
              Document status
            </span>

            {dirty ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-300">
                <Circle className="size-2 fill-current" />
                Unsaved
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300">
                <Check className="size-4" />
                Saved
              </span>
            )}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/[0.05] bg-black/15 p-3 text-center">
              <p className="text-lg font-semibold text-slate-200">
                {wordCount}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-600">
                Words
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-black/15 p-3 text-center">
              <p className="text-lg font-semibold text-slate-200">
                {characterCount}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-600">
                Characters
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.05] bg-black/15 p-3 text-center">
              <p className="text-lg font-semibold text-slate-200">
                {estimatedTokens}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-600">
                Tokens
              </p>
            </div>
          </div>
        </div>
      </header>

      {error ? (
        <div className="relative mt-8 rounded-2xl border border-red-400/15 bg-red-500/[0.08] px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <form
        ref={formRef}
        action={action}
        onChange={() => setDirty(true)}
        className="relative mt-10"
      >
        <div className="overflow-hidden rounded-[32px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] shadow-[0_32px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10 text-violet-200">
                <WandSparkles className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Prompt details
                </p>

                <p className="mt-0.5 text-xs text-slate-600">
                  Give your prompt a clear identity
                  before writing.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_240px]">
              <div>
                <label
                  htmlFor="prompt-title"
                  className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                >
                  <FileText className="size-3.5 text-violet-300" />
                  Prompt title
                </label>

                <Input
                  id="prompt-title"
                  name="title"
                  maxLength={titleLimit}
                  value={titleValue}
                  onChange={(event) => {
                    setTitleValue(
                      event.target.value
                    );
                  }}
                  placeholder="Viral LinkedIn Generator"
                  className="h-14 rounded-2xl border-white/[0.07] bg-black/20 px-4 text-base font-medium text-slate-100 shadow-none placeholder:text-slate-700 focus-visible:border-violet-400/25 focus-visible:ring-4 focus-visible:ring-violet-500/10"
                  required
                />

                <div className="mt-2 flex justify-end text-xs text-slate-700">
                  {titleValue.length}/{titleLimit}
                </div>
              </div>

              <div>
                <label
                  htmlFor="prompt-category"
                  className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                >
                  <Hash className="size-3.5 text-violet-300" />
                  Category
                </label>

                <Input
                  id="prompt-category"
                  name="category"
                  maxLength={categoryLimit}
                  value={categoryValue}
                  onChange={(event) => {
                    setCategoryValue(
                      event.target.value
                    );
                  }}
                  placeholder="General"
                  className="h-14 rounded-2xl border-white/[0.07] bg-black/20 px-4 text-slate-200 shadow-none placeholder:text-slate-700 focus-visible:border-violet-400/25 focus-visible:ring-4 focus-visible:ring-violet-500/10"
                />

                <div className="mt-2 flex justify-end text-xs text-slate-700">
                  {categoryValue.length}/{categoryLimit}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label
                  htmlFor="prompt-content"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                >
                  <Sparkles className="size-3.5 text-violet-300" />
                  Prompt
                </label>

                <span className="hidden text-xs text-slate-700 sm:inline">
                  Press ⌘S or Ctrl+S to save
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-black/20 transition-all duration-300 focus-within:border-violet-400/25 focus-within:ring-4 focus-within:ring-violet-500/[0.08]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent"
                />

                <Textarea
                  ref={textareaRef}
                  id="prompt-content"
                  name="content"
                  value={contentValue}
                  onChange={(event) => {
                    setContentValue(
                      event.target.value
                    );
                  }}
                  placeholder={`Write your prompt here...

Example:

You are an expert brand strategist. Help me create a compelling positioning statement for [PRODUCT] aimed at [AUDIENCE].

Return:
1. Core positioning
2. Three value propositions
3. A concise tagline`}
                  className="min-h-[420px] resize-none border-0 bg-transparent p-6 font-mono text-[14px] leading-7 text-slate-300 shadow-none placeholder:text-slate-700 focus-visible:ring-0 sm:p-8"
                  required
                />

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] px-5 py-3 text-xs text-slate-700">
                  <span>
                    Markdown and variables are supported
                  </span>

                  <div className="flex items-center gap-4">
                    <span>
                      {wordCount} words
                    </span>

                    <span>
                      ~{estimatedTokens} tokens
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-5 z-20 mx-4 mb-4 flex flex-col gap-4 rounded-[22px] border border-white/[0.08] bg-slate-950/85 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:mx-6 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm">
              {dirty ? (
                <>
                  <Circle className="size-2 fill-amber-300 text-amber-300" />

                  <span className="text-slate-500">
                    You have unsaved changes
                  </span>
                </>
              ) : (
                <>
                  <Check className="size-4 text-emerald-300" />

                  <span className="text-slate-500">
                    Everything is saved
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/prompts"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 text-sm font-medium text-slate-400 transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.05] hover:text-white"
              >
                Cancel
              </Link>

              <SubmitButton mode={mode} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}