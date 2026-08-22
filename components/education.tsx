"use client";

import { motion } from "framer-motion";
import { Reveal, SectionHeading, staggerContainer, staggerItem } from "./ui";

const TIMELINE = [
  {
    title: "B.Tech — Artificial Intelligence & Data Science",
    org: "JECRC Foundation, Jaipur",
    period: "Pursuing",
    detail: "CGPA 8.71 / 10",
    highlight: true,
  },
  {
    title: "Senior Secondary (Class XII)",
    org: "Mahaveer Public School, Jaipur",
    period: "2023",
    detail: "85%",
  },
  {
    title: "Secondary (Class X)",
    org: "Jaipur International Public School, Jaipur",
    period: "2021",
    detail: "90%",
  },
];

const SUBJECTS = [
  "Artificial Intelligence",
  "Data Structures & Algorithms",
  "Machine Learning",
  "Database Management",
  "Cloud Computing",
];

const CERTS = [
  {
    name: "GeeksforGeeks — 160 Days DSA Challenge",
    href: "https://media.geeksforgeeks.org/courses/certificates/a8bf64a61fe9c0b45b55a919133f3f54.pdf",
  },
  {
    name: "GUVI — Certificate of Completion",
    href: "https://www.guvi.in/share-certificate/8D0L5Ixdp771514t45",
  },
];

export function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-24 border-y border-border/60 bg-background-soft/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Education" title={<>Academic foundation</>} />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Timeline */}
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative ml-3 border-l border-border"
          >
            {TIMELINE.map((t) => (
              <motion.li key={t.title} variants={staggerItem} className="relative pb-9 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                    t.highlight
                      ? "border-primary bg-primary shadow-[0_0_12px_2px_rgba(212,84,126,0.5)]"
                      : "border-border bg-card"
                  }`}
                />
                <div className="glow-border rounded-2xl border border-border bg-card/50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-wide text-primary">
                      {t.period}
                    </span>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-soft">
                      {t.detail}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-foreground">{t.title}</h3>
                  <p className="text-sm text-muted">{t.org}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Side panels */}
          <div className="space-y-5">
            <Reveal>
              <div className="glow-border rounded-3xl border border-border bg-card/50 p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  Key Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glow-border rounded-3xl border border-border bg-card/50 p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                  Certifications
                </h3>
                <ul className="space-y-2.5">
                  {CERTS.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40"
                      >
                        <span>{c.name}</span>
                        <span className="text-faint transition-colors group-hover:text-primary">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
