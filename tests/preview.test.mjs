import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import { createPreviewServer } from "../scripts/preview.mjs";

test("static preview serves nested pages and PDFs, rejects private paths, and returns real 404s", async () => {
  const root = await mkdtemp(join(tmpdir(), "portfolio-preview-"));
  await mkdir(join(root, "projects"));
  await writeFile(join(root, "projects", "index.html"), "Projects");
  await writeFile(join(root, "resume.pdf"), "%PDF-1.4");
  await writeFile(join(root, ".env"), "PRIVATE");
  const server = await createPreviewServer(root);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal(
      (await fetch(url + "/projects", { redirect: "manual" })).status,
      308,
    );
    assert.equal(await (await fetch(url + "/projects/")).text(), "Projects");
    assert.equal(
      (await fetch(url + "/resume.pdf")).headers.get("content-type"),
      "application/pdf",
    );
    assert.equal(
      await (await fetch(url + "/resume.pdf", { method: "HEAD" })).text(),
      "",
    );
    assert.equal((await fetch(url + "/missing/")).status, 404);
    assert.equal((await fetch(url + "/.env")).status, 400);
    assert.equal((await fetch(url + "/%2e%2e%2f.env")).status, 400);
    assert.equal(
      (await fetch(url + "/projects/", { method: "POST" })).status,
      405,
    );
  } finally {
    await new Promise((done) => server.close(done));
    await rm(root, { recursive: true, force: true });
  }
});
