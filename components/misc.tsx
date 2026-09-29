"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SiReact, SiCplusplus } from "react-icons/si";
import { ReferenceSection } from "./reference-ui";
const ITEMS = [
  { name: "maki", label: "Maki", x: 44, y: 32, r: 3 },
  { name: "aizen", label: "Aizen", x: 20, y: 8, r: -4 },
  { name: "gwen", label: "Gwen", x: 60, y: 10, r: 5 },
  { name: "tung", label: "Tung", x: 78, y: 5, r: -3 },
  { name: "itachi", label: "Itachi", x: 5, y: 36, r: 3 },
  { name: "mikasa", label: "Mikasa", x: 64, y: 42, r: 4 },
  { name: "sawako", label: "Sawako", x: 80, y: 38, r: -2 },
  { name: "mikey", label: "Mikey", x: 48, y: 66, r: -3 },
  { name: "yuta", label: "Yuta", x: 70, y: 72, r: 4 },
  { name: "kora", label: "Kurapika", x: 4, y: 66, r: -5 },
  { name: "hutao", label: "Hutao", x: 8, y: 5, r: -4 },
];
export function Misc() {
  const reduced = useReducedMotion();
  return (
    <ReferenceSection id="misc" title="Misc">
      <div className="misc-board-dots misc-board">
        <svg width="0" height="0" aria-hidden="true">
          <defs>
            <filter
              id="sticker-cutline"
              x="-30%"
              y="-30%"
              width="165%"
              height="175%"
            >
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius="2.75"
                result="expanded"
              />
              <feGaussianBlur
                in="expanded"
                stdDeviation=".25"
                result="smooth"
              />
              <feDropShadow
                dx="1.5"
                dy="4"
                stdDeviation="3.5"
                floodOpacity=".24"
              />
              <feFlood floodColor="white" />
              <feComposite in2="smooth" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <div className="misc-note">
          First, solve the problem.
          <br />
          Then, write the code.
        </div>
        <span className="misc-monogram">PS</span>
        <SiReact className="misc-tech misc-react" aria-label="React" />
        <SiCplusplus className="misc-tech misc-cpp" aria-label="C++" />
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.name}
            className="misc-item"
            style={{ left: item.x + "%", top: item.y + "%", rotate: item.r }}
            initial={reduced ? false : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: i * 0.07,
              type: "spring",
              bounce: 0.45,
            }}
            whileHover={
              reduced ? undefined : { scale: 1.12, rotate: 0, zIndex: 5 }
            }
          >
            <Image
              src={"/misc/" + item.name + ".png"}
              width={180}
              height={200}
              alt={item.label}
              style={{ height: "auto" }}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
      <div className="misc-wall-link">
        <Link href="/wall">
          <span>✎</span>
          <span>wanna leave your mark?</span>
          <strong>pin something on the visitor wall →</strong>
        </Link>
      </div>
    </ReferenceSection>
  );
}
