"use client";

import * as React from "react";
import {
  CheckIcon,
  SearchIcon,
} from "lucide-react";
import {
  Command as CommandPrimitive,
} from "cmdk";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

function Command({
  className,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive
>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<
  React.ComponentProps<typeof Dialog>,
  "children"
> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>
          {title}
        </DialogTitle>

        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>

      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-2xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive.Input
>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="p-1"
    >
      <InputGroup className="h-12! rounded-xl! border-slate-700 bg-slate-900 shadow-none! *:data-[slot=input-group-addon]:pl-3!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-base text-white outline-hidden placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        <InputGroupAddon>
          <SearchIcon className="size-5 shrink-0 text-slate-500" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive.List
>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-2 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive.Empty
>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        "py-8 text-center text-sm",
        className
      )}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive.Group
>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.16em] **:[[cmdk-group-heading]]:text-slate-500",
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive.Separator
>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(
        "mx-2 my-2 h-px bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<
  typeof CommandPrimitive.Item
>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default select-none items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm text-slate-300 outline-hidden transition-colors data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:border-primary/20 data-selected:bg-primary/10 data-selected:text-white [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}

      <CheckIcon className="ml-auto hidden opacity-0 group-data-[checked=true]/command-item:block group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};