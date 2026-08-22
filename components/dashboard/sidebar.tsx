"use client";

import {
  Folder,
  LayoutDashboard,
  Library,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/brand/logo";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Prompt Library",
    href: "/dashboard/prompts",
    icon: Library,
  },
  {
    name: "Collections",
    href: "/dashboard/collections",
    icon: Folder,
  },
  {
    name: "AI Studio",
    href: "/dashboard/studio",
    icon: Sparkles,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar({
  isPro,
}: {
  isPro: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/[0.06] bg-[#0b0d1a] lg:flex lg:flex-col">
      <div className="border-b border-white/[0.06] px-5 py-5">
        <Logo href size="sm" />
      </div>

      <nav className="flex-1 space-y-1.5 p-4">
        <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border border-violet-400/20 bg-violet-500/10 text-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(76,29,149,0.08)]"
                  : "border border-transparent text-slate-400 hover:border-white/[0.04] hover:bg-white/[0.035] hover:text-slate-100"
              }`}
            >
              {active ? (
                <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-violet-400" />
              ) : null}

              <Icon
                className={`size-[18px] shrink-0 transition-colors ${
                  active
                    ? "text-violet-300"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-[linear-gradient(145deg,rgba(139,92,246,0.14),rgba(255,255,255,0.025))] p-4 shadow-xl shadow-violet-950/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-violet-500/15 blur-2xl"
          />

          <div className="relative flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-500/15 text-violet-200">
              <Sparkles className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-100">
                {isPro ? "PromptVault Pro" : "PromptVault Pro"}
              </p>

              <p className="text-xs text-violet-300/80">
                {isPro ? "Your Pro workspace" : "Unlock more from your workspace"}
              </p>
            </div>
          </div>

          <p className="relative mt-4 text-xs leading-5 text-slate-400">
            {isPro
              ? "AI prompt optimization is unlocked."
              : "Unlock AI prompt optimization with Pro."}
          </p>

          {isPro ? (
            <div className="relative mt-4 flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-500/[0.06] px-4 text-xs font-semibold text-emerald-300">
              <Sparkles className="size-3.5" />
              Pro unlocked
            </div>
          ) : (
            <Link
              href="/pricing"
              className="relative mt-4 flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 text-xs font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:opacity-90"
            >
              Upgrade to Pro
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}