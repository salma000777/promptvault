import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Edit3,
  Heart,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  deletePrompt,
  toggleFavorite,
} from "@/actions/prompts";
import { Button } from "@/components/ui/button";

export type PromptCardData = {
  id: string;
  title: string;
  content: string;
  category: string;
  favorite: boolean;
  created_at: string;
};

type PromptCardProps = {
  prompt: PromptCardData;
};

export function PromptCard({
  prompt,
}: PromptCardProps) {
  const favoriteAction =
    toggleFavorite.bind(
      null,
      prompt.id,
      !prompt.favorite
    );

  const deleteAction =
    deletePrompt.bind(null, prompt.id);

  const createdDate =
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(
      new Date(prompt.created_at)
    );

  const category =
    prompt.category?.trim() ||
    "Uncategorized";

  return (
    <article className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-violet-400/20 hover:shadow-[0_32px_90px_rgba(0,0,0,0.28)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-violet-500/0 blur-[90px] transition-all duration-500 group-hover:bg-violet-500/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4 p-5 pb-0">
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-200">
            <Sparkles className="size-3 shrink-0" />

            <span className="truncate">
              {category}
            </span>
          </div>
        </div>

        <form action={favoriteAction}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            title={
              prompt.favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-label={
              prompt.favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className={`size-10 shrink-0 rounded-2xl border transition-all duration-300 ${
              prompt.favorite
                ? "border-rose-400/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/15 hover:text-rose-200"
                : "border-white/[0.06] bg-white/[0.025] text-slate-500 hover:border-rose-400/20 hover:bg-rose-500/10 hover:text-rose-300"
            }`}
          >
            <Heart
              className={`size-4.5 transition-transform duration-300 hover:scale-110 ${
                prompt.favorite
                  ? "fill-current"
                  : ""
              }`}
            />
          </Button>
        </form>
      </div>

      <div className="relative flex flex-1 flex-col p-5 pt-6">
        <Link
          href={`/dashboard/prompts/${prompt.id}/edit`}
          className="group/title block"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.035em] text-slate-100 transition-colors duration-300 group-hover/title:text-white">
              {prompt.title}
            </h2>

            <ArrowUpRight className="mt-1 size-4 shrink-0 text-slate-700 transition-all duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-violet-300" />
          </div>
        </Link>

        <div className="mt-5 flex-1 rounded-[20px] border border-white/[0.05] bg-black/15 p-4">
          <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-6 text-slate-500">
            {prompt.content}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-600">
            <CalendarDays className="size-3.5 shrink-0" />

            <span className="truncate">
              {createdDate}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/dashboard/prompts/${prompt.id}/edit`}
              title="Edit prompt"
              aria-label={`Edit ${prompt.title}`}
              className="inline-flex size-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-violet-500/10 hover:text-violet-200"
            >
              <Edit3 className="size-4" />
            </Link>

            <form action={deleteAction}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                title="Delete prompt"
                aria-label={`Delete ${prompt.title}`}
                className="size-9 rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}