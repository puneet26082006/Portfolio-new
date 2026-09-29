"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaTrophy,
  FaChartLine,
  FaStar,
  FaMedal,
  FaAward,
  FaFire,
  FaGraduationCap,
  FaCode,
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
    icon: "📊",
    title: "Codeforces Pupil",
    subtitle: "Max Rating 1243",
    description:
      "Reached Pupil rank with a peak rating of 1243 and 50+ problems solved.",
  },
  {
    icon: "⭐",
    title: "CodeChef 3★ Coder",
    subtitle: "Max Rating 1593",
    description:
      "Reached 3★ with a peak rating of 1593 and 100+ problems solved.",
  },
  {
    icon: "🥇",
    title: "Global Rank #219",
    subtitle: "CodeChef Div. 3",
    description: "Finished 219th worldwide in a CodeChef Division 3 contest.",
  },
  {
    icon: "🎯",
    title: "Global Rank #1020",
    subtitle: "Codeforces Div. 3",
    description: "Placed 1020th globally in a Codeforces Division 3 round.",
  },
  {
    icon: "🥈",
    title: "1st Runner-up — Web Development",
    subtitle: "JECRC · Jul 2026",
    description:
      "Finished first runner-up in a college web development competition.",
  },
  {
    icon: "🥉",
    title: "3rd Place — ScreenFlex",
    subtitle: "JECRC · Feb 2026",
    description:
      "Built a website clone from scratch under competition constraints.",
  },
  {
    icon: "🔥",
    title: "160 Days DSA Challenge",
    subtitle: "GeeksforGeeks · Completed",
    description:
      "Completed the GfG 160-day streak through consistent daily practice.",
    href: "https://media.geeksforgeeks.org/courses/certificates/a8bf64a61fe9c0b45b55a919133f3f54.pdf",
  },
  {
    icon: "🎓",
    title: "JEE B.Planning — AIR 1131",
    subtitle: "98.7 Percentile",
    description: "Secured All-India Rank 1131 with a 98.7 percentile.",
  },
  {
    icon: "💡",
    title: "Multi-platform DSA Practice",
    subtitle: "Codeforces · CodeChef · LeetCode · GfG",
    description:
      "Built consistency across contests, daily challenges, and structured DSA practice.",
  },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899"];
const ICONS = [
  FaTrophy,
  FaChartLine,
  FaStar,
  FaMedal,
  FaAward,
  FaMedal,
  FaTrophy,
  FaFire,
  FaGraduationCap,
  FaCode,
];
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
                      View certificate ↗
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
