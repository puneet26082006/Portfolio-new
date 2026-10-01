"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FiX, FiEdit2, FiCheck, FiSend, FiTrash2 } from "react-icons/fi";
import { PIN_COLORS } from "@/lib/wall";
import type { DrawingDocument } from "@/lib/drawing";
import dynamic from "next/dynamic";
const WallDrawingBoard = dynamic(
  () =>
    import("./wall-drawing-board").then((module) => module.WallDrawingBoard),
  { ssr: false },
);

type Props = {
  name: string | null;
  message: string;
  color: string;
  drawing: string | null;
  document?: DrawingDocument;
  busy: boolean;
  error: string;
  onClose: () => void;
  onLogin: (provider: "google" | "github") => void;
  onSignOut: () => void;
  onMessage: (value: string) => void;
  onColor: (value: string) => void;
  onDrawing: (
    document: DrawingDocument | undefined,
    image: string | null,
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
export function WallComposer(props: Props) {
  const [drawingOpen, setDrawingOpen] = useState(false),
    root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null,
      overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.current?.querySelector<HTMLElement>("textarea,button")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return createPortal(
    <>
      <motion.div
        ref={root}
        className="wall-composer-overlay"
        data-lenis-prevent
        inert={drawingOpen}
        aria-hidden={drawingOpen || undefined}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && !props.busy) props.onClose();
          if (event.key === "Tab") {
            const items = root.current?.querySelectorAll<HTMLElement>(
              "button:not(:disabled),textarea,a",
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
      >
        <motion.div
          className="wall-composer"
          role="dialog"
          aria-modal="true"
          aria-label={props.name ? "Compose a wall pin" : "Sign in to the wall"}
          style={{ "--pin-color": props.color } as CSSProperties}
          initial={reduced ? false : { y: 24, scale: 0.96 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 16, scale: 0.98 }}
          transition={{ type: "spring", damping: 28, stiffness: 330 }}
        >
          <button
            className="wall-composer-close"
            aria-label="Close composer"
            onClick={props.onClose}
            disabled={props.busy}
          >
            <FiX />
          </button>
          {props.name ? (
            <>
              <header className="wall-composer-person">
                <span className="wall-person-avatar" aria-hidden="true">
                  {Array.from(props.name)[0]?.toLowerCase()}
                </span>
                <div>
                  <strong>{props.name}</strong>
                  <span>Composing...</span>
                </div>
                <button onClick={props.onSignOut} disabled={props.busy}>
                  Sign out
                </button>
              </header>
              <form onSubmit={props.onSubmit} aria-busy={props.busy}>
                <div className="wall-message-box">
                  <textarea
                    aria-label="Your wall message"
                    placeholder="Type something nice..."
                    value={props.message}
                    maxLength={200}
                    disabled={props.busy}
                    onChange={(event) => props.onMessage(event.target.value)}
                  />
                  <span aria-live="off">{props.message.length} / 200</span>
                </div>
                <div className="wall-draw-label">
                  <FiEdit2 />
                  <span>Draw something</span>
                  {props.drawing && (
                    <button
                      type="button"
                      aria-label="Remove drawing"
                      disabled={props.busy}
                      onClick={() => props.onDrawing(undefined, null)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className={`wall-drawing-launch ${props.drawing ? "has-drawing" : ""}`}
                  disabled={props.busy}
                  onClick={() => setDrawingOpen(true)}
                  aria-label={
                    props.drawing ? "Edit your drawing" : "Open drawing canvas"
                  }
                >
                  {props.drawing ? (
                    <>
                      <Image
                        src={props.drawing}
                        width={900}
                        height={600}
                        alt="Your drawing preview"
                        unoptimized
                      />
                      <span className="wall-edit-drawing">
                        <FiEdit2 />
                        Edit drawing
                      </span>
                    </>
                  ) : (
                    <>
                      <FiEdit2 />
                      <span>Tap to draw</span>
                    </>
                  )}
                </button>
                <fieldset className="wall-pin-colors" disabled={props.busy}>
                  <legend>Pick a pin color</legend>
                  <div>
                    {PIN_COLORS.map(({ name, color }) => (
                      <button
                        key={color}
                        type="button"
                        title={name}
                        aria-label={`${name} pin`}
                        aria-pressed={props.color === color}
                        style={{ background: color }}
                        onClick={() => props.onColor(color)}
                      >
                        {props.color === color && <FiCheck />}
                      </button>
                    ))}
                  </div>
                </fieldset>
                {props.error && (
                  <p className="wall-compose-error" role="alert">
                    {props.error}
                  </p>
                )}
                <button
                  className="wall-pin-submit"
                  type="submit"
                  disabled={
                    props.busy || (!props.message.trim() && !props.drawing)
                  }
                >
                  <FiSend />
                  {props.busy ? "Pinning…" : "Pin it!"}
                </button>
                <p className="wall-review-caption">
                  Your pin will appear publicly on the wall.
                </p>
              </form>
            </>
          ) : (
            <div className="wall-login">
              <h2>Leave your mark</h2>
              <p>Sign in to draw, write a note, and pin it to the wall.</p>
              <button
                disabled={props.busy}
                onClick={() => props.onLogin("google")}
              >
                <FaGoogle />
                Continue with Google
              </button>
              <button
                disabled={props.busy}
                onClick={() => props.onLogin("github")}
              >
                <FaGithub />
                Continue with GitHub
              </button>
              <small>
                Your name and anything you pin appear publicly on the wall.{" "}
                <Link href="/privacy/">Privacy policy</Link>
              </small>
              {props.error && <p role="alert">{props.error}</p>}
            </div>
          )}
        </motion.div>
      </motion.div>
      <AnimatePresence
        onExitComplete={() =>
          root.current
            ?.querySelector<HTMLButtonElement>(".wall-drawing-launch")
            ?.focus()
        }
      >
        {drawingOpen && props.name && (
          <WallDrawingBoard
            initial={props.document}
            onDiscard={() => setDrawingOpen(false)}
            onDone={(document, image) => {
              props.onDrawing(document, image);
              setDrawingOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
