"use client";
import { SITE } from "@/lib/site";
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
        <Spotlight className="about-location orbital-card-top">
          <div className="orbital-content-top">
            <span className="bento-eyebrow">Flexible with Timezones</span>
            <h3>
              Based in Jaipur, India,
              <br />
              <span>available globally</span>
            </h3>
            <AboutGlobe />
          </div>
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
      <div className="about-orbital orbital-grid">
        <Spotlight
          className="available-card orbital-card-start"
          color="rgba(34,197,94,.1)"
        >
          <div className="available-bg-gradient" />
          <div className="available-border-ring" />
          <div className="available-content orbital-content-start">
            <p className="availability">
              <span />
              Available for Work
            </p>
            <h3>
              <span>HAVE A VISION?</span>
              <span className="gradient-text">LET&apos;S BUILD IT</span>
              <em>together.</em>
            </h3>
            <a href={SITE.resume} download className="reference-button">
              Resume <FiArrowUpRight />
            </a>
          </div>
        </Spotlight>
        <div className="orbital-clock-cell">
          <AboutClock />
        </div>
        <Spotlight className="about-quote orbital-card-end">
          <div className="orbital-content-end">
            <span className="quote-mark">“</span>
            <blockquote>
              Simplicity is a great virtue but it requires hard work to achieve
              it and education to appreciate it.
            </blockquote>
            <p>
              <a
                href="https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD896.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Edsger W. Dijkstra
              </a>
            </p>
          </div>
        </Spotlight>
      </div>
      <Spotlight className="impact-stats-outer orbital-card-bottom">
        <div className="about-stats orbital-content-bottom">
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
      </Spotlight>
    </ReferenceSection>
  );
}
