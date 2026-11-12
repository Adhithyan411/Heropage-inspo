import { Suspense } from "react";
import type { Metadata } from "next";
import { GalleryClient } from "@/components/heroes/gallery-client";

export const metadata: Metadata = {
  title: "Explore Hero Designs",
  description:
    "Browse and filter curated website hero-section placeholder architectures by category, mood, and layout pattern.",
};

export default function DesignsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F4EE] px-6 py-32 text-center text-sm text-[#1A0E08]/60">
          Loading HeroAtlas gallery...
        </div>
      }
    >
      <GalleryClient />
    </Suspense>
  );
}

