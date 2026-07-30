import { PromptOptimizationResult } from "@/lib/ai/schemas";

export interface AIProvider {
  optimize(prompt: string): Promise<PromptOptimizationResult>;
}