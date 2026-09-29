"use client";
import Link from "next/link";
import {
  FiBookOpen,
  FiCode,
  FiLayers,
  FiAward,
  FiArrowUpRight,
} from "react-icons/fi";
import { ReferenceSection, Spotlight } from "./reference-ui";
import { AboutClock } from "./about-clock";
import { AboutGlobe } from "./about-globe";
import { CountUp } from "./ui";
import { PROJECTS } from "@/lib/content";
const STATS = [
  {
    value: PROJECTS.length,
    label: "Projects",
    icon: FiLayers,
    color: "#d4547e",
  },
  { value: 4, label: "Coding Platforms", icon: FiCode, color: "#3b82f6" },
  { value: 160, label: "Days of DSA", icon: FiAward, color: "#10b981" },
  { value: 13, label: "Technical Skills", icon: FiBookOpen, color: "#f59e0b" },
];
export function About() {
  return (
    <ReferenceSection id="about" title="About Me">
      <div className="about-bento">
        <Spotlight className="about-bio">
          <div className="about-identity">
            <div className="avatar-ring">
              <span>PS</span>
            </div>
            <div>
              <h3 className="gradient-text">Puneet Saxena</h3>
              <p>Competitive Programmer &amp; Full-Stack Developer</p>
            </div>
          </div>
          <p className="about-description">
            I&apos;m an AI &amp; Data Science undergraduate who enjoys turning
            hard problems into useful products. I build full-stack web
            applications and AI-powered tools, combining competitive programming
            with thoughtful product development.
          </p>
        </Spotlight>
        <Spotlight className="about-location">
          <span className="bento-eyebrow">Flexible with Timezones</span>
          <h3>
            Based in Jaipur, India,
            <br />
            <span>available globally</span>
          </h3>
          <AboutGlobe />
        </Spotlight>
        <Spotlight className="about-education">
          <div className="bento-label">
            <FiBookOpen />
            <span>Education</span>
          </div>
          <div className="education-mini">
            <strong>JECRC Foundation, Jaipur</strong>
            <p>B.Tech · Artificial Intelligence &amp; Data Science</p>
            <div>
              <span className="status-pill">Pursuing</span>
              <span>CGPA 8.71 / 10</span>
            </div>
          </div>
          <div className="education-mini">
            <strong>Mahaveer Public School</strong>
            <p>Senior Secondary · 2023 · 85%</p>
          </div>
          <div className="education-mini">
            <strong>Jaipur International Public School</strong>
            <p>Secondary · 2021 · 90%</p>
          </div>
        </Spotlight>
      </div>
      <div className="about-orbital">
        <Spotlight className="available-card" color="rgba(34,197,94,.1)">
          <div className="available-bg-gradient" />
          <div className="available-border-ring" />
          <div className="available-content">
            <p className="availability">
              <span />
              Available for Work
            </p>
            <h3>
              <span>HAVE A VISION?</span>
              <span className="gradient-text">LET&apos;S BUILD IT</span>
              <em>together.</em>
            </h3>
            <Link href="/contact" className="reference-button">
              Let&apos;s talk <FiArrowUpRight />
            </Link>
          </div>
        </Spotlight>
        <AboutClock />
        <Spotlight className="about-quote">
          <span className="quote-mark">“</span>
          <blockquote>
            First, solve the problem.
            <br />
            Then, write the code.
          </blockquote>
          <p>John Johnson</p>
        </Spotlight>
      </div>
      <div className="about-stats">
        {STATS.map((stat) => (
          <Spotlight
            key={stat.label}
            className="impact-stat"
            color={stat.color + "18"}
            style={{ "--stat-accent": stat.color } as React.CSSProperties}
          >
            <stat.icon style={{ color: stat.color }} />
            <CountUp to={stat.value} className="about-stat-number" />
            <span>{stat.label}</span>
          </Spotlight>
        ))}
      </div>
    </ReferenceSection>
  );
}
