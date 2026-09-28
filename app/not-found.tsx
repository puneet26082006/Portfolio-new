import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center px-6 py-32 text-center"><div><p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">404 · Route not found</p><h1 className="mt-5 font-display text-6xl font-black text-foreground md:text-8xl">Wrong turn.</h1><p className="mx-auto mt-5 max-w-md text-muted">Even good algorithms explore a dead end occasionally.</p><Link href="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">Return home</Link></div></main>;
}
