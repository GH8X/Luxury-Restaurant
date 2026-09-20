import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Download,
  ExternalLink,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  RotateCcw,
  Settings,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewPanel } from "@/components/admin/OverviewPanel";
import { MenuPanel } from "@/components/admin/MenuPanel";
import { ReservationsPanel } from "@/components/admin/ReservationsPanel";
import { GalleryPanel } from "@/components/admin/GalleryPanel";
import { HoursPanelAdmin } from "@/components/admin/HoursPanelAdmin";
import { HomepagePanel } from "@/components/admin/HomepagePanel";
import { BrandPanel } from "@/components/admin/BrandPanel";
import type { SiteContent } from "@/data/content";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

const DEMO_PASSCODE = "maison";
const AUTH_KEY = "maison-noir:owner";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "menu", label: "Menu & Prices", icon: UtensilsCrossed },
  { id: "reservations", label: "Reservations", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "hours", label: "Opening Hours", icon: Clock },
  { id: "homepage", label: "Homepage", icon: Store },
  { id: "settings", label: "Identity", icon: Settings },
];

/* ─────────────────────────── Passcode gate ─────────────────────────── */

function OwnerGate({ onUnlock }: { onUnlock: () => void }) {
  const { content } = useSite();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim().toLowerCase() !== DEMO_PASSCODE) {
      setError("That passcode is not recognised.");
      return;
    }
    window.localStorage.setItem(AUTH_KEY, "1");
    onUnlock();
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center px-5 py-28">
      <div className="pointer-events-none absolute inset-0 bg-noir-fade" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[34rem] -translate-x-1/2 rounded-full bg-brass-500/[0.07] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md border border-white/[0.09] bg-noir-900/80 p-8 backdrop-blur-xl sm:p-10"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-400/60 to-transparent" />

        <span className="grid size-11 place-items-center border border-brass-400/40 font-serif text-sm text-brass-300">
          MN
        </span>
        <h1 className="mt-7 font-serif text-3xl font-light text-cream">Owner Dashboard</h1>
        <p className="mt-3 text-[0.82rem] leading-relaxed text-cream-muted">
          Manage the menu, prices, reservations, gallery and homepage content for{" "}
          {content.brand.name}.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <Field label="Passcode" error={error}>
            <Input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError("");
              }}
              placeholder="••••••"
              autoFocus
            />
          </Field>

          <Button type="submit" size="lg" className="w-full">
            Enter Dashboard
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setValue(DEMO_PASSCODE)}
          className="mt-5 w-full border border-dashed border-brass-400/30 px-4 py-3 text-left font-sans text-[0.65rem] uppercase tracking-wide2 text-brass-300/90 transition-colors hover:border-brass-400/60 hover:bg-brass-400/[0.06]"
        >
          Demo passcode: {DEMO_PASSCODE} — tap to fill
        </button>

        <Button asChild variant="link" size="sm" className="mt-6">
          <Link to="/">← Back to the restaurant site</Link>
        </Button>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── Dashboard ─────────────────────────── */

export default function Admin() {
  const { content, resetContent } = useSite();
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("overview");
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem(AUTH_KEY) === "1") setUnlocked(true);
  }, []);

  const announce = (message: string) => {
    setFlash(message);
    window.setTimeout(() => setFlash(""), 2600);
  };

  const exportContent = () => {
    const payload: SiteContent = content;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "maison-noir-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
    announce("Content exported as JSON.");
  };

  if (!unlocked) return <OwnerGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-[100svh] pb-20 pt-28">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rule-brass" />
              <span className="eyebrow">Owner Dashboard</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-light text-cream sm:text-5xl">
              {content.brand.name}
            </h1>
            <p className="mt-3 max-w-2xl text-[0.82rem] leading-relaxed text-cream-muted">
              A live demonstration console. Every change you make is saved in this browser and
              reflected instantly across the public website.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline">
              <Link to="/">
                <ExternalLink className="size-3.5" />
                View site
              </Link>
            </Button>
            <Button size="sm" variant="outline" onClick={exportContent}>
              <Download className="size-3.5" />
              Export
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                resetContent();
                announce("Demo content restored to factory defaults.");
              }}
            >
              <RotateCcw className="size-3.5" />
              Reset demo
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                window.localStorage.removeItem(AUTH_KEY);
                setUnlocked(false);
              }}
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>

        {/* Flash notice */}
        <AnimatePresence>
          {flash ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6 border border-brass-400/35 bg-brass-500/[0.08] px-5 py-3 font-sans text-[0.7rem] uppercase tracking-wide2 text-brass-200"
            >
              {flash}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="mt-8">
          <TabsList>
            {TABS.map((item) => (
              <TabsTrigger key={item.id} value={item.id} className="gap-2">
                <item.icon className="size-3.5" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <OverviewPanel onNavigate={setTab} />
          </TabsContent>
          <TabsContent value="menu">
            <MenuPanel />
          </TabsContent>
          <TabsContent value="reservations">
            <ReservationsPanel />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryPanel />
          </TabsContent>
          <TabsContent value="hours">
            <HoursPanelAdmin />
          </TabsContent>
          <TabsContent value="homepage">
            <HomepagePanel />
          </TabsContent>
          <TabsContent value="settings">
            <BrandPanel />
          </TabsContent>
        </Tabs>

        <p
          className={cn(
            "mt-10 border-t border-white/[0.07] pt-6 text-center font-sans text-[0.65rem] tracking-wide text-cream-muted/55",
          )}
        >
          Demo environment · content is stored locally in your browser, never on a server.
        </p>
      </div>
    </div>
  );
}
