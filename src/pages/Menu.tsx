import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Leaf, Wine } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { DishRow, DishCard } from "@/components/site/DishCard";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSite } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function Menu() {
  const { content } = useSite();
  const page = content.menuPage;

  return (
    <>
      <PageHeader
        kicker={page.kicker}
        title={page.title}
        subtitle={page.subtitle}
        image={content.galleryImages[3]?.image ?? content.hero.image}
        breadcrumb="Menu"
      />

      {/* Tasting menu */}
      <section className="border-y border-white/[0.06] bg-noir-900/25 py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="rule-brass" />
                  <span className="eyebrow">Chef's choice</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-serif text-display-md font-light text-cream">
                  {page.tastingMenuTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-cream-muted sm:text-base">
                  {page.tastingMenuDescription}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex items-end gap-4">
                  <span className="font-serif text-5xl font-light text-brass-200">
                    {formatPrice(page.tastingMenuPrice)}
                  </span>
                  <span className="pb-2 font-sans text-[0.6rem] uppercase tracking-luxe text-cream-muted/70">
                    per guest
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <Button asChild size="lg" className="mt-9">
                  <Link to="/reservations">Reserve the tasting menu</Link>
                </Button>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <ol className="divide-y divide-white/[0.07] border border-white/[0.08] bg-white/[0.02]">
                {page.tastingMenuCourses.map((course, i) => (
                  <li key={course} className="flex items-center gap-4 px-6 py-4">
                    <span className="font-sans text-[0.6rem] tracking-luxe text-brass-400/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-cream-soft/90">{course}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Carte */}
      <section className="py-16 sm:py-24">
        <div className="container">
          {/* Category rail for quick scanning */}
          <Reveal>
            <div className="sticky top-16 z-20 -mx-5 mb-4 overflow-x-auto border-b border-white/[0.07] bg-noir-950/90 px-5 py-3 backdrop-blur-lg sm:top-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max gap-2">
                {content.categories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="border border-white/[0.09] px-4 py-2 font-sans text-[0.62rem] uppercase tracking-wide2 text-cream-muted transition-all duration-500 hover:border-brass-400/50 hover:text-brass-300"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-20">
            {content.categories.map((category, catIndex) => {
              const items = content.items.filter((item) => item.categoryId === category.id);
              if (!items.length) return null;

              return (
                <div key={category.id} id={category.id} className="scroll-mt-32">
                  <SectionHeading
                    align="left"
                    kicker={`Course ${String(catIndex + 1).padStart(2, "0")}`}
                    title={category.name}
                    subtitle={category.tagline}
                    className="max-w-lg"
                  />

                  {/* Hero plates for the category */}
                  {catIndex % 2 === 0 ? (
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.slice(0, 3).map((item, i) => (
                        <Reveal key={item.id} delay={i * 0.08}>
                          <DishCard item={item} compact className="h-full" />
                        </Reveal>
                      ))}
                    </div>
                  ) : null}

                  {catIndex % 2 === 0 ? (
                    <div className="mt-10 border-t border-white/[0.06]">
                      {items.slice(3).map((item, i) => (
                        <DishRow key={item.id} item={item} index={i + 3} />
                      ))}
                      {items.length <= 3 ? (
                        <p className="py-6 text-sm text-cream-muted/70">
                          This section is served straight from the pass — ask your server for today's
                          additions.
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <div className="mt-10 border-t border-white/[0.06]">
                      {items.map((item, i) => (
                        <DishRow key={item.id} item={item} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="border-t border-white/[0.06] bg-noir-900/25 py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "Dietary requirements",
                body: "Vegetarian, vegan and gluten-free versions of most plates are available. Please tell us 24 hours ahead so the kitchen can prepare properly.",
              },
              {
                icon: Wine,
                title: "The cellar",
                body: "480 labels across eleven regions, with 38 available by the glass. Our sommelier is happy to build a pairing for your table.",
              },
              {
                icon: Check,
                title: "Service included",
                body: "Prices are in euros and include service. Allergen information for every dish is available on request.",
              },
            ].map((note, i) => (
              <Reveal key={note.title} delay={i * 0.08}>
                <div className="h-full border border-white/[0.08] bg-white/[0.02] p-7">
                  <note.icon className="size-5 text-brass-400/85" strokeWidth={1.4} />
                  <h3 className="mt-5 font-serif text-xl font-light text-cream">{note.title}</h3>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-cream-muted">{note.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
