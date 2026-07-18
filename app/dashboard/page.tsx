import Link from "next/link";

import {
  Clock3,
  FileText,
  Folder,
  Plus,
  Sparkles,
  Star,
} from "lucide-react";

import {
  getCollections,
  getDashboardStats,
} from "@/lib/dashboard";

import { StatCard } from "@/components/dashboard/stat-card";
import { CollectionManager } from "@/components/collections/collection-manager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const [stats, collections] =
    await Promise.all([
      getDashboardStats(),
      getCollections(),
    ]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">
            Workspace overview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Manage your prompt library,
            organize collections, and improve
            prompts with AI.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/prompts/new">
            <Button>
              <Plus className="size-4" />
              New prompt
            </Button>
          </Link>

          <Link href="/dashboard/studio">
            <Button variant="outline">
              <Sparkles className="size-4" />
              Open AI Studio
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total prompts"
          value={stats.totalPrompts}
          description="Saved in your library"
          icon={FileText}
        />

        <StatCard
          title="Favorites"
          value={stats.favoritePrompts}
          description="Your starred prompts"
          icon={Star}
        />

        <StatCard
          title="Collections"
          value={stats.collections}
          description="Organized workspaces"
          icon={Folder}
        />

        <StatCard
          title="Recently updated"
          value={stats.recentPrompts}
          description="Changed in the last 7 days"
          icon={Clock3}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <CollectionManager
          collections={collections}
        />

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Quick actions
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link
              href="/dashboard/prompts"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <FileText className="size-4" />
                Browse prompt library
              </Button>
            </Link>

            <Link
              href="/dashboard/prompts/new"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Plus className="size-4" />
                Create a prompt
              </Button>
            </Link>

            <Link
              href="/dashboard/studio"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Sparkles className="size-4" />
                Optimize with Gemini
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}