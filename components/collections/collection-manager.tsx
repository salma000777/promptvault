"use client";

import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "@/actions/collections";

import type {
  CollectionWithCount,
} from "@/types/collection";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Check,
  Folder,
  LoaderCircle,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

type CollectionManagerProps = {
  collections: CollectionWithCount[];
};

const DEFAULT_COLOR = "#3b82f6";

export function CollectionManager({
  collections,
}: CollectionManagerProps) {
  const [isCreating, setIsCreating] =
    useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  function handleCreate(
    formData: FormData
  ) {
    setError(null);

    startTransition(async () => {
      const result =
        await createCollection(formData);

      if (!result.success) {
        setError(
          result.error ??
            "Could not create collection."
        );

        return;
      }

      setIsCreating(false);
    });
  }

  function handleUpdate(
    collectionId: string,
    formData: FormData
  ) {
    setError(null);

    startTransition(async () => {
      const result =
        await updateCollection(
          collectionId,
          formData
        );

      if (!result.success) {
        setError(
          result.error ??
            "Could not update collection."
        );

        return;
      }

      setEditingId(null);
    });
  }

  function handleDelete(
    collectionId: string,
    collectionName: string
  ) {
    const confirmed = window.confirm(
      `Delete "${collectionName}"? Prompts inside it will not be deleted.`
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result =
        await deleteCollection(
          collectionId
        );

      if (!result.success) {
        setError(
          result.error ??
            "Could not delete collection."
        );
      }
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>
            Collections
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Organize prompts into reusable
            workspaces.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          onClick={() => {
            setIsCreating(true);
            setEditingId(null);
            setError(null);
          }}
          disabled={
            isPending || isCreating
          }
        >
          <Plus className="size-4" />
          New collection
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {isCreating ? (
          <CollectionForm
            submitLabel="Create"
            defaultName=""
            defaultColor={
              DEFAULT_COLOR
            }
            isPending={isPending}
            onCancel={() => {
              setIsCreating(false);
              setError(null);
            }}
            action={handleCreate}
          />
        ) : null}

        {collections.length === 0 &&
        !isCreating ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Folder className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              No collections yet
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Create collections for coding,
              writing, marketing, study, or any
              workflow you use.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {collections.map(
              (collection) => {
                const isEditing =
                  editingId ===
                  collection.id;

                if (isEditing) {
                  return (
                    <CollectionForm
                      key={
                        collection.id
                      }
                      submitLabel="Save"
                      defaultName={
                        collection.name
                      }
                      defaultColor={
                        collection.color
                      }
                      isPending={
                        isPending
                      }
                      onCancel={() => {
                        setEditingId(
                          null
                        );
                        setError(null);
                      }}
                      action={(
                        formData
                      ) =>
                        handleUpdate(
                          collection.id,
                          formData
                        )
                      }
                    />
                  );
                }

                return (
                  <div
                    key={collection.id}
                    className="group flex items-center justify-between gap-3 rounded-xl border p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="size-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            collection.color,
                        }}
                      />

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {
                            collection.name
                          }
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {
                            collection.promptCount
                          }{" "}
                          {collection.promptCount ===
                          1
                            ? "prompt"
                            : "prompts"}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingId(
                            collection.id
                          );
                          setIsCreating(
                            false
                          );
                          setError(null);
                        }}
                        disabled={
                          isPending
                        }
                        aria-label={`Edit ${collection.name}`}
                      >
                        <Pencil className="size-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleDelete(
                            collection.id,
                            collection.name
                          )
                        }
                        disabled={
                          isPending
                        }
                        aria-label={`Delete ${collection.name}`}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type CollectionFormProps = {
  defaultName: string;
  defaultColor: string;
  submitLabel: string;
  isPending: boolean;
  action: (
    formData: FormData
  ) => void;
  onCancel: () => void;
};

function CollectionForm({
  defaultName,
  defaultColor,
  submitLabel,
  isPending,
  action,
  onCancel,
}: CollectionFormProps) {
  return (
    <form
      action={action}
      className="rounded-xl border bg-muted/20 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <label
            htmlFor={`collection-name-${defaultName}`}
            className="text-sm font-medium"
          >
            Collection name
          </label>

          <Input
            id={`collection-name-${defaultName}`}
            name="name"
            defaultValue={defaultName}
            placeholder="Example: Medical school"
            maxLength={50}
            required
            disabled={isPending}
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`collection-color-${defaultName}`}
            className="block text-sm font-medium"
          >
            Color
          </label>

          <input
            id={`collection-color-${defaultName}`}
            type="color"
            name="color"
            defaultValue={
              defaultColor ||
              DEFAULT_COLOR
            }
            disabled={isPending}
            className="h-10 w-full cursor-pointer rounded-md border bg-background p-1 sm:w-16"
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}

            {submitLabel}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            <X className="size-4" />
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}