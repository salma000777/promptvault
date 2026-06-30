type RecentPromptCardProps = {
  title: string;
  category: string;
};

export default function RecentPromptCard({
  title,
  category,
}: RecentPromptCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <div>
        <h4 className="font-semibold">
          {title}
        </h4>

        <p className="text-sm text-slate-400">
          {category}
        </p>
      </div>

      <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700">
        Open
      </button>
    </div>
  );
}