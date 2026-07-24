import Link from "next/link";

type LogoProps = {
  href?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: {
    box: "h-8 w-8",
    text: "text-lg",
  },
  md: {
    box: "h-10 w-10",
    text: "text-xl",
  },
  lg: {
    box: "h-12 w-12",
    text: "text-2xl",
  },
};

export function Logo({
  href = false,
  size = "md",
}: LogoProps) {
  const logo = (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex ${sizes[size].box} items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary to-primary/70 shadow-xl shadow-primary/20`}
      >
        <div className="absolute inset-[4px] rounded-xl border border-white/10" />

        <div className="relative h-5 w-5">
          <div className="absolute inset-0 rounded-md border-2 border-white" />

          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-sm bg-white" />
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`${sizes[size].text} font-bold tracking-tight text-white`}
        >
          PromptVault
        </span>

        <span className="text-xs tracking-[0.25em] uppercase text-slate-500">
          AI Workspace
        </span>
      </div>
    </div>
  );

  if (!href) return logo;

  return <Link href="/">{logo}</Link>;
}