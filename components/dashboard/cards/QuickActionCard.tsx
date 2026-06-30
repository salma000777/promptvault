type QuickActionCardProps = {
  title: string;
  description: string;
};

export default function QuickActionCard({
  title,
  description,
}: QuickActionCardProps) {
  return (
    <button className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-left transition hover:border-indigo-500 hover:bg-slate-900">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-slate-400">
        {description}
      </p>
    </button>
  );
}