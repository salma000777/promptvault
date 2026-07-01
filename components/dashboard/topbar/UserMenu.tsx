"use client";

import { useState } from "react";
import { signOut } from "@/actions/auth";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold"
      >
        S
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl">
          <button
            onClick={() => alert("Profile coming soon")}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-slate-800"
          >
            👤 Profile
          </button>

          <button
            onClick={() => alert("Settings coming soon")}
            className="w-full rounded-xl px-4 py-3 text-left hover:bg-slate-800"
          >
            ⚙️ Settings
          </button>

          <form action={signOut}>
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-red-600 px-4 py-3 font-semibold hover:bg-red-500"
            >
              Log Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}