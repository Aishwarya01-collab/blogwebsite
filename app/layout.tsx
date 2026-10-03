import type { Metadata } from "next";
import { Cinzel, Inter, Space_Mono } from "next/font/google";
import { GlobalAtmosphere } from "@/components/ui/global-atmosphere";
import NavbarClient from "@/components/layout/NavbarClient";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import { TimeTravelProvider } from "@/components/context/TimeTravelContext";
import { TemporalEventNotification } from "@/components/ui/TemporalEventNotification";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "My Digital World | Branching Timeline",
  description: "A cinematic personal universe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="relative bg-tva-base text-tva-text min-h-screen pt-24">
        <TimeTravelProvider>
          <GlobalAtmosphere />
          <CustomCursor />
          <TemporalEventNotification />
          <NavbarClient />
          {children}
          <Footer />
        </TimeTravelProvider>
      </body>
    </html>
  );
}

