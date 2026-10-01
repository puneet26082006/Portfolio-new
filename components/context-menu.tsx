"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowLeft,
  FiArrowUp,
  FiDownload,
  FiMail,
  FiRefreshCw,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SITE } from "@/lib/site";

type Position = { x: number; y: number };

export function ContextMenu() {
  const [position, setPosition] = useState<Position | null>(null);
  const menu = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function show(event: MouseEvent | KeyboardEvent) {
      const target = event.target instanceof Element ? event.target : null;

      if (
        target?.closest(
          'input,textarea,select,[contenteditable="true"],canvas,[role="dialog"],[data-native-context-menu]',
        ) ||
        window.getSelection()?.toString()
      )
        return;
      if (event instanceof MouseEvent && event.shiftKey) return;
      event.preventDefault();
      previousFocus.current = document.activeElement as HTMLElement | null;
      const rect = target?.getBoundingClientRect();
      const pointer =
        event instanceof MouseEvent && (event.clientX || event.clientY);
      setPosition({
        x: pointer ? event.clientX : (rect?.left ?? 20) + 20,
        y: pointer ? event.clientY : (rect?.top ?? 20) + 20,
      });
    }
    function keyboard(event: KeyboardEvent) {
      if (
        event.key === "ContextMenu" ||
        (event.shiftKey && event.key === "F10")
      )
        show(event);
    }
    function dismiss(event: PointerEvent) {
      if (!menu.current?.contains(event.target as Node)) setPosition(null);
    }
    const close = () => setPosition(null);
    const scroll = (event: Event) => {
      if (
        !(event.target instanceof Node) ||
        !menu.current?.contains(event.target)
      )
        close();
    };
    document.addEventListener("contextmenu", show);
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", close);
    window.addEventListener("blur", close);
    return () => {
      document.removeEventListener("contextmenu", show);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("blur", close);
    };
  }, []);

  useLayoutEffect(() => {
    const root = menu.current;
    if (!root || !position) return;
    root.style.left = `${Math.max(8, Math.min(position.x, window.innerWidth - root.offsetWidth - 8))}px`;
    root.style.top = `${Math.max(8, Math.min(position.y, window.innerHeight - root.offsetHeight - 8))}px`;
    root
      .querySelector<HTMLElement>('[role="menuitem"]')
      ?.focus({ preventScroll: true });
  }, [position]);

  function close() {
    setPosition(null);
    previousFocus.current?.focus({ preventScroll: true });
  }

  if (!position) return null;
  return createPortal(
    <div
      ref={menu}
      className="page-context-menu"
      role="menu"
      aria-label="Page shortcuts"
      style={{ left: position.x, top: position.y }}
      data-lenis-prevent
      onClick={close}
      onKeyDown={(event) => {
        const items = Array.from(
          menu.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ??
            [],
        );
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : (index +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    items.length) %
                  items.length;
          items[next]?.focus();
        } else if (event.key === "Escape") {
          event.preventDefault();
          close();
        } else if (event.key === "Tab") {
          close();
        } else if (
          event.key === " " &&
          document.activeElement?.tagName === "A"
        ) {
          event.preventDefault();
          (document.activeElement as HTMLAnchorElement).click();
        }
      }}
    >
      <p className="context-menu-label">Connect</p>
      <a role="menuitem" tabIndex={-1} href={SITE.resume} download>
        <FiDownload />
        <span>Download Resume</span>
        <small className="context-pdf">PDF</small>
      </a>
      <a
        role="menuitem"
        tabIndex={-1}
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
        <span>GitHub</span>
      </a>
      <a
        role="menuitem"
        tabIndex={-1}
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
        <span>LinkedIn</span>
      </a>
      <a role="menuitem" tabIndex={-1} href={`mailto:${SITE.email}`}>
        <FiMail />
        <span>Send Email</span>
      </a>
      <div role="separator" className="context-menu-separator" />
      <p className="context-menu-label">Page</p>
      <button
        role="menuitem"
        tabIndex={-1}
        onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
      >
        <FiArrowUp />
        <span>Scroll to Top</span>
        <small>Home</small>
      </button>
      <button
        role="menuitem"
        tabIndex={-1}
        onClick={() => window.history.back()}
      >
        <FiArrowLeft />
        <span>Go Back</span>
        <small>Alt+←</small>
      </button>
      <button
        role="menuitem"
        tabIndex={-1}
        onClick={() => window.location.reload()}
      >
        <FiRefreshCw />
        <span>Refresh</span>
        <small>F5</small>
      </button>
    </div>,
    document.body,
  );
}
