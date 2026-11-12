"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { HERO_CATEGORIES } from "@/lib/heroes/categories";
import {
  filterHeroCatalog,
  HERO_CATALOG,
  HERO_LAYOUT_PATTERNS,
  HERO_MOODS,
} from "@/lib/heroes/catalog";
import { useHeroFavorites } from "@/lib/heroes/favorites";
import type {
  HeroCategoryId,
  HeroLayoutPattern,
  HeroVisualMood,
} from "@/lib/heroes/types";
import { DesignPlaceholderCard } from "./design-placeholder-card";
import { SiteFooter } from "./site-footer";
import { SiteNavbar } from "./site-navbar";

/**
 * Interactive Gallery & Multi-Facet Filter view for all placeholder concepts.
 */
export function GalleryClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const validInitialCategory = HERO_CATEGORIES.some(
    (c) => c.id === initialCategory,
  )
    ? (initialCategory as HeroCategoryId)
    : "all";

  const [category, setCategory] = useState<HeroCategoryId | "all">(
    validInitialCategory,
  );
  const [mood, setMood] = useState<HeroVisualMood | "all">("all");
  const [layoutPattern, setLayoutPattern] = useState<HeroLayoutPattern | "all">(
    "all",
  );
  const [query, setQuery] = useState("");

  const { favoriteCount, isFavorite, toggleFavorite } = useHeroFavorites();

  const filtered = useMemo(
    () =>
      filterHeroCatalog({
        category,
        mood,
        layoutPattern,
        query,
      }),
    [category, mood, layoutPattern, query],
  );

  const hasActiveFilters =
    category !== "all" ||
    mood !== "all" ||
    layoutPattern !== "all" ||
    query.trim().length > 0;

  const resetFilters = () => {
    setCategory("all");
    setMood("all");
    setLayoutPattern("all");
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1A0E08]">
      <SiteNavbar favoriteCount={favoriteCount} />

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#C2410C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B14]" />
            Concept Gallery
          </p>
          <h1 className="mt-2.5 text-4xl font-semibold tracking-[-0.04em] text-[#1A0E08] sm:text-5xl">
            Explore all hero architectures.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#1A0E08]/65 sm:text-base">
            Filter all {HERO_CATALOG.length} HeroAtlas concept slots by
            category, visual mood, or layout pattern. Nine slots display their
            imported reference canvases, while unmapped slots retain explicit
            placeholder labels.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-8 rounded-2xl border border-[#140A05]/10 bg-white p-4 shadow-xs sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Search hero concepts</span>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#1A0E08]/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, mood, font, or tag..."
                className="h-10 w-full rounded-xl border border-[#140A05]/12 bg-[#FAF8F5] pr-4 pl-10 text-sm text-[#1A0E08] placeholder:text-[#1A0E08]/40 focus:border-[#FF5B14] focus:bg-white focus:outline-none"
              />
            </label>

            <label className="inline-flex items-center gap-2 rounded-xl border border-[#140A05]/12 bg-[#FAF8F5] px-3 text-xs text-[#1A0E08]/65">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#FF5B14]" />
              <span className="sr-only">Filter by mood</span>
              <select
                value={mood}
                onChange={(e) =>
                  setMood(e.target.value as HeroVisualMood | "all")
                }
                className="h-10 bg-transparent text-xs font-medium text-[#1A0E08] focus:outline-none"
              >
                <option value="all">All Moods</option>
                {HERO_MOODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="inline-flex items-center gap-2 rounded-xl border border-[#140A05]/12 bg-[#FAF8F5] px-3 text-xs text-[#1A0E08]/65">
              <span className="sr-only">Filter by layout pattern</span>
              <select
                value={layoutPattern}
                onChange={(e) =>
                  setLayoutPattern(e.target.value as HeroLayoutPattern | "all")
                }
                className="h-10 bg-transparent text-xs font-medium text-[#1A0E08] focus:outline-none"
              >
                <option value="all">All Layouts</option>
                {HERO_LAYOUT_PATTERNS.map((lp) => (
                  <option key={lp.id} value={lp.id}>
                    {lp.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#140A05]/[0.07] pt-3.5">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  category === "all"
                    ? "bg-[#140A05] text-[#FFF6EF]"
                    : "border border-[#140A05]/10 bg-[#FAF8F5] text-[#1A0E08]/70 hover:text-[#1A0E08]"
                }`}
              >
                All ({HERO_CATALOG.length})
              </button>
              {HERO_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    category === cat.id
                      ? "bg-[#140A05] text-[#FFF6EF]"
                      : "border border-[#140A05]/10 bg-[#FAF8F5] text-[#1A0E08]/70 hover:text-[#1A0E08]"
                  }`}
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#1A0E08]/55">
              <span className="font-mono">
                {filtered.length} of {HERO_CATALOG.length} slots
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 font-medium text-[#C2410C] hover:underline"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <DesignPlaceholderCard
                key={entry.id}
                entry={entry}
                isFavorite={isFavorite(entry.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-[#140A05]/15 bg-white/80 p-12 text-center">
            <p className="text-base font-semibold text-[#1A0E08]">
              No concept slots match these filters.
            </p>
            <p className="mt-1 text-sm text-[#1A0E08]/60">
              Reset your search or category selections to view all placeholder
              architectures.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center rounded-full bg-[#140A05] px-5 py-2 text-xs font-semibold text-[#FFF6EF]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

