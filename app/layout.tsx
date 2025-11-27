import React from 'react';
import { Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: '--font-noto-serif',
  preload: false, // Optimizing loading
});

export const metadata = {
  title: "职场明镜 - 话术分析",
  description: "An AI-powered tool to analyze workplace communication for signs of manipulation (PUA) or brainwashing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSerifSC.variable} font-serif bg-stone-50`}>{children}</body>
    </html>
  );
}