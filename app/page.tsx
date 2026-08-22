import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { CodingProfiles } from "@/components/coding-profiles";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <CodingProfiles />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
