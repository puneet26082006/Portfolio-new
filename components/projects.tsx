"use client";

import { Reveal, SectionHeading, TiltCard } from "./ui";

type Project = {
  n: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  tags: string[];
  gradient: string;
  glyph: string;
  links: { label: string; href: string; primary?: boolean }[];
};

const PROJECTS: Project[] = [
  {
    n: "01",
    title: "Pixora AI",
    category: "AI Web App · Background Remover",
    description:
      "An AI-powered background remover with a modern, responsive React + Tailwind interface. Integrates the ClipDrop API for one-click removal, Supabase for auth, Cloudinary for image storage, and Razorpay for subscription billing — with Node.js and n8n orchestrating credit handling and automated image processing.",
    tags: ["React.js", "Tailwind CSS", "ClipDrop API", "Supabase", "Cloudinary", "Razorpay", "n8n"],
    gradient: "from-[#d4547e] to-[#f59e0b]",
    glyph: "✦",
    links: [
      { label: "Live Demo", href: "https://tanstack-start-app.puneetsaxena168.workers.dev/", primary: true },
    ],
  },
  {
    n: "02",
    title: "Honey Comb",
    category: "AI · Scam Detection Platform",
    badge: "Top 2% · AI India Impact Summit",
    description:
      "An AI-powered platform that identifies and analyzes potential honey-trap and fraudulent scam activity, with real-time detection to keep users safe. Built as a hackathon project and selected among the Top 2% of teams at the AI India Impact Summit for innovation and impact.",
    tags: ["AI Analysis", "Real-time Detection", "Web", "Hackathon"],
    gradient: "from-[#a83d62] to-[#d4547e]",
    glyph: "⬡",
    links: [
      { label: "View Code", href: "https://github.com/puneet26082006/Honey-Comb-Scam-detection-", primary: true },
    ],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Featured Work" title={<>Projects that ship</>} />

        <div className="space-y-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <TiltCard className="glow-border group grid overflow-hidden rounded-[2rem] border border-border bg-card/60 md:grid-cols-2">
                {/* Visual panel */}
                <div
                  className={`relative order-1 flex min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br ${p.gradient} md:min-h-[340px] ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
                  <span className="pointer-events-none absolute -right-6 -top-8 font-display text-[10rem] font-black leading-none text-white/15">
                    {p.n}
                  </span>
                  <span className="text-7xl text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                    {p.glyph}
                  </span>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Open to Explore
                  </div>
                </div>

                {/* Content */}
                <div className="order-2 flex flex-col justify-center gap-4 p-7 md:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-primary">{p.category}</span>
                    {p.badge && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
                        🏆 {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                    {p.title}
                  </h3>
                  <p className="leading-relaxed text-muted">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          l.primary
                            ? "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                            : "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                        }
                      >
                        {l.label}
                        <span>↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* More on GitHub */}
        <Reveal delay={0.1}>
          <a
            href="https://github.com/puneet26082006"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border group mt-8 flex items-center justify-between rounded-[2rem] border border-dashed border-border bg-card/40 p-7 transition-colors hover:border-primary/40 md:p-10"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                More on GitHub
              </h3>
              <p className="mt-1 text-muted">
                Explore experiments, contest solutions and works-in-progress.
              </p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border text-2xl text-foreground transition-all duration-300 group-hover:border-primary group-hover:text-primary">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
