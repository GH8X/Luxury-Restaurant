import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-white/[0.07] bg-noir-900/40 py-5",
        className,
      )}
    >
      <div className="flex min-w-max animate-marquee-x items-center gap-14 pr-14">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-14 font-sans text-[0.68rem] uppercase tracking-luxe text-cream-muted/80"
          >
            {item}
            <span className="size-1 rotate-45 bg-brass-400/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-noir-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-noir-950 to-transparent" />
    </div>
  );
}
