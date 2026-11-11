import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://stickitupp.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stick It Up — Stickers for your UI",
    template: "%s | Stick It Up",
  },
  description:
    "Give your website the kind of personality that makes people stick around. A sticker library for React with 3D vinyl hover peel, chrome emblems, and playful vector decals.",
  applicationName: "Stick It Up",
  keywords: [
    "stickers",
    "react stickers",
    "stick-it-up",
    "vinyl peel sticker",
    "holographic sticker",
    "chrome stickers",
    "interactive stickers",
    "react component stickers",
    "svg decals",
    "ui stickers",
    "web animations",
  ],
  authors: [{ name: "Adhithyan S", url: "https://github.com/Adhithyan411" }],
  creator: "Adhithyan S",
  publisher: "Stick It Up",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stick It Up — Stickers for your UI",
    description:
      "Give your website the kind of personality that makes people stick around. A sticker library for React with 3D vinyl peel effects.",
    url: siteUrl,
    siteName: "Stick It Up",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stick It Up — Give your website the kind of personality that makes people stick around.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stick It Up — Stickers for your UI",
    description:
      "Give your website the kind of personality that makes people stick around. A sticker library for React.",
    images: ["/og-image.png"],
    creator: "@Adhithyan411",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/stickers/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Stick It Up",
      description: "Delightful React vinyl and holographic stickers for your UI.",
      publisher: {
        "@type": "Person",
        name: "Adhithyan S",
        url: "https://github.com/Adhithyan411",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "stick-it-up",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Premium vector, holographic & chrome aesthetic sticker components for React with 3D vinyl peel.",
      url: siteUrl,
      downloadUrl: "https://www.npmjs.com/package/stick-it-up",
    },
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Geist+Pixel&family=Instrument+Serif&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Patrick+Hand&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
