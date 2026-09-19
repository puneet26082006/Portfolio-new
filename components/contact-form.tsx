"use client";

import { FormEvent, useState } from "react";

const TOPICS = ["Internship", "Freelance project", "Collaboration", "Contest team", "Just saying hi"];

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`${topic} — message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.location.href = `mailto:puneetsaxena168@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-border bg-card/50 p-6 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">Name<input name="name" required maxLength={70} placeholder="Your name" className="mt-2 w-full rounded-xl border border-border bg-background/55 px-4 py-3.5 text-base font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-faint focus:border-primary" /></label>
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">Email<input name="email" type="email" required placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-border bg-background/55 px-4 py-3.5 text-base font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-faint focus:border-primary" /></label>
      </div>
      <fieldset className="mt-6"><legend className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">Topic</legend><div className="mt-3 flex flex-wrap gap-2">{TOPICS.map((item) => <button key={item} type="button" onClick={() => setTopic(item)} className={`rounded-full border px-4 py-2 text-sm transition ${topic === item ? "border-primary bg-primary text-white" : "border-border text-muted hover:text-foreground"}`}>{item}</button>)}</div></fieldset>
      <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.16em] text-faint">Message<textarea name="message" required maxLength={2000} placeholder="Tell me about the role, project, problem, or idea…" className="mt-2 min-h-40 w-full resize-y rounded-xl border border-border bg-background/55 px-4 py-3.5 text-base font-normal normal-case leading-relaxed tracking-normal text-foreground outline-none placeholder:text-faint focus:border-primary" /></label>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><p className="max-w-md text-xs leading-relaxed text-faint">Submitting opens your default email app. Nothing is stored by this website.</p><button type="submit" className="rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition hover:-translate-y-0.5">Prepare message ↗</button></div>
    </form>
  );
}
