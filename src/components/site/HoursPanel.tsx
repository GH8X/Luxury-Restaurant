import { Clock } from "lucide-react";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function HoursPanel({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { content } = useSite();
  const today = DAY_ORDER[(new Date().getDay() + 6) % 7];

  return (
    <div className={cn("border border-white/[0.08] bg-white/[0.02]", className)}>
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-5">
        <Clock className="size-4 text-brass-400" />
        <span className="eyebrow">Opening Hours</span>
      </div>

      <ul className="divide-y divide-white/[0.05]">
        {content.openingHours.map((hour) => {
          const isToday = hour.day === today;
          return (
            <li
              key={hour.id}
              className={cn(
                "flex items-center justify-between gap-4 px-6 py-3.5 transition-colors",
                isToday && "bg-brass-400/[0.07]",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "font-sans text-[0.72rem] uppercase tracking-wide2",
                    isToday ? "text-brass-300" : "text-cream-muted",
                  )}
                >
                  {hour.day}
                </span>
                {isToday ? (
                  <span className="font-sans text-[0.55rem] uppercase tracking-luxe text-brass-400/80">
                    Today
                  </span>
                ) : null}
              </span>

              <span className="text-right">
                <span className={cn("text-sm", hour.closed ? "text-cream-muted/45" : "text-cream")}>
                  {hour.closed ? "Closed" : `${hour.opens} – ${hour.closes}`}
                </span>
                {!compact && hour.note ? (
                  <span className="mt-0.5 block text-[0.65rem] text-cream-muted/60">{hour.note}</span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>

      {!compact ? (
        <p className="border-t border-white/[0.07] px-6 py-4 text-[0.7rem] leading-relaxed text-cream-muted/70">
          {content.hours.note}
        </p>
      ) : null}
    </div>
  );
}
