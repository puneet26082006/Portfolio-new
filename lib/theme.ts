"use client";
import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
}
export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {}
}
function snapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const sync = (event: StorageEvent) => {
    if (event.key === "portfolio-theme" || event.key === null)
      applyTheme(event.newValue === "light" ? "light" : "dark");
  };
  window.addEventListener("storage", sync);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", sync);
  };
}
export function useTheme() {
  return useSyncExternalStore(subscribe, snapshot, (): Theme => "dark");
}
