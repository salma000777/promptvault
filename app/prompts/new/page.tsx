export default function NewPromptPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 p-8">
      <h1 className="text-4xl font-bold">
        Create Prompt
      </h1>

      <input
        placeholder="Prompt title"
        className="rounded-xl border border-slate-700 bg-slate-900 p-4"
      />

      <input
        placeholder="Category"
        className="rounded-xl border border-slate-700 bg-slate-900 p-4"
      />

      <textarea
        placeholder="Write your prompt..."
        className="min-h-[350px] rounded-xl border border-slate-700 bg-slate-900 p-4"
      />

      <button className="rounded-xl bg-indigo-600 py-4 font-semibold hover:bg-indigo-500">
        Save Prompt
      </button>
    </main>
  );
}