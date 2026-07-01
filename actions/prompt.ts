"use server";

import { getSupabase } from "@/services/prompt.service";
import { CreatePromptInput } from "@/types/prompt";

export async function createPrompt(
  input: CreatePromptInput
) {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("prompts")
    .insert({
      title: input.title,
      content: input.content,
      category: input.category,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}