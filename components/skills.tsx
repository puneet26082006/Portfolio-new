"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCloudinary,
  SiCplusplus,
  SiExpress,
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiRazorpay,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Reveal, staggerContainer, staggerItem } from "./ui";

type Skill = { name: string; color: string; icon?: IconType; mono?: string };

/* Flat brand-icon grid with a brand-colour hover wash:
   grid-cols-3 → lg:grid-cols-6, each a bordered `skill-item` card whose
   own `--skill-color` drives a brand-tint fill on hover (icon/name ride
   above via z-[1], card is overflow-hidden). Colours are each tool's real
   brand hue; pure-black brands (Next/Express) go light so they read on the
   dark card. */
const SKILLS: Skill[] = [
  { name: "C++", color: "#00599C", icon: SiCplusplus },
  { name: "JavaScript", color: "#f7df1e", icon: SiJavascript },
  { name: "TypeScript", color: "#3178c6", icon: SiTypescript },
  { name: "React.js", color: "#61dafb", icon: SiReact },
  { name: "Next.js", color: "#ededed", icon: SiNextdotjs },
  { name: "Tailwind CSS", color: "#38bdf8", icon: SiTailwindcss },
  { name: "Node.js", color: "#5fa04e", icon: SiNodedotjs },
  { name: "Express.js", color: "#e5e5e5", icon: SiExpress },
  { name: "Supabase", color: "#3ecf8e", icon: SiSupabase },
  { name: "Cloudinary", color: "#3448c5", icon: SiCloudinary },
  { name: "Git & GitHub", color: "#f05032", icon: SiGit },
  { name: "n8n", color: "#ea4b71", mono: "n8n" },
  { name: "Razorpay", color: "#3395ff", icon: SiRazorpay },
];

const SOFT = [
  "Analytical Thinking",
  "Problem Solving",
  "Team Collaboration",
  "Debugging",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 pb-24 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading — matches the Coding Profiles section (left-aligned Inter
            + eyebrow pill + gradient accent bar) so the two flow as one. */}
        <div className="reference-heading">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Skills
            </h2>
            <span className="mt-4 block h-1 w-16 rounded-full bg-primary" />
          </Reveal>
        </div>

        {/* Responsive skill grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          {SKILLS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.name} variants={staggerItem}>
                <div
                  style={{ ["--skill-color"]: s.color } as CSSProperties}
                  className="skill-item group relative flex h-full cursor-default flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border bg-card px-3 py-6"
                >
                  {Icon ? (
                    <Icon
                      className="skill-icon relative z-[1] h-7 w-7"
                      style={{ color: s.color }}
                      aria-hidden
                    />
                  ) : (
                    <span
                      className="skill-icon relative z-[1] text-lg font-bold leading-none"
                      style={{ color: s.color }}
                      aria-hidden
                    >
                      {s.mono}
                    </span>
                  )}
                  <span className="relative z-[1] text-center text-xs font-semibold tracking-wide text-muted transition-colors duration-300 group-hover:text-foreground">
                    {s.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Beyond code — kept from your stack, styled as a quiet secondary row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <motion.span
            variants={staggerItem}
            className="font-mono text-xs uppercase tracking-[0.2em] text-faint"
          >
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
      </div>
    </section>
  );
}
