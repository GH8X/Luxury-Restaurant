import type { ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { SiteProvider } from "@/lib/store";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Reservations from "@/pages/Reservations";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";

function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <SiteProvider>
      <div className="relative flex min-h-screen flex-col bg-noir-950">
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/menu" element={<Page><Menu /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/gallery" element={<Page><Gallery /></Page>} />
            <Route path="/reservations" element={<Page><Reservations /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="/admin" element={<Page><Admin /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>

        <Footer />
        {!isAdmin ? <FloatingWhatsApp /> : null}
      </div>
    </SiteProvider>
  );
}
