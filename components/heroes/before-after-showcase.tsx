"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getHeroBySlug, getHeroImageRenderProps } from "@/lib/heroes/catalog";

interface StageInfo {
  id: string;
  step: string;
  label: string;
  chipText: string;
  description: string;
}

const STAGES: StageInfo[] = [
  {
    id: "original",
    step: "01",
    label: "Original design",
    chipText: "BEFORE · MEADOW TERMINAL",
    description:
      "Pale morning mist, centered vintage CRT hardware, a flat dark-ink top bar, and tightly tracked Geist copy pinned to the upper 36% sky band.",
  },
  {
    id: "transition",
    step: "02",
    label: "Transition",
    chipText: "OPTICAL WIPE",
    description:
      "As you scroll, a circular aperture sweeps seamlessly from daylight mist into rich cornflower twilight framed by sunlit cherry blossoms.",
  },
  {
    id: "typography",
    step: "03",
    label: "Typography transformation",
    chipText: "GEIST → INSTRUMENT SERIF",
    description:
      "Voice shifts from tight geometric neo-grotesk (-0.03em) and monospace metadata into high-contrast Instrument Serif with italic emphasis.",
  },
  {
    id: "layout",
    step: "04",
    label: "Layout transformation",
    chipText: "CANOPY + SEARCH POCKET",
    description:
      "A floating cream pill nav tucks beneath the floral arch while centered typography and an interactive directory bar drop into the open sky pocket.",
  },
  {
    id: "final",
    step: "05",
    label: "Final result",
    chipText: "AFTER · SUNLIT CANOPY",
    description:
      "Settled, gallery-ready composition: authentic photography, balanced contrast zones, and focused search controls without visual clutter.",
  },
];

const BEFORE_HERO = getHeroBySlug("meadow-terminal");
const AFTER_HERO = getHeroBySlug("sunlit-canopy");

const BEFORE_IMAGE = getHeroImageRenderProps(
  BEFORE_HERO?.image?.src ?? "/design-references/Remove_text_background_89833fa7_2K.jpg"
);
const AFTER_IMAGE = getHeroImageRenderProps(
  AFTER_HERO?.image?.src ??
    "/design-references/Text_and_boards_removal_d189d6f1_2K-clean.png"
);

const STAGE_PROGRESS_TARGETS = [0.06, 0.3, 0.54, 0.74, 0.96];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}

function easeOutSoft(t: number) {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 1.65);
}

/** Bell curve opacity: fades in over [inStart..inEnd], holds until outStart, fades out over [outStart..outEnd]. */
function windowOpacity(
  p: number,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number
) {
  if (p <= inStart || p >= outEnd) return 0;
  if (p < inEnd) return easeOutCubic((p - inStart) / (inEnd - inStart));
  if (p > outStart) return 1 - easeOutCubic((p - outStart) / (outEnd - outStart));
  return 1;
}

export function BeforeAfterShowcase() {
  const sceneRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Real-DOM animation targets updated inside rAF for silky 60fps scrubbing
  const beforeBadgeRef = useRef<HTMLDivElement>(null);
  const afterBadgeRef = useRef<HTMLDivElement>(null);
  const beforeChromeRef = useRef<HTMLDivElement>(null);
  const wipeLayerRef = useRef<HTMLDivElement>(null);
  const ringHaloRef = useRef<HTMLDivElement>(null);
  const afterNavRef = useRef<HTMLDivElement>(null);
  const afterTypeRef = useRef<HTMLDivElement>(null);
  const afterLayoutRef = useRef<HTMLDivElement>(null);
  const typeBridgeRef = useRef<HTMLDivElement>(null);
  const layoutGuidesRef = useRef<HTMLDivElement>(null);
  const wipeStatusPillRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [reducedStage, setReducedStage] = useState(4);
  const [reducedMotion, setReducedMotion] = useState(false);

  const applyVisuals = useCallback((p: number) => {
    const frameW = frameRef.current?.clientWidth || 760;
    const frameH = frameRef.current?.clientHeight || 440;
    const maxRadius = Math.hypot(frameW * 0.5, frameH * 0.5) * 1.06;

    // Stage 1 -> Stage 2 -> Stage 4 circular reveal from center (50% 50%)
    // Smooth soft-out curve so Stage 2 (p~0.30) showcases a bold half-frame optical aperture
    const wipeT = easeOutSoft((p - 0.14) / 0.5);
    const radiusPx = wipeT * maxRadius;

    if (wipeLayerRef.current) {
      wipeLayerRef.current.style.clipPath =
        wipeT <= 0.001
          ? "circle(0px at 50% 50%)"
          : wipeT >= 0.999
          ? "none"
          : `circle(${radiusPx.toFixed(1)}px at 50% 50%)`;
      wipeLayerRef.current.style.opacity = wipeT <= 0.001 ? "0" : "1";
    }

    // Soft BEFORE UI subtle recession as AFTER dominates
    if (beforeChromeRef.current) {
      const fadeOut = 1 - clamp((p - 0.34) / 0.24, 0, 1);
      beforeChromeRef.current.style.opacity = `${fadeOut}`;
    }

    // Glowing HeroAtlas orange aperture ring tracking the wipe perimeter
    if (ringHaloRef.current) {
      const ringOpacity =
        wipeT > 0.01 && wipeT < 0.96
          ? Math.sin(clamp((wipeT - 0.01) / 0.95, 0, 1) * Math.PI)
          : 0;
      const diameter = Math.max(0, radiusPx * 2);
      ringHaloRef.current.style.width = `${diameter.toFixed(1)}px`;
      ringHaloRef.current.style.height = `${diameter.toFixed(1)}px`;
      ringHaloRef.current.style.opacity = `${ringOpacity.toFixed(3)}`;
    }

    // Header bar BEFORE / AFTER specimen badges crossfade cleanly
    const afterDominance = easeOutCubic((p - 0.36) / 0.2);
    if (beforeBadgeRef.current) {
      beforeBadgeRef.current.style.opacity = `${1 - afterDominance}`;
    }
    if (afterBadgeRef.current) {
      afterBadgeRef.current.style.opacity = `${afterDominance}`;
    }

    // Stage 2 subtle live aperture indicator in header bar
    if (wipeStatusPillRef.current) {
      const wOp = windowOpacity(p, 0.16, 0.24, 0.42, 0.5);
      wipeStatusPillRef.current.style.opacity = `${wOp}`;
    }

    // Stage 3/4 progressive AFTER hero layers
    const navT = easeOutCubic((p - 0.48) / 0.24);
    if (afterNavRef.current) {
      afterNavRef.current.style.opacity = `${navT}`;
      afterNavRef.current.style.transform = `translate3d(0, ${(
        (1 - navT) *
        -12
      ).toFixed(1)}px, 0)`;
    }

    const typeT = easeOutCubic((p - 0.32) / 0.24);
    if (afterTypeRef.current) {
      afterTypeRef.current.style.opacity = `${typeT}`;
      afterTypeRef.current.style.transform = `translate3d(0, ${(
        (1 - typeT) *
        16
      ).toFixed(1)}px, 0)`;
    }

    const layoutT = easeOutCubic((p - 0.58) / 0.2);
    if (afterLayoutRef.current) {
      afterLayoutRef.current.style.opacity = `${layoutT}`;
      afterLayoutRef.current.style.transform = `translate3d(0, ${(
        (1 - layoutT) *
        18
      ).toFixed(1)}px, 0)`;
    }

    // Stage 3 typographic specimen bridge (fades out cleanly before Stage 5)
    if (typeBridgeRef.current) {
      const tbOp = windowOpacity(p, 0.4, 0.48, 0.62, 0.7);
      typeBridgeRef.current.style.opacity = `${tbOp}`;
      typeBridgeRef.current.style.transform = `translate3d(0, ${(
        (1 - tbOp) *
        10
      ).toFixed(1)}px, 0)`;
    }

    // Stage 4 architectural callout guides (fade cleanly out for unobstructed Stage 5 final result)
    if (layoutGuidesRef.current) {
      const lgOp = windowOpacity(p, 0.62, 0.69, 0.8, 0.87);
      layoutGuidesRef.current.style.opacity = `${lgOp}`;
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${clamp(p, 0.04, 1)})`;
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMQ = () => setReducedMotion(mq.matches);
    syncMQ();
    mq.addEventListener("change", syncMQ);
    return () => mq.removeEventListener("change", syncMQ);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      // Respect reduced motion cleanly while keeping selected stage settled immediately
      const rafId = requestAnimationFrame(() => {
        applyVisuals(STAGE_PROGRESS_TARGETS[reducedStage]);
      });
      return () => cancelAnimationFrame(rafId);
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const el = sceneRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalTravel = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = clamp(-rect.top / totalTravel, 0, 1);

      let stage = 0;
      if (p >= 0.82) stage = 4;
      else if (p >= 0.62) stage = 3;
      else if (p >= 0.42) stage = 2;
      else if (p >= 0.2) stage = 1;

      setActiveStage((prev) => (prev === stage ? prev : stage));
      applyVisuals(p);
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [applyVisuals, reducedMotion, reducedStage]);

  const jumpToStage = (idx: number) => {
    const safeIdx = clamp(idx, 0, STAGES.length - 1);
    const targetP = STAGE_PROGRESS_TARGETS[safeIdx];

    if (reducedMotion) {
      setReducedStage(safeIdx);
      applyVisuals(targetP);
      return;
    }

    const el = sceneRef.current;
    if (!el) return;
    const totalTravel = Math.max(1, el.offsetHeight - window.innerHeight);
    const sectionTop = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({
      top: sectionTop + targetP * totalTravel,
      behavior: "smooth",
    });
  };

  const displayStageIndex = reducedMotion ? reducedStage : activeStage;
  const currentStage = STAGES[displayStageIndex];

  return (
    <section
      id="before-after"
      ref={sceneRef}
      aria-labelledby="ba-heading"
      className="relative w-full bg-[#F8F4EE]"
      style={{
        height: reducedMotion ? "auto" : "245vh",
        overflowX: "clip",
      }}
    >
      <div
        className={
          reducedMotion
            ? "mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-10"
            : "sticky top-14 lg:top-16 flex min-h-[calc(100svh-3.5rem)] lg:min-h-[calc(100vh-4rem)] flex-col justify-center mx-auto max-w-[1280px] px-4 py-3 sm:px-6 lg:px-10 lg:py-5"
        }
      >
        <div className="grid items-center gap-4 lg:gap-8 lg:grid-cols-12">
          {/* Left Narrative Rail (Desktop interactive stage list + compact Mobile/Tablet header) */}
          <div className="lg:col-span-4 space-y-2.5 lg:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#140A05]/10 bg-white/85 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#C2410C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B14]" />
                <span>Before &amp; After</span>
              </div>

              <span
                className="font-mono text-[11px] font-medium text-[#6B5A4E] lg:hidden"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                0{displayStageIndex + 1} / 0{STAGES.length}
              </span>
            </div>

            <h2
              id="ba-heading"
              className="text-[1.45rem] leading-[1.08] font-bold tracking-[-0.03em] text-[#1A0E08] sm:text-3xl lg:text-[2.2rem]"
            >
              Real hero canvases, transformed step by step.
            </h2>

            {/* Desktop 5-Stage Narrative Stepper */}
            <div className="hidden lg:block space-y-2 pt-0.5">
              {STAGES.map((stage, idx) => {
                const isActive = idx === displayStageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    aria-current={isActive ? "step" : undefined}
                    className={`w-full text-left rounded-xl px-3.5 py-2 transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? "bg-white border-[#FF5B14]/40 shadow-[0_12px_26px_-14px_rgba(194,65,12,0.28)]"
                        : "bg-transparent border-transparent hover:bg-white/55 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[13px] font-bold tracking-[-0.01em] ${
                          isActive ? "text-[#1A0E08]" : "text-[#4D3B30]"
                        }`}
                      >
                        <span className="mr-1.5 font-mono text-[10px] text-[#C2410C]">
                          {stage.step}
                        </span>
                        {stage.label}
                      </span>
                      {isActive && (
                        <span className="rounded-full bg-[#FFF2E8] px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-wider text-[#C2410C]">
                          {stage.chipText}
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <p className="mt-1 text-[12.5px] leading-[1.45] text-[#5C493D]">
                        {stage.description}
                      </p>
                    )}
                  </button>
                );
              })}

              {/* Direct Reference Links to Both Real Catalog Pages */}
              <div className="flex flex-wrap items-center gap-3 pt-1.5 pl-1 text-[11px] font-medium text-[#6B5A4E]">
                <Link
                  href="/designs/meadow-terminal"
                  className="inline-flex items-center gap-1 hover:text-[#1A0E08] underline underline-offset-4 decoration-[#140A05]/20"
                >
                  <span>Before: Meadow Terminal</span>
                </Link>
                <span aria-hidden="true" className="text-[#140A05]/25">
                  /
                </span>
                <Link
                  href="/designs/sunlit-canopy"
                  className="inline-flex items-center gap-1 text-[#C2410C] hover:text-[#7A2306] underline underline-offset-4 decoration-[#FF5B14]/40"
                >
                  <span>After: Sunlit Canopy →</span>
                </Link>
              </div>
            </div>

            {/* Mobile & Tablet Active Stage Card + Quick Stage Dots */}
            <div className="lg:hidden rounded-xl border border-[#140A05]/10 bg-white/90 px-3.5 py-2.5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1A0E08]">
                  <span className="mr-1.5 font-mono text-[10px] text-[#C2410C]">
                    {currentStage.step}
                  </span>
                  {currentStage.label}
                </span>
                <span className="rounded-full bg-[#FFF2E8] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#C2410C]">
                  {currentStage.chipText}
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-snug text-[#5C493D]">
                {currentStage.description}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                {STAGES.map((stage, idx) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    aria-label={`Jump to stage ${idx + 1}: ${stage.label}`}
                    className={`h-1.5 flex-1 rounded-full transition-colors cursor-pointer ${
                      idx <= displayStageIndex ? "bg-[#FF5B14]" : "bg-[#140A05]/12"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Pinned Showcase Frame */}
          <div className="lg:col-span-8">
            {/* Clean Specimen Frame Header Strip (Zero Overlap Across 390px–1440px) */}
            <div className="mb-2 flex items-center justify-between gap-2 px-0.5">
              <div className="relative h-6 flex items-center">
                <div
                  ref={beforeBadgeRef}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#140A05]/15 bg-[#F7EFE1] px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-bold tracking-[0.11em] uppercase text-[#1A1E1B] shadow-xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1A1E1B]/65" />
                  <span>Before · Meadow Terminal</span>
                </div>
                <div
                  ref={afterBadgeRef}
                  className="absolute top-0 left-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#FF5B14]/30 bg-[#140A05] px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-bold tracking-[0.11em] uppercase text-[#FFFBF7] shadow-xs"
                  style={{ opacity: 0 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B14]" />
                  <span>After · Sunlit Canopy</span>
                </div>
              </div>

              <div className="relative flex items-center gap-2 shrink-0">
                <div
                  ref={wipeStatusPillRef}
                  aria-hidden="true"
                  className="whitespace-nowrap rounded-full border border-[#FF5B14]/40 bg-[#FFF2E8] px-2.5 py-0.5 font-mono text-[9px] sm:text-[9.5px] font-semibold tracking-wider uppercase text-[#C2410C]"
                  style={{ opacity: 0 }}
                >
                  Optical Wipe
                </div>
                <span className="hidden sm:inline-block font-mono text-[10px] text-[#7A6659]">
                  2752 × 1536 · 16:9
                </span>
              </div>
            </div>

            <div
              ref={frameRef}
              className="relative w-full aspect-[6/5] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#140A05]/12 bg-[#DCE6EC] shadow-[0_28px_72px_-26px_rgba(20,10,5,0.28)] select-none"
            >
              {/* ======================================================= */}
              {/* LAYER 1: BEFORE — Meadow Terminal (Real Imported Asset) */}
              {/* ======================================================= */}
              <div className="absolute inset-0">
                <Image
                  src={BEFORE_IMAGE.src}
                  unoptimized={BEFORE_IMAGE.unoptimized}
                  alt={
                    BEFORE_HERO?.image?.alt ??
                    "Meadow Terminal: vintage glowing beige CRT monitor atop a grassy hill in morning mist"
                  }
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 840px"
                  className="object-cover object-[50%_52%]"
                />
                {/* Soft mist top readability gradient — keeps hill & glowing CRT 100% pure */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[44%] bg-gradient-to-b from-[#DCE6EC]/68 via-[#E7EFF3]/35 to-transparent"
                />

                {/* BEFORE Hero UI Chrome (Meadow Terminal Design System) */}
                <div
                  ref={beforeChromeRef}
                  className="pointer-events-none absolute inset-0 flex flex-col items-center px-3 pt-2.5 sm:px-7 sm:pt-3.5"
                  style={{
                    fontFamily:
                      "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
                    fontVariationSettings: "normal",
                  }}
                >
                  {/* Minimal Dark-Ink Top Nav across pale sky */}
                  <div className="flex w-full max-w-[94%] items-center justify-between text-[#1A1E1B]">
                    <span className="text-[11px] sm:text-[13px] font-semibold tracking-[-0.02em]">
                      meadow.dev
                    </span>
                    <div className="hidden sm:flex items-center gap-5 text-[11px] font-medium text-[#1A1E1B]/72">
                      <span>Archive</span>
                      <span>Submit</span>
                      <span>About</span>
                    </div>
                    <span
                      className="rounded-sm border border-[#1A1E1B]/35 bg-[#F7EFE1]/80 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[8.5px] sm:text-[10px] font-medium text-[#1A1E1B]"
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), ui-monospace, monospace",
                      }}
                    >
                      Get Weekly Drops
                    </span>
                  </div>

                  {/* Upper 36% Sky Stack: Compact above CRT bezel so hardware stays 100% clear */}
                  <div className="mt-1 sm:mt-2 flex max-w-[260px] sm:max-w-[430px] lg:max-w-[490px] flex-col items-center text-center">
                    <p className="text-[13.5px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1A1E1B]">
                      Every great website begins with one honest screen.
                    </p>
                    <p className="hidden sm:block mt-1 text-[10.5px] lg:text-[11.5px] leading-snug text-[#2E3631]">
                      Centered Geist neo-grotesk hierarchy over uncluttered morning sky.
                    </p>
                    <span className="mt-1.5 sm:mt-2 inline-flex items-center rounded-full bg-[#1A1E1B] px-3 py-0.5 sm:px-3.5 sm:py-1 text-[8.5px] sm:text-[10.5px] font-semibold tracking-[-0.01em] text-[#F7EFE1] shadow-sm">
                      Browse the Collection
                    </span>
                  </div>
                </div>
              </div>

              {/* ===================================================== */}
              {/* LAYER 2: AFTER — Sunlit Canopy (Circular Wipe Layer)  */}
              {/* ===================================================== */}
              <div
                ref={wipeLayerRef}
                className="absolute inset-0 bg-[#44679B]"
                style={{
                  clipPath: "circle(0px at 50% 50%)",
                  opacity: 0,
                  willChange: "clip-path, opacity",
                }}
              >
                <Image
                  src={AFTER_IMAGE.src}
                  unoptimized={AFTER_IMAGE.unoptimized}
                  alt={
                    AFTER_HERO?.image?.alt ??
                    "Sunlit Canopy: cherry blossom branches arching over a serene cornflower blue sky"
                  }
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 840px"
                  className="object-cover object-[50%_35%]"
                />
                {/* Soft atmospheric depth wash only inside the lower open sky for razor-sharp serif legibility */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#2F4F83]/18 to-[#223B68]/45"
                />

                {/* Stage 4 Spatial Callout Guides (fade in at Stage 4, fade out cleanly by Stage 5) */}
                <div
                  ref={layoutGuidesRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ opacity: 0 }}
                >
                  <div className="absolute inset-x-4 sm:inset-x-8 top-[8%] h-[22%] rounded-xl border border-dashed border-[#FFE4E1]/55 bg-[#231F1D]/15 flex items-start justify-end p-1.5 sm:p-2">
                    <span className="rounded bg-[#231F1D]/75 px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] font-medium tracking-wider uppercase text-[#FFE4E1]">
                      Floral Arch Clearance
                    </span>
                  </div>
                  <div className="absolute inset-x-4 sm:inset-x-10 top-[39%] bottom-[8%] rounded-2xl border border-dashed border-white/45 bg-white/[0.04] flex items-end justify-end p-1.5 sm:p-2">
                    <span className="rounded bg-[#14223B]/80 px-1.5 py-0.5 font-mono text-[8px] sm:text-[9px] font-medium tracking-wider uppercase text-white">
                      Proscenium Copy Pocket (42%–88%)
                    </span>
                  </div>
                </div>

                {/* AFTER Floating Cream Pill Navigation Bar nestled below canopy branches */}
                <div
                  ref={afterNavRef}
                  className="pointer-events-none absolute inset-x-3 sm:inset-x-6 top-[16%] sm:top-[19%] flex justify-center"
                  style={{ opacity: 0 }}
                >
                  <div className="flex w-full max-w-[90%] sm:max-w-[78%] items-center justify-between rounded-full border border-[#231F1D]/12 bg-[#FFFBF7]/95 px-2.5 py-1 sm:px-4 sm:py-1.5 shadow-[0_12px_28px_-10px_rgba(20,10,5,0.34)] backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#FF7E82]" />
                      <span
                        className="text-[11px] sm:text-[14px] font-normal text-[#231F1D]"
                        style={{
                          fontFamily: '"Instrument Serif", Georgia, serif',
                          fontVariationSettings: "normal",
                        }}
                      >
                        Sunlit
                      </span>
                    </div>
                    <div
                      className="hidden sm:flex items-center gap-4 text-[10.5px] font-medium text-[#52433B]"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), ui-sans-serif, sans-serif",
                        fontVariationSettings: "normal",
                      }}
                    >
                      <span>SaaS</span>
                      <span>Editorial</span>
                      <span>Minimal</span>
                      <span>Creative</span>
                    </div>
                    <span className="rounded-full bg-[#231F1D] px-2.5 py-0.5 text-[8.5px] sm:text-[10px] font-semibold text-[#FFFBF7]">
                      Save
                    </span>
                  </div>
                </div>

                {/* AFTER Proscenium Content in Lower-Center Blue Sky Pocket */}
                <div className="pointer-events-none absolute inset-x-3 sm:inset-x-8 top-[43%] bottom-[6%] flex flex-col items-center justify-center text-center">
                  {/* Typography Transformation Layer */}
                  <div
                    ref={afterTypeRef}
                    className="flex max-w-[260px] sm:max-w-[390px] lg:max-w-[440px] flex-col items-center"
                    style={{ opacity: 0 }}
                  >
                    <p
                      className="text-[18.5px] sm:text-[29px] lg:text-[36px] font-normal leading-[1.04] tracking-[-0.02em] text-white drop-shadow-[0_2px_18px_rgba(12,24,52,0.38)]"
                      style={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontVariationSettings: "normal",
                      }}
                    >
                      Curated first impressions for{" "}
                      <em className="italic font-normal text-[#FFDCDC]">
                        thoughtful
                      </em>{" "}
                      websites.
                    </p>
                    <p
                      className="hidden sm:block mt-1.5 max-w-[380px] text-[11.5px] lg:text-[12.5px] leading-snug text-[#EEF4FF]/92"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), ui-sans-serif, sans-serif",
                        fontVariationSettings: "normal",
                      }}
                    >
                      Editorial serif warmth anchored inside clear atmospheric daylight.
                    </p>
                  </div>

                  {/* Layout Transformation Layer: Interactive Search Bar + Mood Chips */}
                  <div
                    ref={afterLayoutRef}
                    className="mt-2.5 sm:mt-4 flex w-full max-w-[265px] sm:max-w-[400px] lg:max-w-[440px] flex-col items-center gap-1.5 sm:gap-2.5"
                    style={{
                      opacity: 0,
                      fontFamily:
                        "var(--font-geist-sans), ui-sans-serif, sans-serif",
                      fontVariationSettings: "normal",
                    }}
                  >
                    <div className="flex w-full items-center justify-between gap-2 rounded-full border border-white/60 bg-[#FFFBF7]/96 pl-3 pr-1 py-1 sm:pl-4 sm:pr-1.5 sm:py-1.5 shadow-[0_16px_38px_-12px_rgba(10,18,40,0.48)]">
                      <span className="truncate text-[9.5px] sm:text-[11.5px] text-[#6B5A4E]">
                        Search by style, palette, or layout...
                      </span>
                      <span className="shrink-0 rounded-full bg-[#FF5B14] px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold text-white">
                        Explore
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
                      {["SaaS", "Editorial", "Botanical", "Centered"].map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/25 bg-white/14 px-2 py-0.5 text-[8px] sm:text-[9.5px] font-medium text-white backdrop-blur-sm"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ===================================================== */}
              {/* Glowing Circular Wipe Ring (Stage 2–3 optical bridge) */}
              {/* ===================================================== */}
              <div
                ref={ringHaloRef}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  opacity: 0,
                  border: "2.5px solid rgba(255, 91, 20, 0.9)",
                  boxShadow:
                    "0 0 28px rgba(255, 91, 20, 0.42), inset 0 0 18px rgba(255, 201, 163, 0.25)",
                }}
              />

              {/* Stage 3 Typographic Contrast Specimen Strip */}
              <div
                ref={typeBridgeRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-2.5 sm:inset-x-5 bottom-2.5 sm:bottom-4 z-10 rounded-xl border border-white/15 bg-[#140A05]/86 px-3 py-2 sm:px-4 sm:py-2.5 text-[#F8F4EE] backdrop-blur-md shadow-lg"
                style={{ opacity: 0 }}
              >
                <div className="grid grid-cols-11 items-center gap-2 text-left">
                  <div className="col-span-5">
                    <span className="block font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#FFC9A3]">
                      Before · Geist 600 (-0.03em)
                    </span>
                    <span
                      className="block truncate text-[11.5px] sm:text-[14px] font-semibold tracking-[-0.03em] text-white/85"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), ui-sans-serif, sans-serif",
                        fontVariationSettings: "normal",
                      }}
                    >
                      One honest screen.
                    </span>
                  </div>
                  <div className="col-span-1 text-center font-mono text-xs text-[#FF5B14]">
                    →
                  </div>
                  <div className="col-span-5">
                    <span className="block font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#FF7A2E]">
                      After · Instrument Serif
                    </span>
                    <span
                      className="block truncate text-[13px] sm:text-[16px] font-normal tracking-[-0.02em] text-white"
                      style={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontVariationSettings: "normal",
                      }}
                    >
                      For <em className="italic text-[#FFDCDC]">thoughtful</em> websites.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slim Scrubber Progress Track below canvas */}
            <div className="mt-3 flex items-center gap-3 px-0.5">
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#140A05]/10">
                <div
                  ref={progressBarRef}
                  className="h-full w-full origin-left rounded-full bg-[#FF5B14]"
                  style={{ transform: "scaleX(0.04)" }}
                />
              </div>
              <span
                className="font-mono text-[10.5px] font-medium tracking-wider uppercase text-[#7A6659]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {currentStage.step} · {currentStage.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
