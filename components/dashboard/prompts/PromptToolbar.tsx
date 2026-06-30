export default function PromptToolbar() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
      <h2 className="text-xl font-semibold">
        Prompt Editor
      </h2>

      <div className="flex gap-3">
        <button className="rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500">
          Save Draft
        </button>

        <button className="rounded-xl bg-indigo-600 px-4 py-2 hover:bg-indigo-500">
          AI Improve
        </button>
      </div>
    </div>
  );
}