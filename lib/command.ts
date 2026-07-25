import { createClient } from "@/lib/supabase/server";

export type CommandPrompt = {
  id: string;
  title: string;
  content: string;
  category: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
};

export async function getCommandPrompts(): Promise<
  CommandPrompt[]
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("prompts")
    .select(
      `
        id,
        title,
        content,
        category,
        favorite,
        created_at,
        updated_at
      `
    )
    .eq("user_id", user.id)
    .order("updated_at", {
      ascending: false,
    })
    .limit(100);

  if (error) {
    console.error(
      "Failed to load command prompts:",
      error
    );

    return [];
  }

  return data ?? [];
}