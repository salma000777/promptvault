"use client";

import { useState, useTransition } from "react";
import { createPrompt } from "@/actions/prompt";

export default function PromptForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");

  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startTransition(async () => {
      try {
        await createPrompt({
          title,
          category,
          content,
        });

        alert("Prompt created!");

        setTitle("");
        setCategory("General");
        setContent("");
      } catch (error) {
        console.error(error);
        alert("Failed to create prompt.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-5xl flex-col gap-6 p-8"
    >
      <h1 className="text-4xl font-bold">
        Create Prompt
      </h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Prompt title"
        className="rounded-xl border border-slate-700 bg-slate-900 p-4"
        required
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="rounded-xl border border-slate-700 bg-slate-900 p-4"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your prompt..."
        className="min-h-[350px] rounded-xl border border-slate-700 bg-slate-900 p-4"
        required
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-indigo-600 py-4 font-semibold hover:bg-indigo-500 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Prompt"}
      </button>
    </form>
  );
}