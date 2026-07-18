export type PromptOptimization = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  optimizedPrompt: string;
};