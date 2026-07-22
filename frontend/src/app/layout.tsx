import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import "./jade-shared.css";

export const metadata: Metadata = {
  title: "Jade Kitchen Design | Interior Products Manufacturer Malaysia",
  description: "Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, interior fit-out products, and worldwide export & import services.",
  keywords: ["kitchen design", "interior design", "custom cabinets", "wardrobes", "furniture", "Malaysia"],
  authors: [{ name: "Jade Kitchen Design" }],
  openGraph: {
    title: "Jade Kitchen Design | Interior Products Manufacturer Malaysia",
    description: "Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, interior fit-out products, and worldwide export & import services.",
    url: "https://www.jadekitchen.com.my",
    siteName: "Jade Kitchen",
    type: "website",
    locale: "en_MY",
    images: [
      {
        url: "https://www.jadekitchen.com.my/images/jade-og-image.png",
        width: 1200,
        height: 630,
        alt: "Jade Kitchen Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jade Kitchen Design | Interior Products Manufacturer Malaysia",
    description: "Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, interior fit-out products, and worldwide export & import services.",
    images: ["https://www.jadekitchen.com.my/images/jade-og-image.png"],
  },
  metadataBase: new URL("https://www.jadekitchen.com.my"),
  alternates: {
    canonical: "https://www.jadekitchen.com.my",
  },
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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${GeistSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
