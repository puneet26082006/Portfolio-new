"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { Marquee } from "./ui";

const NAME = "Puneet Saxena";

const ROLES = [
  "Competitive Programmer",
  "Full-Stack Developer",
  "React.js",
  "Node.js",
  "TypeScript",
  "AI App Builder",
  "Codeforces Pupil",
  "CodeChef 2★",
  "Problem Solver",
  "C++",
];

/* Tiny drifting dots — awrs.me's `hero-particle` background (w-1 h-1,
   primary/20, float-slow with staggered delays). Fixed positions, so the
   server and client markup always agree (no hydration mismatch). */
const PARTICLES = [
  { top: "18%", left: "12%", delay: 0 },
  { top: "26%", right: "16%", delay: 1.2 },
  { top: "62%", left: "18%", delay: 2.4 },
  { top: "72%", right: "22%", delay: 0.8 },
  { top: "40%", left: "6%", delay: 3.1 },
  { top: "34%", right: "8%", delay: 1.9 },
  { top: "80%", left: "44%", delay: 2.7 },
  { top: "14%", left: "62%", delay: 3.6 },
];

// awrs.me paints one continuous gradient across the split characters.
const NAME_GRADIENT =
  "linear-gradient(to right, #a83d62, #d4547e, #e07a9c, #f5b8cc)";

/* awrs.me's hero timeline, ported to framer-motion:
   greeting  y30 + blur(8px)         -> 0.7s power3.out
   line      scaleX 0 -> 1
   chars     y60, rotateX 90, blur4  -> 0.5s stagger .04 back.out(1.7)
   tagline   y20 + blur(6px)         -> 0.7s
   Their GSAP `back.out(1.7)` is framer-motion's "backOut". */
const EASE_POWER3: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

const nameContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.5 } },
};

const charVariant: Variants = {
  hidden: { y: 60, opacity: 0, rotateX: 90, filter: "blur(4px)" },
  show: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "backOut" },
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
      className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
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
            transition={{ duration: 0.8, delay: 1.1 + i * 0.05 }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl -translate-y-6 text-center">
        {/* Role marquee — awrs.me fades `.hero-marquee` in first */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 w-full [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
        >
          <Marquee duration={26}>
            {ROLES.map((r) => (
              <span
                key={r}
                className="mx-3 inline-flex items-center gap-3 font-mono text-sm text-muted"
              >
                {r}
                <span className="text-primary">◆</span>
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* Greeting eyebrow */}
        <motion.p
          initial={reduce ? false : { y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_POWER3 }}
          className="font-ui mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted md:text-base"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Hairline under the greeting */}
        <motion.span
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_POWER3 }}
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
          className="font-ui mb-6 pb-3 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
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
                      transformPerspective: 600,
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
          transition={{ duration: 0.7, delay: 1.05, ease: EASE_POWER3 }}
          className="mx-auto max-w-xl text-lg font-medium leading-relaxed text-muted md:text-xl"
        >
          Competitive programmer &amp; full-stack developer turning hard problems
          into fast, scalable products.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.span
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-primary"
          />
        </span>
      </motion.a>
    </section>
  );
}
