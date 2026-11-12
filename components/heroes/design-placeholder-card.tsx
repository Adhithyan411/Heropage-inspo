"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bookmark, Check, Link2 } from "lucide-react";
import { getHeroImageRenderProps } from "@/lib/heroes/catalog";
import { HERO_CATEGORY_MAP } from "@/lib/heroes/categories";
import { copyDesignUrl } from "@/lib/heroes/notifications";
import type { HeroDesignEntry } from "@/lib/heroes/types";
import { HeroSchematicCanvas } from "./hero-schematic-canvas";

interface DesignPlaceholderCardProps {
  entry: HeroDesignEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

/**
 * Reusable card for Featured Designs, Gallery, and Favorites views.
 * Explicitly labels placeholder entries so unfinished slots are transparent.
 */
export function DesignPlaceholderCard({
  entry,
  isFavorite,
  onToggleFavorite,
}: DesignPlaceholderCardProps) {
  const category = HERO_CATEGORY_MAP[entry.category];
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = async () => {
    const ok = await copyDesignUrl(entry);
    if (ok) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 1600);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#140A05]/[0.08] bg-white shadow-[0_1px_2px_rgba(20,10,5,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#140A05]/20 hover:shadow-[0_18px_40px_-24px_rgba(80,30,5,0.22)]">
      {/* Bookmark & Copy URL buttons kept outside the Link to avoid nested interactive controls */}
      <button
        type="button"
        onClick={() => onToggleFavorite(entry.id)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${entry.title} from saved concepts`
            : `Save ${entry.title} to local favorites`
        }
        className={`absolute top-2.5 left-2.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-xs transition-all ${
          isFavorite
            ? "border-[#FF5B14] bg-[#FF5B14] text-white shadow-xs"
            : "border-[#140A05]/15 bg-white/90 text-[#1A0E08]/65 hover:bg-white hover:text-[#1A0E08]"
        }`}
      >
        <Bookmark className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`} />
      </button>

      <button
        type="button"
        onClick={handleCopyUrl}
        aria-label={`Copy URL for ${entry.title}`}
        title={`Copy link to ${entry.title}`}
        className={`absolute top-2.5 left-12 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-xs transition-all ${
          copiedUrl
            ? "border-[#2F6B3B] bg-[#2F6B3B] text-white shadow-xs"
            : "border-[#140A05]/15 bg-white/90 text-[#1A0E08]/65 hover:bg-white hover:text-[#1A0E08]"
        }`}
      >
        {copiedUrl ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
      </button>

      <Link
        href={`/designs/${entry.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FF5B14]"
      >
        {/* Concept image preview or schematic placeholder when unmapped */}
        <div
          className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#140A05]/[0.07]"
          style={{ backgroundColor: entry.schematic.skyTop }}
        >
          {entry.image ? (
            <>
              <Image
                {...getHeroImageRenderProps(entry.image.src)}
                alt={entry.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                style={{
                  objectPosition: entry.image.objectPosition ?? "50% 50%",
                }}
              />
              <div className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#140A05]/12 bg-white/90 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#1A0E08] shadow-xs backdrop-blur-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B14]" />
                Slot {String(entry.slotNumber).padStart(2, "0")}
              </div>
            </>
          ) : (
            <HeroSchematicCanvas entry={entry} compact />
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-medium text-[#C2410C]">
                {category.shortLabel}
              </span>
              <span className="rounded-md bg-[#F3EEE7] px-2 py-0.5 font-mono text-[10px] text-[#1A0E08]/65">
                {entry.layoutPattern}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <h3 className="font-display text-[19px] leading-[1.2] font-semibold tracking-[-0.03em] text-[#1A0E08] transition-colors group-hover:text-[#C2410C]">
                {entry.title}
              </h3>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#1A0E08]/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF5B14]" />
            </div>

            <p className="mt-1 text-sm leading-relaxed text-[#1A0E08]/62">
              {entry.tagline}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#140A05]/[0.06] pt-3.5">
            <div className="flex items-center gap-1.5">
              {entry.palette.map((token) => (
                <span
                  key={token.hex}
                  title={`${token.name} (${token.hex})`}
                  className="h-3.5 w-3.5 rounded-full border border-[#140A05]/15"
                  style={{ backgroundColor: token.hex }}
                />
              ))}
            </div>

            <span className="font-mono text-[11px] text-[#1A0E08]/48">
              {entry.typography.displayFont}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
