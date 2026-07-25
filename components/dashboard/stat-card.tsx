import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1.5
        hover:border-violet-400/30
        hover:shadow-[0_35px_80px_rgba(0,0,0,0.45)]
      "
    >
      {/* Top highlight */}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Glass reflection */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-40 w-40 rotate-12 rounded-full bg-white/[0.05] blur-3xl transition-all duration-700 group-hover:left-4" />
      </div>

      {/* Ambient orb */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/10 blur-[90px] transition-all duration-500 group-hover:scale-125 group-hover:bg-violet-400/20" />

      {/* Secondary glow */}

      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-full bg-indigo-500/10 blur-[70px] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div
            className="
              relative
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.08]
              bg-gradient-to-br
              from-violet-500/20
              to-violet-900/20
              shadow-lg
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:border-violet-300/30
            "
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />

            <Icon className="relative z-10 size-6 text-violet-200 transition-transform duration-500 group-hover:rotate-6" />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 backdrop-blur-xl">
            <ArrowUpRight className="size-3 text-emerald-300" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Stable
            </span>
          </div>
        </div>

        {/* Label */}

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          {title}
        </p>

        {/* Value */}

        <div className="mt-3 flex items-end gap-2">

          <h2 className="text-5xl font-semibold tracking-[-0.06em] text-white transition-transform duration-500 group-hover:translate-x-1">
            {value.toLocaleString()}
          </h2>

          <span className="pb-2 text-sm text-slate-500">
            total
          </span>

        </div>

        {/* Description */}

        <p className="mt-4 max-w-[18rem] text-sm leading-6 text-slate-400">
          {description}
        </p>

        {/* Bottom divider */}

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">

          <span className="text-xs uppercase tracking-[0.18em] text-slate-600 transition duration-300 group-hover:text-violet-300">
            Live Metrics
          </span>

          <div className="flex items-center gap-1">

            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

            <span className="text-xs text-slate-500">
              Updated now
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}