"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui";

const METHODS = [
  {
    label: "Email",
    value: "puneetsaxena168@gmail.com",
    href: "mailto:puneetsaxena168@gmail.com",
    icon: "✉️",
  },
  {
    label: "Phone",
    value: "+91 80007 09820",
    href: "tel:+918000709820",
    icon: "📞",
  },
  {
    label: "LinkedIn",
    value: "in/puneet-saxena",
    href: "https://www.linkedin.com/in/puneet-saxena-b8594a325/",
    icon: "💼",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <Reveal>
        <div className="glow-border glow-border-always relative overflow-hidden rounded-[2.5rem] border border-border bg-background-soft px-6 py-16 md:px-16 md:py-24">
          {/* Aurora background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="aurora left-[10%] top-[-20%] h-72 w-72 bg-primary" />
            <div className="aurora right-[5%] top-[10%] h-64 w-64 bg-accent" style={{ animationDelay: "-4s" }} />
            <div className="aurora bottom-[-30%] left-[40%] h-72 w-72 bg-primary-deep" style={{ animationDelay: "-8s" }} />
          </div>

          <div className="relative text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-sm uppercase tracking-[0.3em] text-primary"
            >
              From idea to impact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-6xl"
            >
              Let&apos;s build something{" "}
              <span className="text-gradient">real.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="mx-auto mt-6 max-w-xl text-lg text-muted"
            >
              Open to internships, freelance projects, and collaborations. Have an idea
              or a hard problem? Let&apos;s talk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="mailto:puneetsaxena168@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
              >
                ✉️ Send a Message
              </a>
              <a
                href="https://www.linkedin.com/in/puneet-saxena-b8594a325/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-8 py-4 font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                Connect on LinkedIn ↗
              </a>
            </motion.div>

            {/* Methods */}
            <div className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-3">
              {METHODS.map((m, i) => (
                <motion.a
                  key={m.label}
                  href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="glow-border group rounded-2xl border border-border bg-card/50 p-5 text-left transition-transform hover:-translate-y-1"
                >
                  <div className="text-xl">{m.icon}</div>
                  <div className="mt-2 text-xs uppercase tracking-wide text-faint">{m.label}</div>
                  <div className="truncate font-medium text-foreground transition-colors group-hover:text-primary">
                    {m.value}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
