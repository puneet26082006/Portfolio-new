import { pageMetadata } from "@/lib/seo";
import { WallExperience } from "@/components/wall-experience";

export const metadata = pageMetadata("Visitor Wall", "Sign in with Google or GitHub to leave a note or doodle on Puneet's visitor wall.", "/wall/");

export default function WallPage() {
  return (
    <main className="min-h-screen">
      <WallExperience />
    </main>
  );
}
