import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowLeft, FiArrowRight, FiClock, FiMail } from "react-icons/fi";

export function LegalPage({
  title,
  intro,
  otherPage,
  children,
}: {
  title: string;
  intro: string;
  otherPage: { href: string; title: string };
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <header className="legal-page-hero">
        <div className="legal-page-heading">
          <p className="legal-page-label">Legal</p>
          <h1>{title}</h1>
          <p className="legal-page-date">
            <FiClock aria-hidden="true" />
            Last updated: <time dateTime="2026-10-01">October 1, 2026</time>
          </p>
        </div>
      </header>
      <div className="legal-page-intro">
        <p>{intro}</p>
      </div>
      <article className="legal-page-cards" aria-label={title}>
        {children}
      </article>
      <nav className="legal-page-links" aria-label="Legal page navigation">
        <Link href="/">
          <FiArrowLeft aria-hidden="true" />
          Back to Home
        </Link>
        <Link href={otherPage.href}>
          {otherPage.title}
          <FiArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </main>
  );
}
export function LegalCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: IconType;
  children: ReactNode;
}) {
  return (
    <section className="policy-card">
      <div className="policy-card-heading">
        <span>
          <Icon aria-hidden="true" />
        </span>
        <h2>{title}</h2>
      </div>
      <div className="policy-card-content">{children}</div>
    </section>
  );
}
export function LegalDetail({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="policy-detail">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
export function LegalContact({ children }: { children: ReactNode }) {
  return (
    <LegalCard title="Contact" icon={FiMail}>
      <p>{children}</p>
      <a className="policy-email" href="mailto:puneetsaxena168@gmail.com">
        <FiMail aria-hidden="true" />
        puneetsaxena168@gmail.com
      </a>
    </LegalCard>
  );
}
