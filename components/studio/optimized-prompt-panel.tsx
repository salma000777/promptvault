import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type OptimizedPromptPanelProps = {
  prompt: string;
  copied: boolean;
  onCopy: () => void;
  onUseOptimized: () => void;
};

export default function OptimizedPromptPanel({
  prompt,
  copied,
  onCopy,
  onUseOptimized,
}: OptimizedPromptPanelProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-violet-400/15 bg-white/[0.025] shadow-2xl shadow-violet-950/10 backdrop-blur-2xl">

      <div className="flex flex-col gap-4 border-b border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex size-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
            <Sparkles className="size-4 text-violet-300" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              Optimized prompt
            </h3>

            <p className="text-xs text-muted-foreground">
              Ready to use with your preferred AI
            </p>
          </div>

        </div>

        <div className="flex gap-2">

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCopy}
            className="rounded-xl border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
          >
            {copied ? (
              <>
                <Check className="size-4 text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={onUseOptimized}
            className="rounded-xl bg-violet-600 text-white hover:bg-violet-500"
          >
            Use as original
            <ArrowRight className="size-4" />
          </Button>

        </div>

      </div>

      <div className="p-4 sm:p-5">

        <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/20">

          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">

            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />

            <span className="ml-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/50">
              Prompt output
            </span>

          </div>

          <div className="max-h-[720px] overflow-y-auto whitespace-pre-wrap px-5 py-5 text-sm leading-7 text-foreground/90 sm:px-6 sm:py-6">
            {prompt}
          </div>

        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-muted-foreground">

          <span>
            {prompt.length.toLocaleString()} characters
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            Optimization complete
          </span>

        </div>

      </div>

    </div>
  );
}