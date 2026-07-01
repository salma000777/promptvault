"use server";

import { getSupabase } from "@/services/prompt.service";

export async function getPrompts() {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}