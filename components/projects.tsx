"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type FocusEvent } from "react";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "./project-card";


export function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const root = section.current;
    const row = track.current;
    if (!root || !row) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!heading.current) return;
      gsap.fromTo(heading.current.children, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: heading.current, start: "top 85%", once: true },
      });
    });
    let refreshFrame = 0;
    let disposed = false;
    // Extracted FeaturedProjects behavior: native sticky, measured overflow,
    // top/top -> bottom/bottom, linear translation, one-second GSAP scrub.
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.horizontal = "true";
      const travel = () => Math.max(0, row.scrollWidth - document.documentElement.clientWidth);
      const size = () => { root.style.height = `${window.innerHeight + travel()}px`; };
      size();
      const tween = gsap.to(row, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: size,
        },
      });
      scrollTween.current = tween;
      ScrollTrigger.addEventListener("refreshInit", size);
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      observer.observe(row);
      ScrollTrigger.refresh();
      return () => {
        observer.disconnect();
        cancelAnimationFrame(refreshFrame);
        ScrollTrigger.removeEventListener("refreshInit", size);
        scrollTween.current = null;
        root.dataset.horizontal = "false";
        root.style.removeProperty("height");
      };
    });
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, []);
  function revealFocusedCard(event: FocusEvent<HTMLDivElement>) {
    const root = section.current;
    const row = track.current;
    if (!root || !row || root.dataset.horizontal !== "true") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".project-track-item");
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    if (bounds.left >= 20 && bounds.right <= window.innerWidth - 20) return;
    const inset = parseFloat(getComputedStyle(row).paddingLeft);
    const travel = Math.min(row.scrollWidth - document.documentElement.clientWidth, Math.max(0, card.offsetLeft - inset));
    window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY + travel, behavior: "instant" });
    ScrollTrigger.update();
    scrollTween.current?.scrollTrigger?.getTween()?.progress(1);
    const viewport = root.querySelector<HTMLElement>(".projects-sticky");
    if (viewport) viewport.scrollLeft = 0;
  }

  return (
    <section ref={section} id="projects" className="featured-projects" aria-labelledby="featured-projects-title">
      <div className="projects-sticky">
        <div className="projects-content">
          <div ref={heading} className="projects-heading">
              <h2 id="featured-projects-title">Featured Projects</h2>
              <span className="projects-heading-line" />
          </div>
          <div ref={track} className="projects-track" onFocusCapture={revealFocusedCard}>
            {PROJECTS.map((project, index) => <div className="project-track-item" key={project.id}><ProjectCard project={project} index={index} /></div>)}
            <div className="project-track-item">
              <Link href="/projects" className="projects-more">
                <span className="projects-more-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg></span>
                <div><h3>View All Projects</h3><p>See the full collection</p></div>
                <span className="projects-more-button">Explore <span aria-hidden="true">→</span></span>
              </Link>
            </div>
            <div className="projects-end-space" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
