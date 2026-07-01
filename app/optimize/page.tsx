export default function OptimizePage() {
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
          placeholder="Paste your prompt..."
          className="min-h-[550px] rounded-2xl border border-slate-800 bg-slate-900 p-6 outline-none focus:border-indigo-500"
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">
            AI Output
          </h2>

          <p className="mt-4 text-slate-400">
            Optimized prompt will appear here.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500">
          Optimize
        </button>

        <button className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700">
          Score Prompt
        </button>

        <button className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700">
          Rewrite
        </button>

        <button className="rounded-xl bg-slate-800 px-6 py-3 hover:bg-slate-700">
          Copy Output
        </button>
      </div>
    </main>
  );
}