"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HERO_CATEGORIES } from "@/lib/heroes/categories";
import { filterHeroCatalog } from "@/lib/heroes/catalog";
import type { HeroCategoryId } from "@/lib/heroes/types";
import { DesignPlaceholderCard } from "./design-placeholder-card";
import { ScrollReveal } from "./reveal-text";

interface FeaturedDesignsSectionProps {
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

/**
 * Homepage Featured Designs section displaying clearly labeled placeholder
 * concept cards with data-driven category filtering.
 */
export function FeaturedDesignsSection({
  isFavorite,
  onToggleFavorite,
}: FeaturedDesignsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    HeroCategoryId | "all"
  >("all");

  const items = filterHeroCatalog({ category: selectedCategory }).slice(0, 6);

  return (
    <section
      id="featured-designs"
      aria-labelledby="featured-heading"
      className="mx-auto max-w-6xl px-4 pt-10 pb-2 sm:px-6 sm:pt-14 sm:pb-4 lg:px-8"
    >
      <ScrollReveal>
        <div className="flex flex-col justify-between gap-5 border-b border-[#140A05]/[0.08] pb-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#C2410C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B14]" />
              Featured Concept Slots
            </p>
            <h2
              id="featured-heading"
              className="font-display mt-2 text-[clamp(30px,3.8vw,44px)] leading-[1.08] font-semibold tracking-[-0.035em] text-[#1A0E08]"
            >
              Structured hero blueprints, ready for original builds.
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[#1A0E08]/62 sm:text-base">
              Each card pairs an architectural hero specification with its
              imported visual reference, palette tokens, and typography pairing.
              Slots without a dedicated visual remain clearly marked as
              placeholders.
            </p>
          </div>

          {/* Data-driven filter chips */}
          <div
            role="group"
            aria-label="Filter featured placeholder concepts"
            className="flex flex-wrap gap-1.5"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#140A05] text-[#FFF6EF]"
                  : "border border-[#140A05]/10 bg-white text-[#1A0E08]/70 hover:border-[#140A05]/25 hover:text-[#1A0E08]"
              }`}
            >
              All Slots
            </button>
            {HERO_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-[#140A05] text-[#FFF6EF]"
                    : "border border-[#140A05]/10 bg-white text-[#1A0E08]/70 hover:border-[#140A05]/25 hover:text-[#1A0E08]"
                }`}
              >
                {category.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((entry, idx) => (
          <ScrollReveal key={entry.id} delayMs={idx * 45}>
            <DesignPlaceholderCard
              entry={entry}
              isFavorite={isFavorite(entry.id)}
              onToggleFavorite={onToggleFavorite}
            />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delayMs={80}>
        <div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-[#140A05]/15 bg-white/80 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#1A0E08]">
              Browse all 10 planned concept architectures in the interactive gallery.
            </p>
            <p className="mt-0.5 text-xs text-[#1A0E08]/58">
              Showing {items.length} curated hero concepts from the data-driven
              catalog.
            </p>
          </div>
          <Link
            href="/designs"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#140A05] px-4 py-2 text-xs font-semibold text-[#FFF6EF] transition-colors hover:bg-[#2A1309]"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
