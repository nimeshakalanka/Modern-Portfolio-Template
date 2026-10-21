import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Background } from "@/components/layout/Background";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { profile } from "@/data/profile";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s | ${profile.name}` },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: "/",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: siteName, description: siteDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // next-themes sets the theme class before hydration, so the attribute differs from the server.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body>
        <noscript>
          {/* Without JS, scroll-reveal content must still be visible. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-accent px-5 py-3 font-medium text-accent-fg transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Background />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
