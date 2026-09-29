"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaTrophy,
  FaChartLine,
  FaMedal,
  FaAward,
  FaFire,
} from "react-icons/fa";
import { ReferenceSection, Spotlight } from "./reference-ui";

type Achievement = {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  featured?: boolean;
  href?: string;
};

// Five highlights, selected from Puneet's existing portfolio and public contest history.
const ACHIEVEMENTS: Achievement[] = [
  {
    icon: "🏆",
    title: "Top 2% — AI India Impact Summit",
    subtitle: "Hackathon · Honey Comb",
    description:
      "Selected among the Top 2% of teams for the Honey Comb scam-detection platform, recognized for innovation and impact.",
    featured: true,
  },
  {
    icon: "🥇",
    title: "Global Rank #219",
    subtitle: "CodeChef Starters 238 · Division 3",
    description:
      "Placed 219th globally in Starters 238 Division 3. Reached a three-star peak with a highest rating of 1613.",
    href: "https://www.codechef.com/users/puneet_26",
  },
  {
    icon: "📊",
    title: "Codeforces Pupil · Global Rank #792",
    subtitle: "Peak Rating 1375 · Round 1122",
    description:
      "Achieved global rank 792 in Codeforces Round 1122 Division 3, reaching a peak rating of 1375 with 365 distinct problems solved.",
    href: "https://codeforces.com/profile/puneet26",
  },
  {
    icon: "🥈",
    title: "1st Runner-up — Web Development",
    subtitle: "JECRC · Jul 2026",
    description:
      "Finished first runner-up in a college web development competition, turning product ideas into a working web experience.",
  },
  {
    icon: "🔥",
    title: "160 Days DSA Challenge",
    subtitle: "GeeksforGeeks · Completed",
    description:
      "Completed the GfG 160-day DSA challenge through consistent daily practice and a structured approach to problem solving.",
    href: "https://media.geeksforgeeks.org/courses/certificates/a8bf64a61fe9c0b45b55a919133f3f54.pdf",
  },
];
const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"];
const ICONS = [FaTrophy, FaMedal, FaChartLine, FaAward, FaFire];
export function Achievements() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".achievement-card",
          { y: 50, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              once: true,
            },
          },
        );
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <ReferenceSection id="achievements" title="Achievements">
      <div ref={root} className="achievement-grid">
        {ACHIEVEMENTS.map((a, i) => {
          const color = COLORS[i % COLORS.length],
            Icon = ICONS[i];
          return (
            <Spotlight
              key={a.title}
              reveal={false}
              tilt
              color={color + "12"}
              className={
                "achievement-card achievement-tilt " +
                (a.featured ? "achievement-card--featured" : "")
              }
              style={{ "--achievement-color": color } as CSSProperties}
            >
              <div className="achievement-glow" />
              <div className="achievement-border-sweep" />
              <div className="achievement-content">
                <div
                  className="achievement-medal"
                  style={{ backgroundColor: color + "15", color }}
                >
                  <Icon />
                </div>
                <div>
                  <h3 className={a.featured ? "achievement-shimmer-title" : ""}>
                    {a.title}
                  </h3>
                  <p className="achievement-subtitle" style={{ color }}>
                    {a.subtitle}
                  </p>
                  <p className="achievement-description">{a.description}</p>
                  {a.href && (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="certificate-link"
                    >
                      {a.href.includes("certificates")
                        ? "View certificate ↗"
                        : "View profile ↗"}
                    </a>
                  )}
                </div>
              </div>
              {a.featured &&
                [0, 1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="achievement-particle"
                    style={
                      {
                        width: 3 + (n % 3),
                        height: 3 + (n % 3),
                        top: 12 + n * 20 + "%",
                        right: 8 + n * 4 + "%",
                        backgroundColor: color,
                        "--particle-duration": 5.5 + n * 0.5 + "s",
                        "--particle-delay": n * 0.8 + "s",
                      } as CSSProperties
                    }
                  />
                ))}
            </Spotlight>
          );
        })}
      </div>
    </ReferenceSection>
  );
}
