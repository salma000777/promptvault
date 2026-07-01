export default function HealthScore() {
  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
      <p className="text-sm uppercase tracking-widest text-emerald-300">
        Prompt Health
      </p>

      <h2 className="mt-3 text-5xl font-bold text-white">
        96
      </h2>

      <p className="mt-3 text-emerald-200">
        Excellent structure.
      </p>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-[96%] rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}