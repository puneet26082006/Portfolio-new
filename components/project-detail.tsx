"use client";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCode,
  FiGlobe,
  FiGrid,
  FiLayers,
  FiUser,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiTypescript,
  SiCplusplus,
  SiSupabase,
  SiCloudinary,
  SiRazorpay,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiPython,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { Project } from "@/lib/content";
import { getProjectPreview } from "@/lib/project-catalog";
import { Spotlight } from "./reference-ui";
import { ProjectGallery } from "./project-gallery";

const ICONS: Record<string, IconType> = {
  React: SiReact,
  "React 19": SiReact,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  Supabase: SiSupabase,
  Cloudinary: SiCloudinary,
  Razorpay: SiRazorpay,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Firebase: SiFirebase,
  Python: SiPython,
};
const FACTS: Record<string, [string, string][]> = {
  "fair-relief-routing": [
    ["70%", "Available stock"],
    ["3", "Benchmark instances"],
    ["5", "Vehicles per instance"],
    ["3", "Optimization priorities"],
  ],
  "honey-comb": [
    ["AI", "Conversation agent"],
    ["API", "Integration"],
    ["Multi-turn", "Context"],
    ["Top 2%", "Summit selection"],
  ],
  "pixora-ai": [
    ["AI", "Background removal"],
    ["Cloud", "Image storage"],
    ["Credits", "Usage system"],
    ["Web", "Platform"],
  ],
  "smartflow-ai": [
    ["Tasks", "Planning"],
    ["Habits", "Consistency"],
    ["AI", "Assistant"],
    ["Focus", "Sessions"],
  ],
  "legal-document-assistant": [
    ["AI", "Project focus"],
    ["Legal", "Document domain"],
    ["Web", "Interface"],
    ["Cloud Run", "Deployment"],
  ],
  "virtual-herbal-garden": [
    ["Plants", "Discovery"],
    ["Learn", "Botanical content"],
    ["Community", "Shared learning"],
    ["Web", "Platform"],
  ],
};

export function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const preview = getProjectPreview(project.slug);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".detail-back", { y: -15, opacity: 0, duration: 0.5 })
          .from(
            ".detail-mark",
            {
              scale: 0.5,
              rotation: -12,
              opacity: 0,
              duration: 0.7,
              ease: "back.out(1.7)",
            },
            "-=.2",
          )
          .from(
            ".detail-char",
            { y: 50, rotateX: -90, opacity: 0, duration: 0.7, stagger: 0.035 },
            "-=.5",
          )
          .from(
            ".detail-summary",
            { y: 20, opacity: 0, duration: 0.7 },
            "-=.45",
          )
          .from(
            ".detail-action",
            { y: 20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.08 },
            "-=.4",
          )
          .from(
            ".detail-meta > div",
            { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=.3",
          );
        gsap.from(".detail-overview-word", {
          opacity: 0.15,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: ".detail-overview",
            start: "top 85%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
        root.current?.querySelectorAll("[data-detail-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }),
        );
        gsap.to(".detail-scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, [project.slug]);
  return (
    <main
      ref={root}
      className="project-detail"
      style={{ "--project-accent": preview.accent } as CSSProperties}
    >
      <div className="detail-scroll-progress" aria-hidden="true" />
      <header className="detail-hero">
        <div className="detail-hero-mesh" aria-hidden="true" />
        <div className="detail-orb detail-orb-one" aria-hidden="true" />
        <div className="detail-orb detail-orb-two" aria-hidden="true" />
        <div className="detail-orb detail-orb-three" aria-hidden="true" />
        <div className="detail-hero-inner">
          <Link href="/projects/" className="detail-back">
            <FiArrowLeft />
            Back to Projects
          </Link>
          <div className="detail-title-row">
            <span className="detail-mark" aria-hidden="true">
              {project.mark}
            </span>
            <h1 aria-label={project.title}>
              {project.title.split(" ").map((word, i) => (
                <span key={i} className="detail-word" aria-hidden="true">
                  {[...word].map((char, j) => (
                    <span className="detail-char" key={j}>
                      {char}
                    </span>
                  ))}{" "}
                </span>
              ))}
            </h1>
          </div>
          <p className="detail-summary">{project.summary}</p>
          <div className="detail-actions">
            {project.links.map((link, i) => {
              const github = link.href.includes("github.com");
              return (
                <a
                  key={link.href}
                  className={`detail-action ${i === 0 ? "detail-action-primary" : ""}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {github ? <FaGithub /> : <FiGlobe />}
                  {github ? "GitHub" : link.label}
                  <FiArrowUpRight />
                </a>
              );
            })}
          </div>
          <dl className="detail-meta">
            {[
              [FiGrid, "Type", project.kicker],
              [FiGlobe, "Platform", project.platform],
              [FiCalendar, "Released", project.period],
              [FiUser, "Role", project.role],
            ].map(([Icon, label, value]) => {
              const Mark = Icon as IconType;
              return (
                <div key={label as string}>
                  <dt>
                    <Mark />
                    {label as string}
                  </dt>
                  <dd>{value as string}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </header>
      <div className="detail-body">
        <div className="detail-overview">
          <p>
            {project.overview.split(" ").map((word, i) => (
              <span key={i} className="detail-overview-word">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
        <section className="detail-section">
          <h2 data-detail-reveal>Core Features</h2>
          <div className="detail-features">
            {project.features.map((feature, i) => (
              <div
                key={feature}
                data-detail-reveal
                className={i === 0 ? "detail-feature-first" : ""}
              >
                <Spotlight
                  reveal={false}
                  className="detail-feature"
                  color={preview.accent + "12"}
                >
                  <span className="detail-feature-dot" />
                  <span>{feature}</span>
                </Spotlight>
              </div>
            ))}
          </div>
        </section>
        <section className="detail-section">
          <h2 data-detail-reveal>Built With</h2>
          <div className="detail-tech">
            {project.tags.map((tag) => {
              const Icon = ICONS[tag] ?? FiCode;
              return (
                <div key={tag} data-detail-reveal>
                  <Spotlight
                    reveal={false}
                    color={preview.accent + "15"}
                    className="detail-tech-card"
                  >
                    <Icon />
                    <span>{tag}</span>
                  </Spotlight>
                </div>
              );
            })}
          </div>
        </section>
        <div className="detail-facts" data-detail-reveal>
          {FACTS[project.slug]?.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <section className="detail-section" data-detail-reveal>
          <h2>Project Previews</h2>
          <ProjectGallery
            image={preview.image}
            title={project.title}
            accent={preview.accent}
          />
        </section>
        <Link className="detail-more" href="/projects/" data-detail-reveal>
          <FiLayers />
          <span>
            <strong>More Projects</strong>
            <small>Explore the rest of my work</small>
          </span>
          <FiArrowUpRight />
        </Link>
      </div>
    </main>
  );
}
