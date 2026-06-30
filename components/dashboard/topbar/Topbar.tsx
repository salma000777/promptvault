import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div className="flex items-center gap-6">
        <WorkspaceSwitcher />

        <SearchBar />
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl border border-slate-700 px-4 py-3 hover:border-indigo-500">
          🔔
        </button>

        <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-500">
          + New Prompt
        </button>

        <UserMenu />
      </div>
    </header>
  );
}