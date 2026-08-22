"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { CountUp, Marquee } from "./ui";

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

const QUICK_STATS = [
  { to: 300, suffix: "+", label: "DSA Problems" },
  { to: 1600, suffix: "", label: "LeetCode Rating" },
  { to: 8.71, decimals: 2, label: "CGPA / 10" },
  { to: 2, suffix: "%", prefix: "Top ", label: "AI Impact Summit" },
];

type Greeting = { text: string; icon: string };

function greetingFor(hour: number): Greeting {
  if (hour < 5) return { text: "Good Night", icon: "🌙" };
  if (hour < 12) return { text: "Good Morning", icon: "☀️" };
  if (hour < 17) return { text: "Good Afternoon", icon: "🌤️" };
  if (hour < 21) return { text: "Good Evening", icon: "🌆" };
  return { text: "Good Night", icon: "🌙" };
}

// Client-only greeting via useSyncExternalStore: server/hydration render the
// neutral fallback (no mismatch), then the client swaps to the time-based value.
// Snapshots must be referentially stable, so both are cached.
const FALLBACK_GREETING: Greeting = { text: "Welcome", icon: "👋" };
let clientGreeting: Greeting | null = null;

const subscribeGreeting = () => () => {};
function getGreetingSnapshot(): Greeting {
  if (!clientGreeting) clientGreeting = greetingFor(new Date().getHours());
  return clientGreeting;
}
function getGreetingServerSnapshot(): Greeting {
  return FALLBACK_GREETING;
}

export function Hero() {
  const greeting = useSyncExternalStore(
    subscribeGreeting,
    getGreetingSnapshot,
    getGreetingServerSnapshot,
  );

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[22%] h-72 w-72 rounded-full bg-primary/20 blur-[100px] float-slow" />
        <div className="absolute right-[10%] top-[30%] h-64 w-64 rounded-full bg-accent/15 blur-[100px] float-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Rotating orbit rings behind the name */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="spin-slow absolute inset-0 rounded-full border border-primary/10" />
        <div className="spin-slow-rev absolute inset-[70px] rounded-full border border-accent/10" />
        <div className="spin-slow absolute inset-[140px] rounded-full border border-primary/[0.07]" style={{ animationDuration: "34s" }} />
        <div className="spin-slow absolute inset-0">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_16px_4px_rgba(212,84,126,0.6)]" />
        </div>
        <div className="spin-slow-rev absolute inset-[70px]">
          <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_4px_rgba(245,158,11,0.6)]" />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        {/* Availability + greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </span>
          <span className="inline-flex min-w-[9.5rem] items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-muted">
            <span>{greeting.icon}</span>
            {greeting.text}
          </span>
        </motion.div>

        {/* Role marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-9 w-full max-w-3xl [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
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

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.8rem,10vw,7rem)] font-black leading-[0.95] tracking-tight"
        >
          <span className="block text-foreground">Hi, I&apos;m</span>
          <span className="text-gradient block">Puneet Saxena</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl"
        >
          A competitive programmer and full-stack developer who turns hard problems
          into fast, scalable products — from{" "}
          <span className="text-foreground">1600-rated algorithms</span> to{" "}
          <span className="text-foreground">AI-powered web apps</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
          >
            View Projects
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {QUICK_STATS.map((s) => (
            <div
              key={s.label}
              className="glow-border rounded-2xl border border-border bg-card/50 px-4 py-5"
            >
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="mt-1.5 text-xs uppercase tracking-wide text-faint">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-primary"
          />
        </span>
      </motion.a>
    </section>
  );
}
