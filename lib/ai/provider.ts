import type {
  PromptOptimizationResult,
} from "@/lib/ai/schemas";

import {
  optimizePromptWithGemini,
} from "@/lib/ai/providers/gemini";

import {
  optimizePromptWithOpenRouter,
} from "@/lib/ai/providers/openrouter";

export async function optimizePrompt(
  originalPrompt: string
): Promise<PromptOptimizationResult> {
  try {
    console.log(
      "PromptVault: trying Gemini..."
    );

    return await optimizePromptWithGemini(
      originalPrompt
    );
  } catch (geminiError) {
    console.warn(
      "PromptVault: Gemini failed. Trying OpenRouter fallback.",
      geminiError
    );
  }

  try {
    return await optimizePromptWithOpenRouter(
      originalPrompt
    );
  } catch (openRouterError) {
    console.error(
      "PromptVault: OpenRouter fallback also failed.",
      openRouterError
    );

    throw new Error(
      "AI services are temporarily unavailable. Please try again in a moment."
    );
  }
}