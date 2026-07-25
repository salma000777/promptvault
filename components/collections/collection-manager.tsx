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

type CollectionFormProps = {
  defaultName: string;
  defaultColor: string;
  submitLabel: string;
  isPending: boolean;
  action: (formData: FormData) => void;
  onCancel: () => void;
};

const DEFAULT_COLOR = "#8b5cf6";

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

  function openCreateForm() {
    setIsCreating(true);
    setEditingId(null);
    setError(null);
  }

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[linear-gradient(145deg,rgba(255,255,255,0.042),rgba(255,255,255,0.015))] shadow-xl shadow-black/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-28 size-72 rounded-full bg-violet-500/[0.055] blur-3xl"
      />

      <header className="relative flex flex-col gap-4 border-b border-white/[0.055] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Folder className="size-[18px] text-violet-300" />

            <h2 className="text-base font-semibold text-slate-100">
              Collections
            </h2>
          </div>

          <p className="mt-1.5 text-sm text-slate-500">
            Organize prompts into reusable
            workspaces.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={openCreateForm}
          disabled={isPending || isCreating}
          className="rounded-xl border-white/[0.08] bg-white/[0.035] text-slate-200 shadow-none hover:border-violet-400/20 hover:bg-violet-500/10 hover:text-violet-100"
        >
          <Plus className="size-4" />
          New collection
        </Button>
      </header>

      <div className="relative p-4 sm:p-5">
        {error ? (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {isCreating ? (
          <CollectionForm
            submitLabel="Create"
            defaultName=""
            defaultColor={DEFAULT_COLOR}
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
          <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-white/[0.08] bg-black/[0.08] px-6 py-10 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-3xl"
            />

            <div className="relative flex size-16 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/20">
              <Folder className="size-7" />
            </div>

            <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-slate-100">
              No collections yet
            </h3>

            <p className="relative mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create collections for coding,
              writing, marketing, studying, or
              any workflow you use.
            </p>

            <Button
              type="button"
              onClick={openCreateForm}
              className="relative mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 text-white shadow-lg shadow-violet-950/25 hover:brightness-110"
            >
              <Plus className="size-4" />
              Create your first collection
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {collections.map(
              (collection) => {
                const isEditing =
                  editingId === collection.id;

                if (isEditing) {
                  return (
                    <CollectionForm
                      key={collection.id}
                      submitLabel="Save"
                      defaultName={
                        collection.name
                      }
                      defaultColor={
                        collection.color
                      }
                      isPending={isPending}
                      onCancel={() => {
                        setEditingId(null);
                        setError(null);
                      }}
                      action={(formData) =>
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
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4 transition hover:border-violet-400/20 hover:bg-violet-500/[0.05]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035]"
                        style={{
                          color: collection.color,
                        }}
                      >
                        <Folder
                          className="size-5"
                          fill="currentColor"
                          fillOpacity={0.14}
                        />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-100">
                          {collection.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {collection.promptCount}{" "}
                          {collection.promptCount ===
                          1
                            ? "prompt"
                            : "prompts"}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingId(
                            collection.id
                          );
                          setIsCreating(false);
                          setError(null);
                        }}
                        disabled={isPending}
                        className="size-9 rounded-xl text-slate-500 hover:bg-white/[0.06] hover:text-slate-100"
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
                        disabled={isPending}
                        className="size-9 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-300"
                        aria-label={`Delete ${collection.name}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function CollectionForm({
  defaultName,
  defaultColor,
  submitLabel,
  isPending,
  action,
  onCancel,
}: CollectionFormProps) {
  const fieldId = defaultName
    ? `collection-${defaultName
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    : "collection-new";

  return (
    <form
      action={action}
      className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.045] p-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <label
            htmlFor={`${fieldId}-name`}
            className="text-sm font-medium text-slate-300"
          >
            Collection name
          </label>

          <Input
            id={`${fieldId}-name`}
            name="name"
            defaultValue={defaultName}
            placeholder="Example: Medical school"
            maxLength={50}
            required
            disabled={isPending}
            autoFocus
            className="h-11 rounded-xl border-white/[0.08] bg-black/15 text-slate-100 placeholder:text-slate-600"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`${fieldId}-color`}
            className="block text-sm font-medium text-slate-300"
          >
            Color
          </label>

          <input
            id={`${fieldId}-color`}
            type="color"
            name="color"
            defaultValue={
              defaultColor || DEFAULT_COLOR
            }
            disabled={isPending}
            className="h-11 w-full cursor-pointer rounded-xl border border-white/[0.08] bg-black/15 p-1.5 sm:w-16"
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 rounded-xl bg-violet-600 text-white hover:bg-violet-500"
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
            className="h-11 rounded-xl border-white/[0.08] bg-white/[0.025] text-slate-300 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="size-4" />
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}