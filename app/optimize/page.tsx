"use client";

import { useState } from "react";

export default function OptimizePage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function optimizePrompt() {
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setOutput(data.output);
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong.");
    }

    setLoading(false);
  }

  async function copyOutput() {
    if (!output) return;

    await navigator.clipboard.writeText(output);
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">
          AI Prompt Studio
        </h1>

        <p className="mt-2 text-slate-400">
          Optimize, score and rewrite prompts using AI.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste your prompt..."
          className="min-h-[550px] rounded-2xl border border-slate-800 bg-slate-900 p-6 outline-none focus:border-indigo-500"
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">
            AI Output
          </h2>

          <pre className="mt-6 whitespace-pre-wrap text-slate-300">
            {loading
              ? "Optimizing prompt..."
              : output || "Optimized prompt will appear here."}
          </pre>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={optimizePrompt}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Optimizing..." : "Optimize"}
        </button>

        <button
          className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"
        >
          Score Prompt
        </button>

        <button
          className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"
        >
          Rewrite
        </button>

        <button
          onClick={copyOutput}
          className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700"
        >
          Copy Output
        </button>
      </div>
    </main>
  );
}