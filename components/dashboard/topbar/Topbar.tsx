export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Manage your prompts and workspace.
        </p>
      </div>

      <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500">
        + New Prompt
      </button>
    </header>
  );
}