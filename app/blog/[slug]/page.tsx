import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/content";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pb-28 pt-36 md:pt-44">
      <article className="mx-auto max-w-4xl px-6">
        <Link href="/blog" className="text-sm text-muted transition hover:text-primary">← Back to journal</Link>
        <header className="mt-10 border-b border-border pb-12">
          <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.18em] text-faint"><span className="text-primary">{post.category}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime}</span></div>
          <h1 className="mt-6 font-display text-5xl font-black leading-[1.02] tracking-[-0.04em] text-foreground md:text-7xl">{post.title}</h1>
          <p className="mt-7 text-xl leading-relaxed text-muted">{post.intro}</p>
        </header>
        <div className="prose-portfolio mt-12">
          {post.sections.map((section, index) => (
            <section key={section.title} className="grid gap-5 border-b border-border py-10 md:grid-cols-[70px_1fr]">
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground">{section.title}</h2>
                <div className="mt-5 space-y-5">{section.body.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-muted">{paragraph}</p>)}</div>
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
