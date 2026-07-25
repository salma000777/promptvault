import { createPrompt } from "@/actions/prompts";
import PromptEditor from "@/components/prompts/prompt-editor";

type NewPromptPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewPromptPage({
  searchParams,
}: NewPromptPageProps) {
  const { error } = await searchParams;

  return (
    <PromptEditor
      mode="create"
      action={createPrompt}
      title=""
      category="General"
      content=""
      error={error}
    />
  );
}