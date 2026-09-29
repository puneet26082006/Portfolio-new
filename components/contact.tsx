"use client";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { ReferenceSection, Spotlight } from "./reference-ui";
export function Contact() {
  return (
    <ReferenceSection
      id="contact"
      title="Ready to Connect?"
      subtitle="Let's turn your next idea into something real"
    >
      <Spotlight className="contact-reference">
        <div className="contact-aurora" />
        <div className="contact-content">
          <h2>
            FROM IDEA TO <span>IMPACT</span>
          </h2>
          <p className="contact-subline">LET&apos;S BUILD SOMETHING REAL.</p>
          <Link href="/contact" className="reference-button contact-button">
            Get in Touch <FiArrowUpRight />
          </Link>
          <p className="contact-availability">
            <span />
            Open to internships &amp; freelance projects
          </p>
          <p className="contact-description">
            I build full-stack applications and AI-powered tools that turn
            complex ideas into useful, seamless experiences.
          </p>
        </div>
      </Spotlight>
    </ReferenceSection>
  );
}
