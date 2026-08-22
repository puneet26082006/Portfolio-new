"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { CountUp, Reveal, SectionHeading } from "./ui";

type Profile = {
  name: string;
  handle: string;
  badge: string;
  accent: string;
  rank: string;
  rating: number;
  ratingLabel: string;
  stats: { label: string; value: string }[];
  href: string;
};

const PROFILES: Profile[] = [
  {
    name: "Codeforces",
    handle: "puneet26",
    badge: "CF",
    accent: "#63b3ed",
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
    badge: "CC",
    accent: "#f59e0b",
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
    badge: "LC",
    accent: "#fbbf24",
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
    badge: "GFG",
    accent: "#22c55e",
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

const SUMMARY = [
  { to: 300, suffix: "+", label: "Total DSA Problems" },
  { to: 4, suffix: "", label: "Active Platforms" },
  { to: 1593, suffix: "", label: "Peak CodeChef" },
  { to: 219, prefix: "#", label: "Best Global Rank" },
];

// GSAP power3.out (used on awrs.me) as a cubic-bezier — fast in, decelerating settle.
const EASE_POWER3: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

/* ------------------------------------------------------------------ *
 * ProfileEntry — one timeline node: a spine marker + a side card that
 * slides in from its own side once, awrs.me-style.
 * ------------------------------------------------------------------ */
function ProfileEntry({ p, index }: { p: Profile; index: number }) {
  const reduce = useReducedMotion();
  // Even entries sit on the right of the spine, odd on the left (matches awrs.me).
  const isRight = index % 2 === 0;
  const fromX = reduce ? 0 : isRight ? 56 : -56;

  return (
    <li className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-16">
      {/* Marker pinned to the spine (left on mobile, center on desktop) */}
      <span
        className="absolute left-6 top-8 z-20 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2"
        aria-hidden
      >
        <span
          className="ping-ring absolute inline-flex h-full w-full rounded-full"
          style={{ background: `${p.accent}55` }}
        />
        <span
          className="relative h-3 w-3 rounded-full ring-2 ring-background"
          style={{ background: p.accent, boxShadow: `0 0 12px 2px ${p.accent}99` }}
        />
      </span>

      {/* Card */}
      <motion.a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={reduce ? false : { opacity: 0, x: fromX, y: 18 }}
        whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -18% 0px" }}
        transition={{ duration: 0.8, ease: EASE_POWER3 }}
        className={`glow-border group relative ml-14 flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/60 p-6 transition-transform duration-300 hover:-translate-y-1 md:ml-0 ${
          isRight ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
        }`}
      >
        {/* accent glow */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: p.accent }}
        />

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl font-mono text-sm font-bold"
              style={{ background: `${p.accent}22`, color: p.accent, border: `1px solid ${p.accent}44` }}
            >
              {p.badge}
            </span>
            <div>
              <div className="font-semibold text-foreground">{p.name}</div>
              <div className="font-mono text-xs text-faint">@{p.handle}</div>
            </div>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{ background: `${p.accent}1a`, color: p.accent }}
          >
            {p.rank}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="font-display text-5xl font-black leading-none text-foreground">
              <CountUp to={p.rating} />
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-faint">
              {p.ratingLabel}
            </div>
          </div>
          <div className="flex gap-5 text-right">
            {p.stats.map((st) => (
              <div key={st.label}>
                <div className="font-semibold text-foreground">{st.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-faint">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-muted transition-colors group-hover:text-primary">
          View profile
          <span className="transition-transform group-hover:translate-x-1">↗</span>
        </div>
      </motion.a>
    </li>
  );
}

export function CodingProfiles() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-scrubbed spine: progress runs as the timeline crosses the viewport,
  // matching awrs.me's `scrub` line (start ~75% down, finish ~40% down).
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
        <SectionHeading
          eyebrow="Competitive Programming"
          title={<>Ranked, rated & relentless</>}
        />

        {/* Summary stat strip */}
        <Reveal>
          <div className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {SUMMARY.map((s) => (
              <div key={s.label} className="bg-card px-5 py-7 text-center">
                <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                  <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-wide text-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Spine — faint track + scroll-scrubbed gradient fill + traveling dot */}
          <div
            className="pointer-events-none absolute bottom-0 left-6 top-0 w-px md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          >
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-primary via-primary to-accent"
              style={{ scaleY: reduce ? 1 : fill, transformOrigin: "top" }}
            />
            {/* glowing head that rides the growing line */}
            <motion.span
              className="glow-pulse absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_5px_rgba(245,158,11,0.6)]"
              style={{ top: reduce ? "100%" : dotTop, opacity: reduce ? 0 : 1 }}
            />
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
