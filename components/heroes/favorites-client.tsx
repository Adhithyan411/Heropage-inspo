"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, Trash2 } from "lucide-react";
import { filterHeroCatalog } from "@/lib/heroes/catalog";
import { useHeroFavorites } from "@/lib/heroes/favorites";
import { DesignPlaceholderCard } from "./design-placeholder-card";
import { SiteFooter } from "./site-footer";
import { SiteNavbar } from "./site-navbar";

/**
 * Local-only Saved Favorites view for HeroAtlas concepts.
 */
export function FavoritesClient() {
  const {
    favoriteIds,
    favoriteCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  } = useHeroFavorites();

  const savedItems = filterHeroCatalog({ favoriteIds });

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1A0E08]">
      <SiteNavbar favoriteCount={favoriteCount} />

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#140A05]/[0.08] pb-8">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#C2410C]">
              <Bookmark className="h-3.5 w-3.5 text-[#FF5B14]" />
              Saved Locally
            </p>
            <h1 className="mt-2.5 text-4xl font-semibold tracking-[-0.04em] text-[#1A0E08] sm:text-5xl">
              Your saved hero concepts.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#1A0E08]/65 sm:text-base">
              Bookmarked concepts stay stored locally in your browser without
              requiring an account or database connection.
            </p>
          </div>

          {savedItems.length > 0 && (
            <button
              type="button"
              onClick={clearFavorites}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#140A05]/12 bg-white px-4 py-2 text-xs font-medium text-[#1A0E08]/75 hover:border-red-300 hover:text-red-700"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Saved ({savedItems.length})</span>
            </button>
          )}
        </div>

        {savedItems.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedItems.map((entry) => (
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
              No saved hero concepts yet.
            </p>
            <p className="mt-1 text-sm text-[#1A0E08]/60">
              Click the bookmark button on any concept card in the gallery to
              keep it handy here.
            </p>
            <Link
              href="/designs"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#140A05] px-5 py-2.5 text-xs font-semibold text-[#FFF6EF] hover:bg-[#2A1309]"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

