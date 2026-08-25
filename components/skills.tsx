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

/* Flat brand-icon grid — ported 1:1 from awrs.me's #skills section:
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

const SOFT = ["Analytical Thinking", "Problem Solving", "Team Collaboration", "Debugging"];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-b border-border/60 bg-background-soft/40 pb-24 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading — matches the Coding Profiles section (left-aligned Inter
            + eyebrow pill + gradient accent bar) so the two flow as one. */}
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Tech Stack
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-ui mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Tools I build with
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          </Reveal>
        </div>

        {/* Skill grid — exact awrs.me columns + gap */}
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
              <motion.div
                key={s.name}
                variants={staggerItem}
                style={{ ["--skill-color"]: s.color } as CSSProperties}
                className="group relative flex cursor-default flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border bg-card px-3 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--skill-color)]"
              >
                {/* brand-tint fill on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.12]"
                  style={{ background: s.color }}
                />
                {Icon ? (
                  <Icon
                    className="relative z-[1] h-7 w-7 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: s.color }}
                    aria-hidden
                  />
                ) : (
                  <span
                    className="relative z-[1] text-lg font-bold leading-none transition-transform duration-300 group-hover:scale-110"
                    style={{ color: s.color }}
                    aria-hidden
                  >
                    {s.mono}
                  </span>
                )}
                <span className="relative z-[1] text-center text-xs font-semibold tracking-wide text-muted transition-colors duration-300 group-hover:text-foreground">
                  {s.name}
                </span>
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
