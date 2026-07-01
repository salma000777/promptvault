import PromptGrid from "@/components/dashboard/prompts/PromptGrid";
import PromptSearch from "@/components/dashboard/prompts/PromptSearch";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Prompt Library
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your prompts in one place.
          </p>
        </div>

        <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500">
          + Create Prompt
        </button>
      </div>

      <PromptSearch />

      <PromptGrid />
    </div>
  );
}