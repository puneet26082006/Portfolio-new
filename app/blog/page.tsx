import type { Metadata } from "next";
import { BlogJournal } from "@/components/blog-journal";
export const metadata: Metadata = {
  title: "Thoughts & Ideas",
  description:
    "Puneet Saxena's published articles on Gemini, Vertex AI, multimodal RAG, and building generative AI applications.",
};
export default function BlogPage() {
  return <BlogJournal />;
}
