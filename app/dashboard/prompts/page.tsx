import Link from "next/link";
import { redirect } from "next/navigation";

import {
  ArrowDownAZ,
  ArrowRight,
  Clock3,
  Filter,
  Heart,
  Library,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import {
  PromptCard,
  PromptCardData,
} from "@/components/prompts/prompt-card";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";

type PromptsPageProps = {
  searchParams: Promise<{
    q?: string;
    favorite?: string;
    category?: string;
    sort?: string;
    error?: string;
  }>;
};

type PromptSort =
  | "newest"
  | "oldest"
  | "title";

function buildPromptsUrl({
  q,
  favorite,
  category,
  sort,
}: {
  q?: string;
  favorite?: string;
  category?: string;
  sort?: PromptSort;
}) {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (favorite === "true") {
    params.set("favorite", "true");
  }

  if (category && category !== "all") {
    params.set("category", category);
  }

  if (sort && sort !== "newest") {
    params.set("sort", sort);
  }

  const queryString = params.toString();

  return queryString
    ? `/dashboard/prompts?${queryString}`
    : "/dashboard/prompts";
}

export default async function PromptsPage({
  searchParams,
}: PromptsPageProps) {
  const {
    q = "",
    favorite = "",
    category = "all",
    sort = "newest",
    error,
  } = await searchParams;

  const selectedSort: PromptSort =
    sort === "oldest" || sort === "title"
      ? sort
      : "newest";

  const showFavorites =
    favorite === "true";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: allPrompts,
    error: allPromptsError,
  } = await supabase
    .from("prompts")
    .select(
      "id, title, content, category, favorite, created_at"
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const completePromptList =
    (allPrompts ?? []) as PromptCardData[];

  const categories = Array.from(
    new Set(
      completePromptList
        .map((prompt) =>
          prompt.category?.trim()
        )
        .filter(
          (
            promptCategory
          ): promptCategory is string =>
            Boolean(promptCategory)
        )
    )
  ).sort((first, second) =>
    first.localeCompare(second)
  );

  const cleanSearch = q
    .replace(/[,%()]/g, " ")
    .trim()
    .toLowerCase();

  let promptList =
    completePromptList.filter(
      (prompt) => {
        const promptCategory =
          prompt.category ?? "";

        const matchesSearch =
          !cleanSearch ||
          prompt.title
            .toLowerCase()
            .includes(cleanSearch) ||
          prompt.content
            .toLowerCase()
            .includes(cleanSearch) ||
          promptCategory
            .toLowerCase()
            .includes(cleanSearch);

        const matchesFavorite =
          !showFavorites ||
          prompt.favorite;

        const matchesCategory =
          category === "all" ||
          promptCategory === category;

        return (
          matchesSearch &&
          matchesFavorite &&
          matchesCategory
        );
      }
    );

  promptList = [...promptList].sort(
    (first, second) => {
      if (selectedSort === "title") {
        return first.title.localeCompare(
          second.title
        );
      }

      const firstDate = new Date(
        first.created_at
      ).getTime();

      const secondDate = new Date(
        second.created_at
      ).getTime();

      if (selectedSort === "oldest") {
        return firstDate - secondDate;
      }

      if (
        first.favorite !==
        second.favorite
      ) {
        return first.favorite ? -1 : 1;
      }

      return secondDate - firstDate;
    }
  );

  const totalPrompts =
    completePromptList.length;

  const favoriteCount =
    completePromptList.filter(
      (prompt) => prompt.favorite
    ).length;

  const pageError =
    error ||
    allPromptsError?.message ||
    null;

  const hasActiveFilters =
    Boolean(q) ||
    showFavorites ||
    category !== "all" ||
    selectedSort !== "newest";

  const allPromptsUrl = buildPromptsUrl({
    q,
    category:
      category === "all"
        ? undefined
        : category,
    sort: selectedSort,
  });

  const favoritesUrl =
    buildPromptsUrl({
      q,
      favorite: showFavorites
        ? undefined
        : "true",
      category:
        category === "all"
          ? undefined
          : category,
      sort: selectedSort,
    });

  return (
    <div className="relative isolate mx-auto w-full max-w-[1500px] pb-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 -z-10 size-[500px] rounded-full bg-violet-500/[0.09] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-56 -z-10 size-80 rounded-full bg-indigo-500/[0.06] blur-[120px]"
      />

      {/* Hero */}

      <section className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.24)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 size-[420px] rounded-full bg-violet-500/[0.14] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent"
        />

        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-200 backdrop-blur-xl">
              <Sparkles className="size-3.5" />
              Prompt workspace
            </div>

            <h1 className="mt-7 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              Your ideas,
              <span className="block text-slate-400">
                ready when you are.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
              Search, organize and return to
              the prompts behind your best AI
              work.
            </p>
          </div>

          <Link
            href="/dashboard/prompts/new"
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl border border-violet-300/20 bg-violet-500 px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-400 hover:shadow-[0_20px_50px_rgba(139,92,246,0.35)]"
          >
            <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
            New Prompt
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/15 p-5 backdrop-blur-xl transition duration-300 hover:border-violet-400/20 hover:bg-white/[0.035]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-200">
                <Library className="size-4" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Library
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white">
              {totalPrompts}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total prompts
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/15 p-5 backdrop-blur-xl transition duration-300 hover:border-rose-400/20 hover:bg-white/[0.035]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl border border-rose-400/15 bg-rose-500/10 text-rose-200">
                <Heart className="size-4" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Saved
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white">
              {favoriteCount}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Favorite prompts
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/15 p-5 backdrop-blur-xl transition duration-300 hover:border-indigo-400/20 hover:bg-white/[0.035]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-200">
                <Filter className="size-4" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Organized
              </span>
            </div>

            <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white">
              {categories.length}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Active categories
            </p>
          </div>
        </div>
      </section>

      {pageError ? (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-200 backdrop-blur-xl">
          {pageError}
        </div>
      ) : null}

      {/* Search and filters */}

      <section className="relative mt-6 overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/35 to-transparent"
        />

        <form
          method="get"
          className="relative grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_180px_auto]"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

            <Input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search titles, content or categories..."
              className="h-12 rounded-2xl border-white/[0.08] bg-black/20 pl-11 text-slate-100 shadow-none placeholder:text-slate-600 focus-visible:border-violet-400/30 focus-visible:ring-violet-500/15"
            />
          </div>

          <select
            name="category"
            defaultValue={category}
            aria-label="Filter by category"
            className="h-12 rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-slate-300 outline-none transition focus:border-violet-400/30 focus:ring-4 focus:ring-violet-500/10"
          >
            <option value="all">
              All categories
            </option>

            {categories.map(
              (promptCategory) => (
                <option
                  key={promptCategory}
                  value={promptCategory}
                >
                  {promptCategory}
                </option>
              )
            )}
          </select>

          <select
            name="sort"
            defaultValue={selectedSort}
            aria-label="Sort prompts"
            className="h-12 rounded-2xl border border-white/[0.08] bg-black/20 px-4 text-sm text-slate-300 outline-none transition focus:border-violet-400/30 focus:ring-4 focus:ring-violet-500/10"
          >
            <option value="newest">
              Newest first
            </option>

            <option value="oldest">
              Oldest first
            </option>

            <option value="title">
              Title A–Z
            </option>
          </select>

          {showFavorites ? (
            <input
              type="hidden"
              name="favorite"
              value="true"
            />
          ) : null}

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white px-5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-100"
          >
            <Search className="size-4" />
            Apply
          </button>
        </form>

        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={allPromptsUrl}
            className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all duration-300 ${
              !showFavorites
                ? "border-violet-400/20 bg-violet-500/10 text-violet-200"
                : "border-white/[0.07] bg-white/[0.02] text-slate-500 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-slate-200"
            }`}
          >
            <Library className="size-4" />
            All prompts
          </Link>

          <Link
            href={favoritesUrl}
            className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all duration-300 ${
              showFavorites
                ? "border-rose-400/20 bg-rose-500/10 text-rose-200"
                : "border-white/[0.07] bg-white/[0.02] text-slate-500 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-slate-200"
            }`}
          >
            <Heart
              className={`size-4 ${
                showFavorites
                  ? "fill-current"
                  : ""
              }`}
            />
            Favorites
          </Link>

          {selectedSort === "title" ? (
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-sm text-slate-500">
              <ArrowDownAZ className="size-4" />
              A–Z
            </span>
          ) : null}

          {selectedSort === "oldest" ? (
            <span className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-sm text-slate-500">
              <Clock3 className="size-4" />
              Oldest
            </span>
          ) : null}

          {hasActiveFilters ? (
            <Link
              href="/dashboard/prompts"
              className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-200"
            >
              <X className="size-4" />
              Clear filters
            </Link>
          ) : null}
        </div>
      </section>

      {/* Results heading */}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/70">
            Your workspace
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-slate-100">
            {showFavorites
              ? "Favorite prompts"
              : "All prompts"}
          </h2>

          <p className="mt-1.5 text-sm text-slate-500">
            Showing {promptList.length} of{" "}
            {totalPrompts}{" "}
            {totalPrompts === 1
              ? "prompt"
              : "prompts"}
          </p>
        </div>

        {q ? (
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-slate-500">
            Results for{" "}
            <span className="font-medium text-slate-200">
              “{q}”
            </span>
          </div>
        ) : null}
      </div>

      {/* Prompt grid */}

      {promptList.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {promptList.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
            />
          ))}
        </div>
      ) : (
        <Card className="relative mt-6 overflow-hidden rounded-[30px] border-dashed border-white/[0.1] bg-white/[0.02] py-0 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[110px]"
          />

          <CardContent className="relative flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-[22px] border border-violet-400/15 bg-violet-500/10 text-violet-200 shadow-[0_20px_50px_rgba(139,92,246,0.12)]">
              {showFavorites ? (
                <Heart className="size-7" />
              ) : (
                <Library className="size-7" />
              )}
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-slate-100">
              {showFavorites
                ? "No favorite prompts yet"
                : hasActiveFilters
                  ? "No matching prompts"
                  : "Your library is ready"}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              {showFavorites
                ? "Favorite a prompt and it will appear here for faster access."
                : hasActiveFilters
                  ? "Try adjusting your search, category or sorting options."
                  : "Create your first reusable prompt and start building your personal AI workspace."}
            </p>

            {hasActiveFilters ? (
              <Link
                href="/dashboard/prompts"
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-5 text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-violet-500/10"
              >
                <X className="size-4" />
                Clear filters
              </Link>
            ) : (
              <Link
                href="/dashboard/prompts/new"
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-400"
              >
                <Plus className="size-4" />
                Create your first prompt
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}