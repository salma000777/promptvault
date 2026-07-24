"use client";

import {
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

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-800 bg-slate-950 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-5 py-5">
        <Logo href size="sm" />
      </div>

      <nav className="flex-1 space-y-1.5 p-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
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
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon
                className={`size-5 transition ${
                  active
                    ? "text-primary-foreground"
                    : "text-slate-500 group-hover:text-white"
                }`}
              />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                PromptVault Pro
              </p>

              <p className="text-xs text-slate-500">
                Unlock the full workspace
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            Get AI optimization, advanced search and future premium tools.
          </p>

          <Link
            href="/pricing"
            className="mt-4 flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            View plans
          </Link>
        </div>
      </div>
    </aside>
  );
}