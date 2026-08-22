"use client";

import { motion } from "framer-motion";
import { SectionHeading, staggerContainer, staggerItem } from "./ui";

type Achievement = {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  featured?: boolean;
  href?: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "🏆",
    title: "Top 2% — AI India Impact Summit",
    subtitle: "Hackathon · Honey Comb",
    description:
      "Selected among the Top 2% of teams for the Honey Comb scam-detection platform, recognized for innovation and impact.",
    featured: true,
  },
  {
    icon: "📊",
    title: "Codeforces Pupil",
    subtitle: "Max Rating 1243",
    description: "Reached Pupil rank with a peak rating of 1243 and 50+ problems solved.",
  },
  {
    icon: "⭐",
    title: "CodeChef 2★ Coder",
    subtitle: "Max Rating 1593",
    description: "Achieved 2★ with a peak rating of 1593 — closing in on 3★.",
  },
  {
    icon: "🥇",
    title: "Global Rank #219",
    subtitle: "CodeChef Div. 3",
    description: "Finished 219th worldwide in a CodeChef Division 3 contest.",
  },
  {
    icon: "🎯",
    title: "Global Rank #1020",
    subtitle: "Codeforces Div. 3",
    description: "Placed 1020th globally in a Codeforces Division 3 round.",
  },
  {
    icon: "🔥",
    title: "160 Days DSA Challenge",
    subtitle: "GeeksforGeeks · Completed",
    description: "Completed the GfG 160-day streak through consistent daily practice.",
    href: "https://media.geeksforgeeks.org/courses/certificates/a8bf64a61fe9c0b45b55a919133f3f54.pdf",
  },
  {
    icon: "🎓",
    title: "JEE B.Planning — AIR 1131",
    subtitle: "98.7 Percentile",
    description: "Secured All-India Rank 1131 with a 98.7 percentile.",
  },
  {
    icon: "💡",
    title: "300+ DSA Problems",
    subtitle: "Across 4 platforms",
    description: "Solved 300+ algorithmic problems on Codeforces, CodeChef, LeetCode & GfG.",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Milestones" title={<>Achievements & recognition</>} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ACHIEVEMENTS.map((a) => {
          const Wrapper = a.href ? motion.a : motion.div;
          return (
            <Wrapper
              key={a.title}
              variants={staggerItem}
              {...(a.href
                ? { href: a.href, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`glow-border group relative flex flex-col rounded-3xl border border-border bg-card/50 p-6 transition-transform duration-300 hover:-translate-y-1 ${
                a.featured ? "sm:col-span-2 lg:col-span-1 lg:row-span-1" : ""
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-2xl ring-1 ring-primary/20">
                  {a.icon}
                </span>
                {a.featured && (
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-soft">
                    Highlight
                  </span>
                )}
                {a.href && (
                  <span className="text-faint transition-colors group-hover:text-primary">↗</span>
                )}
              </div>
              <h3 className="font-semibold leading-snug text-foreground">{a.title}</h3>
              <p className="mt-0.5 font-mono text-xs text-primary">{a.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
            </Wrapper>
          );
        })}
      </motion.div>
    </section>
  );
}
