import {
  deletePrompt,
  duplicatePrompt,
  toggleFavorite,
} from "@/actions/prompts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  Edit3,
  Heart,
  MoreHorizontal,
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
  const favoriteAction = toggleFavorite.bind(
    null,
    prompt.id,
    !prompt.favorite
  );

  const duplicateAction = duplicatePrompt.bind(
    null,
    prompt.id
  );

  const deleteAction = deletePrompt.bind(
    null,
    prompt.id
  );

  const createdDate = new Intl.DateTimeFormat(
    "en",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  ).format(new Date(prompt.created_at));

  return (
    <Card className="group flex h-full flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4 p-6 pb-4">
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {prompt.category}
          </span>

          <h3 className="mt-3 line-clamp-2 text-xl font-semibold tracking-tight">
            {prompt.title}
          </h3>
        </div>

        <form action={favoriteAction}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="rounded-full"
            title={
              prompt.favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Heart
              className={
                prompt.favorite
                  ? "size-5 fill-red-500 text-red-500"
                  : "size-5 text-muted-foreground transition hover:text-red-500"
              }
            />
          </Button>
        </form>
      </div>

      <div className="flex-1 px-6">
        <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
          {prompt.content}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between px-6 pb-6">
        <span className="text-xs text-muted-foreground">
          {createdDate}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground opacity-100 transition hover:bg-muted hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
            aria-label={`Open actions for ${prompt.title}`}
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44"
          >
            <DropdownMenuItem
              render={
                <Link
                  href={`/dashboard/prompts/${prompt.id}/edit`}
                />
              }
            >
              <Edit3 className="size-4" />
              Edit
            </DropdownMenuItem>

            <form action={duplicateAction}>
              <DropdownMenuItem
                render={<button type="submit" />}
                className="w-full"
              >
                <Copy className="size-4" />
                Duplicate
              </DropdownMenuItem>
            </form>

            <form action={deleteAction}>
              <DropdownMenuItem
                render={<button type="submit" />}
                variant="destructive"
                className="w-full"
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}