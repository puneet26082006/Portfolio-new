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
import "./context-menu.css";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SOCIAL_IMAGE, INDEXABLE, identitySchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { ContextMenu } from "@/components/context-menu";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Puneet Saxena" },
  description: SITE_DESCRIPTION,
  applicationName: "Puneet Saxena Portfolio",
  authors: [{ name: "Puneet Saxena", url: SITE_URL }],
  creator: "Puneet Saxena",
  category: "technology",
  robots: INDEXABLE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
  openGraph: { title: SITE_TITLE, description: SITE_DESCRIPTION, siteName: "Puneet Saxena Portfolio", type: "website", locale: "en_IN", images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION, images: [SOCIAL_IMAGE] },
  icons: {
    icon: [ { url: "/favicon.ico?v=ps-1", sizes: "16x16 32x32 48x48 64x64" }, { url: "/icon.svg?v=ps-1", type: "image/svg+xml", sizes: "any" } ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
        <StructuredData data={identitySchema} />
        <LenisProvider>
          <ScrollBlur />
          <Nav />
          <ContextMenu />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
