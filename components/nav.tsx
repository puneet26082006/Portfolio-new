"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState, useRef } from "react";
import { FloatingNav } from "./floating-nav";
import { PROJECTS } from "@/lib/content";

const PAGES = [
  { href: "/", label: "Home", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/blog", label: "Journal", index: "03" },
  { href: "/wall", label: "The Wall", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/puneet26082006" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/puneet-saxena-b8594a325/",
  },
  { label: "Codeforces", href: "https://codeforces.com/profile/puneet26" },
  { label: "LeetCode", href: "https://leetcode.com/u/_puneet26/" },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("portfolio-theme");
      const next = saved === "light" ? "light" : "dark";
      setTheme(next);
      document.documentElement.dataset.theme = next;
      document.documentElement.classList.toggle("dark", next === "dark");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      setQuery("");
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => {
      if (open)
        dialogRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    }, 50);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      if (open) previous?.focus();
    };
  }, [open]);

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return PROJECTS.slice(0, 4);
    return PROJECTS.filter((project) =>
      `${project.title} ${project.kicker} ${project.tags.join(" ")}`
        .toLowerCase()
        .includes(normalized),
    ).slice(0, 5);
  }, [query]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    if (suggestions[0]) router.push(`/projects/${suggestions[0].slug}`);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("portfolio-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <>
      <FloatingNav pathname={pathname} onOpen={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            data-lenis-prevent
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
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
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-2xl"
          >
            <div className="mx-auto min-h-full max-w-6xl px-6 py-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm font-black tracking-tight text-foreground"
                >
                  PUNEET<span className="text-primary">.</span>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:text-foreground"
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  >
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-xl text-foreground"
                    aria-label="Close navigation"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid gap-12 pb-10 pt-14 lg:grid-cols-[1.25fr_.75fr] lg:pt-20">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                    Pages
                  </p>
                  <div className="mt-5 divide-y divide-border border-y border-border">
                    {PAGES.map((page, index) => (
                      <motion.div
                        key={page.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.045 }}
                      >
                        <Link
                          href={page.href}
                          className="group flex items-center gap-5 py-4 md:py-5"
                        >
                          <span className="font-mono text-xs text-faint">
                            {page.index}
                          </span>
                          <span className="font-display text-4xl font-bold tracking-tight text-foreground transition group-hover:translate-x-2 group-hover:text-primary md:text-6xl">
                            {page.label}
                          </span>
                          <span className="ml-auto text-2xl text-faint transition group-hover:text-primary">
                            ↗
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
                      Jump to a project
                    </p>
                    <form onSubmit={submitSearch} className="mt-4">
                      <label className="sr-only" htmlFor="project-search">
                        Search projects
                      </label>
                      <input
                        id="project-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by title or technology…"
                        className="w-full rounded-2xl border border-border bg-card/60 px-4 py-3.5 text-base text-foreground outline-none transition placeholder:text-faint focus:border-primary"
                      />
                    </form>
                    <div className="mt-3 space-y-1">
                      {suggestions.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-card hover:text-foreground"
                        >
                          <span>{project.title}</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                            {project.kicker}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-faint">
                        Connect
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        {SOCIALS.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted hover:text-primary"
                          >
                            {social.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-faint">
                        Legal
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        <Link
                          href="/privacy"
                          className="text-sm text-muted hover:text-primary"
                        >
                          Privacy
                        </Link>
                        <Link
                          href="/terms"
                          className="text-sm text-muted hover:text-primary"
                        >
                          Terms
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
