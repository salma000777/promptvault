import { z } from "zod";

export const optimizePromptRequestSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, "Your prompt must contain at least 10 characters.")
    .max(20000, "Your prompt is too long."),
});

export const promptOptimizationSchema = z.object({
  score: z.number().int().min(0).max(100),

  summary: z
    .string()
    .trim()
    .min(1)
    .max(500),

  strengths: z
    .array(z.string().trim().min(1).max(300))
    .min(1)
    .max(6),

  weaknesses: z
    .array(z.string().trim().min(1).max(300))
    .min(1)
    .max(6),

  suggestions: z
    .array(z.string().trim().min(1).max(300))
    .min(1)
    .max(8),

  optimizedPrompt: z
    .string()
    .trim()
    .min(1)
    .max(30000),
});

export type OptimizePromptRequest = z.infer<
  typeof optimizePromptRequestSchema
>;

export type PromptOptimizationResult = z.infer<
  typeof promptOptimizationSchema
>;