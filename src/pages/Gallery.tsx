import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/media/SmartImage";
import { PageHeader } from "@/components/site/PageHeader";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

const ratioFor = (ratio: string) =>
  ratio === "portrait" ? "portrait" : ratio === "landscape" ? "landscape" : "square";

export default function Gallery() {
  const { content } = useSite();
  const images = content.galleryImages;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => {
      setActive((prev) => (prev === null ? prev : (prev + dir + images.length) % images.length));
    },
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <PageHeader
        kicker={content.galleryPage.kicker}
        title={content.galleryPage.title}
        subtitle={content.galleryPage.subtitle}
        image={content.galleryImages[0]?.image ?? content.hero.image}
        breadcrumb="Gallery"
      />

      <section className="pb-20 sm:pb-28">
        <div className="container">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {images.map((image, i) => (
              <Reveal key={image.id} delay={(i % 3) * 0.08} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative block w-full overflow-hidden border border-white/[0.07] text-left transition-colors duration-500 hover:border-brass-400/40"
                >
                  <SmartImage
                    src={image.image}
                    alt={image.caption}
                    ratio={ratioFor(image.ratio) as "portrait" | "landscape" | "square"}
                    zoom
                    overlay="soft"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
                    <span className="font-sans text-[0.6rem] uppercase tracking-wide2 text-cream/85">
                      {image.caption}
                    </span>
                    <span className="grid size-7 shrink-0 place-items-center border border-white/20 bg-noir-950/60 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                      <Expand className="size-3.5" />
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-center gap-5 border border-white/[0.08] bg-white/[0.02] px-7 py-12 text-center">
              <p className="eyebrow">Private events</p>
              <h2 className="max-w-xl font-serif text-3xl font-light text-balance text-cream">
                The cellar table seats twelve, with a sommelier of your own
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-cream-muted">
                {content.contactPage.privateDining}
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/reservations">Enquire about private dining</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-noir-950/95 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 grid size-11 place-items-center border border-white/15 text-cream-muted transition-colors hover:border-brass-400/60 hover:text-brass-300"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 grid size-11 place-items-center border border-white/15 text-cream-muted transition-colors hover:border-brass-400/60 hover:text-brass-300 sm:left-7"
            >
              <ArrowLeft className="size-5" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 grid size-11 place-items-center border border-white/15 text-cream-muted transition-colors hover:border-brass-400/60 hover:text-brass-300 sm:right-7"
            >
              <ArrowRight className="size-5" />
            </button>

            <motion.figure
              key={images[active].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[active].image.replace(/w=\d+/, "w=1600")}
                alt={images[active].caption}
                className="mx-auto max-h-[74vh] w-auto border border-white/10 object-contain"
              />
              <figcaption className="mt-5 flex items-center justify-between gap-4">
                <span className="font-sans text-[0.65rem] uppercase tracking-luxe text-cream-muted">
                  {images[active].caption}
                </span>
                <span className={cn("font-sans text-[0.65rem] tracking-wide2 text-brass-400/80")}>
                  {active + 1} / {images.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
