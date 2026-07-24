import Link from "next/link";

import {
  ArrowRight,
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

import { CollectionManager } from "@/components/collections/collection-manager";
import { StatCard } from "@/components/dashboard/stat-card";
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

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Workspace
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight text-white">
            {greeting} 👋
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            Welcome back to PromptVault.
            Manage your prompts, organize collections
            and optimize ideas with AI.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/prompts/new">
            <Button size="lg">
              <Plus className="size-4" />
              New Prompt
            </Button>
          </Link>

          <Link href="/dashboard/studio">
            <Button
              size="lg"
              variant="outline"
            >
              <Sparkles className="size-4" />
              AI Studio
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Prompts"
          value={stats.totalPrompts}
          description="Saved in your vault"
          icon={FileText}
        />

        <StatCard
          title="Favorites"
          value={stats.favoritePrompts}
          description="Pinned prompts"
          icon={Star}
        />

        <StatCard
          title="Collections"
          value={stats.collections}
          description="Organized workspaces"
          icon={Folder}
        />

        <StatCard
          title="Updated"
          value={stats.recentPrompts}
          description="Last 7 days"
          icon={Clock3}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.5fr]">
        <CollectionManager
          collections={collections}
        />

        <Card className="border-slate-800 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-white">
              Quick Actions
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link href="/dashboard/prompts">
              <Button
                className="w-full justify-between"
                variant="outline"
              >
                Browse Prompt Library

                <ArrowRight className="size-4" />
              </Button>
            </Link>

            <Link href="/dashboard/prompts/new">
              <Button
                className="w-full justify-between"
                variant="outline"
              >
                Create Prompt

                <Plus className="size-4" />
              </Button>
            </Link>

            <Link href="/dashboard/studio">
              <Button
                className="w-full justify-between"
                variant="outline"
              >
                AI Studio

                <Sparkles className="size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}