import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

export function PageHeader({
  kicker,
  title,
  subtitle,
  image,
  breadcrumb,
  children,
  className,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-44", className)}>
      {image ? (
        <>
          <div className="absolute inset-0">
            <SmartImage
              src={image}
              alt={title}
              ratio="auto"
              priority
              className="h-full w-full"
              imgClassName="opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/92 via-noir-950/80 to-noir-950" />
        </>
      ) : (
        <div className="absolute inset-0 bg-noir-fade" />
      )}

      <div className="container relative">
        {breadcrumb ? (
          <Reveal direction="up" duration={0.5}>
            <nav className="mb-6 flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-luxe text-cream-muted/70">
              <Link to="/" className="transition-colors hover:text-brass-300">
                Home
              </Link>
              <ChevronRight className="size-3 text-brass-400/60" />
              <span className="text-brass-300">{breadcrumb}</span>
            </nav>
          </Reveal>
        ) : null}

        <div className="max-w-3xl">
          <Reveal direction="up" duration={0.5}>
            <div className="flex items-center gap-3">
              <span className="rule-brass" />
              <span className="eyebrow">{kicker}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-serif text-display-lg font-light text-balance text-cream">
              {title}
            </h1>
          </Reveal>
          {subtitle ? (
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-cream-muted sm:text-base">
                {subtitle}
              </p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.24}>{children}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
