import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/field";
import { useSite } from "@/lib/store";
import { cn, formatDateLong, todayISO, whatsappLink } from "@/lib/utils";

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30",
  "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  guests: string;
  date: string;
  time: string;
  request: string;
};

const emptyForm = (): FormState => ({
  name: "",
  phone: "",
  email: "",
  guests: "2",
  date: todayISO(1),
  time: "20:00",
  request: "",
});

export function ReservationForm({ className }: { className?: string }) {
  const { content, addReservation } = useSite();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const waMessage = useMemo(() => {
    const lines = [
      `Reservation request — ${content.brand.name}`,
      "",
      `Name: ${form.name || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Guests: ${form.guests}`,
      `Date: ${form.date ? formatDateLong(form.date) : "—"}`,
      `Time: ${form.time}`,
    ];
    if (form.request) lines.push(`Notes: ${form.request}`);
    return lines.join("\n");
  }, [content.brand.name, form]);

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter the name for the booking.";
    if (form.phone.replace(/[^\d]/g, "").length < 6) next.phone = "Please enter a reachable phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "That email looks incomplete.";
    if (Number(form.guests) < 1) next.guests = "At least one guest, please.";
    if (!form.date) next.date = "Choose a date.";
    else if (form.date < todayISO()) next.date = "Please choose a date from today onwards.";
    if (!form.time) next.time = "Choose a time.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    window.setTimeout(() => {
      addReservation({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        guests: Number(form.guests),
        date: form.date,
        time: form.time,
        request: form.request.trim(),
      });
      setStatus("done");
    }, 700);
  };

  return (
    <div className={cn("relative border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-9", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-400/50 to-transparent" />

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-6 text-center"
          >
            <CheckCircle2 className="mx-auto size-11 text-brass-300" strokeWidth={1.2} />
            <h3 className="mt-6 font-serif text-3xl font-light text-cream">Request received</h3>
            <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-cream-muted">
              Thank you, {form.name.split(" ")[0]}. We have your table for{" "}
              <span className="text-cream">{form.guests}</span> on{" "}
              <span className="text-cream">{formatDateLong(form.date)}</span> at{" "}
              <span className="text-cream">{form.time}</span>. Our maître d' will confirm by phone within two hours.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="md" variant="primary">
                <a href={whatsappLink(content.contact.whatsapp, waMessage)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  Confirm on WhatsApp
                </a>
              </Button>
              <Button
                size="md"
                variant="outline"
                onClick={() => {
                  setForm(emptyForm());
                  setStatus("idle");
                }}
              >
                Book another table
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            noValidate
          >
            <div className="mb-2 flex items-center gap-3">
              <CalendarCheck className="size-4 text-brass-400" />
              <span className="eyebrow">Book a table</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <Input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Élodie Marchand"
                  autoComplete="name"
                />
              </Field>

              <Field label="Phone" error={errors.phone}>
                <Input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </Field>

              <Field label="Email" hint="optional" error={errors.email}>
                <Input
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  inputMode="email"
                  autoComplete="email"
                />
              </Field>

              <Field label="Number of guests" error={errors.guests}>
                <NativeSelect value={form.guests} onChange={(e) => set("guests", e.target.value)}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1} {i === 0 ? "guest" : "guests"}
                    </option>
                  ))}
                  <option value="9">9+ guests (please call)</option>
                </NativeSelect>
              </Field>

              <Field label="Date" error={errors.date}>
                <Input
                  type="date"
                  value={form.date}
                  min={todayISO()}
                  onChange={(e) => set("date", e.target.value)}
                />
              </Field>

              <Field label="Time" error={errors.time}>
                <NativeSelect value={form.time} onChange={(e) => set("time", e.target.value)}>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <Field label="Special request" hint="allergies, occasion, seating">
              <Textarea
                value={form.request}
                onChange={(e) => set("request", e.target.value)}
                placeholder="Celebrating an anniversary — a quiet corner table would be lovely. One guest is gluten free."
              />
            </Field>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="submit" size="lg" className="flex-1" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  "Request Reservation"
                )}
              </Button>
              <Button asChild size="lg" variant="outline" className="sm:w-auto">
                <a href={whatsappLink(content.contact.whatsapp, waMessage)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>

            <p className="text-[0.7rem] leading-relaxed text-cream-muted/70">
              Requests are confirmed personally by phone. For same-day bookings please call{" "}
              <a href={`tel:${content.contact.phone.replace(/\s/g, "")}`} className="text-brass-300 hover:underline">
                {content.contact.phone}
              </a>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export { TIME_SLOTS };
