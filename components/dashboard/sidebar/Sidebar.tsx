"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Prompts",
    href: "/prompts",
  },
  {
    name: "AI Studio",
    href: "/optimize",
  },
  {
    name: "Favorites",
    href: "/favorites",
  },
  {
    name: "Templates",
    href: "/templates",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold">
          Prompt<span className="text-indigo-400">Vault</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          AI Prompt Engineering Studio
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-800 p-6">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5">
          <h3 className="font-bold">PromptVault Pro</h3>

          <p className="mt-2 text-sm text-indigo-100">
            Unlock AI Prompt Optimizer, Prompt Score and Templates.
          </p>
        </div>
      </div>
    </aside>
  );
}