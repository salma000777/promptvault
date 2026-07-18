import { createClient } from "@/lib/supabase/server";

export type DashboardStats = {
  totalPrompts: number;
  favoritePrompts: number;
  collections: number;
  recentPrompts: number;
};

export type CollectionSummary = {
  id: string;
  name: string;
  color: string;
  promptCount: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      totalPrompts: 0,
      favoritePrompts: 0,
      collections: 0,
      recentPrompts: 0,
    };
  }

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7
  );

  const [
    totalPromptsResult,
    favoritesResult,
    collectionsResult,
    recentPromptsResult,
  ] = await Promise.all([
    supabase
      .from("prompts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id),

    supabase
      .from("prompts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("favorite", true),

    supabase
      .from("collections")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id),

    supabase
      .from("prompts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .gte(
        "updated_at",
        sevenDaysAgo.toISOString()
      ),
  ]);

  return {
    totalPrompts:
      totalPromptsResult.count ?? 0,

    favoritePrompts:
      favoritesResult.count ?? 0,

    collections:
      collectionsResult.count ?? 0,

    recentPrompts:
      recentPromptsResult.count ?? 0,
  };
}

export async function getCollections(): Promise<
  CollectionSummary[]
> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: collections, error } =
    await supabase
      .from("collections")
      .select("id, name, color")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: true,
      });

  if (error || !collections) {
    console.error(
      "Failed to load collections:",
      error
    );

    return [];
  }

  const { data: prompts } = await supabase
    .from("prompts")
    .select("collection_id")
    .eq("user_id", user.id);

  const counts = new Map<string, number>();

  for (const prompt of prompts ?? []) {
    if (!prompt.collection_id) {
      continue;
    }

    counts.set(
      prompt.collection_id,
      (counts.get(prompt.collection_id) ?? 0) +
        1
    );
  }

  return collections.map((collection) => ({
    id: collection.id,
    name: collection.name,
    color:
      collection.color ?? "#3b82f6",
    promptCount:
      counts.get(collection.id) ?? 0,
  }));
}