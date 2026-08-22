"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, SectionHeading } from "./ui";

const FACTS = [
  { label: "Based in", value: "Jaipur, India" },
  { label: "Education", value: "B.Tech · AI & Data Science" },
  { label: "Focus", value: "Full-Stack + Competitive Programming" },
  { label: "Availability", value: "Open to internships & freelance" },
];

// Tries each extension in turn; falls back to the animated monogram if the
// photo hasn't been added to /public yet, so the page never breaks.
const PHOTO_SRCS = ["/puneet.jpg", "/puneet.png", "/puneet.jpeg", "/puneet.webp"];

function Portrait() {
  const [idx, setIdx] = useState(0);
  const src = PHOTO_SRCS[idx];
  const hasPhoto = idx < PHOTO_SRCS.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs float-slow">
      {/* pulsing aura behind the frame */}
      <div className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-primary/30 via-primary/10 to-accent/25 blur-2xl glow-pulse" />

      {/* photo frame with the signature rotating glow border */}
      <div className="glow-border glow-border-always relative h-full w-full overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card to-background-soft">
        {hasPhoto ? (
          <Image
            src={src}
            alt="Puneet Saxena"
            fill
            priority
            sizes="320px"
            onError={() => setIdx((i) => i + 1)}
            className="object-cover object-center transition-all duration-700 ease-out [filter:saturate(0.92)_contrast(1.05)] group-hover:scale-105 hover:scale-[1.04] hover:[filter:saturate(1.18)_contrast(1.08)]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <span className="font-display text-8xl font-black text-gradient">PS</span>
          </div>
        )}

        {/* theme overlays: dark vignette (depth + badge legibility) + faint rose light */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/5 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(212,84,126,0.18),transparent_55%)]" />
        {/* inner hairline for a crisp framed edge */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
      </div>

      {/* floating accent dots */}
      <span className="absolute -right-2 top-6 h-3 w-3 rounded-full bg-accent shadow-[0_0_18px_5px_rgba(245,158,11,0.55)] glow-pulse" />
      <span
        className="absolute -left-2 bottom-16 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_4px_rgba(212,84,126,0.6)] glow-pulse"
        style={{ animationDelay: "-2s" }}
      />
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading eyebrow="About Me" title={<>The person behind the code</>} align="left" />

      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
        {/* Portrait */}
        <Reveal className="group order-1 flex justify-center lg:order-none">
          <Portrait />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              I&apos;m <span className="text-foreground">Puneet Saxena</span> — a
              competitive programmer (Pupil on Codeforces, 2★ on CodeChef) and
              full-stack developer with{" "}
              <span className="text-foreground">300+ DSA problems</span> solved across
              platforms. I build scalable web applications and AI-powered products with{" "}
              <span className="text-primary">React, Node.js and TypeScript</span>,
              wiring in tools like Supabase, Cloudinary and n8n to ship real features fast.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="glow-border rounded-2xl border border-border bg-card/50 p-4"
                >
                  <div className="text-xs uppercase tracking-wide text-faint">{f.label}</div>
                  <div className="mt-1 font-medium text-foreground">{f.value}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <blockquote className="mt-8 border-l-2 border-primary/60 pl-5">
              <p className="font-display text-xl italic text-foreground">
                “First, solve the problem. Then, write the code.”
              </p>
              <footer className="mt-1 text-sm text-faint">— John Johnson</footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
