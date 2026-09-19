import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Terms", description: "Terms of use for Puneet Saxena's portfolio." };

export default function TermsPage() {
  return (
    <main className="min-h-screen pb-28">
      <PageIntro eyebrow="Legal" title="Terms of Use" accent="Terms" description="Simple terms for using this portfolio, its demos, and linked resources." />
      <article className="legal-copy mx-auto max-w-3xl space-y-10 px-6">
        <section><h2>Portfolio content</h2><p>The writing, project descriptions, and original presentation on this site are provided for professional and educational viewing. You may link to the site, but do not present its content or identity as your own.</p></section>
        <section><h2>Project demos</h2><p>Demos and experiments are provided as-is and may change or become unavailable. Do not rely on them for safety-critical, medical, legal, or financial decisions.</p></section>
        <section><h2>Code and repositories</h2><p>Linked repositories are governed by the license included in each repository. If a repository does not include a license, no permission to reuse the code is implied.</p></section>
        <section><h2>Visitor content</h2><p>The Wall is a browser-local experiment. You are responsible for notes and drawings you create on your device. Do not enter secrets, private personal information, or harmful content.</p></section>
        <section><h2>Contact</h2><p>Questions can be sent to <a href="mailto:puneetsaxena168@gmail.com">puneetsaxena168@gmail.com</a>.</p></section>
        <p className="font-mono text-xs uppercase tracking-wider text-faint">Last updated: September 19, 2026</p>
      </article>
    </main>
  );
}
