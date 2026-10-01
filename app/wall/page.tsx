import type { Metadata } from "next";
import { WallExperience } from "@/components/wall-experience";

export const metadata: Metadata = {
  title: "The Wall",
  description:
    "Sign in with Google or GitHub to leave a note or doodle on Puneet's visitor wall.",
};

export default function WallPage() {
  return (
    <main className="min-h-screen">
      <WallExperience />
    </main>
  );
}
