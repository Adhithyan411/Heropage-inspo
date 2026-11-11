import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Stickers & Badges",
  description:
    "Explore interactive React stickers and badges with 3D vinyl hover peel. Filter by categories, customize size, copy ready-to-use code, or download SVGs.",
  openGraph: {
    title: "Browse All Stickers & Badges | Stick It Up",
    description:
      "Explore interactive React stickers and badges with 3D vinyl hover peel. Filter by categories, customize size, copy code, or download SVGs.",
    url: "/stickers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stick It Up — Stickers & Badges Catalog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse All Stickers & Badges | Stick It Up",
    description:
      "Explore interactive React stickers and badges with 3D vinyl hover peel.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/stickers",
  },
};

export default function StickersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

