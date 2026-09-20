import { Link } from "react-router-dom";
import { CalendarClock, MessageCircle, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { ReservationForm } from "@/components/site/ReservationForm";
import { HoursPanel } from "@/components/site/HoursPanel";
import { SmartImage } from "@/components/media/SmartImage";
import { useSite } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

const STEPS = [
  {
    icon: CalendarClock,
    title: "Send your request",
    body: "Pick a date, time and party size. Tell us about allergies or the occasion — we read every note.",
  },
  {
    icon: Users,
    title: "We hold your table",
    body: "Our maître d' confirms by phone within two hours during service. Weekend tables are held for 20 minutes.",
  },
  {
    icon: MessageCircle,
    title: "Prefer WhatsApp?",
    body: "Send the same details on WhatsApp and we will reply with a confirmation and directions.",
  },
];

export default function Reservations() {
  const { content } = useSite();

  return (
    <>
      <PageHeader
        kicker="Reservations"
        title="Reserve your evening"
        subtitle={content.reservationCta.subtitle}
        image={content.galleryImages[4]?.image ?? content.hero.image}
        breadcrumb="Reservations"
      />

      <section className="pb-20 sm:pb-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            {/* Form */}
            <div>
              <Reveal>
                <ReservationForm />
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {STEPS.map((step) => (
                    <div key={step.title} className="border border-white/[0.08] bg-white/[0.02] p-6">
                      <step.icon className="size-5 text-brass-400/85" strokeWidth={1.4} />
                      <h3 className="mt-4 font-serif text-lg text-cream">{step.title}</h3>
                      <p className="mt-2.5 text-[0.78rem] leading-relaxed text-cream-muted">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Reveal direction="left">
                <div className="relative overflow-hidden border border-[#25D366]/25 bg-[#25D366]/[0.06] p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-[#25D366]/15 text-[#4ade80]">
                      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.005-.52-.062-.149-.664-1.6-.91-2.19-.24-.575-.484-.497-.664-.505l-.566-.01c-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487zM12.05 21.785a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zM20.463 3.488A11.78 11.78 0 0012.05 0C5.495 0 .16 5.334.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <div>
                      <p className="eyebrow">Fastest reply</p>
                      <p className="mt-1 font-serif text-xl text-cream">Reserve on WhatsApp</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[0.82rem] leading-relaxed text-cream-muted">
                    Message us directly and we will confirm your table on the spot during opening hours.
                  </p>
                  <Button asChild size="md" className="mt-6 w-full bg-[#25D366] text-noir-950 hover:bg-[#3ae07a]">
                    <a
                      href={whatsappLink(
                        content.contact.whatsapp,
                        `Hello ${content.brand.name}, I would like to reserve a table.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="size-4" />
                      Open WhatsApp
                    </a>
                  </Button>
                  <p className="mt-4 text-center font-sans text-[0.65rem] tracking-wide2 text-cream-muted/70">
                    {content.contact.whatsapp}
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.08}>
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-brass-400/40"
                >
                  <Phone className="size-5 text-brass-400/85" strokeWidth={1.4} />
                  <span>
                    <span className="block font-sans text-[0.6rem] uppercase tracking-luxe text-cream-muted">
                      Call the restaurant
                    </span>
                    <span className="mt-1 block font-serif text-xl text-cream">
                      {content.contact.phone}
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal direction="left" delay={0.14}>
                <HoursPanel />
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <div className="border border-white/[0.08] bg-white/[0.02] p-7">
                  <p className="eyebrow">Good to know</p>
                  <ul className="mt-5 space-y-3.5 text-[0.82rem] leading-relaxed text-cream-muted">
                    <li>Tables are released 60 days in advance.</li>
                    <li>Parties of 7 or more — please call us directly.</li>
                    <li>{content.location.dressCode}</li>
                    <li>Cancellations within 24 hours may incur a fee.</li>
                  </ul>
                  <Button asChild variant="link" size="sm" className="mt-5">
                    <Link to="/contact">Questions? Contact us</Link>
                  </Button>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Ambience strip */}
      <section className="relative overflow-hidden border-t border-white/[0.06]">
        <SmartImage
          src={content.galleryImages[1]?.image ?? content.hero.image}
          alt="Candlelit table"
          ratio="auto"
          className="h-[22rem] w-full sm:h-[28rem]"
          imgClassName="opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-noir-950/70" />
        <div className="container absolute inset-0 flex items-center">
          <Reveal>
            <blockquote className="max-w-2xl">
              <p className="font-serif text-2xl font-light italic leading-relaxed text-cream sm:text-4xl">
                “The best tables are the ones you book before you need an excuse.”
              </p>
              <footer className="mt-6 font-sans text-[0.62rem] uppercase tracking-luxe text-brass-400/90">
                {content.chef.name} — {content.chef.role}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>
    </>
  );
}
