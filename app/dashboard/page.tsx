import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  ChevronRight,
  Clock3,
  FileText,
  Folder,
  Plus,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

import {
  getCollections,
  getDashboardStats,
} from "@/lib/dashboard";

import { CollectionManager } from "@/components/collections/collection-manager";
import { DashboardAmbience } from "@/components/dashboard/dashboard-ambience";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quickActions = [
  {
    title: "Browse Prompt Library",
    description: "Explore all your saved prompts",
    href: "/dashboard/prompts",
    icon: BookOpen,
    iconClassName:
      "bg-violet-500/10 text-violet-300 ring-violet-500/20",
  },
  {
    title: "Create Prompt",
    description: "Start building from scratch",
    href: "/dashboard/prompts/new",
    icon: Plus,
    iconClassName:
      "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
  },
  {
    title: "AI Studio",
    description: "Generate and optimize with AI",
    href: "/dashboard/studio",
    icon: WandSparkles,
    iconClassName:
      "bg-amber-500/10 text-amber-300 ring-amber-500/20",
  },
];

const heroActions = [
  {
    title: "Create Prompt",
    subtitle: "Start from a blank canvas",
    href: "/dashboard/prompts/new",
    icon: Plus,
  },
  {
    title: "Improve Prompt",
    subtitle: "Refine it with AI",
    href: "/dashboard/studio",
    icon: Brain,
  },
  {
    title: "Browse Library",
    subtitle: "Return to your work",
    href: "/dashboard/prompts",
    icon: BookOpen,
  },
  {
    title: "Open AI Studio",
    subtitle: "Generate something new",
    href: "/dashboard/studio",
    icon: Sparkles,
  },
];

const heroMessages = [
  "What are we building today?",
  "Let’s create something remarkable.",
  "Your ideas deserve better prompts.",
  "Ready to build your next workflow?",
];

export default async function DashboardPage() {
  const [stats, collections] = await Promise.all([
    getDashboardStats(),
    getCollections(),
  ]);

  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
        ? "Good afternoon"
        : "Good evening";

  const heroMessage =
    heroMessages[now.getDate() % heroMessages.length];

  return (
    <div className="relative isolate min-h-full overflow-hidden">
      <DashboardAmbience />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] space-y-8 pb-12">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.24)] sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-28 size-[420px] rounded-full bg-violet-500/15 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/3 top-0 size-64 rounded-full bg-indigo-500/10 blur-[90px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent"
          />

          <div className="relative grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200 backdrop-blur-xl">
                <Sparkles className="size-3.5" />
                AI workspace
              </div>

              <h1 className="mt-8 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                {greeting}.
              </h1>

              <p className="mt-5 max-w-2xl text-2xl font-medium tracking-[-0.025em] text-slate-300">
                {heroMessage}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                Build, refine and organize the prompts behind your best AI
                workflows.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {heroActions.map((action, index) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="group relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/[0.045] hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-violet-500/0 blur-3xl transition-all duration-500 group-hover:bg-violet-500/15"
                      />

                      <div className="relative flex items-start justify-between gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/15 to-white/[0.025] text-violet-200 transition-all duration-500 group-hover:scale-105 group-hover:border-violet-300/25 group-hover:bg-violet-500/20">
                          <Icon className="size-5 transition-transform duration-500 group-hover:rotate-3" />
                        </div>

                        <div className="flex size-8 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.025] text-slate-600 transition-all duration-300 group-hover:border-violet-400/20 group-hover:text-violet-200">
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <div className="relative mt-8">
                        <p className="text-base font-semibold tracking-[-0.02em] text-slate-100">
                          {action.title}
                        </p>

                        <p className="mt-1.5 text-sm text-slate-500">
                          {action.subtitle}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-4 right-5 text-[10px] font-medium tracking-[0.18em] text-white/[0.025] transition-colors duration-500 group-hover:text-violet-200/10"
                      >
                        0{index + 1}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* AI status */}

            <aside className="relative">
              <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/20 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl xl:sticky xl:top-28">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-violet-500/15 blur-[80px]"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent"
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        AI status
                      </p>

                      <h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-slate-100">
                        PromptVault AI
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5">
                      <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />

                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                        Online
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[22px] border border-white/[0.06] bg-white/[0.025] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/10 text-violet-200">
                        <Activity className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-100">
                          Systems operational
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Ready for generation and optimization
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.025] p-4">
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                        {stats.recentPrompts}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Updated this week
                      </p>
                    </div>

                    <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.025] p-4">
                      <p className="text-2xl font-semibold tracking-[-0.04em] text-white">
                        {stats.favoritePrompts}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Favorite prompts
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/studio"
                    className="group mt-6 flex items-center justify-between rounded-[20px] border border-violet-400/15 bg-violet-500/[0.08] px-4 py-3.5 transition-all duration-300 hover:border-violet-400/25 hover:bg-violet-500/[0.13]"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="size-4 text-violet-300" />

                      <span className="text-sm font-medium text-violet-100">
                        Open AI Studio
                      </span>
                    </div>

                    <ChevronRight className="size-4 text-violet-300 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Statistics */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

        {/* Collections and actions */}

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            <CollectionManager collections={collections} />
          </div>

          <Card className="relative overflow-hidden rounded-[28px] border-white/[0.07] bg-white/[0.03] py-0 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-16 size-44 rounded-full bg-violet-500/10 blur-[80px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent"
            />

            <CardHeader className="relative px-5 pb-3 pt-5">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-slate-100">
                  <Sparkles className="size-4 text-violet-300" />
                  Quick Actions
                </CardTitle>

                <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Workspace
                </span>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-3 px-4 pb-4">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group flex items-center gap-3 rounded-[20px] border border-white/[0.06] bg-white/[0.025] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-violet-500/[0.055]"
                  >
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${action.iconClassName}`}
                    >
                      <Icon className="size-5 transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-100">
                        {action.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {action.description}
                      </p>
                    </div>

                    <ArrowRight className="size-4 shrink-0 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-violet-300" />
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}