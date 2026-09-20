import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { content } = useSite();
  const list = content.testimonialsList;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => {
      setIndex((prev) => (prev + dir + list.length) % list.length);
    },
    [list.length],
  );

  useEffect(() => {
    if (paused || list.length < 2) return;
    const timer = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(timer);
  }, [go, paused, list.length]);

  if (!list.length) return null;
  const active = list[index];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-noir-900/30 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-noir-fade" />
      <div className="container relative">
        <SectionHeading kicker={content.testimonials.kicker} title={content.testimonials.title} />

        <div
          className="mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[19rem] sm:min-h-[15rem]">
            <Quote className="mx-auto mb-7 size-7 text-brass-400/50" strokeWidth={1.2} />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center gap-1.5">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-brass-400 text-brass-400" />
                  ))}
                </div>
                <p className="text-balance font-serif text-xl font-light italic leading-relaxed text-cream sm:text-2xl">
                  “{active.quote}”
                </p>
                <footer className="mt-8">
                  <p className="font-sans text-[0.7rem] uppercase tracking-luxe text-brass-300">
                    {active.author}
                  </p>
                  <p className="mt-1.5 text-[0.72rem] text-cream-muted">{active.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="grid size-10 place-items-center border border-white/10 text-cream-muted transition-all duration-500 hover:border-brass-400/60 hover:text-brass-300"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2.5">
              {list.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-px transition-all duration-500 ease-luxe",
                    i === index ? "w-10 bg-brass-400" : "w-5 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="grid size-10 place-items-center border border-white/10 text-cream-muted transition-all duration-500 hover:border-brass-400/60 hover:text-brass-300"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
