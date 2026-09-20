import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { useSite } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

const LINKS = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Owner Login" },
];

export function Footer() {
  const { content } = useSite();
  const { contact, brand, openingHours } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-noir-950">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brass-400/40 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brass-500/[0.06] blur-3xl" />

      <div className="container relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" direction="up">
            <Link to="/" className="inline-flex items-baseline gap-3">
              <span className="font-serif text-3xl tracking-[0.18em] text-cream">
                {brand.wordmark.toUpperCase()}
              </span>
            </Link>
            <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-luxe text-brass-400">
              {brand.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-muted">
              {content.story.paragraphs[0]?.slice(0, 160)}…
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center border border-white/10 text-cream-muted transition-all duration-500 hover:border-brass-400/60 hover:text-brass-300"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center border border-white/10 text-cream-muted transition-all duration-500 hover:border-brass-400/60 hover:text-brass-300"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={whatsappLink(contact.whatsapp, `Hello ${brand.name}, I would like to reserve a table.`)}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center border border-white/10 text-cream-muted transition-all duration-500 hover:border-brass-400/60 hover:text-brass-300"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.005-.52-.062-.149-.664-1.6-.91-2.19-.24-.575-.484-.497-.664-.505l-.566-.01c-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zM20.463 3.488A11.78 11.78 0 0012.05 0C5.495 0 .16 5.334.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" direction="up" delay={0.08}>
            <h3 className="eyebrow">Explore</h3>
            <ul className="mt-5 space-y-3">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-cream-muted transition-colors hover:text-brass-300"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3" direction="up" delay={0.14}>
            <h3 className="eyebrow">Visit</h3>
            <ul className="mt-5 space-y-4 text-sm text-cream-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brass-400/80" />
                <span>
                  {contact.address}
                  <br />
                  {contact.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brass-400/80" />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-brass-300">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brass-400/80" />
                <a href={`mailto:${contact.email}`} className="hover:text-brass-300">
                  {contact.email}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3" direction="up" delay={0.2}>
            <h3 className="eyebrow">Opening Hours</h3>
            <ul className="mt-5 space-y-2 font-sans text-sm">
              {openingHours.map((hour) => (
                <li key={hour.id} className="flex items-baseline justify-between gap-4 border-b border-white/[0.05] pb-2">
                  <span className="text-cream-muted">{hour.day}</span>
                  <span className={hour.closed ? "text-cream-muted/50" : "text-cream"}>
                    {hour.closed ? "Closed" : `${hour.opens} – ${hour.closes}`}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-[0.7rem] leading-relaxed text-cream-muted/70">
              <Clock className="mt-0.5 size-3.5 shrink-0 text-brass-400/70" />
              {content.hours.note}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[0.68rem] tracking-wide text-cream-muted/60">
            © {year} {brand.name}. {brand.michelin}.
          </p>
          <p className="font-sans text-[0.68rem] tracking-wide text-cream-muted/45">
            Demo website built for presentation purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
