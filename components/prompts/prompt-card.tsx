import {
  deletePrompt,
  duplicatePrompt,
  toggleFavorite,
} from "@/actions/prompts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Copy,
  Edit3,
  Heart,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export type PromptCardData = {
  id: string;
  title: string;
  content: string;
  category: string;
  favorite: boolean;
  created_at: string;
};

type PromptCardProps = {
  prompt: PromptCardData;
};

export function PromptCard({
  prompt,
}: PromptCardProps) {
  const favoriteAction =
    toggleFavorite.bind(
      null,
      prompt.id,
      !prompt.favorite
    );

  const duplicateAction =
    duplicatePrompt.bind(null, prompt.id);

  const deleteAction =
    deletePrompt.bind(null, prompt.id);

  const createdDate =
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(
      new Date(prompt.created_at)
    );

  return (
    <Card className="flex h-full flex-col transition hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {prompt.category}
            </span>

            <CardTitle className="mt-4 line-clamp-2 text-xl">
              {prompt.title}
            </CardTitle>
          </div>

          <form action={favoriteAction}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              title={
                prompt.favorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`size-5 ${
                  prompt.favorite
                    ? "fill-current text-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          </form>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {prompt.content}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t pt-5">
        <p className="text-xs text-muted-foreground">
          {createdDate}
        </p>

        <div className="flex items-center gap-1">
          <form action={duplicateAction}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              title="Duplicate prompt"
              className="text-muted-foreground"
            >
              <Copy className="size-4" />
            </Button>
          </form>

          <Link
            href={`/dashboard/prompts/${prompt.id}/edit`}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
            title="Edit prompt"
          >
            <Edit3 className="size-4" />
          </Link>

          <form action={deleteAction}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              title="Delete prompt"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}