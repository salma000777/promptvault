"use client";

import { useState } from "react";

type PromptSearchProps = {
  onSearch?: (value: string) => void;
};

export default function PromptSearch({
  onSearch,
}: PromptSearchProps) {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch?.(e.target.value);
        }}
        placeholder="Search prompts..."
        className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 pl-12 outline-none transition focus:border-indigo-500"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        />
      </svg>
    </div>
  );
}