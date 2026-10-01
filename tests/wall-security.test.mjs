import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

test("wall database enforces auth, validation, instant publishing, ownership and durable rate limits", async () => {
  const db = new PGlite();
  const alice = "00000000-0000-4000-8000-000000000001",
    bob = "00000000-0000-4000-8000-000000000002";
  try {
    await db.exec(`
      create role anon;create role authenticated;create schema auth;
      create table auth.users(id uuid primary key,email_confirmed_at timestamptz);
      insert into auth.users values('${alice}',now()),('${bob}',now());
      create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
      create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
      grant usage on schema auth to anon,authenticated;
    `);
    await db.exec(
      await readFile(
        new URL(
          "../supabase/migrations/202609300001_visitor_wall.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec(
      await readFile(
        new URL(
          "../supabase/migrations/202610010001_wall_drawing_studio.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    // Upgrade an existing queued note without losing content.
    await db.query(
      "insert into public.wall_notes(user_id,author_name,message,color,approved) values($1,'Alice','Existing queued note','#4d2b80',false)",
      [alice],
    );
    await db.exec(
      await readFile(
        new URL(
          "../supabase/migrations/202610010002_wall_instant_pins.sql",
          import.meta.url,
        ),
        "utf8",
      ),
    );
    await db.exec("set role anon;");
    assert.equal(
      (await db.query("select public.wall_api_version() as version")).rows[0]
        .version,
      3,
    );
    assert.equal(
      (await db.query("select message,approved from public.wall_notes")).rows[0]
        .approved,
      true,
    );
    await db.exec("reset role;delete from public.wall_notes;");
    const asUser = async (id, provider = "google") => {
      await db.exec(
        `reset role;set role authenticated;set request.jwt.claim.sub='${id}';set request.jwt.claims='{"app_metadata":{"provider":"${provider}"}}';`,
      );
    };
    const submit = (
      name = "Alice",
      message = "A test note",
      color = "#4d2b80",
      drawing = null,
    ) =>
      db.query("select (public.submit_wall_note($1,$2,$3,$4)).id", [
        name,
        message,
        color,
        drawing,
      ]);
    await db.exec("set role anon;set request.jwt.claim.sub='';");
    await assert.rejects(submit(), /permission denied/);
    await asUser(alice, "email");
    await assert.rejects(submit(), /Sign-in required/);
    await asUser(alice);
    await assert.rejects(submit("A"), /Invalid note/);
    await assert.rejects(submit("Alice", "x".repeat(221)), /Invalid note/);
    await assert.rejects(submit("Alice", "hello", "#ffffff"), /Invalid note/);
    await assert.rejects(
      submit("Alice", "hello", "#4d2b80", "data:image/svg+xml,<svg/>"),
      /Invalid drawing/,
    );
    await assert.rejects(
      submit(
        "Alice",
        "hello",
        "#4d2b80",
        "data:image/png;base64," + "A".repeat(200001),
      ),
      /Invalid drawing/,
    );
    await assert.rejects(
      db.query(
        "insert into public.wall_notes(user_id,author_name,message,color,approved) values($1,'Injected','No','#4d2b80',true)",
        [alice],
      ),
      /permission denied/,
    );
    const drawing =
      "data:image/png;base64," +
      (
        await readFile(new URL("./fixtures/wall-drawing.png", import.meta.url))
      ).toString("base64");
    await assert.rejects(submit("Alice", "", "#7e22ce"), /Invalid note/);
    await assert.rejects(
      submit("Alice", "x".repeat(201), "#7e22ce"),
      /Invalid note/,
    );
    const wrongSize = Buffer.from(drawing.split(",")[1], "base64");
    wrongSize.writeUInt32BE(9999, 16);
    await assert.rejects(
      submit(
        "Alice",
        "",
        "#7e22ce",
        "data:image/png;base64," + wrongSize.toString("base64"),
      ),
      /Invalid drawing dimensions/,
    );
    const row = (await submit("Alice", "", "#7e22ce", drawing)).rows[0];
    assert.equal(
      (
        await db.query("select approved from public.wall_notes where id=$1", [
          row.id,
        ])
      ).rows[0].approved,
      true,
    );
    await assert.rejects(
      db.query("update public.wall_notes set approved=true where id=$1", [
        row.id,
      ]),
      /permission denied/,
    );
    await assert.rejects(
      db.query("select * from private.wall_submission_log"),
      /permission denied/,
    );
    await asUser(bob, "github");
    assert.equal(
      (await db.query("select * from public.wall_notes")).rows.length,
      1,
    );
    await db.query("delete from public.wall_notes where id=$1", [row.id]);
    await db.exec("reset role;");
    assert.equal(
      (await db.query("select * from public.wall_notes where id=$1", [row.id]))
        .rows.length,
      1,
    );

    await db.exec("set role anon;set request.jwt.claim.sub='';");
    assert.equal(
      (await db.query("select * from public.wall_notes")).rows.length,
      1,
    );
    await asUser(alice);
    // Every composer color accepts the actual 900x600 studio PNG; rolled back test pins don't consume limits.
    for (const color of [
      "#7e22ce",
      "#dc2626",
      "#059669",
      "#0284c7",
      "#d97706",
      "#db2777",
      "#4f46e5",
      "#0d9488",
      "#be123c",
      "#7c3aed",
      "#ea580c",
      "#16a34a",
    ]) {
      await db.exec("begin;");
      const pin = await submit("Alice", "Hello", color, drawing);
      assert.ok(pin.rows[0].id);
      await db.exec("rollback;");
    }
    await submit("Alice", "Second note");
    await submit("Alice", "Third note");
    await db.query("delete from public.wall_notes where user_id=$1", [alice]);
    assert.equal(
      (await db.query("select * from public.wall_notes")).rows.length,
      0,
    );
    await assert.rejects(
      submit("Alice", "Fourth note"),
      /Posting limit reached/,
    );
    // The daily limit is independent of the short burst window.
    await db.exec("reset role;");
    await db.query(
      "update private.wall_submission_log set created_at=now()-interval '1 hour' where user_id=$1",
      [alice],
    );
    await db.query(
      "insert into private.wall_submission_log(user_id,created_at) select $1::uuid,now()-interval '1 hour' from generate_series(1,7)",
      [alice],
    );
    await asUser(alice);
    await assert.rejects(
      submit("Alice", "Daily limit"),
      /Posting limit reached/,
    );
    await db.exec("reset role;");
    await db.query(
      "update private.wall_submission_log set created_at=now()-interval '25 hours' where user_id=$1",
      [alice],
    );
    await asUser(alice);
    await submit("Alice", "Posting resumes after the window expires");
    await asUser(bob, "github");
    await submit("Bob", "GitHub sign-in is accepted");
    await db.exec("reset role;");
    await db.query(
      "update auth.users set email_confirmed_at=null where id=$1",
      [bob],
    );
    await asUser(bob, "github");
    await assert.rejects(submit("Bob"), /Verified account required/);
  } finally {
    await db.close();
  }
});
