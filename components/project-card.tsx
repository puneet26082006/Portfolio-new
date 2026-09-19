"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/content";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="project-visual relative isolate min-h-64 overflow-hidden rounded-[1.35rem] border border-white/10"
      style={
        {
          "--project-a": project.palette[0],
          "--project-b": project.palette[1],
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="project-orbit project-orbit-one" />
      <div className="project-orbit project-orbit-two" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-x-6 bottom-6 top-10 rounded-[1.6rem] border border-white/15 bg-black/25 p-5 shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65">
          <span>{project.kicker}</span>
          <span>{project.period}</span>
        </div>
        <div className="mt-8 flex items-end justify-between">
          <span className="font-display text-7xl font-black tracking-[-0.08em] text-white/90 md:text-8xl">
            {project.mark}
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
            Case study
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-[1.8rem] border border-border bg-card/55 p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/45"
    >
      <Link href={`/projects/${project.slug}`} className="block rounded-[1.45rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ProjectVisual project={project} />
        <div className="px-3 pb-3 pt-5 md:px-4">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-border" />
            <span>{project.kicker}</span>
            <span>{project.period}</span>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary-bright">
            {project.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-background/55 px-3 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
