"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function ProjectGallery({
  image,
  title,
  accent,
}: {
  image: string;
  title: string;
  accent: string;
}) {
  const [active, setActive] = useState(1);
  const start = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const next = (direction: number) =>
    setActive((value) => (value + direction + 3) % 3);
  function finish(event: PointerEvent<HTMLDivElement>) {
    if (!start.current) return;
    const dx = event.clientX - start.current.x,
      dy = event.clientY - start.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) next(dx < 0 ? 1 : -1);
    start.current = null;
  }
  return (
    <div
      className="detail-gallery-wrap"
      style={{ "--project-accent": accent } as CSSProperties}
    >
      <div
        className="detail-gallery"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} interface previews`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            next(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            next(-1);
          }
        }}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          start.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={finish}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        <div className="detail-gallery-halo" />
        <div className="detail-gallery-stage">
          {[0, 1, 2].map((screen) => {
            let offset = (screen - active + 3) % 3;
            if (offset === 2) offset = -1;
            return (
              <motion.div
                key={screen}
                aria-hidden={screen !== active}
                className="detail-gallery-phone"
                animate={{
                  x: offset * 180,
                  z: offset === 0 ? 50 : -80,
                  rotateY: -offset * 8,
                  scale: offset === 0 ? 1 : 0.7,
                  opacity: offset === 0 ? 1 : 0.45,
                  filter: offset === 0 ? "blur(0px)" : "blur(1.5px)",
                }}
                transition={{
                  duration: reduced ? 0 : 0.65,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <div className="detail-gallery-screen">
                  <Image
                    draggable={false}
                    src={image}
                    alt={`${title} illustrative interface — screen ${screen + 1}`}
                    width={1536}
                    height={1024}
                    className="project-phone-sheet"
                    style={{ left: `${-screen * 100}%` }}
                    sizes="528px"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        <button
          type="button"
          className="gallery-prev"
          aria-label="Previous preview"
          onClick={() => next(-1)}
        >
          <FiChevronLeft />
        </button>
        <button
          type="button"
          className="gallery-next"
          aria-label="Next preview"
          onClick={() => next(1)}
        >
          <FiChevronRight />
        </button>
      </div>
      <div className="gallery-pagination">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to preview ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <p className="gallery-caption">
        Illustrative interface concepts for {title}.
      </p>
      <span className="sr-only" aria-live="polite">
        Preview {active + 1} of 3
      </span>
    </div>
  );
}
