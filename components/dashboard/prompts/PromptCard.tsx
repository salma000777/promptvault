"use client";

import { useState } from "react";

type PromptCardProps = {
  id: string;
  title: string;
  category: string;
  content: string;
  favorite: boolean;
};

export default function PromptCard({
  id,
  title,
  category,
  content,
  favorite,
}: PromptCardProps) {
  const [isFavorite, setIsFavorite] = useState(favorite);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-indigo-500">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>

          <span className="mt-3 inline-block rounded-full bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300">
            {category}
          </span>
        </div>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-2xl transition hover:scale-110"
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>

      <p className="mt-5 line-clamp-4 whitespace-pre-wrap text-sm text-slate-400">
        {content}
      </p>

      <div className="mt-8 flex gap-3">
        <button
          data-id={id}
          className="flex-1 rounded-xl bg-slate-800 px-4 py-2 font-medium transition hover:bg-slate-700"
        >
          Edit
        </button>

        <button
          data-id={id}
          className="flex-1 rounded-xl bg-red-600 px-4 py-2 font-medium transition hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}