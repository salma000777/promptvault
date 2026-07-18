import { PromptOptimizer } from "@/components/studio/prompt-optimizer";

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-sm font-semibold text-primary">
          AI workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          AI Prompt Studio
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Score, analyze, and transform rough
          ideas into precise prompts that
          produce more consistent AI results.
        </p>
      </div>

      <div className="mt-8">
        <PromptOptimizer />
      </div>
    </div>
  );
}