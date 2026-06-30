export default function WorkspaceCard() {
  return (
    <div className="rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8">
      <p className="text-sm uppercase tracking-widest text-indigo-200">
        Workspace
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Personal
      </h2>

      <p className="mt-4 text-indigo-100">
        AI prompts, templates, variables and workflows all in one place.
      </p>
    </div>
  );
}