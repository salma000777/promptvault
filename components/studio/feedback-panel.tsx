import type { ReactNode } from "react";

type FeedbackPanelProps = {
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
  tone:
    | "positive"
    | "negative"
    | "recommendation";
};

export default function FeedbackPanel({
  title,
  description,
  icon,
  items,
  tone,
}: FeedbackPanelProps) {
  const toneClasses = {
    positive:
      "border-emerald-400/10 bg-emerald-500/[0.035]",

    negative:
      "border-red-400/10 bg-red-500/[0.035]",

    recommendation:
      "border-amber-400/10 bg-amber-500/[0.025]",
  };

  return (
    <div
      className="
      rounded-[26px]
      border
      border-white/[0.08]
      bg-white/[0.025]
      p-5
      backdrop-blur-xl
      sm:p-6"
    >
      <div className="flex items-start gap-3">
        <div
          className="
          flex
          size-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-white/[0.07]
          bg-white/[0.04]"
        >
          {icon}
        </div>

        <div>
          <h3 className="text-base font-semibold">
            {title}
          </h3>

          <p
            className="
            mt-0.5
            text-xs
            text-muted-foreground"
          >
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className={`rounded-2xl border px-4 py-3.5 ${toneClasses[tone]}`}
            >
              <div className="flex gap-3">
                <span
                  className="
                  mt-2
                  size-1.5
                  shrink-0
                  rounded-full
                  bg-current
                  opacity-60"
                />

                <p
                  className="
                  text-sm
                  leading-6
                  text-muted-foreground"
                >
                  {item}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.02]
            px-4
            py-4
            text-sm
            text-muted-foreground"
          >
            No items were identified.
          </div>
        )}
      </div>
    </div>
  );
}