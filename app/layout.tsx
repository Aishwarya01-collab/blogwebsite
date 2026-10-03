import type { Metadata } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Digital World — Thoughts, Systems & Chaos",
    template: "%s | My Digital World",
  },
  description:
    "A personal blog exploring programming, AI, systems, and the beautiful chaos of building things.",
  keywords: ["blog", "programming", "AI", "systems", "technology", "personal"],
  authors: [{ name: "Admin" }],
  creator: "Admin",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "My Digital World",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-base text-text-primary font-sans antialiased">
        {/* Ambient background orbs — decorative, purely visual */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-green-loki/8 blur-[100px] animate-glow-pulse" />
          <div
            className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-green-bright/5 blur-[120px] animate-glow-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gold/4 blur-[100px] animate-glow-pulse"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Page content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
