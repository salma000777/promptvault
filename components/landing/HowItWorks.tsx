const steps = [
  {
    number: "01",
    title: "Save",
    description: "Save prompts from ChatGPT, Claude, Gemini, Cursor, or anywhere else.",
  },
  {
    number: "02",
    title: "Organize",
    description: "Group prompts into folders and tag them so they're easy to find.",
  },
  {
    number: "03",
    title: "Reuse",
    description: "Copy, edit, improve with AI, and use them whenever you need them.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold">How it works</h2>

        <p className="mt-4 text-slate-400">
          Three simple steps to build your personal prompt library.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8"
          >
            <div className="text-4xl font-bold text-indigo-400">
              {step.number}
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              {step.title}
            </h3>

            <p className="mt-3 text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}