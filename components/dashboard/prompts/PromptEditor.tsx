export default function PromptEditor() {
  return (
    <textarea
      placeholder="Write your prompt here..."
      className="min-h-[500px] w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-white outline-none focus:border-indigo-500"
    />
  );
}