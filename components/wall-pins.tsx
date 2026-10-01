"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const HEIGHTS = [
  [160, 256, 144, 208],
  [176, 240, 144, 224],
  [192, 160, 256, 176],
];
function subscribe(onChange: () => void) {
  const queries = [
    window.matchMedia("(min-width: 640px)"),
    window.matchMedia("(min-width: 1024px)"),
  ];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", onChange));
}
function columnCount() {
  return window.matchMedia("(min-width: 1024px)").matches
    ? 3
    : window.matchMedia("(min-width: 640px)").matches
      ? 2
      : 1;
}
export function WallSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading visitor pins"
      className="wall-skeleton"
    >
      <span className="sr-only">Loading visitor pins...</span>
      <div className="wall-skeleton-grid" aria-hidden="true">
        {HEIGHTS.map((heights, column) => (
          <div className="wall-pin-column" key={column}>
            {heights.map((height, index) => (
              <div
                className="wall-skeleton-card"
                style={{ height }}
                key={index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export function WallPins({ children }: { children: ReactNode[] }) {
  const columns = useSyncExternalStore(subscribe, columnCount, () => 3);
  return (
    <div className="wall-pin-columns">
      {Array.from(
        { length: Math.min(columns, children.length) },
        (_, column) => (
          <div className="wall-pin-column" key={column}>
            {children.filter((_, index) => index % columns === column)}
          </div>
        ),
      )}
    </div>
  );
}
