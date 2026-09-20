import { SmartImage } from "@/components/media/SmartImage";
import type { MenuItem } from "@/data/content";
import { cn, formatPrice } from "@/lib/utils";

export function DishCard({
  item,
  className,
  compact = false,
}: {
  item: MenuItem;
  className?: string;
  compact?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border border-white/[0.07] bg-white/[0.015] transition-all duration-700 ease-luxe hover:border-brass-400/35 hover:bg-white/[0.035]",
        !item.available && "opacity-55",
        className,
      )}
    >
      <SmartImage
        src={item.image}
        alt={item.name}
        ratio={compact ? "landscape" : "portrait"}
        zoom
        className="border-b border-white/[0.06]"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-xl font-light leading-snug text-cream transition-colors duration-500 group-hover:text-brass-200">
            {item.name}
          </h3>
          <span className="shrink-0 font-serif text-lg text-brass-300">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-3 text-pretty text-[0.82rem] leading-relaxed text-cream-muted">
          {item.description}
        </p>

        {item.tags.length ? (
          <div className="mt-5 flex flex-wrap gap-2 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/[0.09] px-2.5 py-1 font-sans text-[0.58rem] uppercase tracking-wide2 text-cream-muted/80"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {!item.available ? (
          <span className="mt-4 font-sans text-[0.6rem] uppercase tracking-luxe text-wine-400">
            Currently unavailable
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function DishRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <div className="group grid grid-cols-1 gap-5 border-b border-white/[0.06] py-7 last:border-0 sm:grid-cols-[7rem_1fr] sm:gap-7">
      <SmartImage
        src={item.image}
        alt={item.name}
        ratio="square"
        zoom
        className="w-24 sm:w-full"
      />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-4">
          <span className="font-sans text-[0.6rem] tracking-luxe text-brass-400/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-xl font-light text-cream transition-colors group-hover:text-brass-200 sm:text-2xl">
            {item.name}
          </h3>
          <span className="mx-1 hidden h-px flex-1 bg-white/[0.09] sm:block" />
          <span className="ml-auto shrink-0 font-serif text-lg text-brass-300 sm:ml-0">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-2 pl-0 text-pretty text-[0.82rem] leading-relaxed text-cream-muted sm:pl-9">
          {item.description}
        </p>
        {item.tags.length ? (
          <div className="mt-3 flex flex-wrap gap-2 sm:pl-9">
            {item.tags.map((tag) => (
              <span key={tag} className="font-sans text-[0.58rem] uppercase tracking-wide2 text-brass-400/70">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
