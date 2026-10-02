import { pageMetadata, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CodingProfiles } from "@/components/coding-profiles";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { GitHubActivity } from "@/components/github-activity";
import { Misc } from "@/components/misc";
import { Contact } from "@/components/contact";

export const metadata = pageMetadata("Home", SITE_DESCRIPTION, "/");

export default function Home() {
  return (
    <main className="relative">
      <StructuredData data={{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": absoluteUrl("/#profile"), url: absoluteUrl(), name: "Puneet Saxena Portfolio", mainEntity: { "@id": absoluteUrl("/#person") } }} />
      <Hero />
      <About />
      <CodingProfiles />
      <Skills />
      <Projects />
      <Achievements />
      <GitHubActivity />
      <Misc />
      <Contact />
    </main>
  );
}
