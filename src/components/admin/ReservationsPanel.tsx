import { useMemo, useState } from "react";
import { Mail, Phone, Trash2, MessageCircle } from "lucide-react";
import { AdminSection, EmptyState, StatCard } from "@/components/admin/AdminKit";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/field";
import type { ReservationStatus } from "@/data/content";
import { useSite } from "@/lib/store";
import { formatDateLong, whatsappLink } from "@/lib/utils";

const STATUSES: ReservationStatus[] = ["pending", "confirmed", "seated", "cancelled"];

const STATUS_STYLES: Record<ReservationStatus, string> = {
  pending: "border-brass-400/45 text-brass-200",
  confirmed: "border-emerald-400/35 text-emerald-300/90",
  seated: "border-sky-400/35 text-sky-300/90",
  cancelled: "border-wine-400/45 text-wine-400",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "pending", label: "Pending" },
  { id: "upcoming", label: "Upcoming" },
  { id: "cancelled", label: "Cancelled" },
];

export function ReservationsPanel() {
  const { reservations, setReservationStatus, removeReservation, content } = useSite();
  const [filter, setFilter] = useState("all");

  const today = new Date().toISOString().slice(0, 10);

  const visible = useMemo(() => {
    const sorted = [...reservations].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    switch (filter) {
      case "today":
        return sorted.filter((r) => r.date === today);
      case "pending":
        return sorted.filter((r) => r.status === "pending");
      case "upcoming":
        return sorted.filter((r) => r.date >= today && r.status !== "cancelled");
      case "cancelled":
        return sorted.filter((r) => r.status === "cancelled");
      default:
        return sorted;
    }
  }, [reservations, filter, today]);

  const coversToday = reservations
    .filter((r) => r.date === today && r.status !== "cancelled")
    .reduce((sum, r) => sum + r.guests, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Covers today" value={coversToday} accent />
        <StatCard
          label="Pending confirmation"
          value={reservations.filter((r) => r.status === "pending").length}
        />
        <StatCard
          label="Total bookings"
          value={reservations.filter((r) => r.status !== "cancelled").length}
          hint="Excluding cancellations"
        />
      </div>

      <AdminSection
        title="Reservations"
        description="Confirm by phone, mark guests as seated as they arrive, and keep notes for the pass."
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`border px-3.5 py-2 font-sans text-[0.6rem] uppercase tracking-wide2 transition-all duration-500 ${
                filter === f.id
                  ? "border-brass-400/60 bg-brass-400/10 text-brass-200"
                  : "border-white/[0.1] text-cream-muted hover:border-brass-400/40 hover:text-cream"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {visible.length === 0 ? (
            <EmptyState
              title="Nothing booked here"
              body="When a guest submits the reservation form on the website it lands right here, ready for you to confirm."
            />
          ) : (
            visible.map((reservation) => (
              <div
                key={reservation.id}
                className="border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-500 hover:border-brass-400/25"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center border border-white/[0.12] font-serif text-lg text-brass-300">
                      {reservation.guests}
                    </span>
                    <div>
                      <p className="font-serif text-xl text-cream">{reservation.name}</p>
                      <p className="mt-1 text-[0.78rem] text-cream-muted">
                        {formatDateLong(reservation.date)} · {reservation.time} ·{" "}
                        {reservation.guests} guest{reservation.guests === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`border px-2.5 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 ${STATUS_STYLES[reservation.status]}`}
                    >
                      {reservation.status}
                    </span>
                    <NativeSelect
                      value={reservation.status}
                      onChange={(e) =>
                        setReservationStatus(reservation.id, e.target.value as ReservationStatus)
                      }
                      className="w-36 py-2 text-[0.7rem]"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </NativeSelect>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete reservation"
                      className="hover:text-wine-400"
                      onClick={() => removeReservation(reservation.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>

                {reservation.request ? (
                  <p className="mt-4 border-l border-brass-400/40 bg-white/[0.02] py-2 pl-4 text-[0.78rem] leading-relaxed text-cream-muted">
                    <span className="font-sans text-[0.55rem] uppercase tracking-wide2 text-brass-400/80">
                      Guest note ·{" "}
                    </span>
                    {reservation.request}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href={`tel:${reservation.phone.replace(/\s/g, "")}`}>
                      <Phone className="size-3.5" />
                      {reservation.phone}
                    </a>
                  </Button>
                  {reservation.email ? (
                    <Button asChild size="sm" variant="ghost">
                      <a href={`mailto:${reservation.email}`}>
                        <Mail className="size-3.5" />
                        Email
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild size="sm" variant="ghost">
                    <a
                      href={whatsappLink(
                        reservation.phone,
                        `Hello ${reservation.name}, confirming your table at ${content.brand.name} on ${formatDateLong(reservation.date)} at ${reservation.time} for ${reservation.guests}.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="size-3.5" />
                      Confirm
                    </a>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </AdminSection>
    </div>
  );
}
