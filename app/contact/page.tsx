import type { Metadata } from "next";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact — Puneet Saxena",
  description: "Get in touch with Puneet Saxena — competitive programmer and full-stack developer based in Jaipur, India.",
};

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/puneet26082006", handle: "@puneet26082006", accent: "#e5e5e5" },
  { label: "Codeforces", href: "https://codeforces.com/profile/puneet26", handle: "puneet26", accent: "#4d9fff" },
  { label: "LeetCode", href: "https://leetcode.com/u/_puneet26/", handle: "_puneet26", accent: "#facc15" },
  { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/puneetsarzj8", handle: "puneetsarzj8", accent: "#22c55e" },
];

export default function ContactPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-36 md:pt-44">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Say hello
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Contact
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card/50 p-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Email</span>
            <a
              href="mailto:puneetsaxena168@gmail.com"
              className="font-display text-2xl font-bold text-foreground transition-colors hover:text-primary-bright"
            >
              puneetsaxena168@gmail.com
            </a>
            <p className="text-sm leading-relaxed text-muted">
              Based in Jaipur, India. Open to internships, freelance builds and contest team-ups.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-card/50 p-7">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Elsewhere</span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm transition-colors hover:border-primary/40"
              >
                <span className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} />
                  <span className="font-medium text-foreground">{s.label}</span>
                  <span className="font-mono text-xs text-faint">{s.handle}</span>
                </span>
                <span className="text-faint transition-colors group-hover:text-primary">↗</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
