const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Up to 50 prompts",
      "Folders",
      "Search",
      "Favorites",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    features: [
      "Unlimited prompts",
      "AI Prompt Improve",
      "Variables",
      "Priority support",
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Simple pricing</h2>
        <p className="mt-4 text-slate-400">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-8 ${
              plan.highlighted
                ? "border-indigo-500 bg-slate-900"
                : "border-slate-800 bg-slate-900/40"
            }`}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <p className="mt-4 text-5xl font-bold">
              {plan.price}
              <span className="text-lg text-slate-400">/month</span>
            </p>

            <ul className="mt-8 space-y-3 text-slate-300">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <button className="mt-10 w-full rounded-xl bg-indigo-600 py-3 font-medium hover:bg-indigo-500">
              {plan.name === "Free" ? "Start Free" : "Go Pro"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}