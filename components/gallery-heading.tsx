"use client";
import { motion, useReducedMotion } from "framer-motion";

export function GalleryHeading() {
  const reduced = useReducedMotion();
  return (
    <motion.header
      className="gallery-intro"
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <p>Portfolio</p>
      <h1>
        Projects <em>Gallery</em>
      </h1>
      <div>
        A collection of web, AI, and optimization projects I&apos;ve built.
      </div>
    </motion.header>
  );
}
