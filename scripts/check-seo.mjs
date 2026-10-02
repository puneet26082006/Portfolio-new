import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";

const root = resolve("out");
async function pages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? pages(join(directory, entry.name)) : entry.name === "index.html" ? [join(directory, entry.name)] : []));
  return nested.flat();
}
const read = path => readFile(join(root, path), "utf8");
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(match => Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr => [attr[1], attr[2]])));
const home = await read("index.html");
const canonical = tags(home, "link").find(tag => tag.rel === "canonical")?.href;
assert(canonical, "Home canonical is missing");
const origin = new URL(canonical).origin;
assert(origin.startsWith("https://"), "Production SEO checks require an HTTPS SITE_URL");
const urls = new Set();
const titles = new Set();
for (const file of await pages(root)) {
  const path = "/" + relative(root, file).split(sep).join("/").replace(/index\.html$/, "");
  if (path === "/404/" || path === "/_not-found/") continue;
  const html = await readFile(file, "utf8");
  const expected = origin + path;
  const links = tags(html, "link"), meta = tags(html, "meta");
  assert.equal(links.filter(tag => tag.rel === "canonical").length, 1, path);
  assert.equal(links.find(tag => tag.rel === "canonical").href, expected, path);
  assert.equal(meta.find(tag => tag.property === "og:url")?.content, expected, path);
  assert(meta.find(tag => tag.name === "description")?.content.length > 20, path);
  assert(meta.some(tag => tag.property === "og:image" && tag.content.startsWith(origin)), path);
  assert(meta.some(tag => tag.name === "twitter:card" && tag.content === "summary_large_image"), path);
  assert(!meta.some(tag => tag.name === "robots" && tag.content.includes("noindex")), path);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path} must have one H1`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert(title && title.includes("Puneet Saxena") && !titles.has(title), path);
  titles.add(title);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  assert(schemas.some(schema => schema["@graph"]?.some(item => item["@type"] === "Person")), path);
  assert(links.some(tag => tag.rel === "icon" && tag.href.startsWith("/icon.svg")), path);
  urls.add(expected);
}
const sitemap = await read("sitemap.xml");
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]));
assert.deepEqual(listed, urls, "Sitemap must include every indexable page exactly once");
const robots = await read("robots.txt");
assert(robots.includes("Allow: /") && robots.includes(origin + "/sitemap.xml"));
assert(!robots.includes("Disallow: /\n"));
assert((await read("404.html")).includes("noindex"));
console.log(`SEO checks passed: ${urls.size} pages, unique titles, canonical URLs, H1 headings, social previews, structured data, robots.txt, sitemap, and noindex 404.`);
