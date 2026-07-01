"use server";

import { z } from "zod";
import { getSupabase } from "@/services/prompt.service";

const PromptSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1),
  content: z.string().min(1, "Content is required"),
});

export async function createPrompt(input: unknown) {
  const result = PromptSchema.safeParse(input);

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("prompts")
    .insert({
      title: result.data.title,
      category: result.data.category,
      content: result.data.content,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}