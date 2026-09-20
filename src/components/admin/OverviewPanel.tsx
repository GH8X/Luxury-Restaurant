import { CalendarDays, Euro, Star, Users, Utensils } from "lucide-react";
import { AdminSection, StatCard } from "@/components/admin/AdminKit";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/store";
import { formatDateLong, formatPrice } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pending: "border-brass-400/40 text-brass-200",
  confirmed: "border-emerald-400/35 text-emerald-300/90",
  seated: "border-sky-400/35 text-sky-300/90",
  cancelled: "border-wine-400/45 text-wine-400",
};

export function OverviewPanel({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { content, reservations } = useSite();

  const today = new Date().toISOString().slice(0, 10);
  const todays = reservations.filter((r) => r.date === today && r.status !== "cancelled");
  const pending = reservations.filter((r) => r.status === "pending");
  const upcoming = reservations.filter((r) => r.date >= today && r.status !== "cancelled");
  const covers = upcoming.reduce((sum, r) => sum + r.guests, 0);
  const average =
    content.items.length > 0
      ? content.items.reduce((sum, item) => sum + item.price, 0) / content.items.length
      : 0;

  const recent = [...reservations]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's covers"
          value={todays.reduce((sum, r) => sum + r.guests, 0)}
          hint={`${todays.length} reservation${todays.length === 1 ? "" : "s"} booked`}
          accent
        />
        <StatCard label="Pending requests" value={pending.length} hint="Awaiting your confirmation" />
        <StatCard label="Upcoming covers" value={covers} hint="Next 60 days, confirmed + pending" />
        <StatCard
          label="Average plate"
          value={formatPrice(Math.round(average))}
          hint={`${content.items.length} dishes on the carte`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AdminSection
          title="Latest reservation requests"
          description="Anything marked pending should be confirmed by phone before service."
          actions={
            <Button size="sm" variant="outline" onClick={() => onNavigate("reservations")}>
              Manage all
            </Button>
          }
        >
          <ul className="divide-y divide-white/[0.06]">
            {recent.map((reservation) => (
              <li key={reservation.id} className="flex flex-wrap items-center gap-4 py-4 first:pt-0">
                <span className="grid size-10 shrink-0 place-items-center border border-white/[0.1] font-serif text-sm text-brass-300">
                  {reservation.guests}
                </span>
                <div className="min-w-[10rem] flex-1">
                  <p className="font-serif text-lg text-cream">{reservation.name}</p>
                  <p className="mt-0.5 text-[0.72rem] text-cream-muted">
                    {formatDateLong(reservation.date)} · {reservation.time} · {reservation.phone}
                  </p>
                </div>
                <span
                  className={`border px-2.5 py-1 font-sans text-[0.55rem] uppercase tracking-wide2 ${
                    STATUS_STYLES[reservation.status] ?? ""
                  }`}
                >
                  {reservation.status}
                </span>
              </li>
            ))}
          </ul>
        </AdminSection>

        <div className="space-y-6">
          <AdminSection title="Quick actions">
            <div className="space-y-3">
              {[
                { icon: Utensils, label: "Add a new dish", tab: "menu" },
                { icon: CalendarDays, label: "Review reservations", tab: "reservations" },
                { icon: Star, label: "Edit homepage hero", tab: "homepage" },
                { icon: Users, label: "Update opening hours", tab: "hours" },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => onNavigate(action.tab)}
                  className="group flex w-full items-center gap-4 border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-left transition-all duration-500 hover:border-brass-400/40 hover:bg-white/[0.05]"
                >
                  <action.icon className="size-4 text-brass-400/85" strokeWidth={1.5} />
                  <span className="font-sans text-[0.72rem] uppercase tracking-wide2 text-cream-muted transition-colors group-hover:text-cream">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </AdminSection>

          <AdminSection title="At a glance">
            <dl className="space-y-3 text-[0.8rem]">
              {[
                { label: "Menu categories", value: content.categories.length },
                { label: "Gallery images", value: content.galleryImages.length },
                { label: "Guest reviews", value: content.testimonialsList.length },
                { label: "Signature plates", value: content.items.filter((i) => i.signature).length },
                {
                  label: "Unavailable dishes",
                  value: content.items.filter((i) => !i.available).length,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-white/[0.06] pb-2.5 last:border-0"
                >
                  <dt className="text-cream-muted">{row.label}</dt>
                  <dd className="font-serif text-lg text-cream">{row.value}</dd>
                </div>
              ))}
            </dl>
          </AdminSection>

          <div className="flex items-start gap-3 border border-brass-400/25 bg-brass-500/[0.07] p-5">
            <Euro className="mt-0.5 size-4 shrink-0 text-brass-300" strokeWidth={1.5} />
            <p className="text-[0.75rem] leading-relaxed text-cream-muted">
              Everything you edit here saves instantly to this browser, so you can demo changes live
              without a server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
