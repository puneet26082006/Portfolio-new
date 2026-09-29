"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function ReferenceSection({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          ".reference-heading > *",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              once: true,
            },
          },
        );
        root.current?.querySelectorAll("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            },
          );
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          toggleClass: "is-visible",
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={root} id={id} className="reference-section">
      <div className="reference-container">
        <header className="reference-heading">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          <span />
        </header>
        {children}
      </div>
    </section>
  );
}

export function Spotlight({
  children,
  className = "",
  color = "rgba(212,84,126,.15)",
  tilt = false,
  style,
  reveal = true,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  tilt?: boolean;
  style?: CSSProperties;
  reveal?: boolean;
}) {
  return (
    <div
      data-reveal={reveal || undefined}
      className={`spotlight-card ${className}`}
      style={{ "--spotlight-color": color, ...style } as CSSProperties}
      onPointerMove={(event) => {
        if (
          event.pointerType === "touch" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const card = event.currentTarget;
        const box = card.getBoundingClientRect();
        const x = event.clientX - box.left,
          y = event.clientY - box.top;
        card.style.setProperty("--spotlight-x", `${x}px`);
        card.style.setProperty("--spotlight-y", `${y}px`);
        if (tilt)
          card.style.transform = `perspective(800px) rotateY(${(x / box.width - 0.5) * 12}deg) rotateX(${-(y / box.height - 0.5) * 12}deg) translateZ(4px)`;
      }}
      onPointerLeave={(event) => {
        if (tilt) event.currentTarget.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}
