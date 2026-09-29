"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PATHS = Array.from(
  { length: 15 },
  (_, i) =>
    `M${-380 + i * 28} ${-189 - i * 32}C${-380 + i * 28} ${-189 - i * 32} ${-312 + i * 28} ${216 - i * 32} ${152 + i * 28} ${343 - i * 32}C${616 + i * 28} ${470 - i * 32} ${684 + i * 28} ${875 - i * 32} ${684 + i * 28} ${875 - i * 32}`,
);
const BEAMS = [
  { index: 1, delay: 0, duration: 7 },
  { index: 3, delay: 1.2, duration: 9 },
  { index: 5, delay: 0.5, duration: 11 },
  { index: 7, delay: 2, duration: 8 },
  { index: 9, delay: 2.8, duration: 10 },
  { index: 11, delay: 0.8, duration: 9.5 },
  { index: 13, delay: 2.4, duration: 7.5 },
];

export function BackgroundBeams() {
  const root = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        root.current
          ?.querySelectorAll<SVGPathElement>(".beam-path")
          .forEach((path, i) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `40 ${length}`;
            gsap.fromTo(
              path,
              { strokeDashoffset: length + 40 },
              {
                strokeDashoffset: 0,
                duration: BEAMS[i].duration * 0.8,
                delay: BEAMS[i].delay,
                ease: "none",
                repeat: -1,
              },
            );
          });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <svg
      ref={root}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="-380 -650 1470 1530"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="beams-radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(355 115) rotate(90) scale(765 735)"
        >
          <stop offset=".0666667" stopColor="#888" />
          <stop offset=".243243" stopColor="#888" />
          <stop offset=".43594" stopColor="#888" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beam-gradient">
          <stop stopColor="#18CCFC" stopOpacity="0" />
          <stop offset="20%" stopColor="#18CCFC" />
          <stop offset="60%" stopColor="#6344F5" />
          <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="url(#beams-radial)"
          strokeOpacity=".15"
          strokeWidth=".5"
        />
      ))}
      {BEAMS.map((b) => (
        <path
          key={b.index}
          className="beam-path"
          d={PATHS[b.index]}
          stroke="url(#beam-gradient)"
          strokeWidth=".5"
          strokeOpacity=".6"
          strokeDasharray="40 3000"
          strokeDashoffset="3100"
        />
      ))}
    </svg>
  );
}
