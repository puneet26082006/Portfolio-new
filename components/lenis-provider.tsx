"use client";

import { cancelFrame, frame } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ *
 * LenisProvider — buttery smooth scroll, ported 1:1 from awrs.me.
 *
 * awrs.me runs Lenis 1.3.x with { autoRaf:false, duration:1.2, expo-out
 * easing, touchMultiplier:1.5 } and drives lenis.raf() off a single shared
 * ticker (they use GSAP's; we use framer-motion's `frame` loop) so that
 * useScroll/useTransform read the SAME frame Lenis writes — no jitter, no
 * second rAF. Lenis writes the real native scroll position, so framer-motion's
 * useScroll needs no scroller proxy.
 *
 * No React state is touched on scroll (the instance lives in a ref), so this
 * never triggers a re-render and never violates react-hooks/set-state-in-effect.
 * ------------------------------------------------------------------ */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Honor prefers-reduced-motion: skip smooth scroll, leave native scroll intact.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // framer-motion's frame.update passes a DOMHighResTimeStamp (ms) — exactly
    // what lenis.raf expects. keepAlive=true keeps it running every frame.
    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Snap to top on route change (single-page today, but keeps behaviour correct).
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
