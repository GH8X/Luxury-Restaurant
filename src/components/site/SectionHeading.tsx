import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  children,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? (
        <Reveal direction="up" duration={0.6}>
          <div
            className={cn(
              "flex items-center gap-3",
              centered && "justify-center",
            )}
          >
            <span className="rule-brass" />
            <span className="eyebrow">{kicker}</span>
            {centered ? <span className="rule-brass" /> : null}
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-5 font-serif text-display-md font-light text-balance text-cream",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-cream-muted sm:text-base">
            {subtitle}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
