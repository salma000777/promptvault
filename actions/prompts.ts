"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function readRequiredString(
  formData: FormData,
  field: string
): string {
  const value = formData.get(field);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return {
    supabase,
    user,
  };
}

export async function createPrompt(
  formData: FormData
) {
  const title = readRequiredString(
    formData,
    "title"
  );

  const content = readRequiredString(
    formData,
    "content"
  );

  const category =
    readRequiredString(formData, "category") ||
    "General";

  if (!title || !content) {
    redirect(
      "/dashboard/prompts/new?error=Title%20and%20prompt%20content%20are%20required"
    );
  }

  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("prompts")
    .insert({
      user_id: user.id,
      title,
      content,
      category,
      favorite: false,
    });

  if (error) {
    console.error(
      "Create prompt error:",
      error
    );

    redirect(
      `/dashboard/prompts/new?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");

  redirect("/dashboard/prompts");
}

export async function updatePrompt(
  id: string,
  formData: FormData
) {
  const title = readRequiredString(
    formData,
    "title"
  );

  const content = readRequiredString(
    formData,
    "content"
  );

  const category =
    readRequiredString(formData, "category") ||
    "General";

  if (!title || !content) {
    redirect(
      `/dashboard/prompts/${id}/edit?error=Title%20and%20prompt%20content%20are%20required`
    );
  }

  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("prompts")
    .update({
      title,
      content,
      category,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "Update prompt error:",
      error
    );

    redirect(
      `/dashboard/prompts/${id}/edit?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");
  revalidatePath(
    `/dashboard/prompts/${id}/edit`
  );

  redirect("/dashboard/prompts");
}

export async function deletePrompt(
  id: string
) {
  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("prompts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "Delete prompt error:",
      error
    );

    redirect(
      `/dashboard/prompts?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");
}

export async function toggleFavorite(
  id: string,
  nextFavoriteValue: boolean
) {
  const { supabase, user } =
    await getAuthenticatedUser();

  const { error } = await supabase
    .from("prompts")
    .update({
      favorite: nextFavoriteValue,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "Favorite prompt error:",
      error
    );

    redirect(
      `/dashboard/prompts?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");
}

export async function duplicatePrompt(
  id: string
) {
  const { supabase, user } =
    await getAuthenticatedUser();

  const {
    data: originalPrompt,
    error: fetchError,
  } = await supabase
    .from("prompts")
    .select(
      "title, content, category, collection_id"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error(
      "Fetch prompt for duplication error:",
      fetchError
    );

    redirect(
      `/dashboard/prompts?error=${encodeURIComponent(
        fetchError.message
      )}`
    );
  }

  if (!originalPrompt) {
    redirect(
      "/dashboard/prompts?error=Prompt%20not%20found"
    );
  }

  const { error: duplicateError } =
    await supabase
      .from("prompts")
      .insert({
        user_id: user.id,
        title: `${originalPrompt.title} (Copy)`,
        content: originalPrompt.content,
        category:
          originalPrompt.category || "General",
        collection_id:
          originalPrompt.collection_id,
        favorite: false,
      });

  if (duplicateError) {
    console.error(
      "Duplicate prompt error:",
      duplicateError
    );

    redirect(
      `/dashboard/prompts?error=${encodeURIComponent(
        duplicateError.message
      )}`
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/prompts");
}