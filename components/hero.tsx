"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BackgroundBeams } from "./background-beams";
import { SITE } from "@/lib/site";
const NAME = SITE.name;
const STRIPS = [
  {
    angle: "4deg",
    reverse: true,
    duration: 35,
    topClass: "top-[75%] md:top-[85%]",
    className:
      "bg-gradient-to-r from-pink-800 via-rose-700 to-pink-800 text-white/80",
    items: [
      "Competitive Programmer",
      "Full-Stack Developer",
      "AI App Builder",
      "React & Next.js",
      "Node.js & Express",
      "Problem Solver",
    ],
  },
  {
    angle: "-4deg",
    reverse: false,
    duration: 40,
    topClass: "top-[78%] md:top-[88%]",
    className: "bg-card border-y border-border text-muted",
    items: [
      "Codeforces Pupil",
      "CodeChef 3★ Peak",
      "LeetCode 1750+",
      "160-Day DSA Streak",
      "Top 2% · AI India Impact Summit",
      "Creative Developer",
    ],
  },
];

const PARTICLES = [
  { top: "18%", left: "12%", delay: 0 },
  { top: "25%", left: "82%", delay: 1.5 },
  { top: "72%", left: "22%", delay: 3 },
  { top: "68%", left: "86%", delay: 0.8 },
  { top: "40%", left: "6%", delay: 2.2 },
  { top: "55%", left: "92%", delay: 4 },
];
export function Hero() {
  const root = useRef<HTMLElement>(null),
    name = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const paint = () => {
      const heading = name.current;
      if (!heading) return;
      const letters = Array.from(
        heading.querySelectorAll<HTMLElement>(".hero-char"),
      );
      const lines = new Map<number, HTMLElement[]>();
      letters.forEach((letter) => {
        const key = letter.offsetTop;
        lines.set(key, [...(lines.get(key) || []), letter]);
      });
      lines.forEach((line) => {
        const first = line[0],
          last = line[line.length - 1],
          width = last.offsetLeft + last.offsetWidth - first.offsetLeft;
        line.forEach((letter) => {
          letter.style.backgroundSize = width + "px 100%";
          letter.style.backgroundPosition =
            "-" + (letter.offsetLeft - first.offsetLeft) + "px 0";
        });
      });
    };
    paint();
    let disposed = false;
    document.fonts.ready.then(() => {
      if (!disposed) paint();
    });
    const observer = new ResizeObserver(paint);
    if (name.current) observer.observe(name.current);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          ".hero-marquee",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
        )
          .fromTo(
            ".hero-greeting",
            { y: 30, opacity: 0, filter: "blur(8px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
            "-=.6",
          )
          .fromTo(
            ".hero-greeting-line",
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=.2",
          )
          .fromTo(
            ".hero-char",
            { y: 60, opacity: 0, rotationX: 90, filter: "blur(4px)" },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              filter: "blur(0px)",
              duration: 0.5,
              stagger: 0.04,
              ease: "back.out(1.7)",
            },
            "-=.2",
          )
          .fromTo(
            ".hero-tagline",
            { y: 20, opacity: 0, filter: "blur(6px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 },
            "-=.3",
          )
          .fromTo(
            ".hero-particle",
            { opacity: 0 },
            { opacity: 1, duration: 0.8, stagger: 0.05 },
            "-=.4",
          );
      }, root);
      return () => context.revert();
    });
    return () => {
      disposed = true;
      observer.disconnect();
      media.revert();
    };
  }, []);
  return (
    <section
      ref={root}
      id="top"
      className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <BackgroundBeams />
      <div
        className="hero-marquee pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {STRIPS.map((strip, i) => (
          <div
            key={i}
            className={
              "absolute left-[-20%] w-[140%] py-3.5 md:py-5 " +
              strip.topClass +
              " " +
              strip.className
            }
            style={{ transform: "rotate(" + strip.angle + ")" }}
          >
            <div
              className={
                strip.reverse
                  ? "hero-marquee-track-reverse"
                  : "hero-marquee-track"
              }
              style={
                {
                  "--marquee-duration": strip.duration + "s",
                } as React.CSSProperties
              }
            >
              {[0, 1].map((copy) => (
                <span key={copy} className="inline-flex shrink-0 items-center">
                  {[...strip.items, ...strip.items, ...strip.items].map(
                    (item, index) => (
                      <span
                        key={index}
                        className="inline-flex shrink-0 items-center"
                      >
                        <span className="whitespace-nowrap px-4 text-sm font-bold uppercase tracking-wider md:px-6 md:text-base">
                          {item}
                        </span>
                        <span className="text-[.5rem] opacity-60">◆</span>
                      </span>
                    ),
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="hero-particle float-slow pointer-events-none absolute h-1 w-1 rounded-full bg-primary/20"
          style={{ top: p.top, left: p.left, animationDelay: p.delay + "s" }}
        />
      ))}
      <div className="relative z-10 max-w-4xl -translate-y-16 px-6 text-center">
        <p className="hero-greeting mb-4 text-sm font-semibold uppercase tracking-[.25em] text-muted md:text-base">
          Hi, I&apos;m
        </p>
        <span
          className="hero-greeting-line mx-auto mb-8 block h-px w-10 origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
          aria-hidden="true"
        />
        <h1
          ref={name}
          className="hero-name mb-10 text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-8xl lg:text-[112px]"
          style={{ perspective: 600 }}
          aria-label={NAME}
        >
          {NAME.split(" ").map((word, i) => (
            <Fragment key={word}>
              {i > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((ch, index) => (
                  <span
                    key={index}
                    className="hero-char inline-block"
                    aria-hidden="true"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,#a83d62,#d4547e,#e07a9c,#f5b8cc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="hero-tagline mx-auto max-w-xl text-lg font-medium leading-relaxed text-muted md:text-xl">
          Competitive Programmer &amp; Full-Stack Developer
        </p>
      </div>
    </section>
  );
}
