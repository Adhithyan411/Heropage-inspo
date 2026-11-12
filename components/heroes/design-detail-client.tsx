"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Copy,
  Download,
  Link2,
  Monitor,
  Smartphone,
} from "lucide-react";
import { getHeroImageRenderProps } from "@/lib/heroes/catalog";
import { HERO_CATEGORY_MAP } from "@/lib/heroes/categories";
import { useHeroFavorites } from "@/lib/heroes/favorites";
import {
  copyColorToken,
  copyDesignUrl,
  exportDesignSpecJson,
} from "@/lib/heroes/notifications";
import type { HeroColorToken, HeroDesignEntry } from "@/lib/heroes/types";
import { HeroSchematicCanvas } from "./hero-schematic-canvas";
import { SiteFooter } from "./site-footer";
import { SiteNavbar } from "./site-navbar";

interface DesignDetailClientProps {
  entry: HeroDesignEntry;
  previous: HeroDesignEntry | null;
  next: HeroDesignEntry | null;
}

/**
 * Full architectural specification page for a single HeroAtlas concept slot.
 */
export function DesignDetailClient({
  entry,
  previous,
  next,
}: DesignDetailClientProps) {
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const { favoriteCount, isFavorite, toggleFavorite } = useHeroFavorites();

  const category = HERO_CATEGORY_MAP[entry.category];
  const saved = isFavorite(entry.id);

  const handleCopyToken = async (token: HeroColorToken) => {
    const ok = await copyColorToken(token);
    if (ok) {
      setCopiedHex(token.hex);
      setTimeout(() => setCopiedHex(null), 1500);
    }
  };

  const handleCopyUrl = async () => {
    const ok = await copyDesignUrl(entry);
    if (ok) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 1600);
    }
  };

  const handleExportSpec = async () => {
    await exportDesignSpecJson(entry);
  };

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1A0E08]">
      <SiteNavbar favoriteCount={favoriteCount} />

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        {/* Breadcrumb & actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/designs"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A0E08]/65 hover:text-[#1A0E08]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Gallery</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-[#FF5B14]/30 bg-[#FF5B14]/8 px-3 py-1 font-mono text-[11px] font-medium text-[#C2410C]">
              {entry.image ? "Reference Concept" : "Placeholder Concept"} · Slot{" "}
              {String(entry.slotNumber).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                copiedUrl
                  ? "border-[#2F6B3B] bg-[#2F6B3B]/10 text-[#2F6B3B]"
                  : "border-[#140A05]/15 bg-white text-[#1A0E08] hover:border-[#140A05]/30"
              }`}
            >
              {copiedUrl ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Link2 className="h-3.5 w-3.5" />
              )}
              <span>{copiedUrl ? "Copied URL" : "Copy URL"}</span>
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(entry.id)}
              aria-pressed={saved}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                saved
                  ? "border-[#FF5B14] bg-[#FF5B14] text-white"
                  : "border-[#140A05]/15 bg-white text-[#1A0E08] hover:border-[#140A05]/30"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
              <span>{saved ? "Saved" : "Save Concept"}</span>
            </button>
          </div>
        </div>

        {/* Title block */}
        <div className="mt-6 max-w-3xl">
          <p className="font-mono text-xs font-medium text-[#C2410C] uppercase">
            {category.label} · {entry.mood} · {entry.layoutPattern}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1A0E08] sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#1A0E08]/68 sm:text-lg">
            {entry.summary}
          </p>
        </div>

        {/* Interactive Desktop / Mobile Schematic Stage */}
        <div className="mt-8 rounded-[24px] border border-[#140A05]/10 bg-white p-3 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#140A05]/[0.07] pb-3">
            <span className="font-mono text-xs text-[#1A0E08]/50">
              {entry.image
                ? `Original Imported Reference · ${entry.image.width}×${entry.image.height}`
                : "Schematic Wireframe Preview · Original Artwork Pending"}
            </span>
            <div
              role="group"
              aria-label="Viewport preview mode"
              className="inline-flex rounded-full border border-[#140A05]/10 bg-[#F3EEE7] p-0.5"
            >
              <button
                type="button"
                onClick={() => setViewportMode("desktop")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  viewportMode === "desktop"
                    ? "bg-white text-[#1A0E08] shadow-xs"
                    : "text-[#1A0E08]/55 hover:text-[#1A0E08]"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("mobile")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  viewportMode === "mobile"
                    ? "bg-white text-[#1A0E08] shadow-xs"
                    : "text-[#1A0E08]/55 hover:text-[#1A0E08]"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                Mobile
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center rounded-2xl bg-[#F3EEE7]/75 p-4 sm:p-8">
            <div
              className={`overflow-hidden rounded-xl border border-[#140A05]/12 bg-white shadow-md transition-all duration-300 ${
                viewportMode === "mobile" ? "w-[240px] sm:w-[270px]" : "w-full"
              }`}
            >
              <div
                className={
                  viewportMode === "mobile"
                    ? "relative aspect-[9/14] w-full overflow-hidden"
                    : entry.image
                      ? "relative w-full overflow-hidden"
                      : "relative aspect-[16/9] w-full overflow-hidden"
                }
                style={
                  entry.image
                    ? {
                        aspectRatio:
                          viewportMode === "desktop"
                            ? `${entry.image.width} / ${entry.image.height}`
                            : undefined,
                        background: `linear-gradient(180deg, ${entry.schematic.skyTop} 0%, ${entry.schematic.skyBottom} 100%)`,
                      }
                    : undefined
                }
              >
                {entry.image ? (
                  <Image
                    {...getHeroImageRenderProps(entry.image.src)}
                    alt={entry.image.alt}
                    width={entry.image.width}
                    height={entry.image.height}
                    sizes={
                      viewportMode === "mobile"
                        ? "270px"
                        : "(max-width: 1152px) 100vw, 1080px"
                    }
                    priority
                    className={
                      viewportMode === "mobile"
                        ? "h-full w-full object-contain"
                        : "block h-auto w-full object-contain"
                    }
                  />
                ) : (
                  <HeroSchematicCanvas
                    entry={entry}
                    viewportMode={viewportMode}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Composition Breakdown + Tokens */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-[#140A05]/10 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#1A0E08]">
                Architectural Specification
              </h2>
              <button
                type="button"
                onClick={handleExportSpec}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#140A05]/12 bg-[#FAF8F5] px-3 py-1 text-xs font-medium text-[#1A0E08]/75 transition-colors hover:border-[#140A05]/25 hover:bg-white hover:text-[#1A0E08]"
              >
                <Download className="h-3.5 w-3.5 text-[#C2410C]" />
                <span>Export JSON</span>
              </button>
            </div>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl bg-[#FAF8F5] p-4">
                <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                  Navigation Bar
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#1A0E08]/80">
                  {entry.spec.navStyle}
                </dd>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] p-4">
                <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                  Headline Placement
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#1A0E08]/80">
                  {entry.spec.headlinePlacement}
                </dd>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] p-4">
                <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                  CTA Structure
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#1A0E08]/80">
                  {entry.spec.ctaStructure}
                </dd>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] p-4">
                <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                  Mobile Adaptation
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#1A0E08]/80">
                  {entry.spec.mobileAdaptation}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-6">
            {/* Click-to-copy color palette */}
            <div className="rounded-2xl border border-[#140A05]/10 bg-white p-6">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#1A0E08]">
                Color Palette Tokens
              </h2>
              <div className="mt-4 space-y-2.5">
                {entry.palette.map((token) => {
                  const isCopied = copiedHex === token.hex;
                  return (
                    <button
                      key={token.hex}
                      type="button"
                      onClick={() => handleCopyToken(token)}
                      className="flex w-full items-center justify-between rounded-xl border border-[#140A05]/[0.08] bg-[#FAF8F5] px-3.5 py-2.5 text-left transition-colors hover:border-[#140A05]/20 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-7 w-7 rounded-lg border border-[#140A05]/15"
                          style={{ backgroundColor: token.hex }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-[#1A0E08]">
                            {token.name}
                          </p>
                          <p className="font-mono text-[10px] text-[#1A0E08]/48 uppercase">
                            {token.role}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1A0E08]/75">
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            {token.hex}
                            <Copy className="h-3 w-3 opacity-45" />
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography & tags */}
            <div className="rounded-2xl border border-[#140A05]/10 bg-white p-6">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#1A0E08]">
                Typography Pairing
              </h2>
              <div className="mt-3 space-y-1.5 text-sm text-[#1A0E08]/78">
                <p>
                  <strong className="font-semibold text-[#1A0E08]">
                    Display:
                  </strong>{" "}
                  {entry.typography.displayFont}
                </p>
                <p>
                  <strong className="font-semibold text-[#1A0E08]">
                    Body:
                  </strong>{" "}
                  {entry.typography.bodyFont}
                </p>
                {entry.typography.accentFont && (
                  <p>
                    <strong className="font-semibold text-[#1A0E08]">
                      Mono:
                    </strong>{" "}
                    {entry.typography.accentFont}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#140A05]/[0.07] pt-4">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[#F3EEE7] px-2.5 py-1 font-mono text-[11px] text-[#1A0E08]/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next / Previous navigation */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/designs/${previous.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-[#140A05]/10 bg-white p-5 transition-colors hover:border-[#140A05]/25"
            >
              <div>
                <span className="font-mono text-[10px] text-[#1A0E08]/45 uppercase">
                  ← Previous Concept
                </span>
                <p className="mt-1 text-base font-semibold text-[#1A0E08] group-hover:text-[#C2410C]">
                  {previous.title}
                </p>
              </div>
              <ArrowLeft className="h-4 w-4 text-[#1A0E08]/45" />
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/designs/${next.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-[#140A05]/10 bg-white p-5 text-right transition-colors hover:border-[#140A05]/25"
            >
              <ArrowRight className="h-4 w-4 text-[#1A0E08]/45" />
              <div>
                <span className="font-mono text-[10px] text-[#1A0E08]/45 uppercase">
                  Next Concept →
                </span>
                <p className="mt-1 text-base font-semibold text-[#1A0E08] group-hover:text-[#C2410C]">
                  {next.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

