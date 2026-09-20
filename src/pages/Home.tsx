import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Award,
  ChefHat,
  Quote,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealText, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/media/SmartImage";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DishCard } from "@/components/site/DishCard";
import { Testimonials } from "@/components/site/Testimonials";
import { HoursPanel } from "@/components/site/HoursPanel";
import { MapPanel } from "@/components/site/MapPanel";
import { Marquee } from "@/components/site/Marquee";
import { useSite } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  const { content } = useSite();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const signatures = content.items.filter((item) => item.signature && item.available).slice(0, 4);
  const featured = content.items.filter((item) => item.featured).slice(0, 6);
  const galleryPreview = content.galleryImages.slice(0, 5);

  return (
    <>
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-125">
          <SmartImage
            src={content.hero.image}
            alt={`${content.brand.name} dining room`}
            ratio="auto"
            priority
            className="h-full w-full"
            imgClassName="animate-slow-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/85 via-noir-950/70 to-noir-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950/85 via-transparent to-noir-950/60" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32"
        >
          <Reveal direction="up" duration={0.7}>
            <div className="flex items-center gap-4">
              <span className="rule-brass" />
              <span className="eyebrow">{content.hero.kicker}</span>
            </div>
          </Reveal>

          <h1 className="mt-7 max-w-4xl font-serif text-display-xl font-light leading-[1.06] text-cream">
            <RevealText text={content.hero.title} delay={0.15} />
          </h1>

          <Reveal delay={0.55} duration={0.9}>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream-soft/85 sm:text-lg">
              {content.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.7} duration={0.9}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/menu">
                  {content.hero.primaryCta}
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/reservations">{content.hero.secondaryCta}</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.9} duration={0.9}>
            <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {content.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-sans text-[0.58rem] uppercase tracking-luxe text-cream-muted/70">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-serif text-2xl font-light text-brass-200 sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-sans text-[0.55rem] uppercase tracking-luxe text-cream-muted/60">
              Scroll
            </span>
            <span className="relative block h-14 w-px overflow-hidden bg-white/15">
              <motion.span
                className="absolute inset-x-0 top-0 h-5 bg-brass-400"
                animate={{ y: ["-100%", "360%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════ ACCOLADES ════════════════════════ */}
      <Marquee
        items={[
          content.brand.michelin,
          "Gault & Millau — 4 Toques",
          "World's 50 Best — Discovery",
          "Wine List of the Year 2025",
          "La Liste Top 1000",
        ]}
      />

      {/* ═══════════════════════ SIGNATURE DISHES ═══════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            kicker={content.signature.kicker}
            title={content.signature.title}
            subtitle={content.signature.subtitle}
          />

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signatures.map((item) => (
              <StaggerItem key={item.id}>
                <DishCard item={item} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.2} className="mt-12 text-center">
            <Button asChild variant="link" size="sm">
              <Link to="/menu">
                See the full carte
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════ CHEF ══════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-noir-900/25 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-noir-fade" />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="right" className="relative">
              <div className="relative">
                <SmartImage
                  src={content.chef.image}
                  alt={content.chef.name}
                  ratio="tall"
                  className="border border-white/[0.08]"
                />
                <div className="pointer-events-none absolute inset-0 border border-brass-400/20" />
                <div className="absolute -bottom-6 -right-4 border border-brass-400/30 bg-noir-950/95 px-6 py-5 backdrop-blur-sm sm:-right-6">
                  <Quote className="size-4 text-brass-400" />
                  <p className="mt-3 max-w-[15rem] font-serif text-base italic leading-relaxed text-cream">
                    “{content.chef.quote}”
                  </p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="rule-brass" />
                  <span className="eyebrow">{content.chef.kicker}</span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="mt-5 font-serif text-display-md font-light text-balance text-cream">
                  {content.chef.title}
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-7 flex items-center gap-4 border-l border-brass-400/40 pl-5">
                  <div>
                    <p className="font-serif text-xl text-cream">{content.chef.name}</p>
                    <p className="mt-1 font-sans text-[0.62rem] uppercase tracking-luxe text-brass-400/90">
                      {content.chef.role}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-7 text-pretty text-sm leading-relaxed text-cream-muted sm:text-[0.95rem]">
                  {content.chef.bio}
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <ul className="mt-9 space-y-3">
                  {content.chef.accolades.map((award) => (
                    <li key={award} className="flex items-center gap-3 text-sm text-cream-soft/85">
                      <Award className="size-4 shrink-0 text-brass-400/80" strokeWidth={1.4} />
                      {award}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.32}>
                <Button asChild variant="outline" size="md" className="mt-10">
                  <Link to="/about">Read our story</Link>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════ STORY ═════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="rule-brass" />
                  <span className="eyebrow">{content.story.kicker}</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-serif text-display-md font-light text-balance text-cream">
                  {content.story.title}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex items-center gap-5">
                  <span className="gold-text font-serif text-5xl font-light">
                    {content.story.since}
                  </span>
                  <span className="max-w-[9rem] font-sans text-[0.6rem] uppercase leading-relaxed tracking-wide2 text-cream-muted">
                    Welcoming guests on the Rue des Lanternes
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <SmartImage
                  src={content.story.image}
                  alt="Dining room"
                  ratio="landscape"
                  zoom
                  className="group mt-10 border border-white/[0.08]"
                />
              </Reveal>
            </div>

            <div className="space-y-7">
              {content.story.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-pretty text-base leading-[1.95] text-cream-muted sm:text-[1.05rem]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.2}>
                <div className="grid gap-5 border-t border-white/[0.08] pt-9 sm:grid-cols-3">
                  {[
                    { icon: UtensilsCrossed, label: "Courses nightly", value: "9" },
                    { icon: ChefHat, label: "In the kitchen", value: "14" },
                    { icon: Star, label: "Guest rating", value: "4.9" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-start gap-3">
                      <stat.icon className="mt-1 size-4 text-brass-400/80" strokeWidth={1.4} />
                      <div>
                        <p className="font-serif text-2xl font-light text-cream">{stat.value}</p>
                        <p className="mt-1 font-sans text-[0.58rem] uppercase tracking-wide2 text-cream-muted/70">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURED MENU ═════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-noir-900/25 py-20 sm:py-28">
        <div className="container relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              kicker={content.featured.kicker}
              title={content.featured.title}
              subtitle={content.featured.subtitle}
              className="max-w-xl"
            />
            <Reveal delay={0.2}>
              <Button asChild variant="outline" size="md" className="shrink-0">
                <Link to="/menu">
                  Full menu
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <StaggerItem key={item.id}>
                <DishCard item={item} compact className="h-full" />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-brass-400/25 bg-gradient-to-r from-brass-500/[0.08] to-transparent p-7 sm:flex-row sm:items-center">
              <div>
                <p className="eyebrow">Chef's choice</p>
                <h3 className="mt-3 font-serif text-2xl font-light text-cream">
                  {content.menuPage.tastingMenuTitle}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream-muted">
                  {content.menuPage.tastingMenuDescription}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-4xl font-light text-brass-200">
                  {formatPrice(content.menuPage.tastingMenuPrice)}
                </p>
                <p className="mt-1 font-sans text-[0.58rem] uppercase tracking-luxe text-cream-muted/70">
                  per guest
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═════════════════════════ GALLERY ═════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            kicker={content.gallery.kicker}
            title={content.gallery.title}
            subtitle={content.gallery.subtitle}
          />

          <Reveal className="mt-14">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
              <Link
                to="/gallery"
                className="group relative col-span-2 row-span-2 overflow-hidden border border-white/[0.07] lg:col-span-2"
              >
                <SmartImage
                  src={galleryPreview[0]?.image ?? content.hero.image}
                  alt={galleryPreview[0]?.caption ?? "Dining room"}
                  ratio="auto"
                  zoom
                  className="h-full min-h-[18rem] w-full lg:min-h-[30rem]"
                  overlay="soft"
                />
                <span className="absolute bottom-5 left-5 font-sans text-[0.6rem] uppercase tracking-luxe text-cream/80">
                  {galleryPreview[0]?.caption}
                </span>
              </Link>

              {galleryPreview.slice(1).map((image) => (
                <Link
                  key={image.id}
                  to="/gallery"
                  className="group relative overflow-hidden border border-white/[0.07]"
                >
                  <SmartImage
                    src={image.image}
                    alt={image.caption}
                    ratio="auto"
                    zoom
                    className="h-full min-h-[9rem] w-full"
                    overlay="soft"
                  />
                  <span className="absolute bottom-3 left-3 font-sans text-[0.55rem] uppercase tracking-wide2 text-cream/75">
                    {image.caption}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 text-center">
            <Button asChild variant="outline" size="md">
              <Link to="/gallery">View full gallery</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ═════════════════════ */}
      <Testimonials />

      {/* ═══════════════════ HOURS & LOCATION ═══════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                kicker={content.hours.kicker}
                title={content.hours.title}
                className="max-w-md"
              />
              <Reveal delay={0.15} className="mt-10">
                <HoursPanel />
              </Reveal>
            </div>

            <div>
              <SectionHeading
                align="left"
                kicker={content.location.kicker}
                title={content.location.title}
                subtitle={content.location.description}
                className="max-w-md"
              />
              <Reveal delay={0.15} className="mt-10">
                <MapPanel />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ RESERVATION CTA ════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src={content.story.image}
            alt="Restaurant interior"
            ratio="auto"
            className="h-full w-full"
            imgClassName="opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-noir-950/85 to-noir-950" />
        </div>

        <div className="container relative py-24 text-center sm:py-32">
          <Reveal>
            <span className="eyebrow">Reservations</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-3xl font-serif text-display-lg font-light text-balance text-cream">
              {content.reservationCta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-cream-muted sm:text-base">
              {content.reservationCta.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg">
                <Link to="/reservations">Reserve a Table</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${content.contact.phone.replace(/\s/g, "")}`}>
                  Call {content.contact.phone}
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-7 font-sans text-[0.65rem] uppercase tracking-wide2 text-cream-muted/60">
              {content.reservationCta.note}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
