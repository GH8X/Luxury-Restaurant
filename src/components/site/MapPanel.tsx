import { DoorClosed, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MapPanel({ className }: { className?: string }) {
  const { content } = useSite();
  const { contact, location } = content;
  const query = encodeURIComponent(contact.mapQuery || `${contact.address} ${contact.city}`);

  return (
    <div className={cn("relative overflow-hidden border border-white/[0.08] bg-noir-900", className)}>
      <iframe
        title={`Map to ${content.brand.name}`}
        src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
        className="h-[22rem] w-full grayscale-[0.85] invert-[0.92] hue-rotate-180 contrast-[0.92] sm:h-[26rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-noir-950/25" />

      <div className="pointer-events-auto border-t border-white/[0.08] bg-noir-950/85 p-6 backdrop-blur-sm sm:p-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brass-400" />
              <div>
                <p className="font-serif text-lg text-cream">{contact.address}</p>
                <p className="mt-1 text-sm text-cream-muted">{contact.city}</p>
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="mt-5">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation className="size-3.5" />
                Get Directions
              </a>
            </Button>
          </div>

          <div className="space-y-3 text-sm text-cream-muted">
            <p className="flex items-start gap-3">
              <DoorClosed className="mt-0.5 size-4 shrink-0 text-brass-400/80" />
              {location.dressCode}
            </p>
            <p className="text-[0.8rem] leading-relaxed text-cream-muted/80">{location.parking}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
