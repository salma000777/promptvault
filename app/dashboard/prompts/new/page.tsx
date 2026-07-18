import { createPrompt } from "@/actions/prompts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

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
          Create a new prompt
        </h1>

        <p className="mt-2 text-muted-foreground">
          Save a reusable prompt to your private
          PromptVault library.
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Prompt details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action={createPrompt}
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
                placeholder="Example: Viral LinkedIn post generator"
                maxLength={120}
                required
              />

              <p className="text-xs text-muted-foreground">
                Give the prompt a clear,
                recognizable name.
              </p>
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
                placeholder="Example: Marketing"
                defaultValue="General"
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
                placeholder="Write or paste your full prompt here..."
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
                Save prompt
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}