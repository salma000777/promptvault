const navigation = [
  "Dashboard",
  "Prompts",
  "Folders",
  "Favorites",
  "Templates",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold">
          Prompt<span className="text-indigo-400">Vault</span>
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item}>
              <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 transition hover:bg-slate-800 hover:text-white">
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}