import type { Metadata } from "next";
import { Inter, Outfit } from 'next/font/google';
import "./globals.css";
import "./jade-shared.css";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "Jade | Premium Fullstack Template",
  description: "A modern Next.js and Express.js starter kit with premium design.",
  keywords: ["Next.js", "Express.js", "Fullstack", "Modern UI", "React"],
  authors: [{ name: "Antigravity AI" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
