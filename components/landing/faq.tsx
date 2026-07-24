export function FAQSection() {
  const faqs = [
    {
      q: "Can I use PromptVault for free?",
      a: "Yes. The Free plan includes everything you need to start organizing your prompts.",
    },
    {
      q: "Which AI models are supported?",
      a: "PromptVault is model-agnostic. Organize prompts for ChatGPT, Gemini, Claude, Grok, and more.",
    },
    {
      q: "Can I cancel Pro anytime?",
      a: "Absolutely. You can manage or cancel your subscription whenever you want.",
    },
  ];

  return (
    <section
      id="faq"
      className="mx-auto max-w-4xl px-6 py-28"
    >
      <h2 className="text-center text-4xl font-bold text-white">
        Frequently asked questions
      </h2>

      <div className="mt-14 space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="font-semibold text-white">
              {faq.q}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}