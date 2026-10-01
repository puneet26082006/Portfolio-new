"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { WallComposer } from "./wall-composer";
import { WallPins, WallSkeleton } from "./wall-pins";
import type { DrawingDocument } from "@/lib/drawing";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";

import { getSupabase } from "@/lib/supabase";
import {
  wallGradient,
  WALL_COLORS,
  wallNote,
  wallError,
  type WallNote,
  type WallRow,
} from "@/lib/wall";

function displayName(user: User) {
  const value = String(
    user.user_metadata.full_name ?? user.user_metadata.user_name ?? "",
  )
    .trim()
    .slice(0, 40);
  return value.length >= 2 ? value : "Visitor";
}

export function WallExperience() {
  const reduced = useReducedMotion();
  const [notes, setNotes] = useState<WallNote[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false),
    [name, setName] = useState(""),
    [message, setMessage] = useState(""),
    [color, setColor] = useState(WALL_COLORS[0]);
  const [busy, setBusy] = useState(false),
    [authReady, setAuthReady] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const [loadError, setLoadError] = useState(false),
    [reload, setReload] = useState(0),
    [loading, setLoading] = useState(true),
    [limit, setLimit] = useState(60),
    [hasMore, setHasMore] = useState(false);
  const lock = useRef(false),
    account = useRef<string | null>(null);
  const [drawing, setDrawing] = useState<string | null>(null);
  const [drawingDocument, setDrawingDocument] = useState<DrawingDocument>();

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      const timer = setTimeout(() => setAuthReady(true), 0);
      return () => clearTimeout(timer);
    }
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (account.current !== (session?.user.id ?? null)) {
        setMessage("");
        setDrawing(null);
        setDrawingDocument(undefined);
        account.current = session?.user.id ?? null;
      }
      setUser(session?.user ?? null);
      setName(session?.user ? displayName(session.user) : "");
      setAuthReady(true);
      // Drop cached private notes immediately when the account changes or expires.
      setNotes((current) =>
        current.filter(
          (note) =>
            !note.owner || note.approved || note.owner === session?.user.id,
        ),
      );
      if (session?.user && sessionStorage.getItem("wall-compose") === "yes") {
        sessionStorage.removeItem("wall-compose");
        setOpen(true);
      }
    });
    client.auth.getSession().then(
      ({ error }) => {
        if (error) {
          setAuthReady(true);
          setError("Sign-in could not be completed. Please try again.");
        }
      },
      () => {
        setAuthReady(true);
        setError("Sign-in could not be completed. Please try again.");
      },
    );
    const url = new URL(window.location.href);
    const fragment = new URLSearchParams(url.hash.slice(1));
    if (url.searchParams.has("error") || fragment.has("error")) {
      const timer = setTimeout(() => {
        setError(
          "Sign-in was cancelled or could not be completed. Please try again.",
        );
        setOpen(true);
      }, 0);
      // Remove provider error details rather than rendering untrusted URL messages.
      url.search = "";
      url.hash = "";
      history.replaceState(null, "", url.pathname);
      return () => {
        clearTimeout(timer);
        subscription.unsubscribe();
      };
    }
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const client = getSupabase();
    if (!authReady) return;
    if (!client) {
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => setLoading(true), 0);
    client
      .from("wall_notes")
      .select(
        "id,user_id,author_name,message,color,drawing,created_at,approved",
      )
      .order("created_at", { ascending: false })
      .limit(limit + 1)
      .abortSignal(controller.signal)
      .then(
        ({ data, error }) => {
          if (cancelled) return;
          clearTimeout(timer);
          setLoading(false);
          setLoadError(Boolean(error));
          if (!error) {
            setHasMore((data?.length ?? 0) > limit);
            setNotes(
              (data ?? [])
                .slice(0, limit)
                .map((row) => wallNote(row as WallRow)),
            );
          }
        },
        () => {
          if (!cancelled) {
            clearTimeout(timer);
            setLoading(false);
            setLoadError(true);
          }
        },
      );
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [user?.id, reload, authReady, limit]);

  async function login(provider: "google" | "github") {
    if (lock.current) return;
    const client = getSupabase();
    if (!client) {
      setError("Sign-in is temporarily unavailable. Please come back soon.");
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    sessionStorage.setItem("wall-compose", "yes");
    try {
      const { error } = await client.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/wall/` },
      });
      if (error) throw error;
    } catch {
      sessionStorage.removeItem("wall-compose");
      setError("Unable to start sign-in. Please try again.");
      setBusy(false);
      lock.current = false;
    }
  }
  async function signOut() {
    const client = getSupabase();
    if (!client) return;
    try {
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
      setUser(null);
      setReload((n) => n + 1);
      setOpen(false);
      setNotice("Signed out.");
    } catch {
      setNotice("Could not sign out. Please try again.");
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const client = getSupabase();
    if (!client || !user) {
      setError("Please sign in before pinning a note.");
      return;
    }
    if (
      name.trim().length < 2 ||
      name.length > 40 ||
      (!message.trim() && !drawing) ||
      message.length > 200
    ) {
      setError(
        "Enter a name (2–40 characters) and a message (up to 200 characters) or drawing.",
      );
      return;
    }
    if (drawing && drawing.length > 200000) {
      setError("This drawing is too large. Please simplify it and try again.");
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    const authorId = user.id;
    try {
      const version = await client.rpc("wall_api_version");
      if (account.current !== authorId) return;
      if (version.error || version.data !== 3) {
        setError(
          version.error && version.error.code !== "PGRST202"
            ? "Could not connect to the wall. Your draft is safe; please try again."
            : "The wall needs a database update before it can accept pins. Your draft is safe. Please try again after the site owner applies the instant-pins update.",
        );
        return;
      }
      const { data, error } = await client.rpc("submit_wall_note", {
        p_name: name.trim(),
        p_message: message.trim(),
        p_color: color,
        p_drawing: drawing,
      });
      if (account.current !== authorId) return;
      if (error) {
        setError(wallError(error.code));
        return;
      }
      const row = (Array.isArray(data) ? data[0] : data) as WallRow;
      if (!row?.id) {
        setError(
          "Your note could not be confirmed. Refresh the wall before trying again.",
        );
        return;
      }
      setNotes((current) => [
        wallNote(row),
        ...current.filter((note) => note.id !== row.id),
      ]);
      setMessage("");
      setDrawing(null);
      setDrawingDocument(undefined);
      setOpen(false);
      setNotice("Pinned to the wall.");
    } catch {
      setError("The connection was interrupted. Please try again.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function removeNote(id: string) {
    if (lock.current) return;
    const client = getSupabase();
    if (!client) return;
    lock.current = true;
    try {
      const { error } = await client.from("wall_notes").delete().eq("id", id);
      if (error) throw error;
      setNotes((current) => current.filter((note) => note.id !== id));
      setNotice("Your note was removed.");
    } catch {
      setNotice("Your note could not be removed. Please try again.");
    } finally {
      lock.current = false;
    }
  }
  function openComposer() {
    setError("");
    setOpen(true);

    if (user) setName(displayName(user));
  }
  return (
    <>
      <div className="visitor-wall">
        <motion.header
          className="visitor-wall-header"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        >
          <p className="visitor-wall-eyebrow">The wall remembers</p>
          <h1>
            Words Left in the <span>Ruins</span>
          </h1>
          <div className="visitor-wall-pin-wrap">
            <button
              onClick={openComposer}
              disabled={!authReady}
              className="visitor-wall-pin"
            >
              <FiEdit2 aria-hidden="true" /> Pin Something
            </button>
          </div>
        </motion.header>
        {notice && (
          <p role="status" className="mb-6 text-sm text-primary">
            {notice}
          </p>
        )}
        {loading && notes.length === 0 && <WallSkeleton />}
        {loading && notes.length > 0 && (
          <p role="status" className="sr-only">
            Updating visitor pins...
          </p>
        )}
        {loadError && (
          <p role="alert" className="mb-6 text-sm text-muted">
            The visitor wall could not be loaded.{" "}
            <button
              onClick={() => setReload((n) => n + 1)}
              className="text-primary underline"
            >
              Try again
            </button>
          </p>
        )}
        {!loading && !loadError && notes.length === 0 && (
          <p className="visitor-wall-empty">
            The wall is waiting for its first mark. Leave a thought, a hello, or
            a little drawing.
          </p>
        )}
        <WallPins>
          {notes.map((note, index) => (
            <motion.figure
              key={note.id}
              initial={{ opacity: 0, y: reduced ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.3,
                delay: reduced ? 0 : Math.min(index, 7) * 0.04,
              }}
              className="visitor-wall-note"
              whileHover={reduced ? undefined : { y: -4 }}
              style={{
                background: wallGradient(note.color),
              }}
            >
              {note.drawing && (
                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={note.drawing}
                    width={900}
                    height={600}
                    unoptimized
                    alt={`Doodle by ${note.name}`}
                    className="h-auto w-full object-contain"
                  />
                </div>
              )}
              {note.message && <blockquote>{note.message}</blockquote>}
              <figcaption>
                <span className="visitor-wall-avatar" aria-hidden="true">
                  {note.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="visitor-wall-author">
                  {note.name}
                  <time>{note.date}</time>
                </span>
                {user && note.owner === user.id && (
                  <button
                    onClick={() => removeNote(note.id)}
                    className="visitor-wall-remove"
                    aria-label={`Remove your note: ${note.message.slice(0, 30) || "drawing"}`}
                  >
                    Remove
                  </button>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </WallPins>
        {hasMore && (
          <button
            className="visitor-wall-more"
            disabled={loading}
            onClick={() => setLimit((n) => n + 60)}
          >
            Load more pins
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <WallComposer
            key={user?.id ?? "guest"}
            name={user ? name : null}
            message={message}
            color={color}
            drawing={drawing}
            document={drawingDocument}
            busy={busy}
            error={error}
            onClose={() => setOpen(false)}
            onLogin={login}
            onSignOut={signOut}
            onMessage={setMessage}
            onColor={setColor}
            onDrawing={(document, image) => {
              setDrawingDocument(document);
              setDrawing(image);
            }}
            onSubmit={submit}
          />
        )}
      </AnimatePresence>
    </>
  );
}
