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
import {
  ArrowDownAZ,
  Clock3,
  Heart,
  Library,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
        const matchesSearch =
          !cleanSearch ||
          prompt.title
            .toLowerCase()
            .includes(cleanSearch) ||
          prompt.content
            .toLowerCase()
            .includes(cleanSearch) ||
          prompt.category
            .toLowerCase()
            .includes(cleanSearch);

        const matchesFavorite =
          !showFavorites ||
          prompt.favorite;

        const matchesCategory =
          category === "all" ||
          prompt.category === category;

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
    <div className="mx-auto max-w-7xl">
      <section className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
              <Sparkles className="size-3.5" />
              Your AI prompt workspace
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Prompt Library
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Search, organize, duplicate,
              and favorite the prompts you
              use most.
            </p>
          </div>

          <Link
            href="/dashboard/prompts/new"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            <Plus className="size-4" />
            New Prompt
          </Link>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Library className="size-4" />
              Total prompts
            </div>

            <p className="mt-2 text-2xl font-bold">
              {totalPrompts}
            </p>
          </div>

          <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="size-4" />
              Favorites
            </div>

            <p className="mt-2 text-2xl font-bold">
              {favoriteCount}
            </p>
          </div>

          <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4" />
              Categories
            </div>

            <p className="mt-2 text-2xl font-bold">
              {categories.length}
            </p>
          </div>
        </div>
      </section>

      {pageError ? (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {pageError}
        </div>
      ) : null}

      <section className="mt-8 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
        <form
          method="get"
          className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_170px_auto]"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search prompts..."
              className="h-11 rounded-xl pl-10"
            />
          </div>

          <select
            name="category"
            defaultValue={category}
            className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
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
            className="h-11 rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
          >
            <Search className="size-4" />
            Apply
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={allPromptsUrl}
            className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${
              !showFavorites
                ? "border-primary bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Library className="size-4" />
            All prompts
          </Link>

          <Link
            href={favoritesUrl}
            className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${
              showFavorites
                ? "border-primary bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
            <span className="inline-flex h-9 items-center gap-2 rounded-lg border bg-muted/50 px-3 text-sm text-muted-foreground">
              <ArrowDownAZ className="size-4" />
              A–Z
            </span>
          ) : null}

          {hasActiveFilters ? (
            <Link
              href="/dashboard/prompts"
              className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
              Clear filters
            </Link>
          ) : null}
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {showFavorites
              ? "Favorite prompts"
              : "All prompts"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {promptList.length} of{" "}
            {totalPrompts}{" "}
            {totalPrompts === 1
              ? "prompt"
              : "prompts"}
          </p>
        </div>

        {q ? (
          <p className="text-sm text-muted-foreground">
            Results for{" "}
            <span className="font-medium text-foreground">
              “{q}”
            </span>
          </p>
        ) : null}
      </div>

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
        <Card className="mt-6 rounded-3xl border-dashed">
          <CardContent className="flex min-h-96 flex-col items-center justify-center p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              {showFavorites ? (
                <Heart className="size-8 text-primary" />
              ) : (
                <Library className="size-8 text-primary" />
              )}
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {showFavorites
                ? "No favorite prompts yet"
                : hasActiveFilters
                  ? "No matching prompts"
                  : "Your library is empty"}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {showFavorites
                ? "Tap the heart on any prompt to save it here."
                : hasActiveFilters
                  ? "Try changing or clearing your current filters."
                  : "Create your first reusable prompt and it will appear here."}
            </p>

            {hasActiveFilters ? (
              <Link
                href="/dashboard/prompts"
                className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition hover:bg-muted"
              >
                <X className="size-4" />
                Clear filters
              </Link>
            ) : (
              <Link
                href="/dashboard/prompts/new"
                className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
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