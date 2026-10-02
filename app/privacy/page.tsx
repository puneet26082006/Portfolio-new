import { pageMetadata } from "@/lib/seo";
import {
  FiDatabase,
  FiShield,
  FiLink,
  FiClock,
  FiUserCheck,
  FiMonitor,
  FiRefreshCw,
} from "react-icons/fi";
import {
  LegalPage,
  LegalCard,
  LegalDetail,
  LegalContact,
} from "@/components/legal-page";

export const metadata = pageMetadata("Privacy Policy", "How Puneet Saxena's portfolio handles wall accounts, public pins, contact messages, and browser storage.", "/privacy/");
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy matters. Here is what Puneet Saxena's portfolio collects, how its wall and contact form use that information, and how you can manage it."
      otherPage={{ href: "/terms", title: "Terms of Use" }}
    >
      <LegalCard title="What We Collect" icon={FiDatabase}>
        <LegalDetail title="Authentication">
          Google or GitHub sign-in is handled by Supabase. Supabase receives
          account details such as your name, email address, provider identifier,
          and profile information. The wall uses your display name and account
          identifier to associate pins with you. This portfolio does not request
          access to your private repositories or email inbox.
        </LegalDetail>
        <LegalDetail title="Contact Form">
          When you submit the contact form, your name, email address, selected
          topic, message, and consent are sent to Formspree for delivery to my
          inbox. The information is used to respond to your inquiry.
        </LegalDetail>
        <LegalDetail title="Wall Content">
          Your display name, message, drawing, posting date, and account
          identifier are stored with each pin. Pins appear publicly as soon as
          you submit them. Your email address and provider tokens are not
          included in the public wall table. Only share information you intend
          everyone to see.
        </LegalDetail>
      </LegalCard>
      <LegalCard title="How Your Information Is Used" icon={FiShield}>
        <ul>
          <li>
            To sign you in and associate your wall contributions with your
            account.
          </li>
          <li>
            To display your pins publicly and let you remove your own
            contributions.
          </li>
          <li>To deliver contact messages and reply to your questions.</li>
          <li>
            To enforce posting limits and help prevent misuse. A private
            submission log records account identifiers and posting times.
          </li>
        </ul>
      </LegalCard>
      <LegalCard title="Services and External Links" icon={FiLink}>
        <LegalDetail title="Supabase">
          Provides wall authentication and database storage. Google and GitHub
          also process information during sign-in. See{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase&apos;s privacy policy
          </a>{" "}
          for its practices.
        </LegalDetail>
        <LegalDetail title="Formspree and Email">
          Formspree processes contact submissions, which may also remain in my
          email account so I can respond. See{" "}
          <a
            href="https://formspree.io/legal/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formspree&apos;s privacy policy
          </a>
          .
        </LegalDetail>
        <LegalDetail title="Hosting, Demos, and Social Profiles">
          Hosting services may record technical information such as IP
          addresses, request times, and browser details for operation and
          security. Linked project demos, booking services, GitHub, and social
          profiles have their own privacy practices. Information you submit
          there is handled by those services.
        </LegalDetail>
      </LegalCard>
      <LegalCard title="Browser Storage" icon={FiMonitor}>
        <p>
          Supabase keeps your authentication session in browser storage so you
          can stay signed in. The site also remembers your light or dark theme
          and temporarily remembers when to reopen the wall composer after
          login. Drawing drafts stay in the current page until you submit them
          or leave it.
        </p>
        <p>
          You can sign out or clear site storage in your browser. Clearing
          storage does not delete pins already posted to the wall. This
          portfolio does not include advertising trackers.
        </p>
      </LegalCard>
      <LegalCard title="Data Retention" icon={FiClock}>
        <p>
          Wall pins remain stored until you remove them or the site owner
          removes them. Account records remain in Supabase until the account is
          deleted. Contact messages may remain in Formspree and my inbox for
          responding to and following up on your inquiry.
        </p>
        <p>
          The private posting log is separate from your public pins, so deleting
          a pin does not reset posting limits. Backups and operational logs may
          retain information according to the service provider&apos;s settings.
        </p>
      </LegalCard>
      <LegalCard title="Your Choices and Requests" icon={FiUserCheck}>
        <ul>
          <li>
            Browse the portfolio without signing in or submitting a message.
          </li>
          <li>Remove your own wall pins while signed in.</li>
          <li>
            Contact me to request access to, correction of, or deletion of your
            stored information or account.
          </li>
          <li>
            Ask for help removing a contribution if you can no longer access
            your account.
          </li>
        </ul>
        <p>
          I may need to verify that a request relates to your account before
          making changes. Applicable legal requirements and service retention
          rules may affect what can be removed. Public content may have been
          copied by others before deletion.
        </p>
      </LegalCard>
      <LegalCard title="Changes to This Policy" icon={FiRefreshCw}>
        <p>
          This page may be updated when the portfolio&apos;s features or data
          practices change. The date above identifies the latest revision.
          Please check it before sharing information through a new feature.
        </p>
      </LegalCard>
      <LegalContact>
        For privacy questions, account removal, or a request concerning your
        data, contact Puneet Saxena at the email below. Please do not send
        passwords or login tokens.
      </LegalContact>
    </LegalPage>
  );
}
