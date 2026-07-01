import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 p-8">
      <h1 className="text-4xl font-bold">
        Welcome back 👋
      </h1>

      <p className="text-slate-400">
        Ready to continue building your AI workspace?
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/prompts"
          className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-indigo-500"
        >
          <h2 className="text-2xl font-bold">
            📚 Prompt Library
          </h2>

          <p className="mt-4 text-slate-400">
            Browse, edit and organize all your prompts.
          </p>
        </Link>

        <Link
          href="/prompts/new"
          className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-indigo-500"
        >
          <h2 className="text-2xl font-bold">
            ✨ Create Prompt
          </h2>

          <p className="mt-4 text-slate-400">
            Start writing a brand-new prompt.
          </p>
        </Link>
      </div>
    </main>
  );
}