import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WallExperience } from "@/components/wall-experience";

export const metadata: Metadata = { title: "The Wall", description: "A local-first visitor wall for notes and doodles." };

export default function WallPage() {
  return <main className="min-h-screen"><PageIntro eyebrow="The wall remembers" title="Words Left in the Ruins" accent="Ruins" description="Pin a thought, a hello, or a tiny doodle to this experimental wall." /><WallExperience /></main>;
}
