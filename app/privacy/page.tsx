import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "Privacy", description: "Privacy information for Puneet Saxena's portfolio." };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pb-28">
      <PageIntro eyebrow="Legal" title="Privacy Policy" accent="Privacy" description="A short, plain-language explanation of what this portfolio does with your data." />
      <article className="legal-copy mx-auto max-w-3xl space-y-10 px-6">
        <section><h2>What this site collects</h2><p>This portfolio does not use account registration, advertising trackers, or a server-side contact database. Standard hosting logs may contain technical information such as request time, browser type, and approximate network information.</p></section>
        <section><h2>Contact form</h2><p>The contact form prepares an email in your own email application. The form contents are not stored by this website. Your email provider handles the message when you choose to send it.</p></section>
        <section><h2>The Wall</h2><p>Wall notes and doodles are stored only in your browser using local storage. They are not uploaded, shared with other visitors, or visible on another device. Clearing browser data removes them.</p></section>
        <section><h2>External links</h2><p>Project demos, GitHub, LinkedIn, and coding-profile links open third-party services. Their own privacy policies apply after you leave this site.</p></section>
        <section><h2>Questions</h2><p>Email <a href="mailto:puneetsaxena168@gmail.com">puneetsaxena168@gmail.com</a> for privacy questions or correction requests.</p></section>
        <p className="font-mono text-xs uppercase tracking-wider text-faint">Last updated: September 19, 2026</p>
      </article>
    </main>
  );
}
