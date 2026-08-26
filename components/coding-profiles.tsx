"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
  SiLeetcode,
} from "react-icons/si";
import { Reveal } from "./ui";

type Profile = {
  name: string;
  handle: string;
  accent: string;
  icon: IconType;
  rank: string;
  rating: number;
  ratingLabel: string;
  stats: { label: string; value: string }[];
  href: string;
};

// Vivid, distinct per-platform colours (awrs.me-style) — each card owns one
// bright hue that pops on the near-black background and pulls the eye. Blue /
// pink / yellow / green: four distinct hues, high-contrast, no muddy gradients.
const PROFILES: Profile[] = [
  {
    name: "Codeforces",
    handle: "puneet26",
    accent: "#4d9fff",
    icon: SiCodeforces,
    rank: "Pupil",
    rating: 1243,
    ratingLabel: "Max Rating",
    stats: [
      { label: "Solved", value: "50+" },
      { label: "Best Div. 3 Rank", value: "#1020" },
    ],
    href: "https://codeforces.com/profile/puneet26",
  },
  {
    name: "CodeChef",
    handle: "puneet_26",
    accent: "#ec4899",
    icon: SiCodechef,
    rank: "2★ Coder",
    rating: 1593,
    ratingLabel: "Max Rating",
    stats: [
      { label: "Solved", value: "100+" },
      { label: "Best Div. 3 Rank", value: "#219" },
    ],
    href: "https://www.codechef.com/users/puneet_26",
  },
  {
    name: "LeetCode",
    handle: "_puneet26",
    accent: "#facc15",
    icon: SiLeetcode,
    rank: "Contest Rated",
    rating: 1600,
    ratingLabel: "Contest Rating",
    stats: [
      { label: "Solved", value: "150+" },
      { label: "Focus", value: "DSA" },
    ],
    href: "https://leetcode.com/u/_puneet26/",
  },
  {
    name: "GeeksforGeeks",
    handle: "puneetsarzj8",
    accent: "#22c55e",
    icon: SiGeeksforgeeks,
    rank: "160-Day Streak",
    rating: 160,
    ratingLabel: "Problems Solved",
    stats: [
      { label: "Challenge", value: "160 Days DSA" },
      { label: "Status", value: "Completed" },
    ],
    href: "https://www.geeksforgeeks.org/profile/puneetsarzj8",
  },
];

// GSAP power3.out (used on awrs.me) as a cubic-bezier — fast in, decelerating settle.
const EASE_POWER3: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

/* ------------------------------------------------------------------ *
 * ExitBlur — awrs.me's signature "content softens as it leaves the top".
 * Sharp through the reading zone; gentle 6px blur only as the block
 * exits upward. Scroll MotionValues only — never re-renders.
 * ------------------------------------------------------------------ */
function ExitBlur({
  children,
  className,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.2", "end start"],
  });
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { filter, opacity, willChange: "filter, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * ProfileEntry — one node of the experience-style timeline, ported 1:1
 * from awrs.me's Experience component: bare content (no card box),
 * first entry on the LEFT and alternating, text stacked exactly like
 * theirs (period → title → subtitle → description → meta " · "),
 * marker = ring + solid-colour circle with white logo riding the line.
 * Mobile swaps the centre line for a coloured start-border (as they do).
 * ------------------------------------------------------------------ */
function ProfileEntry({ p, index }: { p: Profile; index: number }) {
  const reduce = useReducedMotion();
  // awrs.me: `let o = a % 2 == 0` — first entry sits in column 1 (left).
  const isLeft = index % 2 === 0;
  const Icon = p.icon;

  const meta = [
    `${p.rating} ${p.ratingLabel}`,
    ...p.stats.map((s) => `${s.value} ${s.label}`),
  ];

  return (
    <li
      className="group/exp relative border-s-[3px] ps-5 md:border-s-0 md:grid md:grid-cols-2 md:gap-16 md:ps-0"
      style={{ borderInlineStartColor: p.accent }}
    >
      {/* Desktop marker — ring + solid colour disc with white logo, centred on
          the line at the top of the entry (awrs.me exact construction). */}
      <div className="absolute top-1 left-1/2 z-10 hidden -translate-x-1/2 items-center justify-center md:flex">
        <span
          aria-hidden
          className="absolute h-11 w-11 rounded-full border-2 transition-transform duration-300 group-hover/exp:scale-110"
          style={{ borderColor: `${p.accent}40` }}
        />
        <span
          className="grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 group-hover/exp:scale-105"
          style={{
            backgroundColor: p.accent,
            boxShadow: `0 0 0 3px #08080a, 0 0 20px 4px ${p.accent}40`,
          }}
        >
          <Icon className="h-4 w-4 text-white" aria-hidden />
        </span>
      </div>

      <ExitBlur reduce={reduce} className={isLeft ? undefined : "md:col-start-2"}>
        {/* Entrance: down → up (y 40), power3-out, once — awrs.me exact params */}
        <motion.a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 0.8, ease: EASE_POWER3 }}
          className="block"
        >
          {/* Mobile chip + period line */}
          <div className="flex items-center gap-3 md:block">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full md:hidden"
              style={{
                backgroundColor: p.accent,
                boxShadow: `0 0 12px 3px ${p.accent}30`,
              }}
              aria-hidden
            >
              <Icon className="h-3.5 w-3.5 text-white" />
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: p.accent }}
            >
              {p.rank}
            </span>
          </div>

          {/* Title + handle (awrs: title → coloured subtitle) */}
          <h3 className="mt-2 text-xl font-bold leading-tight text-foreground">
            {p.name}
          </h3>
          <p className="mt-1 text-sm font-medium" style={{ color: p.accent }}>
            @{p.handle}
          </p>

          {/* Meta — one middot-joined line (awrs tags treatment) */}
          <p className="mt-3 text-xs tracking-wide text-faint">
            {meta.join(" · ")}
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover/exp:text-foreground">
            View profile
            <span className="inline-block transition-transform duration-300 group-hover/exp:translate-x-0.5">
              ↗
            </span>
          </span>
        </motion.a>
      </ExitBlur>
    </li>
  );
}

export function CodingProfiles() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-scrubbed spine — awrs.me: grow from "top 70%" to "bottom 30%",
  // scrubbed (~0.3 smoothing ⇒ light spring).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });
  const dotOpacity = useTransform(fill, [0, 0.97], [0, 1]);
  const headTop = useTransform(fill, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="coding"
      className="relative scroll-mt-24 pb-16 pt-24 md:pb-24 md:pt-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading — awrs.me style: left-aligned Inter bold + accent bar */}
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Competitive Programming
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-ui mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Coding Profiles
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </Reveal>
        </div>

        {/* Timeline — awrs.me narrows to max-w-4xl and centres it */}
        <div ref={timelineRef} className="relative mx-auto max-w-4xl">
          {/* Running line — 2px, centred, desktop only (mobile uses the
              coloured start-borders). Grows with scroll; brand-coloured so it
              visibly "runs"; terminal dot at its end (awrs.me). */}
          <div
            className="pointer-events-none absolute inset-y-0 left-6 z-0 hidden w-[2px] -translate-x-1/2 md:left-1/2 md:block"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-primary-bright via-primary to-accent"
              style={{ scaleY: reduce ? 1 : fill }}
            />
            {/* soft head riding the growing tip */}
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary-bright shadow-[0_0_10px_3px_rgba(212,84,126,0.55)]"
              style={{ top: headTop, opacity: reduce ? 0 : 1 }}
            />
            {/* terminal dot at the end of the line */}
            <motion.span
              className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(245,158,11,0.45)]"
              style={{ opacity: reduce ? 1 : dotOpacity }}
            />
          </div>

          <ol className="relative space-y-10 md:space-y-20">
            {PROFILES.map((p, i) => (
              <ProfileEntry key={p.name} p={p} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
