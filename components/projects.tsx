"use client";

import Link from "next/link";
import { PROJECTS } from "@/lib/content";
import { ProjectCard } from "./project-card";
import { SectionHeading, Reveal } from "./ui";

export function Projects() {
  const featured = PROJECTS.filter((project) => project.featured);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Featured Work" title={<>Products, systems &amp; experiments</>} />

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Reveal delay={0.08}>
          <Link href="/projects" className="group mt-8 flex items-center justify-between rounded-[1.8rem] border border-dashed border-border bg-card/35 p-7 transition-colors hover:border-primary/50 md:p-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Complete archive</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-foreground">View all projects</h3>
              <p className="mt-1 text-muted">Case studies, architecture notes, and live links.</p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border text-2xl text-foreground transition-all group-hover:rotate-[-12deg] group-hover:border-primary group-hover:text-primary">↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
