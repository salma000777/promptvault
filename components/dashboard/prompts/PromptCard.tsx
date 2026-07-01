type PromptCardProps = {
  title: string;
  category: string;
};

export default function PromptCard({
  title,
  category,
}: PromptCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-indigo-500">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <button>⭐</button>
      </div>

      <span className="mt-4 inline-block rounded-full bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300">
        {category}
      </span>

      <div className="mt-6 flex gap-3">
        <button className="rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700">
          Edit
        </button>

        <button className="rounded-xl bg-red-600 px-4 py-2 hover:bg-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}