"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
export function AboutGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let phi = 4.4,
      frame = 0,
      visible = true,
      dragging = false,
      previousX = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = () => {
      const light = document.documentElement.dataset.theme === "light";
      return {
        dark: light ? 0 : 1,
        baseColor: (light ? [1, 1, 1] : [0.3, 0.3, 0.3]) as [
          number,
          number,
          number,
        ],
        glowColor: (light ? [0.9, 0.87, 0.89] : [0.08, 0.08, 0.08]) as [
          number,
          number,
          number,
        ],
      };
    };
    let globe: ReturnType<typeof createGlobe>;
    try {
      globe = createGlobe(el, {
        width: 840,
        height: 840,
        devicePixelRatio: 2,
        phi,
        theta: 0.25,
        ...palette(),
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        markerColor: [0.83, 0.33, 0.49],
        markers: [{ location: [26.9124, 75.7873], size: 0.065 }],
      });
    } catch {
      return;
    }
    const themeObserver = new MutationObserver(() => globe.update(palette()));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const draw = () => {
      if (visible && !document.hidden && !reduced && !dragging) {
        phi += 0.003;
        globe.update({ phi });
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);
    const down = (e: PointerEvent) => {
      dragging = true;
      previousX = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      phi += (e.clientX - previousX) / 180;
      previousX = e.clientX;
      globe.update({ phi });
    };
    const up = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      globe.destroy();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);
  return (
    <div className="about-globe">
      <canvas
        ref={canvas}
        width="840"
        height="840"
        role="img"
        aria-label="Rotating globe highlighting Jaipur, India"
      />
    </div>
  );
}
