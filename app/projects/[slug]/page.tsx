import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-card";
import { PROJECTS, getProject } from "@/lib/content";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pb-28 pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-6">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-primary">← Back to projects</Link>

        <header className="mt-10 grid items-end gap-10 border-b border-border pb-14 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{project.kicker} · {project.period}</p>
            <h1 className="mt-5 font-display text-6xl font-black leading-[.95] tracking-[-0.05em] text-foreground md:text-8xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{project.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5">{link.label} ↗</a>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {[
              ["Role", project.role],
              ["Platform", project.platform],
              ["Status", project.status],
              ["Year", project.period],
            ].map(([label, value]) => (
              <div key={label} className="bg-card p-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-10">
          <ProjectVisual project={project} />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Overview</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-foreground">The problem and the build</h2>
          </div>
          <p className="rounded-3xl border border-border bg-card/45 p-7 text-lg leading-8 text-muted md:p-9">{project.overview}</p>
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Core features</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-foreground">What it does</h2>
            </div>
            <span className="hidden font-mono text-xs text-faint sm:block">{String(project.features.length).padStart(2, "0")} capabilities</span>
          </div>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {project.features.map((feature, index) => (
              <li key={feature} className={`${index === 0 ? "md:col-span-2" : ""} flex gap-4 rounded-2xl border border-border bg-card/45 p-5 text-sm leading-relaxed text-muted`}>
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span>{feature}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-[2rem] border border-border bg-card/45 p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Built with</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground">{tag}</span>)}
          </div>
        </section>
      </article>
    </main>
  );
}
