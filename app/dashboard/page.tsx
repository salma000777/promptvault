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
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count: promptCount } = await supabase
    .from("prompts")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user?.id ?? "");

  const { count: favoriteCount } = await supabase
    .from("prompts")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user?.id ?? "")
    .eq("favorite", true);

  const stats = [
    {
      title: "Saved prompts",
      value: promptCount ?? 0,
      icon: BookOpen,
    },
    {
      title: "Favorites",
      value: favoriteCount ?? 0,
      icon: Heart,
    },
    {
      title: "AI optimizations",
      value: 0,
      icon: Sparkles,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-semibold text-primary">
          PromptVault V2
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back
        </h1>

        <p className="mt-2 text-muted-foreground">
          Create, organize and improve your best AI prompts.
        </p>
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
        <CardHeader>
          <CardTitle>Recent prompts</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="size-7 text-primary" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No prompts yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Create your first prompt and start building your personal AI prompt library.
            </p>

            <Link
              href="/dashboard/prompts/new"
              className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              Create your first prompt
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}