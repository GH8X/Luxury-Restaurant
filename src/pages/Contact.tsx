import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { MapPanel } from "@/components/site/MapPanel";
import { HoursPanel } from "@/components/site/HoursPanel";
import { useSite } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

const SUBJECTS = [
  "General enquiry",
  "Reservation change",
  "Private dining & events",
  "Press & partnerships",
  "Careers",
];

export default function Contact() {
  const { content } = useSite();
  const { contact } = content;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  const cards = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsapp,
      href: whatsappLink(contact.whatsapp, `Hello ${content.brand.name}, I have a question.`),
    },
    {
      icon: Clock,
      label: "Service",
      value: "Tue – Sun, from 19:00",
      href: "#hours",
    },
  ];

  return (
    <>
      <PageHeader
        kicker={content.contactPage.kicker}
        title={content.contactPage.title}
        subtitle={content.contactPage.subtitle}
        image={content.galleryImages[4]?.image ?? content.hero.image}
        breadcrumb="Contact"
      />

      <section className="pb-20 sm:pb-28">
        <div className="container">
          {/* Contact cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.07}>
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex h-full flex-col border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-700 ease-luxe hover:border-brass-400/40 hover:bg-white/[0.045]"
                >
                  <card.icon className="size-5 text-brass-400/85" strokeWidth={1.4} />
                  <span className="mt-5 font-sans text-[0.58rem] uppercase tracking-luxe text-cream-muted/70">
                    {card.label}
                  </span>
                  <span className="mt-2 font-serif text-lg leading-snug text-cream transition-colors group-hover:text-brass-200">
                    {card.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Enquiry form */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="rule-brass" />
                  <span className="eyebrow">Send a message</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-serif text-display-md font-light text-cream">
                  We answer every message personally
                </h2>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-9 border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-10 text-center"
                      >
                        <CheckCircle2 className="mx-auto size-10 text-brass-300" strokeWidth={1.2} />
                        <h3 className="mt-6 font-serif text-2xl font-light text-cream">
                          Message sent
                        </h3>
                        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cream-muted">
                          Thank you {form.name.split(" ")[0] || "for writing"}. A member of the team
                          will reply to {form.email || "your email"} within one working day.
                        </p>
                        <Button
                          variant="outline"
                          size="md"
                          className="mt-8"
                          onClick={() => {
                            setSent(false);
                            setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
                          }}
                        >
                          Write another message
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={submit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-5"
                      >
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field label="Name">
                            <Input
                              required
                              value={form.name}
                              onChange={(e) => set("name", e.target.value)}
                              placeholder="Your name"
                            />
                          </Field>
                          <Field label="Email">
                            <Input
                              required
                              type="email"
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                              placeholder="you@example.com"
                            />
                          </Field>
                        </div>

                        <Field label="Subject">
                          <NativeSelect
                            value={form.subject}
                            onChange={(e) => set("subject", e.target.value)}
                          >
                            {SUBJECTS.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </NativeSelect>
                        </Field>

                        <Field label="Message">
                          <Textarea
                            required
                            value={form.message}
                            onChange={(e) => set("message", e.target.value)}
                            placeholder="How can we help?"
                            className="min-h-36"
                          />
                        </Field>

                        <Button type="submit" size="lg" className="w-full sm:w-auto">
                          <Send className="size-4" />
                          Send message
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside id="hours" className="scroll-mt-32 space-y-6">
              <Reveal direction="left">
                <HoursPanel />
              </Reveal>

              <Reveal direction="left" delay={0.08}>
                <div className="border border-brass-400/25 bg-gradient-to-br from-brass-500/[0.09] to-transparent p-7">
                  <p className="eyebrow">Private dining</p>
                  <h3 className="mt-4 font-serif text-2xl font-light text-cream">
                    The cellar table for twelve
                  </h3>
                  <p className="mt-4 text-[0.82rem] leading-relaxed text-cream-muted">
                    {content.contactPage.privateDining}
                  </p>
                  <Button asChild variant="outline" size="md" className="mt-6 w-full">
                    <a
                      href={whatsappLink(
                        contact.whatsapp,
                        `Hello ${content.brand.name}, I would like to enquire about private dining.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Enquire on WhatsApp
                    </a>
                  </Button>
                </div>
              </Reveal>
            </aside>
          </div>

          <Reveal className="mt-16">
            <MapPanel />
          </Reveal>
        </div>
      </section>
    </>
  );
}
