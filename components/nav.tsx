"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/wall", label: "The Wall" },
  { href: "/contact", label: "Contact" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* awrs.me's exact chain-link glyph (their "open navigation" button icon). */
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"
      />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Lock body scroll while the overlay menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ---- Left flank: monogram logo → home (awrs.me top-5 left-[18%]) ---- */}
      <Link
        href="/"
        className="group hidden md:flex fixed top-5 left-[18%] z-50 items-center"
        aria-label="Home"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
          PS
        </span>
      </Link>

      {/* ---- Right flank: chain-link button → overlay nav (awrs.me exact) ---- */}
      <button
        onClick={() => setMenuOpen(true)}
        className="hidden md:flex fixed top-5 right-[18%] z-50 h-10 w-10 items-center justify-center rounded-xl bg-navbar backdrop-blur-xl border border-border text-muted hover:text-foreground hover:scale-105 transition-all cursor-pointer"
        aria-label="Open navigation"
      >
        <LinkIcon className="w-[18px] h-[18px]" />
      </button>

      {/* ---- Center: floating pill nav — links only (awrs.me floating-nav) ---- */}
      <nav
        className="floating-nav hidden md:block fixed top-4 inset-x-0 mx-auto w-fit z-40 rounded-full bg-navbar backdrop-blur-xl border border-border transition-shadow duration-300"
        aria-label="Primary"
      >
        <div className="flex items-center h-12 px-1.5">
          <div className="flex items-center gap-1 relative px-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-item relative z-10 px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive(l.href) ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {isActive(l.href) && (
                  <>
                    {/* light parked on the navbar's top edge, above the active
                        page name — slides to the newly selected link (awrs.me) */}
                    <motion.span
                      layoutId="nav-light"
                      className="absolute -top-[9px] left-1 right-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary-bright to-transparent shadow-[0_0_12px_2px_rgba(212,84,126,0.55)] pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/[0.08] pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  </>
                )}
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ---- Mobile: compact logo bar (tap → overlay) ---- */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[200px]">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex w-full items-center justify-center gap-2.5 h-12 rounded-full bg-navbar backdrop-blur-xl border border-border cursor-pointer select-none"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
            PS
          </span>
          <span className="text-sm font-medium text-foreground whitespace-nowrap">
            Puneet<span className="text-primary">.</span>
          </span>
        </button>
      </div>

      {/* ---- Full-screen overlay menu (right button / mobile bar) ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background/90 backdrop-blur-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-foreground"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col items-center gap-2"
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display text-4xl font-bold transition-colors ${
                      isActive(l.href) ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
