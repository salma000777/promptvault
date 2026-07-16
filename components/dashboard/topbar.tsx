import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LogOut,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type DashboardTopbarProps = {
  email: string;
};

export function DashboardTopbar({
  email,
}: DashboardTopbarProps) {
  const initial =
    email.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b bg-background/90 px-6 backdrop-blur">
      <div className="relative hidden w-full max-w-md md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search prompts..."
          className="pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/dashboard/studio"
          className="hidden items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted sm:flex"
        >
          <Sparkles className="size-4" />
          AI Studio
        </Link>

        <Link
          href="/dashboard/prompts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="size-4" />
          New Prompt
        </Link>

        <div
          title={email}
          className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
        >
          {initial}
        </div>

        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            title="Sign out"
          >
            <LogOut className="size-5" />
          </Button>
        </form>
      </div>
    </header>
  );
}