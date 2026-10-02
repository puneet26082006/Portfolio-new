import { pageMetadata, breadcrumbs, absoluteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { PROJECTS, getProject } from "@/lib/content";
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? pageMetadata(project.title, project.summary, `/projects/${slug}/`)
    : { title: "Project not found" };
}
export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <>
    <StructuredData data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects/" }, { name: project.title, path: `/projects/${slug}/` }])} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.summary, url: absoluteUrl(`/projects/${slug}/`), author: { "@id": absoluteUrl("/#person") }, keywords: project.tags.join(", "), inLanguage: "en" }} />
    <ProjectDetail project={project} />
  </>;
}
