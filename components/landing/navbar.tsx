import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo href />

        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a
            href="#features"
            className="transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="transition hover:text-white"
          >
            Pricing
          </a>

          <a
            href="#faq"
            className="transition hover:text-white"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">
              Log in
            </Button>
          </Link>

          <Link href="/signup">
            <Button>
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}