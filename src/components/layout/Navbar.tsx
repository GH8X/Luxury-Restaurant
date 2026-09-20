import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { content } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-luxe",
          scrolled
            ? "border-b border-white/[0.07] bg-noir-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-noir-950/70 to-transparent",
        )}
      >
        <div className="container">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-700 ease-luxe",
              scrolled ? "h-16" : "h-20 sm:h-24",
            )}
          >
            {/* Wordmark */}
            <Link to="/" className="group flex items-center gap-3">
              <span className="grid size-9 place-items-center border border-brass-400/50 font-serif text-sm text-brass-300 transition-colors duration-500 group-hover:border-brass-400 group-hover:bg-brass-400/10">
                MN
              </span>
              <span className="leading-none">
                <span className="block font-serif text-lg tracking-[0.16em] text-cream sm:text-xl">
                  {content.brand.wordmark.toUpperCase()}
                </span>
                <span className="mt-0.5 hidden font-sans text-[0.55rem] uppercase tracking-luxe text-brass-400/90 sm:block">
                  {content.brand.tagline}
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "link-underline font-sans text-[0.7rem] font-medium uppercase tracking-wide2 transition-colors duration-300",
                      isActive ? "text-brass-300" : "text-cream/75 hover:text-cream",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                className="hidden items-center gap-2 font-sans text-[0.7rem] uppercase tracking-wide2 text-cream/70 transition-colors hover:text-brass-300 xl:flex"
              >
                <Phone className="size-3.5" />
                {content.contact.phone}
              </a>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link to="/reservations">Reserve</Link>
              </Button>
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="grid size-10 place-items-center border border-white/10 text-cream transition-colors hover:border-brass-400/60 hover:text-brass-300 lg:hidden"
              >
                <MenuIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brass-400/25 to-transparent" />
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-noir-950/90 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-noir-900 px-7 py-7"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg tracking-[0.16em] text-cream">
                  {content.brand.wordmark.toUpperCase()}
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center border border-white/10 text-cream-muted transition-colors hover:text-brass-300"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "block border-b border-white/[0.07] py-4 font-serif text-2xl font-light transition-colors",
                          isActive ? "text-brass-300" : "text-cream hover:text-brass-300",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-5 pt-8">
                <Button asChild size="md" className="w-full">
                  <Link to="/reservations">Reserve a Table</Link>
                </Button>
                <div className="space-y-1 text-center font-sans text-[0.7rem] uppercase tracking-wide2 text-cream-muted">
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                    className="block hover:text-brass-300"
                  >
                    {content.contact.phone}
                  </a>
                  <p>{content.contact.address}</p>
                  <p>{content.contact.city}</p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
