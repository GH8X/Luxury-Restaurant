import { AdminSection, TextAreaField } from "@/components/admin/AdminKit";
import { Input, Label } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import type { OpeningHour } from "@/data/content";
import { useSite } from "@/lib/store";

export function HoursPanelAdmin() {
  const { content, setContent } = useSite();
  const hours = content.openingHours;

  const setHours = (next: OpeningHour[]) => setContent({ ...content, openingHours: next });

  const patch = (id: string, changes: Partial<OpeningHour>) =>
    setHours(hours.map((hour) => (hour.id === id ? { ...hour, ...changes } : hour)));

  return (
    <div className="space-y-6">
      <AdminSection
        title="Opening hours"
        description="These hours appear in the footer, the homepage and the reservations sidebar on every page."
      >
        <div className="space-y-3">
          {hours.map((hour) => (
            <div
              key={hour.id}
              className="grid gap-4 border border-white/[0.08] bg-white/[0.02] p-4 sm:grid-cols-[9rem_1fr_1fr_1.2fr_auto] sm:items-end"
            >
              <div className="sm:pb-3.5">
                <p className="font-sans text-[0.72rem] uppercase tracking-wide2 text-cream">
                  {hour.day}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Opens</Label>
                <Input
                  value={hour.opens}
                  disabled={hour.closed}
                  onChange={(e) => patch(hour.id, { opens: e.target.value })}
                  placeholder="19:00"
                />
              </div>

              <div className="space-y-2">
                <Label>Closes</Label>
                <Input
                  value={hour.closes}
                  disabled={hour.closed}
                  onChange={(e) => patch(hour.id, { closes: e.target.value })}
                  placeholder="22:30"
                />
              </div>

              <div className="space-y-2">
                <Label>Note</Label>
                <Input
                  value={hour.note ?? ""}
                  onChange={(e) => patch(hour.id, { note: e.target.value })}
                  placeholder="Bar until midnight"
                />
              </div>

              <div className="flex items-center gap-3 sm:pb-3">
                <Switch
                  checked={!hour.closed}
                  onCheckedChange={(open) => {
                    if (open) {
                      patch(hour.id, {
                        closed: false,
                        opens: hour.opens === "—" ? "19:00" : hour.opens,
                        closes: hour.closes === "—" ? "22:30" : hour.closes,
                      });
                    } else {
                      patch(hour.id, { closed: true, opens: "—", closes: "—" });
                    }
                  }}
                />
                <span className="font-sans text-[0.6rem] uppercase tracking-wide2 text-cream-muted">
                  {hour.closed ? "Closed" : "Open"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title="Service note"
        description="A short line shown beneath the hours table."
      >
        <TextAreaField
          label="Note"
          value={content.hours.note}
          rows={3}
          onChange={(note) => setContent({ ...content, hours: { ...content.hours, note } })}
        />
      </AdminSection>
    </div>
  );
}
