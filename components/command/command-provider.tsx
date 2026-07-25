"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CommandPrompt } from "@/lib/command";

import { CommandPalette } from "./command-palette";

type CommandContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const CommandContext =
  createContext<CommandContextValue | null>(null);

type CommandProviderProps = {
  children: ReactNode;
  prompts: CommandPrompt[];
};

export function CommandProvider({
  children,
  prompts,
}: CommandProviderProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      const isCommandShortcut =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k";

      if (!isCommandShortcut) {
        return;
      }

      event.preventDefault();
      toggle();
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [toggle]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
    }),
    [open, toggle]
  );

  return (
    <CommandContext.Provider value={value}>
      {children}

      <CommandPalette prompts={prompts} />
    </CommandContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandContext);

  if (!context) {
    throw new Error(
      "useCommandPalette must be used inside CommandProvider."
    );
  }

  return context;
}