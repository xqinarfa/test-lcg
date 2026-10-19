import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Rubik } from "next/font/google";
import "./globals.css";
import React from "react";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Love Couple Games | Game Papan Digital untuk Pasutri",
  description: "Game papan digital untuk pasangan suami istri: ngobrol, tertawa, dan makin dekat berdua. Main pakai satu HP, offline dan privat.",
  keywords: [
    "game pasutri",
    "game pasangan",
    "permainan suami istri",
    "couple games",
    "romantic games"
  ],
  openGraph: {
    title: "Love Couple Games | Game Papan Digital untuk Pasutri",
    description: "Game papan digital untuk pasangan suami istri: ngobrol, tertawa, dan makin dekat berdua. Main pakai satu HP, offline dan privat.",
    type: "website",
    locale: "id_ID",
    siteName: "Love Couple Games",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Couple Games | Game Papan Digital untuk Pasutri",
    description: "Game papan digital untuk pasangan suami istri: ngobrol, tertawa, dan makin dekat berdua. Main pakai satu HP, offline dan privat.",
  },
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${cormorant.variable} ${outfit.variable} ${rubik.variable}`}>
      <body>{children}</body>
    </html>
  );
}
