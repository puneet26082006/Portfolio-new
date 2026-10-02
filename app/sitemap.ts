import type { MetadataRoute } from "next";
import { PROJECTS, POSTS } from "@/lib/content";
import { absoluteUrl, INDEXABLE } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];
  return ["/", "/projects/", "/blog/", "/contact/", "/wall/", "/privacy/", "/terms/", ...PROJECTS.map(p => `/projects/${p.slug}/`), ...POSTS.map(p => `/blog/${p.slug}/`)].map(path => ({ url: absoluteUrl(path) }));
}
