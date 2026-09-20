import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

export function FloatingWhatsApp() {
  const { content } = useSite();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={whatsappLink(
            content.contact.whatsapp,
            `Hello ${content.brand.name}, I would like to reserve a table.`,
          )}
          target="_blank"
          rel="noreferrer"
          aria-label="Reserve by WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-30 flex items-center gap-3 border border-brass-400/40 bg-noir-900/90 py-3 pl-3 pr-5 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-500 hover:border-brass-400 hover:bg-noir-800 sm:bottom-7 sm:right-7"
        >
          <span className="relative grid size-9 place-items-center rounded-full bg-[#25D366]/15 text-[#4ade80]">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/30" />
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.005-.52-.062-.149-.664-1.6-.91-2.19-.24-.575-.484-.497-.664-.505l-.566-.01c-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487zM12.05 21.785a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zM20.463 3.488A11.78 11.78 0 0012.05 0C5.495 0 .16 5.334.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-brass-400/80">
              Reserve by
            </span>
            <span className="font-serif text-base text-cream">WhatsApp</span>
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
