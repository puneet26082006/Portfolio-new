import type { Metadata } from "next";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Wall — Puneet Saxena",
  description: "Kind words from teammates, mentors and developers Puneet Saxena has worked with.",
};

const NOTES = [
  {
    quote: "Puneet ships fast and asks the right questions. The hackathon prototype wouldn't have happened without him.",
    name: "Teammate",
    role: "AI India Impact Summit",
    accent: "#4d9fff",
  },
  {
    quote: "One of the most consistent learners I know — 160 days of DSA without breaking the streak.",
    name: "Mentor",
    role: "GeeksforGeeks Community",
    accent: "#ec4899",
  },
  {
    quote: "Clean code, clear commits, zero drama on reviews. Would work with again.",
    name: "Peer Developer",
    role: "Open Source",
    accent: "#facc15",
  },
  {
    quote: "He turned our messy requirements into a working demo in two days.",
    name: "Project Partner",
    role: "College Project",
    accent: "#22c55e",
  },
  {
    quote: "Explains his approach before coding — makes contests with him feel easy.",
    name: "Contest Friend",
    role: "Codeforces",
    accent: "#4d9fff",
  },
  {
    quote: "Reliable, curious and always improving. The wall will fill up fast.",
    name: "Well-wisher",
    role: "Jaipur, India",
    accent: "#ec4899",
  },
];

export default function WallPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-36 md:pt-44">
      <div className="mb-14 max-w-2xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Testimonials
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            The Wall
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </Reveal>
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {NOTES.map((n, i) => (
          <Reveal key={n.name + i} delay={i * 0.05} className="mb-5 break-inside-avoid">
            <figure className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-colors duration-300 hover:border-border/80">
              <span className="h-2 w-2 rounded-full" style={{ background: n.accent, boxShadow: `0 0 10px 2px ${n.accent}55` }} />
              <blockquote className="text-sm leading-relaxed text-muted">&ldquo;{n.quote}&rdquo;</blockquote>
              <figcaption className="mt-auto">
                <div className="text-sm font-semibold text-foreground">{n.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-wide text-faint">{n.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
