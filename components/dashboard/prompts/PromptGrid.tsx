import PromptCard from "./PromptCard";
import { getPrompts } from "@/actions/get-prompts";

export default async function PromptGrid() {
  const prompts = await getPrompts();

  if (!prompts || prompts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h2 className="text-2xl font-bold">
          No prompts yet
        </h2>

        <p className="mt-3 text-slate-400">
          Create your first prompt.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          title={prompt.title}
          category={prompt.category}
        />
      ))}
    </div>
  );
}