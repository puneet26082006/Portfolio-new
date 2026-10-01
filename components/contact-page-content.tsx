"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiCalendar, FiMail, FiMessageCircle } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  SiCodeforces,
  SiCodechef,
  SiLeetcode,
  SiGeeksforgeeks,
} from "react-icons/si";
import { ContactForm } from "./contact-form";

const SOCIALS = [
  { name: "Email", href: "mailto:puneetsaxena168@gmail.com", icon: FiMail },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/puneet-saxena-b8594a325/",
    icon: FaLinkedinIn,
  },
  { name: "GitHub", href: "https://github.com/puneet26082006", icon: FaGithub },
  {
    name: "Codeforces",
    href: "https://codeforces.com/profile/puneet26",
    icon: SiCodeforces,
  },
  {
    name: "CodeChef",
    href: "https://www.codechef.com/users/puneet_26",
    icon: SiCodechef,
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/_puneet26/",
    icon: SiLeetcode,
  },
  {
    name: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/profile/puneetsarzj8",
    icon: SiGeeksforgeeks,
  },
];
function bookingUrl() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_BOOKING_URL ?? "");
    return url.protocol === "https:" &&
      ["cal.com", "calendly.com"].includes(url.hostname)
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
export function ContactPageContent() {
  const [tab, setTab] = useState<"message" | "call">("message");
  const reduced = useReducedMotion();
  const booking = bookingUrl();
  return (
    <main className="contact-page">
      <motion.header
        className="contact-page-heading"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <p className="contact-page-eyebrow">Get in Touch</p>
        <h1>
          LET&apos;S <em>Connect</em>
        </h1>
        <p className="contact-page-subtitle">
          Schedule a call or send a message
        </p>
        <div className="contact-social-links">
          {SOCIALS.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              title={name}
              target={href.startsWith("https") ? "_blank" : undefined}
              rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
            >
              <Icon />
            </a>
          ))}
        </div>
      </motion.header>
      <div className="contact-tabs" role="tablist" aria-label="Contact method">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "call"}
          aria-controls="contact-panel-call"
          id="contact-tab-call"
          onClick={() => setTab("call")}
        >
          <FiCalendar />
          Book a Call
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "message"}
          aria-controls="contact-panel-message"
          id="contact-tab-message"
          onClick={() => setTab("message")}
        >
          <FiMessageCircle />
          Send a Message
        </button>
      </div>
      <div
        className="contact-page-panel"
        role="tabpanel"
        id={`contact-panel-${tab}`}
        aria-labelledby={`contact-tab-${tab}`}
      >
        {tab === "message" ? (
          <ContactForm />
        ) : booking ? (
          <div className="booking-frame">
            <iframe
              title="Book a call with Puneet Saxena"
              src={booking}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <a href={booking} target="_blank" rel="noopener noreferrer">
              Open booking calendar ↗
            </a>
          </div>
        ) : (
          <div className="booking-placeholder">
            <FiCalendar />
            <h2>Let&apos;s find a time to talk.</h2>
            <p>
              Send me a message with your timezone and a few times that work for
              you.
            </p>
            <button
              type="button"
              className="reference-button"
              onClick={() => setTab("message")}
            >
              Arrange a call <FiMessageCircle />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
