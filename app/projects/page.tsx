import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Puneet Saxena",
  description: "Explore Pixora AI, Honey Comb, and Smart Flow AI — AI products by Puneet Saxena.",
};

export default function ProjectsPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-28 pt-36 md:pt-44">
      <header className="projects-gallery-heading">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Selected work</p>
        <h1 className="font-ui mt-5 text-4xl font-bold tracking-tight md:text-6xl">Projects</h1>
        <span className="projects-heading-line" />
      </header>
      <div className="projects-gallery">
        {PROJECTS.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
      <a href="https://github.com/puneet26082006" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">More experiments on GitHub <span aria-hidden="true">↗</span></a>
    </main>
  );
}
