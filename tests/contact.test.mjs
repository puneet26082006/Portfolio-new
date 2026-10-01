import test from "node:test";
import assert from "node:assert/strict";
import { sendContact, validateContact } from "../lib/contact-service.ts";
const valid = {
  name: "Portfolio Test",
  email: "test@example.com",
  topic: "Other",
  message: "This is a local test message.",
  consent: true,
  honeypot: "",
};
test("contact validation rejects invalid email, missing consent and short messages", () => {
  assert.equal(validateContact(valid), null);
  assert.ok(validateContact({ ...valid, email: "broken" }));
  assert.ok(validateContact({ ...valid, consent: false }));
  assert.ok(validateContact({ ...valid, message: "short" }));
  assert.ok(validateContact({ ...valid, topic: "" }));
});
test("missing configuration and honeypots never send a request", async () => {
  const never = () => {
    throw Error("Unexpected network request");
  };
  await assert.rejects(sendContact(valid, "", never), /not available/);
  await assert.rejects(
    sendContact({ ...valid, honeypot: "bot" }, "abcdefgh", never),
    /Unable to send/,
  );
});
test("contact sends the approved fields to the fixed Formspree endpoint", async () => {
  let calls = 0;
  await sendContact(valid, "abcdefgh", async (url, options) => {
    calls++;
    assert.equal(url, "https://formspree.io/f/abcdefgh");
    assert.equal(options.method, "POST");
    const payload = JSON.parse(options.body);
    assert.equal(payload.email, valid.email);
    assert.equal(payload.consent, true);
    assert.equal(payload.message, valid.message);
    assert.equal(payload.recipient, undefined);
    return { ok: true, status: 200 };
  });
  assert.equal(calls, 1);
});
test("contact never reports delivery on a rejected response", async () => {
  await assert.rejects(
    sendContact(valid, "abcdefgh", async () => ({ ok: false, status: 429 })),
    /Too many/,
  );
  await assert.rejects(
    sendContact(valid, "abcdefgh", async () => ({ ok: false, status: 500 })),
    /could not be delivered/,
  );
});
