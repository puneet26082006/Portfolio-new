import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "../components/nav";
import { LenisProvider } from "../components/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Inter — the sans awrs.me uses for its section headings (kept scoped to the
// Coding Profiles title via the .font-ui utility; body text stays on Geist).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puneetsaxena.dev"),
  title: "Puneet Saxena — Competitive Programmer & Full-Stack Developer",
  description:
    "Portfolio of Puneet Saxena — Codeforces Pupil & CodeChef 2★ competitive programmer, full-stack developer (React, Node, TypeScript) and AI-app builder based in Jaipur, India.",
  keywords: [
    "Puneet Saxena",
    "Competitive Programmer",
    "Full-Stack Developer",
    "Codeforces",
    "CodeChef",
    "React",
    "Node.js",
    "TypeScript",
    "AI Developer",
  ],
  authors: [{ name: "Puneet Saxena" }],
  openGraph: {
    title: "Puneet Saxena — Competitive Programmer & Full-Stack Developer",
    description:
      "Codeforces Pupil, CodeChef 2★, and full-stack developer building scalable web apps and AI-powered products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puneet Saxena — Portfolio",
    description:
      "Competitive Programmer & Full-Stack Developer building scalable web & AI products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <LenisProvider>
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
