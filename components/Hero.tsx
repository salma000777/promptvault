export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="mx-auto max-w-5xl text-center">
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm text-indigo-300">
          PromptVault
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
          Your AI prompts,
          <br />
          organized forever.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400">
          Save, organize, improve, search, and reuse your best prompts across
          every AI tool.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500">
            Get Started
          </button>

          <button className="rounded-xl border border-slate-700 px-6 py-3 hover:border-slate-500">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
}