import HealthScore from "./HealthScore";

export default function PromptPreview() {
  return (
    <div className="space-y-6">
      <HealthScore />

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xl font-semibold">
          AI Suggestions
        </h2>

        <div className="mt-6 space-y-4 text-slate-400">
          <p>• Add more context.</p>
          <p>• Specify the output format.</p>
          <p>• Define the desired tone.</p>
          <p>• Include an example.</p>
        </div>
      </div>
    </div>
  );
}