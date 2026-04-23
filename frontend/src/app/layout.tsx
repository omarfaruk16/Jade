import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
