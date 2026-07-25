/* =======================================================
   PART 1 OF 2
   DO NOT CLOSE THE COMPONENT
   CONTINUE WITH PART 2
======================================================= */

"use client";

import { Bell, Search, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

import { useCommandPalette } from "@/components/command/command-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type DashboardTopbarProps = {
  email: string;
};

export function DashboardTopbar({
  email,
}: DashboardTopbarProps) {
  const { setOpen } = useCommandPalette();

  const firstLetter =
    email.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.04] bg-[#0b1020]/65 backdrop-blur-3xl">
      <div className="relative flex h-[82px] items-center justify-between px-6 lg:px-10">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/3 top-[-140px] h-[260px] w-[340px] rounded-full bg-violet-500/12 blur-[110px]" />
          <div className="absolute right-[-120px] top-[-90px] h-[220px] w-[220px] rounded-full bg-fuchsia-500/10 blur-[90px]" />
        </div>

        {/* ================= SEARCH ================= */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open command center"
          className="
            group
            relative
            hidden
            h-12
            w-full
            max-w-2xl
            items-center
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.035]
            px-5
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:border-violet-400/30
            hover:bg-white/[0.05]
            hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
            lg:flex
          "
        >
          {/* reflection */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -left-20 top-0 h-full w-24 rotate-12 bg-white/10 blur-xl transition-all duration-700 group-hover:left-full" />
          </div>

          {/* icon bubble */}
          <div className="
              relative
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.05]
              transition
              group-hover:border-violet-400/30
              group-hover:bg-violet-500/10
          ">
            <Search className="size-4 text-slate-300 transition group-hover:text-violet-200" />
          </div>

          <span className="ml-4 flex-1 text-left text-sm font-medium text-slate-400 transition group-hover:text-slate-200">
            Search prompts, collections, AI tools...
          </span>

          <div className="mr-3 flex items-center gap-1 rounded-full border border-violet-400/15 bg-violet-500/10 px-2.5 py-1">
            <Sparkles className="size-3 text-violet-300" />
            <span className="text-[11px] font-medium text-violet-200">
              AI
            </span>
          </div>

          <kbd className="
              rounded-xl
              border
              border-white/[0.08]
              bg-black/20
              px-2.5
              py-1
              font-mono
              text-[11px]
              font-medium
              text-slate-300
              shadow-inner
          ">
            ⌘ K
          </kbd>
        </button>

        {/* Mobile search */}

        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setOpen(true)}
          className="
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.04]
            text-slate-300
            transition-all
            hover:border-violet-400/30
            hover:bg-violet-500/10
            hover:text-white
            lg:hidden
          "
        >
          <Search className="size-5" />
        </Button>

        

        <div className="relative z-10 ml-auto flex items-center gap-3">

          {/* Notifications */}

          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Notifications"
            className="
              group
              relative
              h-11
              w-11
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.035]
              text-slate-400
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:border-violet-400/25
              hover:bg-violet-500/[0.08]
              hover:text-white
              hover:shadow-[0_0_28px_rgba(139,92,246,0.18)]
            "
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-violet-400/5 opacity-0 transition group-hover:opacity-100" />

            <Bell className="relative z-10 size-[18px]" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
          </Button>

          {/* Settings */}

          <Button
            nativeButton={false}
            size="icon"
            variant="ghost"
            className="
              group
              relative
              h-11
              w-11
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.035]
              text-slate-400
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:rotate-6
              hover:border-violet-400/25
              hover:bg-violet-500/[0.08]
              hover:text-white
              hover:shadow-[0_0_28px_rgba(139,92,246,0.18)]
            "
            render={
              <Link
                href="/dashboard/settings"
                aria-label="Open settings"
              />
            }
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-violet-400/5 opacity-0 transition group-hover:opacity-100" />

            <Settings className="relative z-10 size-[18px] transition-transform duration-300 group-hover:rotate-90" />
          </Button>

          {/* Divider */}

          <div className="mx-1 h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* User */}

          <button
            type="button"
            className="
              group
              relative
              rounded-full
              transition-all
              duration-300
              hover:scale-[1.04]
            "
          >
            {/* Outer glow */}

            <div className="absolute -inset-2 rounded-full bg-violet-500/0 blur-xl transition-all duration-500 group-hover:bg-violet-500/20" />

            {/* Ring */}

            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-br from-violet-400/60 via-fuchsia-400/20 to-transparent opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />

            <Avatar className="
                relative
                h-11
                w-11
                border
                border-white/[0.08]
                bg-gradient-to-br
                from-violet-500/20
                to-slate-900
                shadow-lg
                transition-all
                duration-300
                group-hover:border-violet-300/40
            ">
              <AvatarFallback className="bg-transparent text-sm font-semibold text-violet-100">
                {firstLetter}
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  );
}