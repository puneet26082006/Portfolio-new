"use client";

import { cancelFrame, frame } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
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

    const update = ({ timestamp }: { timestamp: number }) =>
      lenis.raf(timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    lenisRef.current?.scrollTo(target ?? 0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
