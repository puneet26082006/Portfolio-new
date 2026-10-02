import type { Metadata } from "next";
import { SITE } from "./site";

const configuredUrl = process.env.SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
const parsedUrl = new URL(configuredUrl);
if (parsedUrl.username || parsedUrl.password || parsedUrl.search || parsedUrl.hash || parsedUrl.pathname !== "/") {
  throw new Error("SITE_URL must be a plain origin, such as https://your-domain.com.");
}
const local = ["localhost", "127.0.0.1", "[::1]"].includes(parsedUrl.hostname);
if (!local && parsedUrl.protocol !== "https:") throw new Error("Public SITE_URL must use HTTPS.");
export const SITE_URL = parsedUrl.origin;
export const INDEXABLE = !local && process.env.VERCEL_ENV !== "preview";
export const SITE_TITLE = "Puneet Saxena | Full-Stack Developer & Competitive Programmer";
export const SITE_DESCRIPTION = "Puneet Saxena's portfolio: full-stack and AI projects, competitive programming, and technical writing. Based in Jaipur, India; open to internships and collaborations.";
export const SOCIAL_IMAGE = { url: "/social-preview.png", width: 1200, height: 630, alt: "Puneet Saxena — Full-Stack Developer and Competitive Programmer" };

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(title: string, description: string, path: string, article = false): Metadata {
  const fullTitle = path === "/" ? SITE_TITLE : `${title} | ${SITE.name}`;
  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: fullTitle, description, url: absoluteUrl(path), siteName: "Puneet Saxena Portfolio", locale: "en_IN", type: article ? "article" : "website", images: [SOCIAL_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SOCIAL_IMAGE] },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })) };
}

export const identitySchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": absoluteUrl("/#website"), url: absoluteUrl(), name: "Puneet Saxena Portfolio", alternateName: "Puneet Saxena", inLanguage: "en", publisher: { "@id": absoluteUrl("/#person") } },
    { "@type": "Person", "@id": absoluteUrl("/#person"), name: SITE.name, url: absoluteUrl(), description: SITE_DESCRIPTION, jobTitle: "Full-Stack Developer", homeLocation: { "@type": "Place", name: "Jaipur, Rajasthan, India" }, knowsAbout: ["Full-stack web development", "Competitive programming", "Data structures and algorithms", "React", "Next.js", "AI applications"], sameAs: [SITE.github, SITE.linkedin, "https://medium.com/@puneetsaxena168", "https://codeforces.com/profile/puneet26", "https://www.codechef.com/users/puneet_26", "https://leetcode.com/u/_puneet26/"] },
  ],
};
