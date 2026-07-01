const faqs = [
  {
    question: "Can I use PromptVault with ChatGPT?",
    answer: "Yes. PromptVault works with any AI tool because it stores your prompts, not the conversations.",
  },
  {
    question: "Can I organize prompts into folders?",
    answer: "Yes. You can create folders, tags, and favorites to keep everything organized.",
  },
  {
    question: "Can AI improve my prompts?",
    answer: "Yes. Pro users can rewrite and optimize prompts with one click.",
  },
];

export default function FAQ() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Frequently asked questions</h2>
      </div>

      <div className="mt-16 space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <h3 className="text-xl font-semibold">{faq.question}</h3>
            <p className="mt-3 text-slate-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}