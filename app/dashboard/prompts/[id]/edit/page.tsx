import { updatePrompt } from "@/actions/prompts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  Save,
} from "lucide-react";
import Link from "next/link";
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
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: prompt } = await supabase
    .from("prompts")
    .select(
      "id, title, content, category, favorite, created_at"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!prompt) {
    notFound();
  }

  const updateAction =
    updatePrompt.bind(null, prompt.id);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard/prompts"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Prompt Library
      </Link>

      <div className="mt-6">
        <p className="text-sm font-semibold text-primary">
          Prompt Library
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Edit prompt
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update this prompt’s title,
          category, or content.
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            Prompt details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={updateAction}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium"
              >
                Title
              </label>

              <Input
                id="title"
                name="title"
                type="text"
                defaultValue={prompt.title}
                maxLength={120}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium"
              >
                Category
              </label>

              <Input
                id="category"
                name="category"
                type="text"
                defaultValue={
                  prompt.category
                }
                maxLength={60}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-medium"
              >
                Prompt content
              </label>

              <Textarea
                id="content"
                name="content"
                defaultValue={prompt.content}
                className="min-h-80 resize-y"
                maxLength={20000}
                required
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard/prompts"
                className="inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Save className="size-4" />
                Save changes
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}