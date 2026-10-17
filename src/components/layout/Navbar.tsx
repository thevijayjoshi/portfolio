import { useState, useEffect } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { cn, openAssistant } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const shortcut = /Mac|iP(hone|ad)/.test(navigator.userAgent) ? "⌘K" : "Ctrl K";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300",
        scrolled || mobileOpen ? "border-card-border bg-nav-bg backdrop-blur-md" : "border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#hero" className="flex items-center gap-2.5 text-foreground" aria-label="Vijay Joshi, back to top">
          <Logo className="h-8 w-8" />
          <span className="text-[15px] font-semibold tracking-tight">Vijay Joshi</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeSection === link.href ? "text-primary" : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={openAssistant}
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/60"
          >
            <Sparkles size={14} className="text-primary" />
            Ask
            <kbd className="rounded border border-card-border px-1.5 font-mono text-[10px] text-muted">{shortcut}</kbd>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-muted hover:text-foreground"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-gradient-to-r from-gradient-start to-gradient-end"
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-card-border bg-card lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    activeSection === link.href ? "bg-primary-light text-primary" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  closeMenu();
                  openAssistant();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground"
              >
                <Sparkles size={15} className="text-primary" />
                Ask about me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
