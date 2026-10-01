export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
  honeypot: string;
};
export function validateContact(message: ContactMessage): string | null {
  if (message.name.trim().length < 2 || message.name.length > 70)
    return "Please enter your name (2–70 characters).";
  if (message.email.length > 254 || !/^\S+@\S+\.\S+$/.test(message.email))
    return "Please enter a valid email address.";
  if (!message.topic) return "Please choose a topic.";
  if (message.message.trim().length < 10 || message.message.length > 2000)
    return "Your message should contain 10–2,000 characters.";
  if (!message.consent)
    return "Please agree to the data notice before sending.";
  return null;
}
export async function sendContact(
  message: ContactMessage,
  formId: string,
  request: typeof fetch = fetch,
) {
  const validation = validateContact(message);
  if (validation) throw Error(validation);
  if (message.honeypot)
    throw Error("Unable to send this message. Please email me directly.");
  if (!/^[a-zA-Z0-9]{6,32}$/.test(formId))
    throw Error(
      "Message delivery is not available yet. Please email puneetsaxena168@gmail.com directly.",
    );
  const response = await request(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: message.name.trim(),
      email: message.email.trim(),
      topic: message.topic,
      message: message.message.trim(),
      consent: message.consent,
      _gotcha: message.honeypot,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 429)
    throw Error(
      "Too many messages. Please wait a few minutes before trying again.",
    );
  if (!response.ok)
    throw Error(
      "Your message could not be delivered. Please try again or email me directly.",
    );
}
