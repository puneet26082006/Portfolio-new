/** @type {import('tailwindcss').Config} */
// Tailwind CSS v4 is configured CSS-first via the @theme block in app/globals.css.
// Content sources are auto-detected; this file is kept minimal for tooling that expects it.
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
