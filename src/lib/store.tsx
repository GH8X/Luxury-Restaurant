import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultContent,
  defaultReservations,
  type Reservation,
  type ReservationStatus,
  type SiteContent,
} from "@/data/content";

const CONTENT_KEY = "maison-noir:content:v1";
const RESERVATIONS_KEY = "maison-noir:reservations:v1";

/* ─────────────────────────── persistence ─────────────────────────── */

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    // Shallow-merge objects so newly added content fields keep their defaults.
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return { ...(fallback as object), ...(parsed as object) } as T;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — the demo still works in memory */
  }
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/* ───────────────────────────── context ───────────────────────────── */

type SiteContextValue = {
  content: SiteContent;
  reservations: Reservation[];
  isCustomised: boolean;
  /** Patch any top-level content section, e.g. `update("hero", { title: "…" })`. */
  update: <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) => void;
  setContent: (next: SiteContent) => void;
  resetContent: () => void;
  addReservation: (input: Omit<Reservation, "id" | "createdAt" | "status">) => Reservation;
  setReservationStatus: (id: string, status: ReservationStatus) => void;
  removeReservation: (id: string) => void;
  newId: (prefix: string) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() =>
    load(CONTENT_KEY, defaultContent),
  );
  const [reservations, setReservations] = useState<Reservation[]>(() =>
    load(RESERVATIONS_KEY, defaultReservations),
  );
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    save(CONTENT_KEY, content);
  }, [content]);

  useEffect(() => {
    save(RESERVATIONS_KEY, reservations);
  }, [reservations]);

  const update = useCallback(
    <K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) => {
      setTouched(true);
      setContentState((prev) => {
        const current = prev[section];
        const next =
          current && typeof current === "object" && !Array.isArray(current)
            ? { ...(current as object), ...(patch as object) }
            : (patch as SiteContent[K]);
        return { ...prev, [section]: next };
      });
    },
    [],
  );

  const setContent = useCallback((next: SiteContent) => {
    setTouched(true);
    setContentState(next);
  }, []);

  const resetContent = useCallback(() => {
    setContentState(defaultContent);
    setReservations(defaultReservations);
    setTouched(false);
  }, []);

  const addReservation = useCallback(
    (input: Omit<Reservation, "id" | "createdAt" | "status">) => {
      const record: Reservation = {
        ...input,
        id: uid("res"),
        createdAt: Date.now(),
        status: "pending",
      };
      setReservations((prev) => [record, ...prev]);
      return record;
    },
    [],
  );

  const setReservationStatus = useCallback((id: string, status: ReservationStatus) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const removeReservation = useCallback((id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({
      content,
      reservations,
      isCustomised: touched,
      update,
      setContent,
      resetContent,
      addReservation,
      setReservationStatus,
      removeReservation,
      newId: uid,
    }),
    [
      content,
      reservations,
      touched,
      update,
      setContent,
      resetContent,
      addReservation,
      setReservationStatus,
      removeReservation,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

export { uid };
