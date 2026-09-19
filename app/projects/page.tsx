import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Puneet Saxena across AI products, optimization, full-stack development, and interactive learning.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pb-28">
      <PageIntro
        eyebrow="Selected work"
        title="Projects Gallery"
        accent="Gallery"
        description="Useful products, algorithmic systems, and experiments built from problem statement to deployment."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>
    </main>
  );
}
