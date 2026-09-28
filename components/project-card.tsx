"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorDisc = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const pathId = `project-cursor-${useId().replaceAll(":", "")}`;
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const displayedPointer = useRef<{ x: number; y: number } | null>(null);
  const cursorTween = useRef<gsap.core.Tween | null>(null);
  const href = project.live ?? project.github!;

  useEffect(() => () => { cursorTween.current?.kill(); }, []);

  useEffect(() => {
    const circle = cursor.current;
    const disc = cursorDisc.current;
    if (!hovered || reduce || !circle || !disc) return;
    const setX = gsap.quickSetter(circle, "x", "px");
    const setY = gsap.quickSetter(circle, "y", "px");
    const hide = () => {
      pointer.current = null;
      displayedPointer.current = null;
      setHovered(false);
      cursorTween.current?.kill();
      cursorTween.current = gsap.to(disc, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
    };
    const follow = (_time: number, deltaMs: number) => {
      const point = pointer.current;
      const displayed = displayedPointer.current;
      const card = ref.current;
      if (!point || !displayed || !card) return;
      const bounds = card.getBoundingClientRect();
      if (point.x < bounds.left || point.x > bounds.right || point.y < bounds.top || point.y > bounds.bottom) {
        hide();
        return;
      }
      // Ease in viewport space, then compensate for the moving card every frame.
      // Animate visibility separately so it cannot cancel pointer tracking.
      const blend = 1 - Math.exp(-Math.min(deltaMs, 64) / 55);
      displayed.x += (point.x - displayed.x) * blend;
      displayed.y += (point.y - displayed.y) * blend;
      setX(displayed.x - bounds.left - card.clientLeft);
      setY(displayed.y - bounds.top - card.clientTop);
    };
    gsap.ticker.add(follow);
    window.addEventListener("blur", hide);
    return () => { gsap.ticker.remove(follow); window.removeEventListener("blur", hide); };
  }, [hovered, reduce]);

  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduce || (event.target instanceof Element && event.target.closest(".project-code-link"))) return;
    if (!pointer.current) {
      enter(event);
      return;
    }
    pointer.current = { x: event.clientX, y: event.clientY };
  }

  function enter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduce || !cursor.current || !cursorDisc.current || !ref.current) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    displayedPointer.current = { ...pointer.current };
    const card = ref.current;
    const bounds = card.getBoundingClientRect();
    gsap.set(cursor.current, { x: event.clientX - bounds.left - card.clientLeft, y: event.clientY - bounds.top - card.clientTop });
    cursorTween.current?.kill();
    cursorTween.current = gsap.to(cursorDisc.current, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" });
    setHovered(true);
  }

  function leave() {
    setHovered(false);
    pointer.current = null;
    displayedPointer.current = null;
    cursorTween.current?.kill();
    if (cursorDisc.current) cursorTween.current = gsap.to(cursorDisc.current, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
  }

  return (
    <article ref={ref} className={`project-card${hovered ? " project-card-hovered" : ""}`} style={{ "--project-accent": project.accent } as CSSProperties} onPointerEnter={enter} onPointerMove={move} onPointerLeave={leave} onPointerCancel={leave}>
      <a className="project-main-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title} (opens in a new tab)`}>
        <div className="project-meta">
          <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="project-rule" />
          <span className="project-category">{project.category}</span>
          <span className="project-rule" />
          <span className="project-label">{project.label}</span>
        </div>
        <div className="project-title-row">
          <span className="project-monogram" aria-hidden="true">{project.id === "honey-comb" ? "⬡" : project.id === "smart-flow-ai" ? "✧" : "✦"}</span>
          <h3>{project.title}</h3>
          <span className={`project-arrow${project.live && project.github ? " project-arrow-placeholder" : ""}`} aria-hidden="true">↗</span>
        </div>
        <div className="project-description-wrap"><p className="project-description">{project.description}</p></div>
        <div className="project-visual" aria-label={`Generated mobile interface previews for ${project.title}`}>
          <div className="project-phone-group">
            {(["left", "center", "right"] as const).map((position, screen) => (
              <div key={position} className={`project-phone-frame phone-stack phone-stack-${position}`}>
                <div className="project-phone-screen">
                  <Image src={project.image} alt={`${project.title} — generated ${position === "center" ? "main" : position} mobile preview`} width={1536} height={1024} sizes="(min-width: 768px) 576px, 384px" className="project-phone-sheet" style={{ left: `${-screen * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </a>
      <ul className="project-tags" aria-label={`${project.title} technologies and features`}>
        {project.tags.slice(0, 5).map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      {project.live && project.github && <a className="project-code-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub (opens in a new tab)`} title="View source on GitHub" onPointerEnter={leave} onPointerLeave={enter}>↗</a>}
      {!reduce && <div ref={cursor} className="project-cursor" aria-hidden="true">
        <div ref={cursorDisc} className="project-cursor-disc" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <svg viewBox="0 0 120 120" className="project-cursor-text">
            <defs><path id={pathId} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
            <text><textPath href={`#${pathId}`}>OPEN TO EXPLORE • OPEN TO EXPLORE • </textPath></text>
          </svg>
          <span className="project-cursor-eye"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3.5-7.5 10-7.5S22 12 22 12s-3.5 7.5-10 7.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg></span>
        </div>
      </div>}
    </article>
  );
}
