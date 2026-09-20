import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/media/SmartImage";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useSite } from "@/lib/store";

export default function About() {
  const { content } = useSite();
  const page = content.aboutPage;
  const strip = content.galleryImages.slice(0, 4);

  return (
    <>
      <PageHeader
        kicker={page.kicker}
        title={page.title}
        subtitle={page.lead}
        image={content.story.image}
        breadcrumb="About"
      />

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-7">
              {content.story.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-pretty text-base leading-[1.95] text-cream-muted sm:text-[1.05rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <div className="flex items-center gap-5 border-t border-white/[0.08] pt-8">
                  <span className="gold-text font-serif text-5xl font-light">
                    {content.story.since}
                  </span>
                  <span className="max-w-[11rem] font-sans text-[0.6rem] uppercase leading-relaxed tracking-wide2 text-cream-muted">
                    Years of service on the Rue des Lanternes
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" className="relative">
              <SmartImage
                src={content.galleryImages[1]?.image ?? content.hero.image}
                alt="The dining room"
                ratio="portrait"
                className="border border-white/[0.08]"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                {strip.slice(2, 4).map((image) => (
                  <SmartImage
                    key={image.id}
                    src={image.image}
                    alt={image.caption}
                    ratio="square"
                    zoom
                    className="group border border-white/[0.08]"
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-white/[0.06] bg-noir-900/25 py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            kicker="What we believe"
            title="Four things we refuse to compromise on"
            subtitle="They are not marketing lines. They are the reasons the kitchen costs what it does and why regulars keep the same table."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {page.values.map((value, i) => (
              <Reveal key={value.id} delay={i * 0.08}>
                <div className="group h-full border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-700 ease-luxe hover:border-brass-400/30 hover:bg-white/[0.04] sm:p-9">
                  <span className="font-serif text-3xl font-light text-brass-400/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-light text-cream">{value.title}</h3>
                  <p className="mt-4 text-[0.85rem] leading-relaxed text-cream-muted">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <SectionHeading
                align="left"
                kicker="Our story"
                title="Twenty-six years, one street corner"
                className="max-w-sm"
              />
            </div>

            <ol className="relative border-l border-white/[0.09] pl-8">
              {page.timeline.map((entry, i) => (
                <Reveal key={entry.id} delay={i * 0.1}>
                  <li className="relative pb-11 last:pb-0">
                    <span className="absolute -left-[2.15rem] top-1.5 grid size-3 place-items-center">
                      <span className="absolute size-3 rounded-full bg-brass-400/25" />
                      <span className="size-1.5 rounded-full bg-brass-400" />
                    </span>
                    <p className="font-sans text-[0.62rem] uppercase tracking-luxe text-brass-400/90">
                      {entry.year}
                    </p>
                    <h3 className="mt-2.5 font-serif text-2xl font-light text-cream">{entry.title}</h3>
                    <p className="mt-3 max-w-lg text-[0.85rem] leading-relaxed text-cream-muted">
                      {entry.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Chef feature */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-noir-900/25 py-20 sm:py-28">
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="right">
              <SmartImage
                src={content.chef.image}
                alt={content.chef.name}
                ratio="landscape"
                className="border border-white/[0.08]"
              />
            </Reveal>

            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="rule-brass" />
                  <span className="eyebrow">{content.chef.kicker}</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-serif text-display-md font-light text-cream">
                  {content.chef.name}
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-2 font-sans text-[0.62rem] uppercase tracking-luxe text-brass-400/90">
                  {content.chef.role}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <blockquote className="mt-8 border-l border-brass-400/40 pl-6">
                  <Quote className="size-4 text-brass-400/70" />
                  <p className="mt-3 font-serif text-xl font-light italic leading-relaxed text-cream">
                    {content.chef.quote}
                  </p>
                </blockquote>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="mt-7 text-pretty text-sm leading-relaxed text-cream-muted sm:text-[0.95rem]">
                  {content.chef.bio}
                </p>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="mt-9 flex flex-wrap gap-3">
                  {content.chef.accolades.map((award) => (
                    <span
                      key={award}
                      className="border border-brass-400/25 px-3.5 py-2 font-sans text-[0.6rem] uppercase tracking-wide2 text-brass-200/90"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.38}>
                <Button asChild variant="outline" size="md" className="mt-10">
                  <Link to="/menu">Explore the carte</Link>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
