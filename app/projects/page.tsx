import type { Metadata } from "next";
import { GalleryHeading } from "@/components/gallery-heading";
import { ProjectCard } from "@/components/project-card";
import { PROJECT_CATALOG } from "@/lib/project-catalog";
export const metadata: Metadata = {
  title: "Projects Gallery",
  description:
    "Explore Puneet Saxena's web applications, AI products, and optimization projects.",
};
export default function ProjectsPage() {
  return (
    <main className="project-gallery-page">
      <GalleryHeading />
      <div className="projects-gallery reference-gallery">
        {PROJECT_CATALOG.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </main>
  );
}
