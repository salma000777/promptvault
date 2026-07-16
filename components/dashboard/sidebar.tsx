"use client";

import {
  LayoutDashboard,
  Library,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="hidden min-h-screen w-72 shrink-0 border-r bg-card lg:flex lg:flex-col">
      <div className="border-b px-6 py-6">
        <Link
          href="/dashboard"
          className="text-2xl font-bold tracking-tight"
        >
          Prompt
          <span className="text-primary">Vault</span>
        </Link>

        <p className="mt-1 text-xs text-muted-foreground">
          AI Prompt Engineering Studio
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <p className="font-semibold">
            PromptVault Pro
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            AI scoring, prompt optimization and advanced testing.
          </p>
        </div>
      </div>
    </aside>
  );
}