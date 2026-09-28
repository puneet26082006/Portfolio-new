import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { POSTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from Puneet Saxena on competitive programming, optimization, and building AI products.",
};

export default function BlogPage() {
  const [featured, ...posts] = POSTS;
  return (
    <main className="min-h-screen pb-28">
      <PageIntro eyebrow="The journal" title="Thoughts & Ideas" accent="Ideas" description="What I learn while solving problems, building products, and turning prototypes into dependable systems." />
      <section className="mx-auto max-w-6xl px-6">
        <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-border bg-card/45 transition hover:border-primary/45 lg:grid-cols-[1.1fr_.9fr]">
          <div className="p-7 md:p-10">
            <div className="flex gap-3 font-mono text-xs uppercase tracking-[0.16em] text-faint"><span className="text-primary">Featured</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.readTime}</span></div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-6xl">{featured.title}</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">{featured.excerpt}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">Read article <span className="transition group-hover:translate-x-1">→</span></span>
          </div>
          <div className="journal-visual min-h-72 border-t border-border lg:border-l lg:border-t-0" aria-hidden><span>01</span></div>
        </Link>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid gap-5 py-7 md:grid-cols-[110px_1fr_auto] md:items-center">
              <div className="font-mono text-xs uppercase tracking-wider text-faint">{post.date}<br />{post.readTime}</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground transition group-hover:text-primary">{post.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{post.excerpt}</p>
              </div>
              <span className="text-2xl text-faint transition group-hover:translate-x-1 group-hover:text-primary">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
