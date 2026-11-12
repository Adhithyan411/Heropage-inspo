"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Copy, Monitor, Smartphone } from "lucide-react";
import { getHeroImageRenderProps } from "@/lib/heroes/catalog";
import { HERO_CATEGORY_MAP } from "@/lib/heroes/categories";
import { copyDesignUrl } from "@/lib/heroes/notifications";
import type { HeroDesignEntry } from "@/lib/heroes/types";
import { HeroSchematicCanvas } from "./hero-schematic-canvas";

interface HeroStagePreviewProps {
  concepts: HeroDesignEntry[];
}

/**
 * Interactive browser-framed hero preview stage inspired by TasteSkill's .work-scene.
 * Features a 3D perspective arrival tilt that settles flat smoothly as the user scrolls,
 * plus segmented tab switching across placeholder concept schemas.
 */
export function HeroStagePreview({ concepts }: HeroStagePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let rafId = 0;
    const updatePerspective = () => {
      rafId = 0;
      const y = window.scrollY;
      // Smoothly flatten perspective tilt over the first 280px of scroll
      const progress = Math.min(1, Math.max(0, y / 280));
      const tilt = (1 - progress) * 4;
      const scale = 0.965 + progress * 0.035;
      el.style.transform = `rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(updatePerspective);
    };

    updatePerspective();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const active = concepts[activeIndex] ?? concepts[0];
  if (!active) return null;

  const category = HERO_CATEGORY_MAP[active.category];

  return (
    <div id="hero-preview" className="mx-auto mt-7 max-w-5xl">
      {/* Segmented frosted tab strip sitting above the browser frame */}
      <div
        className="hero-rise-enter mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border border-white/45 bg-white/55 p-1 shadow-[0_8px_24px_-12px_rgba(120,40,5,0.28),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md"
        style={{ animationDelay: "220ms" }}
      >
        {concepts.map((concept, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={concept.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium tracking-[-0.01em] transition-all sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1A0E08] shadow-[0_1px_3px_rgba(20,10,5,0.14)]"
                  : "text-[#1A0E08]/68 hover:text-[#1A0E08]"
              }`}
            >
              <span className="mr-1.5 font-mono text-[10px] opacity-55">
                {String(concept.slotNumber).padStart(2, "0")}
              </span>
              {concept.title}
            </button>
          );
        })}
      </div>

      {/* Perspective-tilted glass browser shell */}
      <div
        className="mt-4 [perspective:1250px] [perspective-origin:50%_0]"
      >
        <div
          ref={frameRef}
          className="hero-frame-arrive rounded-[26px] border border-white/55 bg-white/68 p-1.5 shadow-[0_1px_2px_rgba(20,10,5,0.06),0_40px_90px_-38px_rgba(120,40,5,0.45)] backdrop-blur-md transition-transform duration-150 ease-out sm:p-2"
        >
          <div className="overflow-hidden rounded-[20px] border border-[#140A05]/[0.07] bg-white">
            {/* Browser chrome & viewport switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#140A05]/[0.07] bg-[#FAF8F5] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#140A05]/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#140A05]/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#140A05]/15" />
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await copyDesignUrl(active);
                    if (ok) {
                      setCopiedUrl(true);
                      setTimeout(() => setCopiedUrl(false), 1600);
                    }
                  }}
                  aria-label={`Copy URL for ${active.title}`}
                  title="Copy concept URL"
                  className="ml-2 inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-mono text-[11px] text-[#1A0E08]/55 transition-colors hover:bg-[#140A05]/[0.05] hover:text-[#1A0E08]"
                >
                  <span>heroatlas.library/designs/{active.slug}</span>
                  {copiedUrl ? (
                    <Check className="h-3 w-3 text-[#2F6B3B]" />
                  ) : (
                    <Copy className="h-3 w-3 opacity-50" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden rounded-full border border-[#FF5B14]/25 bg-[#FF5B14]/8 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#C2410C] sm:inline-flex">
                  {active.image
                    ? `Reference Canvas · Slot ${String(active.slotNumber).padStart(2, "0")}`
                    : `Placeholder Schema · Slot ${String(active.slotNumber).padStart(2, "0")}`}
                </span>

                <div
                  role="group"
                  aria-label="Preview viewport toggle"
                  className="inline-flex rounded-full border border-[#140A05]/10 bg-[#F3EEE7] p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setViewportMode("desktop")}
                    aria-pressed={viewportMode === "desktop"}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      viewportMode === "desktop"
                        ? "bg-white text-[#1A0E08] shadow-xs"
                        : "text-[#1A0E08]/55 hover:text-[#1A0E08]"
                    }`}
                  >
                    <Monitor className="h-3 w-3" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportMode("mobile")}
                    aria-pressed={viewportMode === "mobile"}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      viewportMode === "mobile"
                        ? "bg-white text-[#1A0E08] shadow-xs"
                        : "text-[#1A0E08]/55 hover:text-[#1A0E08]"
                    }`}
                  >
                    <Smartphone className="h-3 w-3" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stage + Spec Panel */}
            <div className="grid lg:grid-cols-[1.55fr_1fr]">
              <div className="flex items-center justify-center bg-[#F3EEE7]/75 p-4 sm:p-6">
                <div
                  className={`overflow-hidden rounded-xl border border-[#140A05]/12 bg-white shadow-md transition-all duration-300 ${
                    viewportMode === "mobile"
                      ? "w-[210px] sm:w-[232px]"
                      : "w-full"
                  }`}
                >
                  <div
                    className={
                      viewportMode === "mobile"
                        ? "relative aspect-[9/14] w-full overflow-hidden"
                        : active.image
                          ? "relative w-full overflow-hidden"
                          : "relative aspect-[16/9] w-full overflow-hidden"
                    }
                    style={
                      active.image
                        ? {
                            aspectRatio:
                              viewportMode === "desktop"
                                ? `${active.image.width} / ${active.image.height}`
                                : undefined,
                            background: `linear-gradient(180deg, ${active.schematic.skyTop} 0%, ${active.schematic.skyBottom} 100%)`,
                          }
                        : undefined
                    }
                  >
                    {active.image ? (
                      <Image
                        {...getHeroImageRenderProps(active.image.src)}
                        alt={active.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 62vw"
                        priority
                        className={
                          viewportMode === "mobile"
                            ? "object-contain"
                            : "object-cover"
                        }
                        style={{
                          objectPosition:
                            active.image.objectPosition ?? "50% 50%",
                        }}
                      />
                    ) : (
                      <HeroSchematicCanvas
                        entry={active}
                        viewportMode={viewportMode}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between border-t border-[#140A05]/[0.07] bg-white p-5 text-left lg:border-t-0 lg:border-l">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-medium tracking-wide text-[#C2410C] uppercase">
                      {category.shortLabel} · {active.mood}
                    </span>
                    <span className="rounded-md bg-[#F3EEE7] px-2 py-0.5 font-mono text-[10px] text-[#1A0E08]/70">
                      {active.layoutPattern}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-2xl font-semibold tracking-[-0.03em] text-[#1A0E08]">
                    {active.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1A0E08]/65">
                    {active.summary}
                  </p>

                  <dl className="mt-4 space-y-2.5 border-t border-[#140A05]/[0.07] pt-4 text-xs">
                    <div>
                      <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                        Navigation Pattern
                      </dt>
                      <dd className="mt-0.5 text-[#1A0E08]/80">
                        {active.spec.navStyle}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                        Typography Pairing
                      </dt>
                      <dd className="mt-0.5 text-[#1A0E08]/80">
                        {active.typography.displayFont} +{" "}
                        {active.typography.bodyFont}
                        {active.typography.accentFont
                          ? ` + ${active.typography.accentFont}`
                          : ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                        CTA Placement
                      </dt>
                      <dd className="mt-0.5 text-[#1A0E08]/80">
                        {active.spec.ctaStructure}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 space-y-3 border-t border-[#140A05]/[0.07] pt-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wider text-[#1A0E08]/45 uppercase">
                      {active.image ? "Color Palette" : "Planned Palette"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {active.palette.map((token) => (
                        <span
                          key={token.hex}
                          title={`${token.name} (${token.hex})`}
                          className="h-4 w-4 rounded-full border border-[#140A05]/15"
                          style={{ backgroundColor: token.hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/designs/${active.slug}`}
                    className="inline-flex w-full items-center justify-between rounded-xl border border-[#140A05]/10 bg-[#FAF8F5] px-3.5 py-2 text-xs font-semibold text-[#1A0E08] transition-colors hover:border-[#140A05]/25 hover:bg-[#F3EEE7]"
                  >
                    <span>Inspect Full Concept Spec</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#FF5B14]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
