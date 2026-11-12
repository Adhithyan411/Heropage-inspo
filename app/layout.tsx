import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { HeroToaster } from "@/components/heroes/hero-toaster";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HeroAtlas — Website Hero Inspiration Library",
    template: "%s | HeroAtlas",
  },
  description:
    "Discover curated website hero-section designs, typography pairings, color palettes, and layout architectures for website builders, designers, developers, and founders.",
  applicationName: "HeroAtlas",
  keywords: [
    "website hero inspiration",
    "hero section design",
    "landing page hero",
    "web design library",
    "ui layout inspiration",
    "typography pairings",
    "hero templates",
  ],
  authors: [{ name: "Adhithyan S", url: "https://github.com/Adhithyan411" }],
  creator: "Adhithyan S",
  publisher: "HeroAtlas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HeroAtlas — Website Hero Inspiration Library",
    description:
      "Discover curated website hero-section designs, typography pairings, and layout architectures for modern web builders.",
    url: siteUrl,
    siteName: "HeroAtlas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeroAtlas — Website Hero Inspiration Library",
    description:
      "Discover curated website hero-section designs, typography pairings, and layout architectures.",
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
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "HeroAtlas — Website Hero Inspiration Library",
      description:
        "A curated platform where website builders, designers, developers, and founders discover website hero-section inspiration.",
    },
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wdth,wght,ROND@6..144,25..151,1..1000,0..100&family=Google+Sans+Code:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Geist+Pixel&family=Instrument+Serif&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Patrick+Hand&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F4EE] text-[#1A0E08] font-sans selection:bg-orange-100 selection:text-[#7A2306]">
        {children}
        <HeroToaster />
        <Analytics />
      </body>
    </html>
  );
}
