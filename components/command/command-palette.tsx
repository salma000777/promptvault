"use client";

import {
  CreditCard,
  FilePlus2,
  FileText,
  FolderOpen,
  Heart,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import type { CommandPrompt } from "@/lib/command";

import { useCommandPalette } from "./command-provider";

type CommandPaletteProps = {
  prompts: CommandPrompt[];
};

type NavigationItem = {
  label: string;
  description: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    description: "Open your main workspace",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Prompt Library",
    description: "Browse and manage your prompts",
    href: "/dashboard/prompts",
    icon: FolderOpen,
  },
  {
    label: "Collections",
    description: "Browse your prompt collections",
    href: "/dashboard/collections",
    icon: FolderOpen,
  },
  {
    label: "AI Studio",
    description: "Optimize prompts with AI",
    href: "/dashboard/studio",
    icon: Sparkles,
  },
  {
    label: "Settings",
    description: "Manage your workspace settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    label: "Pricing and Billing",
    description: "View available plans",
    href: "/pricing",
    icon: CreditCard,
  },
];

export function CommandPalette({
  prompts,
}: CommandPaletteProps) {
  const router = useRouter();

  const { open, setOpen } =
    useCommandPalette();

  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="PromptVault Command Center"
      description="Search prompts, navigate pages and run quick actions."
      className="overflow-hidden border-slate-800 bg-slate-950 shadow-2xl shadow-black/50 sm:max-w-xl"
    >
      <Command className="bg-slate-950">
        <div className="border-b border-slate-800 p-3">
          <CommandInput
            autoFocus
            placeholder="Search prompts or type a command..."
            className="text-base text-white placeholder:text-slate-500"
          />
        </div>

        <CommandList className="max-h-[420px] px-2 py-2">
          <CommandEmpty className="py-14">
            <div className="mx-auto flex max-w-xs flex-col items-center text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-400">
                <FileText className="size-5" />
              </div>

              <p className="mt-4 font-medium text-white">
                No results found
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Try searching for another prompt,
                page, category, or command.
              </p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Quick actions">
            <CommandItem
              value="create new prompt add prompt"
              onSelect={() =>
                navigate(
                  "/dashboard/prompts/new"
                )
              }
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <FilePlus2 className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  Create new prompt
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  Add a new prompt to your vault
                </p>
              </div>

              <kbd className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-400">
                N
              </kbd>
            </CommandItem>

            <CommandItem
              value="open ai studio optimize rewrite improve prompt"
              onSelect={() =>
                navigate(
                  "/dashboard/studio"
                )
              }
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  Open AI Studio
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  Optimize and improve a prompt
                </p>
              </div>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.description}`}
                  onSelect={() =>
                    navigate(item.href)
                  }
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400">
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {item.label}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>

          {prompts.length > 0 ? (
            <>
              <CommandSeparator />

              <CommandGroup heading="Prompts">
                {prompts.map((prompt) => (
                  <CommandItem
                    key={prompt.id}
                    value={[
                      prompt.title,
                      prompt.content,
                      prompt.category,
                      prompt.favorite
                        ? "favorite starred"
                        : "",
                    ].join(" ")}
                    onSelect={() =>
                      navigate(
                        `/dashboard/prompts/${prompt.id}/edit`
                      )
                    }
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400">
                      <FileText className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {prompt.title}
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">
                          {prompt.category ||
                            "Uncategorized"}
                        </span>

                        {prompt.favorite ? (
                          <>
                            <span aria-hidden="true">
                              ·
                            </span>

                            <span className="flex shrink-0 items-center gap-1 text-amber-400">
                              <Heart className="size-3 fill-current" />
                              Favorite
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          ) : null}
        </CommandList>

        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 text-xs text-slate-500">
          <span>Keyboard navigation</span>

          <div className="flex items-center gap-2">
            <kbd className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 font-sans text-slate-400">
              ↑ ↓
            </kbd>

            <kbd className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 font-sans text-slate-400">
              Enter
            </kbd>

            <kbd className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 font-sans text-slate-400">
              Esc
            </kbd>
          </div>
        </div>
      </Command>
    </CommandDialog>
  );
}