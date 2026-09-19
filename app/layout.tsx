import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "../components/nav";
import { LenisProvider } from "../components/lenis-provider";
import { Footer } from "../components/footer";

export const metadata: Metadata = {
  title: {
    default: "Puneet Saxena — Competitive Programmer & Full-Stack Developer",
    template: "%s | Puneet Saxena",
  },
  description:
    "Portfolio of Puneet Saxena — Codeforces Pupil, CodeChef 3★ competitive programmer, full-stack developer, and AI product builder based in Jaipur, India.",
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
      "Codeforces Pupil, CodeChef 3★, and full-stack developer building useful web, AI, and optimization products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Puneet Saxena — Portfolio",
    description:
      "Competitive Programmer & Full-Stack Developer building scalable web & AI products.",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <LenisProvider>
          <Nav />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
