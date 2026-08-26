"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef } from "react";
import {
  CHAR_DUR,
  CHAR_STAGGER,
  EASE_POWER2,
  EASE_POWER3,
  NAME,
  T_CHARS,
  T_GREETING,
  T_LINE,
  T_PARTICLES,
  T_STRIPS,
  T_TAGLINE,
} from "@/lib/intro";

/* ------------------------------------------------------------------ *
 * Diagonal marquee strips — awrs.me's `hero-marquee`, ported 1:1 from
 * their bundle. Two crossing bands sitting low in the hero: a deep-rose
 * gradient running in reverse at +4deg, and a card-coloured band at
 * -4deg. Each is left-[-20%] w-[140%] so the rotation never exposes an
 * edge, and each track holds the items tripled then repeated twice so
 * translateX(-50%) loops seamlessly.
 *
 * Their config:
 *   [{angle:"4deg", reverse:true,  duration:35, topClass:"top-[75%] md:top-[85%]"},
 *    {angle:"-4deg",reverse:false, duration:40, topClass:"top-[78%] md:top-[88%]"}]
 * ------------------------------------------------------------------ */
const STRIPS = [
  {
    angle: "4deg",
    reverse: true,
    duration: 35,
    topClass: "top-[75%] md:top-[85%]",
    className:
      "bg-gradient-to-r from-primary-deep via-primary to-primary-deep text-white/80",
    items: [
      "Competitive Programmer",
      "Full-Stack Developer",
      "AI App Builder",
      "React & Next.js",
      "Node.js & Express",
      "Problem Solver",
    ],
  },
  {
    angle: "-4deg",
    reverse: false,
    duration: 40,
    topClass: "top-[78%] md:top-[88%]",
    className: "bg-card border-y border-border text-muted",
    items: [
      "Codeforces Pupil",
      "CodeChef 2★",
      "LeetCode 1600+",
      "160-Day DSA Streak",
      "Top 2% · AI India Impact Summit",
      "Creative Developer",
    ],
  },
];

function StripItems({ items }: { items: string[] }) {
  return (
    <>
      {items.map((it, i) => (
        <span key={i} className="inline-flex shrink-0 items-center">
          <span className="whitespace-nowrap px-4 text-sm font-bold uppercase tracking-wider md:px-6 md:text-base">
            {it}
          </span>
          <span className="text-[0.5rem] opacity-60">◆</span>
        </span>
      ))}
    </>
  );
}

function HeroStrips({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: T_STRIPS, ease: EASE_POWER2 }}
      aria-hidden
    >
      {STRIPS.map((s, i) => {
        const tripled = [...s.items, ...s.items, ...s.items];
        return (
          <div
            key={i}
            className={`absolute left-[-20%] w-[140%] py-3.5 md:py-5 ${s.topClass} ${s.className}`}
            style={{ transform: `rotate(${s.angle})` }}
          >
            <div
              className={
                s.reverse ? "hero-marquee-track-reverse" : "hero-marquee-track"
              }
              style={
                { "--marquee-duration": `${s.duration}s` } as React.CSSProperties
              }
            >
              <span className="inline-flex shrink-0 items-center">
                <StripItems items={tripled} />
              </span>
              <span className="inline-flex shrink-0 items-center">
                <StripItems items={tripled} />
              </span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

/* awrs.me's exact 6 hero particles (top/left/right + float-slow delay). */
const PARTICLES = [
  { top: "18%", left: "12%", delay: 0 },
  { top: "25%", right: "18%", delay: 1.5 },
  { top: "72%", left: "22%", delay: 3 },
  { top: "68%", right: "14%", delay: 0.8 },
  { top: "40%", left: "6%", delay: 2.2 },
  { top: "55%", right: "8%", delay: 4 },
];

// awrs.me paints one continuous gradient across the split characters.
const NAME_GRADIENT =
  "linear-gradient(to right, #a83d62, #d4547e, #e07a9c, #f5b8cc)";

const nameContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: CHAR_STAGGER, delayChildren: T_CHARS },
  },
};

const charVariant: Variants = {
  hidden: { y: 60, opacity: 0, rotateX: 90, filter: "blur(4px)" },
  show: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: CHAR_DUR, ease: "backOut" },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const nameRef = useRef<HTMLHeadingElement>(null);

  /* Stretch ONE gradient across the characters: chars are grouped by visual
     line (rounded offsetTop) and each line gets a single left→right gradient
     sized to that line's width. Painting per-line keeps the effect correct
     even if the name wraps on a narrow screen. Pure DOM writes (awrs.me does
     the same) — no state, so this never re-renders. offsetLeft is layout-based,
     so in-flight transforms don't skew it. */
  const paintGradient = useCallback(() => {
    const h1 = nameRef.current;
    if (!h1) return;
    const chars = Array.from(h1.querySelectorAll<HTMLElement>("[data-char]"));
    if (!chars.length) return;
    const lines = new Map<number, HTMLElement[]>();
    chars.forEach((el) => {
      const key = Math.round(el.offsetTop);
      const bucket = lines.get(key);
      if (bucket) bucket.push(el);
      else lines.set(key, [el]);
    });
    lines.forEach((group) => {
      const first = group[0];
      const last = group[group.length - 1];
      const extent = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      if (extent <= 0) return;
      group.forEach((el) => {
        el.style.backgroundSize = `${extent}px 100%`;
        el.style.backgroundPosition = `-${el.offsetLeft - first.offsetLeft}px 0`;
      });
    });
  }, []);

  useEffect(() => {
    paintGradient();
    // Fonts land after first paint and change glyph widths — repaint then.
    document.fonts?.ready.then(paintGradient).catch(() => {});
    window.addEventListener("resize", paintGradient);
    return () => window.removeEventListener("resize", paintGradient);
  }, [paintGradient]);

  return (
    <section
      id="top"
      className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Single soft rose glow — awrs.me's
          radial-gradient(circle, primary-glow 0%, transparent 70%) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(860px,120vw)] w-[min(860px,120vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 84, 126, 0.13) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Diagonal marquee strips low in the hero */}
      <HeroStrips reduce={reduce} />

      {/* Drifting particles */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="float-slow absolute h-1 w-1 rounded-full bg-primary/20"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              animationDelay: `${p.delay}s`,
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: T_PARTICLES + i * 0.05 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl -translate-y-16 px-6 text-center">
        {/* Greeting eyebrow */}
        <motion.p
          initial={reduce ? false : { y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: T_GREETING, ease: EASE_POWER3 }}
          className="font-ui mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted md:text-base"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Hairline under the greeting */}
        <motion.span
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: T_LINE, ease: EASE_POWER2 }}
          className="mx-auto mb-8 block h-px w-10 origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
          aria-hidden
        />

        {/* Name — per-character 3D flip-up reveal. Split by WORD: each word is
            a `whitespace-nowrap` unit, so a line can only ever break at the
            space between words, never mid-word ("Saxena" always stays whole).
            The space between words is a normal breakable text node. */}
        <motion.h1
          ref={nameRef}
          variants={reduce ? undefined : nameContainer}
          initial={reduce ? false : "hidden"}
          animate="show"
          aria-label={NAME}
          className="font-ui mb-10 pb-3 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ perspective: "600px" }}
        >
          {NAME.split(" ").map((word, wi) => (
            <Fragment key={`${word}-${wi}`}>
              {wi > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={`${ch}-${ci}`}
                    data-char
                    variants={reduce ? undefined : charVariant}
                    aria-hidden
                    className="inline-block bg-clip-text"
                    style={{
                      backgroundImage: NAME_GRADIENT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      willChange: "transform, filter, opacity",
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </Fragment>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={reduce ? false : { y: 20, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: T_TAGLINE, ease: EASE_POWER3 }}
          className="mx-auto max-w-xl text-lg font-medium leading-relaxed text-muted md:text-xl"
        >
          Competitive programmer &amp; full-stack developer turning hard problems
          into fast, scalable products.
        </motion.p>
      </div>
    </section>
  );
}
