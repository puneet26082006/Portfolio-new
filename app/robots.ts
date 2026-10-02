import type { MetadataRoute } from "next";
import { absoluteUrl, INDEXABLE } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return INDEXABLE
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: absoluteUrl("/sitemap.xml") }
    : { rules: { userAgent: "*", disallow: "/" } };
}
