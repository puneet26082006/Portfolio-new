"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";
import { ReferenceSection } from "./reference-ui";

const PARTICLES = [
  { top: "20%", left: "15%", size: 8 },
  { top: "65%", left: "80%", size: 6 },
  { top: "45%", left: "90%", size: 10 },
  { top: "75%", left: "10%", size: 4 },
];

export function Contact() {
  const card = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = card.current;
    const halo = glow.current;
    if (!element || !halo) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          })
          .from(element, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          })
          .from(
            ".contact-headline",
            {
              y: 30,
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=.3",
          )
          .from(
            ".contact-subline",
            { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
            "-=.3",
          )
          .from(
            ".contact-button",
            {
              y: 20,
              scale: 0.95,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=.2",
          )
          .from(
            ".contact-availability",
            { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" },
            "-=.2",
          )
          .from(
            ".contact-description",
            { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" },
            "-=.2",
          );
        element
          .querySelectorAll(".contact-cta-particle")
          .forEach((particle, i) => {
            gsap.to(particle, {
              y: i % 2 ? 22 : -25,
              x: i % 2 ? -18 : 20,
              duration: 4 + i,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            gsap.to(particle, {
              opacity: 0.6,
              duration: 3 + i * 0.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          });
      }, element);
      const xTo = gsap.quickTo(halo, "x", {
        duration: 0.4,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(halo, "y", {
        duration: 0.4,
        ease: "power2.out",
      });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = element.getBoundingClientRect();
        xTo(event.clientX - rect.left - rect.width / 2);
        yTo(event.clientY - rect.top - rect.height / 2);
      };
      const enter = (event: PointerEvent) => {
        if (event.pointerType === "mouse")
          gsap.to(halo, { opacity: 1, duration: 0.5, overwrite: "auto" });
      };
      const leave = () => {
        gsap.to(halo, { opacity: 0, duration: 0.5, overwrite: "auto" });
        xTo(0);
        yTo(0);
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointerleave", leave);
        xTo.tween.kill();
        yTo.tween.kill();
        gsap.killTweensOf(halo);
        context.revert();
      };
    });
    return () => media.revert();
  }, []);

  return (
    <ReferenceSection
      id="contact"
      title="Ready to Connect?"
      subtitle="Let's turn your next idea into something real"
    >
      <div ref={card} className="contact-reference">
        <div aria-hidden="true" className="contact-aurora" />
        <div
          aria-hidden="true"
          className="contact-aurora contact-aurora-secondary"
        />
        <div ref={glow} aria-hidden="true" className="contact-cursor-glow" />
        <svg
          aria-hidden="true"
          className="contact-noise"
          width="100%"
          height="100%"
        >
          <filter id="contact-noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#contact-noise-filter)"
            opacity=".5"
          />
        </svg>
        {PARTICLES.map((p, i) => (
          <span
            aria-hidden="true"
            key={i}
            className="contact-cta-particle"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          />
        ))}
        <div className="contact-content">
          <h2 className="contact-headline">
            FROM IDEA TO <span>IMPACT</span>
          </h2>
          <p className="contact-subline">LET&apos;S BUILD SOMETHING REAL.</p>
          <Link href="/contact" className="reference-button contact-button">
            <span className="contact-button-sweep" aria-hidden="true" />
            <span>Get in Touch</span> <FiArrowUpRight />
          </Link>
          <p className="contact-availability">
            <span />
            Open to internships &amp; freelance projects
          </p>
          <p className="contact-description">
            I build full-stack applications and AI-powered tools that turn
            complex ideas into useful, seamless experiences.
          </p>
        </div>
      </div>
    </ReferenceSection>
  );
}
