export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-xl font-bold tracking-tight">
          Prompt<span className="text-indigo-400">Vault</span>
        </h1>

        <div className="flex items-center gap-4">
          <button className="text-slate-300 transition hover:text-white">
            Login
          </button>

          <button className="rounded-xl bg-indigo-600 px-4 py-2 font-medium transition hover:bg-indigo-500">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}