import { updatePrompt } from "@/actions/prompts";
import PromptEditor from "@/components/prompts/prompt-editor";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type EditPromptPageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditPromptPage({
  params,
  searchParams,
}: EditPromptPageProps) {
  const [{ id }, { error }] =
    await Promise.all([
      params,
      searchParams,
    ]);

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: prompt } =
    await supabase
      .from("prompts")
      .select(
        "id,title,content,category"
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

  if (!prompt) {
    notFound();
  }

  return (
    <PromptEditor
      mode="edit"
      action={updatePrompt.bind(
        null,
        prompt.id
      )}
      title={prompt.title}
      category={
        prompt.category ??
        "General"
      }
      content={prompt.content}
      error={error}
    />
  );
}