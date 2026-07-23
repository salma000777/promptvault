import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "@/actions/collections";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import {
  Folder,
  Library,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type CollectionData = {
  id: string;
  name: string;
  color: string;
  created_at: string;
};

type PromptCollectionReference = {
  collection_id: string | null;
};

export default async function CollectionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [
    { data: collections, error: collectionsError },
    { data: prompts, error: promptsError },
  ] = await Promise.all([
    supabase
      .from("collections")
      .select("id, name, color, created_at")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("prompts")
      .select("collection_id")
      .eq("user_id", user.id),
  ]);

  const collectionList =
    (collections ?? []) as CollectionData[];

  const promptReferences =
    (prompts ?? []) as PromptCollectionReference[];

  const promptCounts = promptReferences.reduce<
    Record<string, number>
  >((counts, prompt) => {
    if (!prompt.collection_id) {
      return counts;
    }

    counts[prompt.collection_id] =
      (counts[prompt.collection_id] ?? 0) + 1;

    return counts;
  }, {});

  const unorganizedCount =
    promptReferences.filter(
      (prompt) => !prompt.collection_id
    ).length;

  const pageError =
    collectionsError?.message ||
    promptsError?.message ||
    null;

  async function createCollectionAction(
    formData: FormData
  ) {
    "use server";

    await createCollection(formData);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">
            Organization
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Collections
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Group related prompts into focused
            workspaces and keep your library easy to
            navigate.
          </p>
        </div>

        <Link
          href="/dashboard/prompts"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
        >
          <Library className="size-4" />
          Prompt Library
        </Link>
      </div>

      {pageError ? (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {pageError}
        </div>
      ) : null}

      <Card className="mt-8 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
            <Plus className="size-5 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">
              Create a collection
            </h2>

            <p className="text-sm text-muted-foreground">
              Add a name and choose its identifying
              color.
            </p>
          </div>
        </div>

        <form
          action={createCollectionAction}
          className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_72px_auto]"
        >
          <input
            type="text"
            name="name"
            required
            maxLength={50}
            placeholder="For example: Marketing"
            className="h-11 rounded-xl border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/20"
          />

          <input
            type="color"
            name="color"
            defaultValue="#3b82f6"
            aria-label="Collection color"
            className="h-11 w-full cursor-pointer rounded-xl border bg-background p-1.5"
          />

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Create
          </button>
        </form>
      </Card>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Your collections
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {collectionList.length}{" "}
            {collectionList.length === 1
              ? "collection"
              : "collections"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/dashboard/prompts?collection=unorganized"
          className="group rounded-2xl border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
              <Library className="size-5 text-muted-foreground" />
            </div>

            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {unorganizedCount}{" "}
              {unorganizedCount === 1
                ? "prompt"
                : "prompts"}
            </span>
          </div>

          <h3 className="mt-5 text-lg font-semibold">
            Unorganized
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Prompts that have not been assigned to a
            collection.
          </p>
        </Link>

        {collectionList.map((collection) => {
          const promptCount =
            promptCounts[collection.id] ?? 0;

          const updateAction = async (
            formData: FormData
          ) => {
            "use server";

            await updateCollection(
              collection.id,
              formData
            );
          };

          const deleteAction = async () => {
            "use server";

            await deleteCollection(collection.id);
          };

          return (
            <Card
              key={collection.id}
              className="group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/dashboard/prompts?collection=${collection.id}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${collection.color}20`,
                    }}
                  >
                    <Folder
                      className="size-5"
                      style={{
                        color: collection.color,
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      {collection.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {promptCount}{" "}
                      {promptCount === 1
                        ? "prompt"
                        : "prompts"}
                    </p>
                  </div>
                </Link>

                <form action={deleteAction}>
                  <button
                    type="submit"
                    title="Delete collection"
                    aria-label={`Delete ${collection.name}`}
                    className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </form>
              </div>

              <form
                action={updateAction}
                className="mt-5 grid grid-cols-[minmax(0,1fr)_48px_auto] gap-2 border-t pt-4"
              >
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={50}
                  defaultValue={collection.name}
                  aria-label="Collection name"
                  className="h-9 min-w-0 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                />

                <input
                  type="color"
                  name="color"
                  defaultValue={collection.color}
                  aria-label="Collection color"
                  className="h-9 w-full cursor-pointer rounded-lg border bg-background p-1"
                />

                <button
                  type="submit"
                  title="Save collection"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition hover:bg-muted"
                >
                  <Pencil className="size-3.5" />
                  Save
                </button>
              </form>
            </Card>
          );
        })}
      </div>

      {collectionList.length === 0 ? (
        <Card className="mt-5 rounded-2xl border-dashed">
          <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <Folder className="size-7 text-primary" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              No collections yet
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Create your first collection using the
              form above.
            </p>
          </div>
        </Card>
      ) : null}
    </div>
  );
}