"use client";

import { motion } from "framer-motion";
import { SectionHeading, staggerContainer, staggerItem } from "./ui";

type Skill = { name: string; color: string };

const GROUPS: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "C++", color: "#00599C" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "TypeScript", color: "#3178c6" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", color: "#61dafb" },
      { name: "Tailwind CSS", color: "#38bdf8" },
      { name: "Next.js", color: "#ededed" },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "Node.js", color: "#3c9a4e" },
      { name: "Express.js", color: "#a1a1aa" },
      { name: "Supabase", color: "#3ecf8e" },
      { name: "Cloudinary", color: "#3448c5" },
    ],
  },
  {
    title: "Tools & Automation",
    skills: [
      { name: "Git & GitHub", color: "#f05032" },
      { name: "n8n", color: "#ea4b71" },
      { name: "Razorpay", color: "#3395ff" },
    ],
  },
];

const SOFT = ["Analytical Thinking", "Problem Solving", "Team Collaboration", "Debugging"];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading eyebrow="Tech Stack" title={<>Tools I build with</>} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-5 sm:grid-cols-2"
      >
        {GROUPS.map((group) => (
          <motion.div
            key={group.title}
            variants={staggerItem}
            className="glow-border rounded-3xl border border-border bg-card/50 p-6"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((s) => (
                <span
                  key={s.name}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5"
                  style={{ ["--dot" as string]: s.color }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_10px_2px_var(--dot)]"
                    style={{ background: s.color }}
                  />
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-6 flex flex-wrap items-center gap-3"
      >
        <motion.span variants={staggerItem} className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Beyond code:
        </motion.span>
        {SOFT.map((s) => (
          <motion.span
            key={s}
            variants={staggerItem}
            className="rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm text-primary-bright"
          >
            {s}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
