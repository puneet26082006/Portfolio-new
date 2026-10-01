import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./inner-pages.css";
import "./wall-studio.css";
import "./wall-page.css";
import "./navigation.css";
import "./legal-pages.css";
import "./theme.css";
import "./blog.css";
import { Nav } from "../components/nav";
import { ScrollBlur } from "../components/scroll-blur";
import { LenisProvider } from "../components/lenis-provider";
import { Footer } from "../components/footer";

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t='dark';try{if(localStorage.getItem('portfolio-theme')==='light')t='light';}catch(e){}document.documentElement.dataset.theme=t;document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <LenisProvider>
          <ScrollBlur />
          <Nav />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
