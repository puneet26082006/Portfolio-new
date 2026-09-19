"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";

type WallNote = {
  id: string;
  name: string;
  message: string;
  color: string;
  date: string;
  drawing?: string;
};

const STARTER_NOTES: WallNote[] = [
  { id: "starter-1", name: "Puneet", message: "Keep solving. Keep shipping.", color: "#4d2b80", date: "Sep 2026" },
  { id: "starter-2", name: "Contest notebook", message: "One clean observation can unlock the whole problem.", color: "#145a75", date: "Sep 2026" },
  { id: "starter-3", name: "Build log", message: "Make the first version work. Then make it memorable.", color: "#7a254d", date: "Sep 2026" },
];

const COLORS = ["#4d2b80", "#145a75", "#7a254d", "#79561d", "#245645"];

export function WallExperience() {
  const [notes, setNotes] = useState<WallNote[]>(STARTER_NOTES);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("puneet-wall-notes");
    if (stored) {
      try {
        setNotes([...JSON.parse(stored), ...STARTER_NOTES]);
      } catch {
        window.localStorage.removeItem("puneet-wall-notes");
      }
    }
  }, []);

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  }

  function startDrawing(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const p = point(event);
    context.beginPath();
    context.moveTo(p.x, p.y);
  }

  function draw(event: PointerEvent<HTMLCanvasElement>) {
    const context = canvasRef.current?.getContext("2d");
    if (!context || !drawingRef.current) return;
    const p = point(event);
    context.lineTo(p.x, p.y);
    context.strokeStyle = "#17171b";
    context.lineWidth = 4;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }

  function stopDrawing() {
    drawingRef.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const canvas = canvasRef.current;
    const isBlank = !canvas?.getContext("2d")?.getImageData(0, 0, canvas.width, canvas.height).data.some((value) => value !== 0);
    const note: WallNote = {
      id: crypto.randomUUID(),
      name: name.trim().slice(0, 40),
      message: message.trim().slice(0, 220),
      color,
      date: new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date()),
      drawing: canvas && !isBlank ? canvas.toDataURL("image/png") : undefined,
    };
    const personal = [note, ...notes.filter((item) => !item.id.startsWith("starter-"))].slice(0, 12);
    window.localStorage.setItem("puneet-wall-notes", JSON.stringify(personal));
    setNotes([note, ...notes]);
    setName("");
    setMessage("");
    clearCanvas();
    setOpen(false);
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card/45 p-5 text-center sm:flex-row sm:text-left">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">This safe preview wall stores your note only in this browser. It does not upload personal data or publish unmoderated content.</p>
          <button onClick={() => setOpen(true)} className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5">✎ Pin something</button>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {notes.map((note, index) => (
            <motion.figure key={note.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 7) * 0.04 }} className="mb-5 break-inside-avoid overflow-hidden rounded-[1.6rem] border border-white/10 p-5 text-white shadow-xl" style={{ background: `linear-gradient(145deg, ${note.color}, color-mix(in srgb, ${note.color} 72%, #09090b))` }}>
              {note.drawing && <div className="mb-5 overflow-hidden rounded-xl bg-white"><img src={note.drawing} alt={`Doodle by ${note.name}`} className="aspect-[4/3] w-full object-contain" /></div>}
              <blockquote className="text-lg font-semibold leading-relaxed">{note.message}</blockquote>
              <figcaption className="mt-7 flex items-end justify-between border-t border-white/15 pt-4">
                <span className="text-sm font-semibold">{note.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">{note.date}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-background/90 p-5 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Pin a note to the wall">
            <motion.form onSubmit={submit} initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="my-6 w-full max-w-2xl rounded-[2rem] border border-border bg-card p-6 shadow-2xl md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div><p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">New pin</p><h2 className="mt-2 font-display text-3xl font-bold text-foreground">Leave a note or doodle</h2></div>
                <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-border text-xl text-muted" aria-label="Close">×</button>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm text-muted">Name<input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} required className="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-base text-foreground outline-none focus:border-primary" placeholder="Your name" /></label>
                <label className="text-sm text-muted">Card color<span className="mt-3 flex gap-2">{COLORS.map((option) => <button key={option} type="button" onClick={() => setColor(option)} aria-label={`Choose ${option}`} className={`h-9 w-9 rounded-full border-2 ${color === option ? "border-white" : "border-transparent"}`} style={{ background: option }} />)}</span></label>
              </div>
              <label className="mt-5 block text-sm text-muted">Message<textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={220} required className="mt-2 min-h-28 w-full resize-y rounded-xl border border-border bg-background/60 px-4 py-3 text-base text-foreground outline-none focus:border-primary" placeholder="A thought, hello, or tiny piece of advice…" /></label>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between"><span className="text-sm text-muted">Optional doodle</span><button type="button" onClick={clearCanvas} className="text-xs text-faint hover:text-primary">Clear canvas</button></div>
                <canvas ref={canvasRef} width={800} height={360} onPointerDown={startDrawing} onPointerMove={draw} onPointerUp={stopDrawing} onPointerCancel={stopDrawing} className="aspect-[20/9] w-full touch-none rounded-xl bg-white" aria-label="Drawing canvas" />
              </div>
              <div className="mt-6 flex justify-end"><button type="submit" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white">Pin to my wall</button></div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
