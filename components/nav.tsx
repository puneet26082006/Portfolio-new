"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { T_NAV_SWAP } from "@/lib/intro";

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

/** Time-of-day greeting — awrs.me's three buckets (morning / afternoon /
 *  evening) with the matching emoji seen in their markup (🌤️ afternoon,
 *  🌙 evening). Resolved on the client only, so SSR can't mismatch. */
function resolveGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { emoji: "🌅", text: "Good Morning" };
  if (h < 17) return { emoji: "🌤️", text: "Good Afternoon" };
  return { emoji: "🌙", text: "Good Evening" };
}

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* ---- floating pill: greeting → links morph -------------------------
     awrs.me ships the nav as `style="width:0;opacity:0;overflow:hidden"`
     with the greeting panel visible and the links panel `display:none`,
     then animates the pill's WIDTH between the two panels' natural sizes.
     Driven entirely by MotionValues + imperative animate(), so there is no
     state churn and no re-render on any frame. ------------------------- */
  const navWidth = useMotionValue<number | string>(0);
  const navOpacity = useMotionValue(0);
  const greetOpacity = useMotionValue(1);
  const linksOpacity = useMotionValue(0);

  const greetRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Mobile bar mirrors the same swap (awrs `mobile-greeting-bar`).
  const mGreetOpacity = useMotionValue(1);
  const mBrandOpacity = useMotionValue(0);
  const mEmojiRef = useRef<HTMLSpanElement>(null);
  const mTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const greet = greetRef.current;
    const links = linksRef.current;
    if (!greet || !links) return;

    // Fill the greeting client-side (DOM writes — no state, no mismatch).
    const g = resolveGreeting();
    if (emojiRef.current) emojiRef.current.textContent = g.emoji;
    if (textRef.current) textRef.current.textContent = g.text;
    if (mEmojiRef.current) mEmojiRef.current.textContent = g.emoji;
    if (mTextRef.current) mTextRef.current.textContent = g.text;

    const greetW = greet.offsetWidth;
    const linksW = links.offsetWidth;

    const showLinks = () => {
      links.style.pointerEvents = "auto";
      greet.style.pointerEvents = "none";
    };

    if (reduce) {
      navWidth.set(linksW);
      navOpacity.set(1);
      greetOpacity.set(0);
      linksOpacity.set(1);
      mGreetOpacity.set(0);
      mBrandOpacity.set(1);
      showLinks();
      return;
    }

    const running: { stop: () => void }[] = [];

    // Pill expands to the greeting, fading up from nothing.
    running.push(animate(navWidth, greetW, { duration: 0.8, delay: 0.15, ease: EASE }));
    running.push(animate(navOpacity, 1, { duration: 0.5, delay: 0.15 }));

    // As the name lands, swap greeting → links and re-size the pill.
    const timer = setTimeout(() => {
      running.push(animate(greetOpacity, 0, { duration: 0.3, ease: "easeOut" }));
      running.push(animate(mGreetOpacity, 0, { duration: 0.3, ease: "easeOut" }));
      running.push(animate(navWidth, linksW, { duration: 0.8, ease: EASE }));
      running.push(animate(linksOpacity, 1, { duration: 0.5, delay: 0.2 }));
      running.push(animate(mBrandOpacity, 1, { duration: 0.5, delay: 0.2 }));
      showLinks();
    }, T_NAV_SWAP * 1000);

    return () => {
      clearTimeout(timer);
      running.forEach((r) => r.stop());
    };
    // MotionValues are stable refs; only the motion preference re-runs this.
  }, [reduce, navWidth, navOpacity, greetOpacity, linksOpacity, mGreetOpacity, mBrandOpacity]);

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

      {/* ---- Center: floating pill — greeting, then page links ---- */}
      <motion.nav
        style={{ width: navWidth, opacity: navOpacity }}
        className="floating-nav hidden md:block fixed top-4 inset-x-0 mx-auto z-40 h-12 overflow-hidden rounded-full bg-navbar backdrop-blur-xl border border-border transition-shadow duration-300"
        aria-label="Primary"
      >
        {/* greeting panel */}
        <motion.div
          ref={greetRef}
          style={{ opacity: greetOpacity }}
          className="absolute left-0 top-0 flex h-12 w-max select-none items-center justify-center gap-2.5 px-8"
          aria-hidden
        >
          <span ref={emojiRef} className="text-base" />
          <span
            ref={textRef}
            className="whitespace-nowrap text-sm font-medium text-foreground"
          />
        </motion.div>

        {/* links panel */}
        <motion.div
          ref={linksRef}
          style={{ opacity: linksOpacity, pointerEvents: "none" }}
          className="absolute left-0 top-0 flex h-12 w-max items-center px-1.5"
        >
          <div className="relative flex items-center gap-1 px-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`nav-item relative z-10 whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {isActive(l.href) && (
                  <>
                    {/* the light on the pill's top edge, sitting above the
                        selected page name — slides to whichever page you pick */}
                    <motion.span
                      layoutId="nav-light"
                      className="pointer-events-none absolute -top-[9px] left-1 right-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary-bright to-transparent shadow-[0_0_12px_2px_rgba(212,84,126,0.55)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    <motion.span
                      layoutId="nav-active-pill"
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  </>
                )}
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* ---- Mobile: greeting bar → brand label (awrs mobile-greeting-bar) ---- */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[200px]">
        <button
          onClick={() => setMenuOpen(true)}
          className="relative flex h-12 w-full items-center justify-center rounded-full bg-navbar backdrop-blur-xl border border-border cursor-pointer select-none"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            style={{ opacity: mGreetOpacity }}
            className="absolute inset-0 flex items-center justify-center gap-2.5"
            aria-hidden
          >
            <span ref={mEmojiRef} className="text-base" />
            <span
              ref={mTextRef}
              className="whitespace-nowrap text-sm font-medium text-foreground"
            />
          </motion.span>
          <motion.span
            style={{ opacity: mBrandOpacity }}
            className="absolute inset-0 flex items-center justify-center gap-2.5"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
              PS
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-foreground">
              Puneet<span className="text-primary">.</span>
            </span>
          </motion.span>
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
