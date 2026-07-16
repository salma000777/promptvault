import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Library, Plus } from "lucide-react";
import Link from "next/link";

export default function PromptsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Prompt Library
          </h1>

          <p className="mt-2 text-muted-foreground">
            Browse and organize all your saved prompts.
          </p>
        </div>

        <Button>
          <Plus className="size-4" />
          New Prompt
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="flex min-h-96 flex-col items-center justify-center p-8 text-center">
          <Library className="size-12 text-primary" />

          <h2 className="mt-5 text-xl font-semibold">
            Your library is empty
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your saved prompts will appear here.
          </p>

          <Link
            href="/dashboard/prompts/new"
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Create a prompt
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}