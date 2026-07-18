import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import {
  BookOpen,
  Heart,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type RecentPrompt = {
  id: string;
  title: string;
  category: string;
  favorite: boolean;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [
    promptCountResult,
    favoriteCountResult,
    recentPromptsResult,
  ] = await Promise.all([
    supabase
      .from("prompts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id),

    supabase
      .from("prompts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("favorite", true),

    supabase
      .from("prompts")
      .select(
        "id, title, category, favorite, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(5),
  ]);

  const recentPrompts =
    (recentPromptsResult.data ??
      []) as RecentPrompt[];

  const stats = [
    {
      title: "Saved prompts",
      value:
        promptCountResult.count ?? 0,
      icon: BookOpen,
    },
    {
      title: "Favorites",
      value:
        favoriteCountResult.count ?? 0,
      icon: Heart,
    },
    {
      title: "AI optimizations",
      value: 0,
      icon: Sparkles,
    },
  ];

  const firstName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">
            PromptVault V2
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create, organize, and improve
            your best AI prompts.
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

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>

                <Icon className="size-5 text-primary" />
              </CardHeader>

              <CardContent>
                <p className="text-4xl font-bold">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            Recent prompts
          </CardTitle>

          <Link
            href="/dashboard/prompts"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </CardHeader>

        <CardContent>
          {recentPrompts.length > 0 ? (
            <div className="divide-y rounded-xl border">
              {recentPrompts.map(
                (prompt) => (
                  <Link
                    key={prompt.id}
                    href={`/dashboard/prompts/${prompt.id}/edit`}
                    className="flex items-center justify-between gap-4 p-4 transition hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {prompt.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {prompt.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {prompt.favorite ? (
                        <Heart className="size-4 fill-current text-red-500" />
                      ) : null}

                      <p className="hidden text-xs text-muted-foreground sm:block">
                        {new Intl.DateTimeFormat(
                          "en",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        ).format(
                          new Date(
                            prompt.created_at
                          )
                        )}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="size-7 text-primary" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                No prompts yet
              </h2>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Create your first prompt and
                start building your personal
                AI prompt library.
              </p>

              <Link
                href="/dashboard/prompts/new"
                className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Create your first prompt
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}