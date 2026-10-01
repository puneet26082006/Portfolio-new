"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { sendContact } from "@/lib/contact-service";
const TOPICS = [
  "Internship / role",
  "Freelance project",
  "Just saying hi",
  "Bug report",
  "Other",
];
export function ContactForm() {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    busy.current = true;
    setStatus("sending");
    setError("");
    try {
      await sendContact(
        {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          topic,
          message: String(data.get("message") ?? ""),
          consent: data.get("consent") === "on",
          honeypot: String(data.get("_gotcha") ?? ""),
        },
        process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "",
      );
      setStatus("success");
      form.reset();
      setTopic("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "The request timed out. Please try again or email me directly.",
      );
    } finally {
      busy.current = false;
    }
  }
  return (
    <div className="reference-contact-form">
      <div className="form-aurora form-aurora-pink" />
      <div className="form-aurora form-aurora-green" />
      {status === "success" ? (
        <div className="contact-success" role="status">
          <FiCheckCircle />
          <h2>Message sent.</h2>
          <p>
            Thanks for reaching out. I&apos;ll reply to the email address you
            provided.
          </p>
          <button
            className="reference-button"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="contact-fields"
          aria-busy={status === "sending"}
        >
          <div className="contact-name-email">
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={70}
                placeholder="Jane Doe"
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="jane@example.com"
              />
            </label>
          </div>
          <fieldset>
            <legend>Topic</legend>
            <div className="contact-topic-pills">
              {TOPICS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={topic === item}
                  onClick={() => setTopic(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Message
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              placeholder="Tell me about your idea, project, or opportunity..."
            />
          </label>
          <div className="contact-honeypot" aria-hidden="true">
            <label>
              Leave this empty
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="contact-consent">
            <input name="consent" type="checkbox" required />
            <span>
              I agree that my submitted data is collected and stored to respond
              to my inquiry. <Link href="/privacy/">Privacy policy</Link>
            </span>
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="contact-submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
            <FiArrowUpRight />
          </button>
        </form>
      )}
    </div>
  );
}
