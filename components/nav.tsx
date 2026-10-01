"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiSearch,
  FiHome,
  FiFolder,
  FiBookOpen,
  FiEdit2,
  FiMessageSquare,
  FiGlobe,
  FiSun,
  FiMoon,
  FiShield,
  FiFileText,
  FiCheck,
  FiCode,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FloatingNav } from "./floating-nav";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/lib/content";
import { useTheme, setTheme } from "@/lib/theme";

const PAGES = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/blog", label: "Blog", icon: FiBookOpen },
  { href: "/wall", label: "The Wall", icon: FiEdit2 },
  { href: "/contact", label: "Contact", icon: FiMessageSquare },
];
const SOCIALS = [
  { label: "Resume PDF", href: SITE.resume, icon: FiFileText },
  {
    label: "GitHub",
    href: "https://github.com/puneet26082006",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/puneet-saxena-b8594a325/",
    icon: FaLinkedin,
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/puneet26",
    icon: FiCode,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/_puneet26/",
    icon: FiCode,
  },
];
export function Nav() {
  const pathname = usePathname(),
    router = useRouter(),
    reduced = useReducedMotion();
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const theme = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setQuery("");
      setLanguageOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null,
      overflow = document.body.style.overflow;
    const timer = setTimeout(
      () =>
        dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus(),
      60,
    );
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);
  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized
      ? PROJECTS.filter((project) =>
          `${project.title} ${project.kicker} ${project.tags.join(" ")}`
            .toLowerCase()
            .includes(normalized),
        ).slice(0, 6)
      : [];
  }, [query]);
  function submitSearch(event: FormEvent) {
    event.preventDefault();
    if (suggestions[0]) {
      setOpen(false);
      router.push(`/projects/${suggestions[0].slug}`);
    }
  }
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <FloatingNav
        pathname={pathname}
        onOpen={() => {
          setQuery("");
          setLanguageOpen(false);
          setOpen(true);
        }}
      />
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="navigation-overlay"
                data-lenis-prevent
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) setOpen(false);
                }}
              >
                <motion.div
                  ref={dialogRef}
                  className="navigation-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation"
                  initial={{
                    opacity: 0,
                    y: reduced ? 0 : "100%",
                    scale: 1,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: reduced ? 0 : "100%",
                    scale: 1,
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a"))
                      setOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.stopPropagation();
                      if (languageOpen) setLanguageOpen(false);
                      else setOpen(false);
                    }
                    if (event.key === "Tab") {
                      const items =
                        dialogRef.current?.querySelectorAll<HTMLElement>(
                          "a,button,input",
                        );
                      if (!items?.length) return;
                      const first = items[0],
                        last = items[items.length - 1];
                      if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                      } else if (
                        !event.shiftKey &&
                        document.activeElement === last
                      ) {
                        event.preventDefault();
                        first.focus();
                      }
                    }
                  }}
                >
                  <div className="navigation-top">
                    <form onSubmit={submitSearch} className="navigation-search">
                      <FiSearch aria-hidden="true" />
                      <input
                        aria-label="Search projects"
                        placeholder="Jump to a project..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </form>
                    <Link href="/contact" className="navigation-reach">
                      Reach out
                    </Link>
                    <div className="navigation-language">
                      <button
                        className="navigation-icon"
                        aria-label="Language"
                        aria-expanded={languageOpen}
                        onClick={() => setLanguageOpen(!languageOpen)}
                      >
                        <FiGlobe />
                      </button>
                      {languageOpen && (
                        <div className="navigation-language-menu">
                          <button onClick={() => setLanguageOpen(false)}>
                            <FiCheck /> English
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      className="navigation-icon"
                      onClick={toggleTheme}
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                      {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>
                  </div>
                  {query.trim() ? (
                    <section className="navigation-section">
                      <h2>Projects</h2>
                      <div className="navigation-results">
                        {suggestions.map((project) => (
                          <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                          >
                            <FiFolder />
                            <span>
                              {project.title}
                              <small>{project.kicker}</small>
                            </span>
                          </Link>
                        ))}
                        {!suggestions.length && (
                          <p>
                            No projects found. Try another title or technology.
                          </p>
                        )}
                      </div>
                    </section>
                  ) : (
                    <section className="navigation-section">
                      <h2>Pages</h2>
                      <div className="navigation-pages">
                        {PAGES.map(({ href, label, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            aria-current={
                              (pathname.replace(/\/$/, "") || "/") === href
                                ? "page"
                                : undefined
                            }
                          >
                            <Icon aria-hidden="true" />
                            {label}
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}
                  <section className="navigation-section">
                    <h2>Connect</h2>
                    <div className="navigation-chips">
                      {SOCIALS.map(({ label, href, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon aria-hidden="true" />
                          {label}
                        </a>
                      ))}
                    </div>
                  </section>
                  <section className="navigation-section">
                    <h2>Legal</h2>
                    <div className="navigation-chips">
                      <Link href="/privacy">
                        <FiShield />
                        Privacy Policy
                      </Link>
                      <Link href="/terms">
                        <FiFileText />
                        Terms of Use
                      </Link>
                    </div>
                  </section>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
