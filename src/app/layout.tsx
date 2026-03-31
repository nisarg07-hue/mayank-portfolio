import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, DM_Sans, Space_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SplineBackgroundClient } from "@/components/SplineBackgroundClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayank Singh — Video Editor",
  description: "Premium cinematic portfolio of Mayank Singh, video editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} antialiased bg-black text-zinc-100 selection:bg-zinc-100 selection:text-black`}
      >
        <SplineBackgroundClient />
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

