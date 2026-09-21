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
  title: "Love Couple Games: Game Papan Digital Pasangan Suami Istri",
  description: "Hangatkan kembali keintiman pernikahan bersama pasangan. Game papan digital khusus pasutri berisi tantangan mesra, truth or dare, dan kustomisasi karakter.",
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
