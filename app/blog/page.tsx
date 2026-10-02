import { pageMetadata } from "@/lib/seo";
import { BlogJournal } from "@/components/blog-journal";
import Link from "next/link";
import { POSTS } from "@/lib/content";
export const metadata = pageMetadata("Blog & Technical Writing", "Puneet Saxena's published articles on Gemini, Vertex AI, multimodal RAG, and building generative AI applications.", "/blog/");
export default function BlogPage() {
  return <BlogJournal>
    <section className="mt-16 border-t border-border pt-10" aria-labelledby="project-notes-title">
      <h2 id="project-notes-title" className="text-2xl font-semibold text-foreground">Project notes &amp; problem solving</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {POSTS.map(post => <article key={post.slug}>
          <h3 className="font-semibold text-foreground"><Link className="hover:text-primary" href={`/blog/${post.slug}/`}>{post.title}</Link></h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        </article>)}
      </div>
    </section>
  </BlogJournal>;
}
