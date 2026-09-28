"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/puneet-saxena-b8594a325/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/puneet26" },
  { label: "LeetCode", href: "https://leetcode.com/u/_puneet26/" },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { icon: "☀", label: "Good Morning" };
  if (hour < 17) return { icon: "◐", label: "Good Afternoon" };
  return { icon: "☾", label: "Good Evening" };
}

function MenuMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden>
      <path strokeLinecap="round" d="M7 8.5h10M7 15.5h10" />
      <circle cx="5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hello, setHello] = useState({ icon: "◐", label: "Welcome" });

  useEffect(() => {
    setHello(greeting());
    const saved = window.localStorage.getItem("portfolio-theme");
    const nextTheme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    const timer = window.setTimeout(() => setReady(true), reduce ? 0 : 2450);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return PROJECTS.slice(0, 4);
    return PROJECTS.filter((project) =>
      `${project.title} ${project.kicker} ${project.tags.join(" ")}`.toLowerCase().includes(normalized),
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
  }

  return (
    <>
      <Link href="/" className="fixed left-5 top-5 z-50 grid h-10 w-10 place-items-center rounded-xl border border-border bg-navbar text-xs font-black tracking-[-0.08em] text-foreground shadow-lg backdrop-blur-xl md:left-[8vw]" aria-label="Puneet Saxena home">
        PS
      </Link>

      <motion.nav
        initial={reduce ? false : { opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: ready ? "auto" : 190 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-1/2 top-4 z-50 hidden h-12 -translate-x-1/2 overflow-hidden rounded-full border border-border bg-navbar shadow-xl backdrop-blur-xl md:block"
        aria-label="Primary navigation"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!ready ? (
            <motion.div key="greeting" exit={{ opacity: 0, y: -8 }} className="flex h-full w-[190px] items-center justify-center gap-2 text-sm text-foreground">
              <span className="text-primary">{hello.icon}</span>
              <span>{hello.label}</span>
            </motion.div>
          ) : (
            <motion.div key="links" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex h-full items-center gap-1 px-1.5">
              {PAGES.map((page) => {
                const active = page.href === "/" ? pathname === "/" : pathname.startsWith(page.href);
                return (
                  <Link key={page.href} href={page.href} className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}>
                    {active && <motion.span layoutId="active-nav" className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.08] ring-1 ring-foreground/10" />}
                    {page.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <button onClick={() => setOpen(true)} className="fixed right-5 top-5 z-50 grid h-10 w-10 place-items-center rounded-xl border border-border bg-navbar text-muted shadow-lg backdrop-blur-xl transition hover:scale-105 hover:text-foreground md:right-[8vw]" aria-label="Open navigation">
        <MenuMark />
      </button>

      <button onClick={() => setOpen(true)} className="fixed left-1/2 top-4 z-40 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-navbar px-6 text-sm text-foreground shadow-xl backdrop-blur-xl md:hidden" aria-label="Open navigation">
        <span className="text-primary">{hello.icon}</span>
        <span>{ready ? "Explore" : hello.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }} className="fixed inset-0 z-[70] overflow-y-auto bg-background/95 backdrop-blur-2xl">
            <div className="mx-auto min-h-full max-w-6xl px-6 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-sm font-black tracking-tight text-foreground">PUNEET<span className="text-primary">.</span></Link>
                <div className="flex items-center gap-2">
                  <button onClick={toggleTheme} className="rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:text-foreground" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                  <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-border text-xl text-foreground" aria-label="Close navigation">×</button>
                </div>
              </div>

              <div className="grid gap-12 pb-10 pt-14 lg:grid-cols-[1.25fr_.75fr] lg:pt-20">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Pages</p>
                  <div className="mt-5 divide-y divide-border border-y border-border">
                    {PAGES.map((page, index) => (
                      <motion.div key={page.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }}>
                        <Link href={page.href} className="group flex items-center gap-5 py-4 md:py-5">
                          <span className="font-mono text-xs text-faint">{page.index}</span>
                          <span className="font-display text-4xl font-bold tracking-tight text-foreground transition group-hover:translate-x-2 group-hover:text-primary md:text-6xl">{page.label}</span>
                          <span className="ml-auto text-2xl text-faint transition group-hover:text-primary">↗</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Jump to a project</p>
                    <form onSubmit={submitSearch} className="mt-4">
                      <label className="sr-only" htmlFor="project-search">Search projects</label>
                      <input id="project-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or technology…" className="w-full rounded-2xl border border-border bg-card/60 px-4 py-3.5 text-base text-foreground outline-none transition placeholder:text-faint focus:border-primary" />
                    </form>
                    <div className="mt-3 space-y-1">
                      {suggestions.map((project) => (
                        <Link key={project.slug} href={`/projects/${project.slug}`} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-card hover:text-foreground">
                          <span>{project.title}</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{project.kicker}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-faint">Connect</p>
                      <div className="mt-3 flex flex-col gap-2">
                        {SOCIALS.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-primary">{social.label} ↗</a>)}
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-faint">Legal</p>
                      <div className="mt-3 flex flex-col gap-2">
                        <Link href="/privacy" className="text-sm text-muted hover:text-primary">Privacy</Link>
                        <Link href="/terms" className="text-sm text-muted hover:text-primary">Terms</Link>
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
