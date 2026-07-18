"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const collectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Collection name is required.")
    .max(50, "Collection name must be 50 characters or fewer."),

  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid collection color.")
    .default("#3b82f6"),
});

async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return {
    supabase,
    user,
  };
}

export async function createCollection(formData: FormData) {
  const validation = collectionSchema.safeParse({
    name: formData.get("name"),
    color: formData.get("color") || "#3b82f6",
  });

  if (!validation.success) {
    return {
      success: false,
      error:
        validation.error.issues[0]?.message ??
        "Invalid collection.",
    };
  }

  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("collections")
    .insert({
      user_id: user.id,
      name: validation.data.name,
      color: validation.data.color,
    });

  if (error) {
    console.error("Create collection failed:", error);

    return {
      success: false,
      error: "Could not create the collection.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");

  return {
    success: true,
  };
}

export async function updateCollection(
  collectionId: string,
  formData: FormData
) {
  const validation = collectionSchema.safeParse({
    name: formData.get("name"),
    color: formData.get("color") || "#3b82f6",
  });

  if (!validation.success) {
    return {
      success: false,
      error:
        validation.error.issues[0]?.message ??
        "Invalid collection.",
    };
  }

  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("collections")
    .update({
      name: validation.data.name,
      color: validation.data.color,
    })
    .eq("id", collectionId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Update collection failed:", error);

    return {
      success: false,
      error: "Could not update the collection.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");

  return {
    success: true,
  };
}

export async function deleteCollection(
  collectionId: string
) {
  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", collectionId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Delete collection failed:", error);

    return {
      success: false,
      error: "Could not delete the collection.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");

  return {
    success: true,
  };
}

export async function assignPromptToCollection(
  promptId: string,
  collectionId: string | null
) {
  const { supabase, user } =
    await getAuthenticatedUser();

  if (collectionId) {
    const { data: collection } = await supabase
      .from("collections")
      .select("id")
      .eq("id", collectionId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (!collection) {
      return {
        success: false,
        error: "Collection not found.",
      };
    }
  }

  const { error } = await supabase
    .from("prompts")
    .update({
      collection_id: collectionId,
    })
    .eq("id", promptId)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "Assign prompt to collection failed:",
      error
    );

    return {
      success: false,
      error:
        "Could not move the prompt to that collection.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");

  return {
    success: true,
  };
}