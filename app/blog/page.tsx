import type { Metadata } from "next";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog — Puneet Saxena",
  description: "Notes on competitive programming, full-stack development and AI builders by Puneet Saxena.",
};

const POSTS = [
  {
    date: "Aug 2026",
    read: "4 min",
    title: "From 160-Day Streak to Contest Rated: My DSA System",
    excerpt:
      "The exact routine behind 300+ problems across Codeforces, CodeChef, LeetCode and GfG — and what actually moved my rating.",
  },
  {
    date: "Jul 2026",
    read: "6 min",
    title: "Building an awrs.me-style Animated Portfolio in Next.js",
    excerpt:
      "Scroll-scrubbed timelines, soft-exit blur and buttery Lenis scrolling — how to port a GSAP feel to framer-motion.",
  },
  {
    date: "Jun 2026",
    read: "5 min",
    title: "Automating the Boring Parts with n8n",
    excerpt:
      "Self-hosting n8n and wiring forms, sheets and webhooks into flows that run while I sleep.",
  },
];

export default function BlogPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-36 md:pt-44">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Notes
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Blog
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </Reveal>
      </div>

      <div className="flex flex-col gap-5">
        {POSTS.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.06}>
            <article className="group flex cursor-pointer flex-col gap-2 rounded-3xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border/80 md:p-7">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                <span>{post.date}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{post.read} read</span>
              </div>
              <h2 className="text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary-bright">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
