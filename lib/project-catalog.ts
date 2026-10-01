import { PROJECTS as DETAILS } from "./content";
import { PROJECTS as FEATURED, type Project } from "./projects";

export function getProjectPreview(slug: string): Project {
  const featured = FEATURED.find(
    (p) =>
      p.id === slug || (slug === "smartflow-ai" && p.id === "smart-flow-ai"),
  );
  const details = DETAILS.find((p) => p.slug === slug)!;
  return {
    ...featured,
    id: slug,
    title: details.title,
    category: details.kicker,
    label: details.period,
    description: details.summary,
    tags: details.tags,
    accent: featured?.accent ?? details.palette[0],
    image: featured?.image ?? "/projects/herbal-garden-mobile.webp",
    detailHref: `/projects/${slug}/`,
  };
}

export const PROJECT_CATALOG = DETAILS.map((p) => getProjectPreview(p.slug));
