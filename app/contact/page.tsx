import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact Puneet Saxena about internships, freelance projects, collaborations, and competitive programming." };

const LINKS = [
  ["Email", "puneetsaxena168@gmail.com", "mailto:puneetsaxena168@gmail.com"],
  ["LinkedIn", "Puneet Saxena", "https://www.linkedin.com/in/puneet-saxena-b8594a325/"],
  ["GitHub", "@puneet26082006", "https://github.com/puneet26082006"],
  ["Codeforces", "puneet26", "https://codeforces.com/profile/puneet26"],
];

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-28">
      <PageIntro eyebrow="Get in touch" title="Let's Connect" accent="Connect" description="Open to software engineering internships, freelance builds, collaborations, and serious contest team-ups." />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-[.72fr_1.28fr]">
        <aside className="rounded-[2rem] border border-border bg-card/45 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Elsewhere</p>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {LINKS.map(([label, value, href]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center justify-between gap-4 py-4"><span><span className="block text-xs uppercase tracking-wider text-faint">{label}</span><span className="mt-1 block text-sm text-foreground">{value}</span></span><span className="text-faint transition group-hover:text-primary">↗</span></a>)}
          </div>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5"><p className="text-sm font-semibold text-foreground">Based in Jaipur, India</p><p className="mt-1 text-sm leading-relaxed text-muted">Studying AI &amp; Data Science at JECRC and available for remote collaboration.</p></div>
        </aside>
        <ContactForm />
      </div>
    </main>
  );
}
