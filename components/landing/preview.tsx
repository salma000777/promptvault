import {
  FileText,
  Folder,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

export function PreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Preview
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white">
          Your AI workspace.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Organize prompts, optimize them with AI and keep everything
          searchable from one beautiful workspace.
        </p>
      </div>

      <div className="mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="border-b border-slate-800 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                PromptVault Dashboard
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                Good afternoon 👋
              </h3>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-400">
              Search prompts...
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <FileText className="mb-4 text-primary" />
            <p className="text-sm text-slate-500">
              Prompts
            </p>

            <h4 className="mt-2 text-3xl font-bold text-white">
              127
            </h4>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <Folder className="mb-4 text-primary" />
            <p className="text-sm text-slate-500">
              Collections
            </p>

            <h4 className="mt-2 text-3xl font-bold text-white">
              14
            </h4>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <Star className="mb-4 text-primary" />
            <p className="text-sm text-slate-500">
              Favorites
            </p>

            <h4 className="mt-2 text-3xl font-bold text-white">
              26
            </h4>
          </div>
        </div>

        <div className="grid gap-8 border-t border-slate-800 p-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="mb-5 flex items-center gap-2">
              <Search className="size-4 text-primary" />
              <span className="font-medium text-white">
                Recent Prompts
              </span>
            </div>

            <div className="space-y-3">
              {[
                "Medical Flashcards",
                "Startup Landing Page",
                "Marketing Campaign",
                "System Prompt",
              ].map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-xl border border-slate-800 px-4 py-3 text-slate-300"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span className="font-medium text-white">
                AI Studio
              </span>
            </div>

            <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6">
              <p className="text-lg font-semibold text-white">
                Optimize any prompt
              </p>

              <p className="mt-3 text-slate-400">
                Rewrite prompts with Gemini, improve clarity,
                increase quality and save the new version instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}