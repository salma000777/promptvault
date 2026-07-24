import {
  FolderKanban,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

const features = [
  {
    title: "Organize",
    description:
      "Keep prompts neatly organized inside collections.",
    icon: FolderKanban,
  },
  {
    title: "Lightning Search",
    description:
      "Find any prompt instantly with powerful search.",
    icon: Search,
  },
  {
    title: "AI Optimization",
    description:
      "Improve prompts with Gemini in one click.",
    icon: Sparkles,
  },
  {
    title: "Favorites",
    description:
      "Pin your best prompts for quick access.",
    icon: Star,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-white">
          Everything you need.
        </h2>

        <p className="mt-4 text-slate-400">
          Built for creators, developers and AI power users.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-primary/40"
          >
            <feature.icon className="mb-6 size-8 text-primary" />

            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}