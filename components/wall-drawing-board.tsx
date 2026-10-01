"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiX,
  FiCheck,
  FiEdit2,
  FiType,
  FiSmile,
  FiRotateCcw,
  FiRotateCw,
  FiZoomIn,
  FiTrash2,
  FiDroplet,
} from "react-icons/fi";
import { LuEraser, LuHighlighter } from "react-icons/lu";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  drawingPoint,
  renderDrawing,
  drawingHistory,
  commitDrawing,
  undoDrawing,
  redoDrawing,
  type DrawingDocument,
  type DrawingStroke,
} from "@/lib/drawing";

type Tool = "pen" | "marker" | "text" | "eraser" | "sticker";
type Panel = "ink" | "width" | "sticker" | "background" | "text" | null;
const INKS = [
  "#17171b",
  "#ffffff",
  "#dc2626",
  "#f59e0b",
  "#16a34a",
  "#0284c7",
  "#7c3aed",
  "#db2777",
];
const PAPERS = [
  "#ffffff",
  "#fff7df",
  "#fce7f3",
  "#dcfce7",
  "#dbeafe",
  "#17171b",
];
const STICKERS = [
  "🙂",
  "❤️",
  "✨",
  "🔥",
  "🌻",
  "🚀",
  "👋",
  "💡",
  "🎨",
  "⭐",
  "🌈",
  "💻",
];

export function WallDrawingBoard({
  initial,
  onDone,
  onDiscard,
}: {
  initial?: DrawingDocument;
  onDone: (document: DrawingDocument, image: string | null) => void;
  onDiscard: () => void;
}) {
  const [history, setHistory] = useState(() => drawingHistory(initial));
  const [tool, setTool] = useState<Tool>("pen"),
    [panel, setPanel] = useState<Panel>(null);
  const [ink, setInk] = useState("#17171b"),
    [width, setWidth] = useState(3),
    [label, setLabel] = useState(""),
    [sticker, setSticker] = useState("🙂");
  const [zoom, setZoom] = useState(1),
    [error, setError] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null),
    draft = useRef<DrawingStroke | null>(null),
    frame = useRef(0),
    root = useRef<HTMLDivElement>(null);
  const historyRef = useRef(history);
  const reduced = useReducedMotion();
  const paint = useCallback(() => {
    const ctx = canvas.current?.getContext("2d");
    if (ctx) renderDrawing(ctx, historyRef.current.present, draft.current);
  }, []);
  const update = useCallback((next: typeof history) => {
    historyRef.current = next;
    setHistory(next);
  }, []);
  useEffect(() => {
    paint();
  }, [history, paint]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    root.current?.focus();
    return () => {
      cancelAnimationFrame(frame.current);
      previous?.focus();
    };
  }, []);
  function commit(next: DrawingDocument) {
    update(commitDrawing(historyRef.current, next));
    setError("");
  }
  function schedule() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(paint);
  }
  function start(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0 || draft.current) return;
    const point = drawingPoint(
      event.clientX,
      event.clientY,
      event.currentTarget.getBoundingClientRect(),
    );
    if (tool === "text" || tool === "sticker") {
      const text = tool === "text" ? label.trim() : sticker;
      if (!text) {
        setPanel("text");
        return;
      }
      commit({
        ...historyRef.current.present,
        actions: [
          ...historyRef.current.present.actions,
          {
            kind: tool,
            color: ink,
            size: tool === "sticker" ? 48 : Math.max(18, width * 5),
            text,
            point,
          },
        ],
      });
      return;
    }
    setPanel(null);
    event.currentTarget.setPointerCapture(event.pointerId);
    draft.current = {
      kind: tool,
      color: ink,
      width:
        tool === "marker" ? width * 6 : tool === "eraser" ? width * 8 : width,
      points: [point],
    };
    schedule();
  }
  function move(event: PointerEvent<HTMLCanvasElement>) {
    if (!draft.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const events = event.nativeEvent.getCoalescedEvents?.() ?? [
      event.nativeEvent,
    ];
    for (const item of events.length ? events : [event.nativeEvent]) {
      const p = drawingPoint(item.clientX, item.clientY, rect),
        last = draft.current.points.at(-1)!;
      if (
        Math.hypot(p.x - last.x, p.y - last.y) > 0.6 &&
        draft.current.points.length < 12000
      )
        draft.current.points.push(p);
    }
    schedule();
  }
  function finish() {
    if (!draft.current) return;
    const stroke = draft.current;
    draft.current = null;
    commit({
      ...historyRef.current.present,
      actions: [...historyRef.current.present.actions, stroke],
    });
  }
  function undo() {
    draft.current = null;
    update(undoDrawing(historyRef.current));
  }
  function redo() {
    draft.current = null;
    update(redoDrawing(historyRef.current));
  }
  function done() {
    finish();
    const doc = historyRef.current.present;
    paint();
    const image = doc.actions.length
      ? (canvas.current?.toDataURL("image/png") ?? null)
      : null;
    if (image && image.length > 200000) {
      setError(
        "This drawing is too detailed to pin. Remove a few marks and try again.",
      );
      return;
    }
    onDone(doc, image);
  }
  function toggle(next: Panel) {
    setPanel((current) => (current === next ? null : next));
  }
  return (
    <motion.div
      ref={root}
      tabIndex={-1}
      className="wall-drawing-board"
      role="dialog"
      aria-modal="true"
      aria-label="Drawing Canvas"
      data-lenis-prevent
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.22 }}
      onKeyDown={(e) => {
        e.stopPropagation();
        const input = (e.target as HTMLElement).matches("input,textarea");
        if (e.key === "Escape") {
          if (panel) setPanel(null);
          else onDiscard();
        }
        if (!input && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        }
        if (!input && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
          e.preventDefault();
          redo();
        }
        if (e.key === "Tab") {
          const items = root.current?.querySelectorAll<HTMLElement>(
            "button:not(:disabled),input,canvas",
          );
          if (!items?.length) return;
          const first = items[0],
            last = items[items.length - 1];
          if (
            e.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === root.current)
          ) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }}
    >
      <header className="drawing-topbar">
        <button onClick={onDiscard} className="drawing-discard">
          <FiX />
          <span>Discard</span>
        </button>
        <h2>Drawing Canvas</h2>
        <button onClick={done} className="drawing-done">
          <FiCheck />
          <span>Done</span>
        </button>
      </header>
      <div className="drawing-workspace">
        <div
          className="drawing-toolbar"
          role="toolbar"
          aria-label="Drawing tools"
        >
          <button
            title="Pen"
            aria-label="Pen"
            aria-pressed={tool === "pen"}
            onClick={() => {
              setTool("pen");
              setPanel(null);
            }}
          >
            <FiEdit2 />
          </button>
          <button
            title="Highlighter"
            aria-label="Highlighter"
            aria-pressed={tool === "marker"}
            onClick={() => {
              setTool("marker");
              setPanel(null);
            }}
          >
            <LuHighlighter />
          </button>
          <button
            title="Text"
            aria-label="Text"
            aria-pressed={tool === "text"}
            onClick={() => {
              setTool("text");
              toggle("text");
            }}
          >
            <FiType />
          </button>
          <button
            title="Eraser"
            aria-label="Eraser"
            aria-pressed={tool === "eraser"}
            onClick={() => {
              setTool("eraser");
              setPanel(null);
            }}
          >
            <LuEraser />
          </button>
          <span className="drawing-divider" />
          <button
            title="Ink color"
            aria-label="Ink color"
            aria-expanded={panel === "ink"}
            onClick={() => toggle("ink")}
          >
            <span className="drawing-ink-ring" style={{ background: ink }} />
          </button>
          <button
            title="Brush size"
            aria-label="Brush size"
            aria-expanded={panel === "width"}
            onClick={() => toggle("width")}
          >
            <span
              className="drawing-size-dot"
              style={{
                width: Math.min(20, width + 5),
                height: Math.min(20, width + 5),
              }}
            />
          </button>
          <button
            title="Stickers"
            aria-label="Stickers"
            aria-pressed={tool === "sticker"}
            aria-expanded={panel === "sticker"}
            onClick={() => {
              setTool("sticker");
              toggle("sticker");
            }}
          >
            <FiSmile />
          </button>
          <button
            title="Canvas color"
            aria-label="Canvas color"
            aria-expanded={panel === "background"}
            onClick={() => toggle("background")}
          >
            <span
              className="drawing-paper-swatch"
              style={{ background: history.present.background }}
            />
          </button>
          <span className="drawing-divider" />
          <button
            title="Undo (Ctrl/⌘ Z)"
            aria-label="Undo"
            disabled={!history.past.length}
            onClick={undo}
          >
            <FiRotateCcw />
          </button>
          <button
            title="Redo (Ctrl/⌘ Shift Z)"
            aria-label="Redo"
            disabled={!history.future.length}
            onClick={redo}
          >
            <FiRotateCw />
          </button>
          <span className="drawing-divider" />
          <button
            title={`Zoom: ${Math.round(zoom * 100)}%`}
            aria-label={`Zoom canvas, currently ${Math.round(zoom * 100)} percent`}
            onClick={() =>
              setZoom((value) => (value === 1 ? 1.5 : value === 1.5 ? 2 : 1))
            }
          >
            <FiZoomIn />
          </button>
          <button
            title="Clear canvas"
            aria-label="Clear canvas"
            disabled={!history.present.actions.length}
            onClick={() => commit({ ...history.present, actions: [] })}
          >
            <FiTrash2 />
          </button>
        </div>
        {panel && (
          <div
            className="drawing-tool-panel"
            role="group"
            aria-label={`${panel} options`}
          >
            <div className="drawing-panel-heading">
              <strong>
                {
                  {
                    ink: "Ink color",
                    width: "Brush size",
                    sticker: "Pick a sticker",
                    background: "Canvas color",
                    text: "Add text",
                  }[panel]
                }
              </strong>
              <button
                aria-label="Close tool options"
                onClick={() => setPanel(null)}
              >
                <FiX />
              </button>
            </div>
            {(panel === "ink" || panel === "background") && (
              <>
                <div className="drawing-swatches">
                  {(panel === "ink" ? INKS : PAPERS).map((color) => (
                    <button
                      key={color}
                      aria-label={`Use ${color}`}
                      style={{ background: color }}
                      onClick={() => {
                        if (panel === "ink") setInk(color);
                        else commit({ ...history.present, background: color });
                      }}
                    />
                  ))}
                </div>
                <label className="drawing-custom-color">
                  <FiDroplet />
                  Custom color
                  <input
                    type="color"
                    aria-label="Custom color"
                    value={panel === "ink" ? ink : history.present.background}
                    onChange={(e) => {
                      if (panel === "ink") setInk(e.target.value);
                      else
                        commit({
                          ...history.present,
                          background: e.target.value,
                        });
                    }}
                  />
                </label>
              </>
            )}
            {panel === "width" && (
              <label className="drawing-width-label">
                {width} px
                <input
                  aria-label="Brush width"
                  type="range"
                  min="1"
                  max="24"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
                <span
                  style={{ height: width, width: width, background: ink }}
                />
              </label>
            )}
            {panel === "sticker" && (
              <>
                <div className="drawing-stickers">
                  {STICKERS.map((emoji) => (
                    <button
                      key={emoji}
                      aria-label={`Sticker ${emoji}`}
                      aria-pressed={sticker === emoji}
                      onClick={() => setSticker(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <p>Tap the canvas to place it.</p>
              </>
            )}
            {panel === "text" && (
              <>
                <input
                  aria-label="Text to place"
                  value={label}
                  maxLength={80}
                  placeholder="Write something…"
                  onChange={(e) => setLabel(e.target.value)}
                />
                <p>Tap the canvas to place your text.</p>
              </>
            )}
          </div>
        )}
        <div className="drawing-scroll-area">
          <div
            className="drawing-paper-space"
            style={{ "--canvas-zoom": zoom } as CSSProperties}
          >
            <canvas
              ref={canvas}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className={`drawing-paper drawing-cursor-${tool}`}
              tabIndex={0}
              aria-label="Drawing surface"
              onPointerDown={start}
              onPointerMove={move}
              onPointerUp={finish}
              onPointerCancel={finish}
              onLostPointerCapture={finish}
            />
          </div>
        </div>
      </div>
      {error && (
        <p role="alert" className="drawing-error">
          {error}
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {history.present.actions.length} marks. {tool} selected.
      </span>
    </motion.div>
  );
}
