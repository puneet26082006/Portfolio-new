"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  actions?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <header className="page-intro mx-auto max-w-6xl px-6 pb-14 pt-36 text-center md:pb-20 md:pt-44">
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-primary"
      >
        {eyebrow}
      </motion.p>

      <h1 className="mx-auto mt-5 max-w-5xl font-display text-5xl font-black leading-[0.98] tracking-[-0.045em] text-foreground md:text-7xl lg:text-8xl">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={reduce ? false : { opacity: 0, y: 42, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, delay: 0.08 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className={`mr-[0.22em] inline-block last:mr-0 ${
              accent && word.toLowerCase().includes(accent.toLowerCase())
                ? "font-display italic text-primary"
                : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {description && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {description}
        </motion.p>
      )}

      {actions && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.44 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {actions}
        </motion.div>
      )}
    </header>
  );
}
