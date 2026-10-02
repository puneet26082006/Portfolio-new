import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  FiCheckCircle,
  FiFileText,
  FiShield,
  FiEdit2,
  FiCode,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { LegalPage, LegalCard, LegalContact } from "@/components/legal-page";

export const metadata = pageMetadata("Terms of Use", "Terms for using Puneet Saxena's portfolio, project demos, contact form, and public visitor wall.", "/terms/");
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms describe how you may use Puneet Saxena's portfolio, explore its projects, and contribute to the visitor wall. Please read them before posting or submitting information."
      otherPage={{ href: "/privacy", title: "Privacy Policy" }}
    >
      <LegalCard title="Using This Portfolio" icon={FiCheckCircle}>
        <p>
          This website presents my work, projects, and professional interests.
          Use its interactive features responsibly and in accordance with these
          terms. If you do not agree with the conditions for posting, please do
          not submit content to the wall.
        </p>
        <p>
          The <Link href="/privacy">Privacy Policy</Link> explains how account
          information, public pins, and contact messages are handled.
        </p>
      </LegalCard>
      <LegalCard title="Content and Intellectual Property" icon={FiFileText}>
        <p>
          My original writing, project descriptions, and other original work
          belong to me unless stated otherwise. Third-party libraries, assets,
          and contributions remain subject to their owners&apos; rights and
          licenses. You may link to the portfolio, but must not present my
          identity or work as your own.
        </p>
        <p>
          Source code in linked repositories is governed by the license included
          in each repository. A publicly accessible repository does not, by
          itself, grant permission to reuse unlicensed code.
        </p>
      </LegalCard>
      <LegalCard title="Acceptable Use" icon={FiShield}>
        <p>When using this website, do not:</p>
        <ul>
          <li>
            Attempt unauthorized access, interfere with the service, or evade
            authentication and posting limits.
          </li>
          <li>
            Impersonate someone else or submit misleading identity information.
          </li>
          <li>
            Post harassment, threats, unlawful material, spam, or content that
            infringes another person&apos;s rights.
          </li>
          <li>
            Share passwords, tokens, private personal information, or someone
            else&apos;s confidential material.
          </li>
          <li>
            Use the contact form to send abusive or unsolicited bulk messages.
          </li>
        </ul>
      </LegalCard>
      <LegalCard title="Your Wall Contributions" icon={FiEdit2}>
        <p>
          Visitors can sign in through Google or GitHub to pin a message, a
          drawing, or both. Your pin is published immediately with your display
          name and posting date; it does not wait for approval.
        </p>
        <p>
          You retain ownership of your contribution. By pinning it, you give
          this site permission to store and display it publicly as part of the
          wall. Submit only content you are entitled to share. You can remove
          your own pins while signed in, or contact me for help.
        </p>
        <p>
          Posting limits apply to reduce spam. The site owner may remove
          inappropriate contributions or restrict misuse. Signing out does not
          remove published pins, and deletion cannot recall copies other people
          may have made.
        </p>
      </LegalCard>
      <LegalCard title="Projects, Demos, and External Services" icon={FiCode}>
        <p>
          Project demos are provided for demonstration and learning. Features
          may change, and third-party services may have separate terms, privacy
          practices, or availability limits.
        </p>
        <p>
          AI-generated answers, including outputs from the Legal Document
          Assistant, may be incomplete or incorrect. They are not a substitute
          for professional advice. Do not rely on portfolio demos for medical,
          legal, financial, or other safety-critical decisions, and avoid
          uploading sensitive information to demos.
        </p>
      </LegalCard>
      <LegalCard title="Availability and Responsibility" icon={FiAlertCircle}>
        <p>
          The portfolio and its demos are provided as available. I do not
          promise uninterrupted access, error-free operation, or permanent
          storage of visitor content. Keep your own copies of anything
          important.
        </p>
        <p>
          Use the site with care and independently check information before
          acting on it. Nothing in these terms limits rights or protections that
          applicable law does not allow to be excluded.
        </p>
      </LegalCard>
      <LegalCard title="Changes to These Terms" icon={FiRefreshCw}>
        <p>
          These terms may be updated as the portfolio develops. The date above
          shows the latest revision. Review the current terms when using the
          wall or another interactive feature.
        </p>
      </LegalCard>
      <LegalContact>
        For questions about these terms, permissions to reuse my work, or help
        with a wall contribution, contact Puneet Saxena at the email below.
      </LegalContact>
    </LegalPage>
  );
}
