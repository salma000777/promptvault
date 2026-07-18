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
  Library,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type PromptsPageProps = {
  searchParams: Promise<{
    q?: string;
    error?: string;
  }>;
};

export default async function PromptsPage({
  searchParams,
}: PromptsPageProps) {
  const { q = "", error } =
    await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let query = supabase
    .from("prompts")
    .select(
      "id, title, content, category, favorite, created_at"
    )
    .eq("user_id", user.id)
    .order("favorite", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  const cleanSearch = q
    .replace(/[,%()]/g, " ")
    .trim();

  if (cleanSearch) {
    query = query.or(
      `title.ilike.%${cleanSearch}%,content.ilike.%${cleanSearch}%,category.ilike.%${cleanSearch}%`
    );
  }

  const {
    data: prompts,
    error: promptsError,
  } = await query;

  const promptList =
    (prompts ?? []) as PromptCardData[];

  const pageError =
    error ||
    promptsError?.message ||
    null;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">
            Your workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Prompt Library
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create, search, favorite, and
            organize your best prompts.
          </p>
        </div>

        <Link
          href="/dashboard/prompts/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New Prompt
        </Link>
      </div>

      {pageError ? (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {pageError}
        </div>
      ) : null}

      <form
        method="get"
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search by title, category, or prompt content..."
            className="pl-9"
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-lg border px-5 text-sm font-medium transition hover:bg-muted"
        >
          Search
        </button>

        {q ? (
          <Link
            href="/dashboard/prompts"
            className="inline-flex h-10 items-center justify-center rounded-lg border px-5 text-sm font-medium transition hover:bg-muted"
          >
            Clear
          </Link>
        ) : null}
      </form>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {promptList.length}{" "}
          {promptList.length === 1
            ? "prompt"
            : "prompts"}
        </p>

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
        <Card className="mt-6">
          <CardContent className="flex min-h-96 flex-col items-center justify-center p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Library className="size-8 text-primary" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {q
                ? "No matching prompts"
                : "Your library is empty"}
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {q
                ? "Try a different search term or clear the current search."
                : "Create your first reusable prompt and it will appear here."}
            </p>

            {q ? (
              <Link
                href="/dashboard/prompts"
                className="mt-6 inline-flex rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Clear search
              </Link>
            ) : (
              <Link
                href="/dashboard/prompts/new"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
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