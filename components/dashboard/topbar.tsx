"use client";

import {
  Bell,
  Search,
  Settings,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type DashboardTopbarProps = {
  email: string;
};

export function DashboardTopbar({
  email,
}: DashboardTopbarProps) {
  const firstLetter =
    email.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-6 px-8">
        <div className="relative hidden w-full max-w-md lg:block">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

          <Input
            placeholder="Search prompts..."
            className="h-11 rounded-xl border-slate-800 bg-slate-900 pl-11 text-white placeholder:text-slate-500 focus-visible:ring-primary"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl"
          >
            <Bell className="size-5" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-xl"
          >
            <Settings className="size-5" />
          </Button>

          <Avatar className="h-11 w-11 border border-slate-700">
            <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
}