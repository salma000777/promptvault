import PromptGrid from "@/components/dashboard/prompts/PromptGrid";
import PromptSearch from "@/components/dashboard/prompts/PromptSearch";
import Link from "next/link";

export default function PromptsPage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Prompt Library
          </h1>

          <p className="mt-2 text-slate-400">
            Browse and manage all your prompts.
          </p>
        </div>

        <Link
          href="/prompts/new"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
        >
          + Create Prompt
        </Link>
      </div>

      <PromptSearch />

      <PromptGrid />
    </main>
  );
}