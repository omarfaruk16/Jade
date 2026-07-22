import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import "./jade-shared.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jadekitchen.com.my"),
  title: "Jade Kitchen Design | Interior Products Manufacturer Malaysia",
  description: "Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, interior fit-out products, and worldwide export & import services.",
  keywords: ["kitchen design", "interior design", "custom cabinets", "wardrobes", "furniture", "Malaysia", "interior fit-out", "bespoke furniture"],
  authors: [{ name: "Jade Kitchen Design" }],
  creator: "Jade Kitchen Design",
  publisher: "Jade Kitchen Design",
  applicationName: "Jade Kitchen",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jade Kitchen Design",
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "Jade Kitchen Design | Interior Products Manufacturer Malaysia",
    description: "Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, interior fit-out products, and worldwide export & import services.",
    url: "https://www.jadekitchen.com.my",
    siteName: "Jade Kitchen Design",
    type: "website",
    locale: "en_MY",
    countryName: "Malaysia",
    images: [
      {
        url: "/images/jade-og-image.png",
        width: 1200,
        height: 630,
        alt: "Jade Kitchen Design - Interior Products Manufacturer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jade Kitchen Design | Interior Products Manufacturer Malaysia",
    description: "Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, and interior fit-out products.",
    creator: "@jadekitchen",
    images: ["/images/jade-og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.jadekitchen.com.my",
    languages: {
      "en-MY": "https://www.jadekitchen.com.my",
    },
  },
  verification: {
    google: "your-google-site-verification-code", // Add your Google verification code here
    yandex: "your-yandex-verification-code", // Add your Yandex verification code if needed
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
    <html lang="en-MY" dir="ltr" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${GeistSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
