"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
const PAGES = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/wall", label: "The Wall" },
  { href: "/contact", label: "Contact" },
];
export function FloatingNav({
  pathname,
  onOpen,
}: {
  pathname: string;
  onOpen: () => void;
}) {
  const root = useRef<HTMLElement>(null),
    hello = useRef<HTMLButtonElement>(null),
    links = useRef<HTMLDivElement>(null),
    timeline = useRef<gsap.core.Timeline | null>(null),
    mobile = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const nav = root.current,
      greeting = hello.current,
      row = links.current;
    if (!nav || !greeting || !row) return;
    const hour = new Date().getHours();
    const text =
      hour < 12
        ? "☀️  Good Morning"
        : hour < 17
          ? "🌤️  Good Afternoon"
          : "🌙  Good Evening";
    greeting.textContent = text;
    const context = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.set(row, {
        display: "flex",
        position: "absolute",
        visibility: "hidden",
      });
      const width = row.scrollWidth;
      gsap.set(row, {
        display: "none",
        position: "relative",
        visibility: "visible",
      });
      gsap.set(greeting, { display: "flex" });
      const initialWidth = greeting.scrollWidth;
      if (reduced) {
        gsap.set(greeting, { display: "none" });
        gsap.set(row, { display: "flex", opacity: 1 });
        gsap.set(nav, { opacity: 1, width: "fit-content" });
        return;
      }
      gsap.set(nav, { width: 0, opacity: 0, overflow: "hidden" });
      gsap.set(greeting, { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timeline.current = tl;
      tl.to(nav, {
        width: initialWidth,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
        .to(
          greeting,
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          "-=.25",
        )
        .addLabel("expand", "+=1.8")
        .to(
          greeting,
          { opacity: 0, duration: 0.3, ease: "power2.in" },
          "expand",
        )
        .set(greeting, { display: "none" })
        .set(row, { display: "flex" })
        .to(nav, { width, duration: 0.7, ease: "power3.out" })
        .fromTo(
          row,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=.4",
        )
        .fromTo(
          ".nav-item",
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=.2",
        )
        .set(nav, { width: "fit-content", overflow: "visible" })
        .fromTo(
          ".nav-glow-beam,.nav-glow-core",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
        );
    }, nav);
    const mobileButton = mobile.current;
    if (mobileButton) mobileButton.textContent = text;
    const timer = setTimeout(() => {
      if (mobileButton) mobileButton.textContent = "☰  Tap to Explore";
    }, 3400);
    return () => {
      clearTimeout(timer);
      context.revert();
    };
  }, []);
  useEffect(() => {
    const nav = root.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>('[aria-current="page"]');
    if (!active) return;
    const move = () => {
      const offset = active.offsetLeft;
      gsap.to(nav.querySelector(".nav-active"), {
        left: offset,
        width: active.offsetWidth,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    move();
    const observer = new ResizeObserver(move);
    observer.observe(active);
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <>
      <Link href="/" aria-label="Puneet Saxena home" className="nav-monogram">
        ps<span>~</span>
      </Link>
      <nav ref={root} className="reference-nav" aria-label="Primary navigation">
        <button
          ref={hello}
          className="nav-greeting"
          onClick={() => timeline.current?.play("expand")}
        >
          Welcome
        </button>
        <div ref={links} className="nav-links">
          <div className="nav-links-inner">
            <div className="nav-active">
              <span className="nav-glow-beam" />
              <span className="nav-glow-core" />
            </div>
            {PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="nav-item"
                aria-current={
                  (
                    page.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(page.href)
                  )
                    ? "page"
                    : undefined
                }
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <button
        className="nav-command"
        onClick={onOpen}
        aria-label="Open navigation"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"
          />
        </svg>
      </button>
      <button
        ref={mobile}
        className="mobile-reference-nav"
        onClick={onOpen}
        aria-label="Open navigation"
      >
        Tap to Explore
      </button>
    </>
  );
}
