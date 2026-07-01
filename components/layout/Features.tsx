const features = [
  {
    title: "Organize Everything",
    description:
      "Store all your AI prompts in folders with tags and favorites so you never lose them again.",
  },
  {
    title: "Smart Search",
    description:
      "Instantly search prompts by title, content, tags, or description.",
  },
  {
    title: "Prompt Variables",
    description:
      "Create reusable templates using variables like {{product}} or {{company}}.",
  },
  {
    title: "AI Improve",
    description:
      "Let AI rewrite and optimize your prompts with one click.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Everything you need</h2>

        <p className="mt-4 text-slate-400">
          Built for people who use AI every day.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition hover:border-indigo-500"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>

            <p className="mt-3 text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}