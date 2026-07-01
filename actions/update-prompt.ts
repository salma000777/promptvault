"use server";

import { getSupabase } from "@/services/prompt.service";

export async function updatePrompt(
  id: string,
  title: string,
  category: string,
  content: string
) {
  const supabase = await getSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("prompts")
    .update({
      title,
      category,
      content,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}