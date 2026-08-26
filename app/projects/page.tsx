import type { Metadata } from "next";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects — Puneet Saxena",
  description: "Selected projects by Puneet Saxena — full-stack web apps, AI builders, and automation flows.",
};

const PROJECTS = [
  {
    title: "Honey Comb — Scam Detection Platform",
    desc: "AI-assisted platform that flags suspicious schemes. Top 2% at the AI India Impact Summit.",
    tags: ["Next.js", "AI", "Team"],
    accent: "#4d9fff",
  },
  {
    title: "Portfolio v2 — This Site",
    desc: "awrs.me-inspired animated portfolio: scroll-scrubbed timelines, Lenis smooth scroll, GSAP-style motion.",
    tags: ["Next.js 16", "framer-motion", "Lenis"],
    accent: "#ec4899",
  },
  {
    title: "n8n Automation Flows",
    desc: "Self-hosted automation pipelines wiring forms, sheets and webhooks into one flow.",
    tags: ["n8n", "Webhooks", "Node"],
    accent: "#facc15",
  },
  {
    title: "Razorpay Storefront",
    desc: "Checkout flow experiment with Razorpay orders, webhooks and a Supabase backend.",
    tags: ["Razorpay", "Supabase", "React"],
    accent: "#22c55e",
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-36 md:pt-44">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Work
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Projects
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <article className="group flex h-full flex-col gap-3 rounded-3xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border/80">
              <div className="flex items-center justify-between">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: p.accent, boxShadow: `0 0 10px 2px ${p.accent}55` }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Case study soon</span>
              </div>
              <h2 className="text-lg font-bold leading-snug text-foreground">{p.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
