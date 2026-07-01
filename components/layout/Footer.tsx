export default function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} PromptVault. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}