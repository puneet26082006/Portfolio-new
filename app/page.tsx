import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CodingProfiles } from "@/components/coding-profiles";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { GitHubActivity } from "@/components/github-activity";
import { Misc } from "@/components/misc";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="relative">
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
