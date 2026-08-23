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
import { CountUp, Reveal } from "./ui";

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
 * As the wrapped block scrolls up past the viewport top, blur ramps
 * 0 -> 8px and opacity fades late. Driven by scroll MotionValues (no React
 * state), so it never re-renders and never breaks set-state-in-effect.
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
    // Card stays fully sharp through the whole reading zone (centre and below);
    // the blur only ramps once its top passes into the upper ~20% of the screen
    // and it starts leaving — a gentle awrs.me soft-exit, never blurring what
    // you're actually reading.
    offset: ["start 0.2", "end start"],
  });
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

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
 * ProfileEntry — one timeline node: a spine marker + a light, transparent
 * card that slides in from its own side once (awrs.me-style), then softens
 * on exit via ExitBlur.
 * ------------------------------------------------------------------ */
function ProfileEntry({ p, index }: { p: Profile; index: number }) {
  const reduce = useReducedMotion();
  // Even entries sit on the right of the spine, odd on the left (awrs.me zig-zag).
  const isRight = index % 2 === 0;
  const fromX = reduce ? 0 : isRight ? 48 : -48;
  const Icon = p.icon;

  return (
    <li className="group/entry relative md:grid md:grid-cols-2 md:items-center md:gap-x-16">
      {/* Marker — platform logo chip sitting on the spine (awrs.me style: the
          vertical line passes behind it via a background-coloured ring). */}
      <span
        className="absolute left-6 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border bg-card ring-4 ring-background transition-transform duration-300 group-hover/entry:scale-110 md:left-1/2"
        style={{ borderColor: `${p.accent}66`, boxShadow: `0 0 16px 1px ${p.accent}44` }}
        aria-hidden
      >
        <Icon className="h-5 w-5" style={{ color: p.accent }} />
      </span>

      <ExitBlur
        reduce={reduce}
        className={
          isRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
        }
      >
        <motion.a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={reduce ? false : { opacity: 0, x: fromX, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.75, ease: EASE_POWER3 }}
          className="ml-14 flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/25 px-5 py-5 transition-colors duration-300 hover:border-border hover:bg-card/50 md:ml-0"
        >
          {/* Rank — the only accent-coloured text, awrs.me "period" slot */}
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: p.accent }}
          >
            {p.rank}
          </span>

          {/* Platform name + handle */}
          <div>
            <div className="text-lg font-bold leading-tight text-foreground md:text-xl">
              {p.name}
            </div>
            <div className="mt-0.5 font-mono text-xs text-faint">@{p.handle}</div>
          </div>

          {/* Rating (CountUp) — theme gradient keeps every card cohesive */}
          <div className="flex items-end gap-2">
            <span
              className="font-display text-4xl font-bold leading-none"
              style={{ color: p.accent }}
            >
              <CountUp to={p.rating} />
            </span>
            <span className="pb-1 text-[10px] uppercase tracking-wide text-faint">
              {p.ratingLabel}
            </span>
          </div>

          {/* Stats — one middot-separated line (awrs.me "tags" treatment) */}
          <div className="flex flex-wrap items-center text-xs text-faint">
            {p.stats.map((st, i) => (
              <span key={st.label} className="whitespace-nowrap">
                {i > 0 && <span className="mx-2 text-border">·</span>}
                <span className="font-medium text-muted">{st.value}</span> {st.label}
              </span>
            ))}
          </div>

          {/* Link */}
          <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover/entry:text-foreground">
            View profile
            <span className="transition-transform duration-300 group-hover/entry:translate-x-0.5">
              ↗
            </span>
          </div>
        </motion.a>
      </ExitBlur>
    </li>
  );
}

export function CodingProfiles() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-scrubbed spine: progress runs as the timeline crosses the viewport,
  // matching awrs.me's scrubbed experience line (start ~75% down, finish ~40%).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const dotTop = useTransform(fill, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="coding"
      className="relative scroll-mt-24 border-y border-border/60 bg-background-soft/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading — awrs.me style: left-aligned Inter (sans) bold + accent bar */}
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

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Spine — thin, neutral awrs.me line: fades in at the top, draws
              downward as you scroll, and terminates in a dot at the bottom end. */}
          <div
            className="pointer-events-none absolute bottom-0 left-6 top-0 w-0.5 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          >
            {/* masked line (track + scrubbed fill) — fades out only at the top */}
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%)",
              }}
            >
              {/* faint static track */}
              <div className="absolute inset-0 bg-white/10" />
              {/* scroll-scrubbed fill — thin, soft, fades toward its tip */}
              <motion.div
                className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/60 to-white/15"
                style={{ scaleY: reduce ? 1 : fill, transformOrigin: "top" }}
              />
            </div>
            {/* soft head that rides the growing line */}
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.45)]"
              style={{ top: reduce ? "100%" : dotTop, opacity: reduce ? 0 : 1 }}
            />
            {/* terminal dot at the end of the line (awrs.me) */}
            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.35)]" />
          </div>

          <ol className="relative space-y-8 md:space-y-14">
            {PROFILES.map((p, i) => (
              <ProfileEntry key={p.name} p={p} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
