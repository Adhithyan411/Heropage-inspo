"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_CATALOG } from "@/lib/heroes/catalog";
import { HERO_CATEGORY_MAP } from "@/lib/heroes/categories";

const STEP_DEG = 14.5;
const MAX_TURN_DEG = (HERO_CATALOG.length - 1) * STEP_DEG;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Pinned 3D cylindrical scroll drum showcasing HeroAtlas's 10 planned hero directions.
 * Adapted from the workspace's existing ScrollDrumShowcase math (zero per-frame React
 * state updates; CSS variables updated inside requestAnimationFrame).
 */
export function HeroDirectionsDrum() {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drumLayerRef = useRef<HTMLDivElement>(null);
  const focalLayerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ruleTopRef = useRef<HTMLDivElement>(null);
  const ruleBottomRef = useRef<HTMLDivElement>(null);
  const mutedItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const focalItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastActiveRef = useRef<number>(0);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const stageEl = stageRef.current;
    if (!sceneEl || !stageEl) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    function updateMetrics() {
      if (!sceneEl) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const fs = clamp(vw * 0.052, 24, 68);
      const bandH = Math.round(fs * 1.56);
      const radius = clamp(
        Math.round(fs * 5.2),
        190,
        Math.min(400, Math.round(vh * 0.44)),
      );
      const persp = Math.round(radius * 2.55);
      const gutter = vw < 640 ? 20 : vw < 1024 ? 44 : 88;
      const halfBand = Math.round(bandH / 2);

      sceneEl.style.setProperty("--drum-fs", `${fs.toFixed(1)}px`);
      sceneEl.style.setProperty("--drum-band-h", `${bandH}px`);
      sceneEl.style.setProperty("--drum-half-band", `${halfBand}px`);
      sceneEl.style.setProperty("--drum-r", `${radius}px`);
      sceneEl.style.setProperty("--drum-persp", `${persp}px`);
      sceneEl.style.setProperty("--drum-step", `${STEP_DEG}deg`);
      sceneEl.style.setProperty("--drum-gutter", `${gutter}px`);
    }

    function applyFrame() {
      rafId = 0;
      if (!sceneEl || !stageEl) return;

      if (motionQuery.matches) {
        stageEl.style.setProperty("--drum-turn", "0deg");
        return;
      }

      const rect = sceneEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const totalTravel = Math.max(1, sceneEl.offsetHeight - vh);

      const enterT = clamp(1 - rect.top / Math.max(1, vh * 0.72), 0, 1);
      const ruleScale = 0.25 + 0.75 * smoothstep(0, 1, enterT);
      if (ruleTopRef.current) {
        ruleTopRef.current.style.transform = `scale(${ruleScale.toFixed(4)}, 1)`;
      }
      if (ruleBottomRef.current) {
        ruleBottomRef.current.style.transform = `scale(${ruleScale.toFixed(4)}, 1)`;
      }

      const p = clamp(-rect.top / totalTravel, 0, 1);

      // Phase 1: lift & fade intro header
      const headHide = smoothstep(0.01, 0.11, p);
      if (headRef.current) {
        const yOffset = -56 * headHide;
        const opacity = 1 - headHide;
        headRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
        headRef.current.style.opacity = opacity.toFixed(4);
        headRef.current.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
      }

      // Phase 2: cylindrical rotation across the 10 hero directions
      const turnLinear = clamp((p - 0.04) / 0.8, 0, 1);
      const turnEased =
        turnLinear < 0.08
          ? smoothstep(0, 0.08, turnLinear) * 0.08
          : turnLinear > 0.92
            ? 0.92 + smoothstep(0.92, 1, turnLinear) * 0.08
            : turnLinear;

      const turnDeg = turnEased * MAX_TURN_DEG;
      stageEl.style.setProperty("--drum-turn", `${turnDeg.toFixed(3)}deg`);

      const currentFloatIdx = turnDeg / STEP_DEG;
      const nearestIdx = clamp(
        Math.round(currentFloatIdx),
        0,
        HERO_CATALOG.length - 1,
      );

      for (let i = 0; i < HERO_CATALOG.length; i++) {
        const deltaDeg = Math.abs(i * STEP_DEG - turnDeg);
        const rawVis = clamp(1 - deltaDeg / 62, 0, 1);
        const mutedOpacity = rawVis * rawVis * 0.42;

        const mutedEl = mutedItemRefs.current[i];
        if (mutedEl) mutedEl.style.opacity = mutedOpacity.toFixed(3);

        const focalEl = focalItemRefs.current[i];
        if (focalEl) {
          focalEl.style.opacity = deltaDeg < STEP_DEG * 1.4 ? "1" : "0";
        }
      }

      // Phase 3: fade drum & bottom caption out smoothly before closing release block
      const metaFadeOut = smoothstep(0.79, 0.86, p);
      const drumFadeOut = 1 - metaFadeOut;
      if (drumLayerRef.current) {
        drumLayerRef.current.style.opacity = drumFadeOut.toFixed(4);
      }
      if (focalLayerRef.current) {
        focalLayerRef.current.style.opacity = drumFadeOut.toFixed(4);
      }
      if (metaRef.current) {
        const metaOpacity = (1 - metaFadeOut) * smoothstep(0.15, 0.9, enterT);
        metaRef.current.style.opacity = metaOpacity.toFixed(4);
      }

      // Phase 4: closing statement & CTA rise smoothly once drum has cleared
      const closeIn = smoothstep(0.84, 0.93, p);
      if (closeRef.current) {
        const yClose = (1 - closeIn) * 28;
        const scaleClose = 0.96 + 0.04 * closeIn;
        closeRef.current.style.opacity = closeIn.toFixed(4);
        closeRef.current.style.transform = `translate3d(0, ${yClose.toFixed(2)}px, 0) scale(${scaleClose.toFixed(4)})`;
        closeRef.current.style.pointerEvents = closeIn > 0.4 ? "auto" : "none";
      }

      if (nearestIdx !== lastActiveRef.current) {
        lastActiveRef.current = nearestIdx;
        setActiveIndex(nearestIdx);
      }
    }

    function scheduleFrame() {
      if (!rafId) rafId = requestAnimationFrame(applyFrame);
    }

    updateMetrics();
    applyFrame();

    const onResize = () => {
      updateMetrics();
      scheduleFrame();
    };

    window.addEventListener("scroll", scheduleFrame, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const currentItem = HERO_CATALOG[activeIndex] ?? HERO_CATALOG[0];
  const currentCategory = HERO_CATEGORY_MAP[currentItem.category];
  const closingFeatured = HERO_CATALOG.slice(0, 3);

  return (
    <section
      id="directions"
      ref={sceneRef}
      aria-label="Ten Hero Directions"
      className="relative w-full bg-[#F8F4EE]"
      style={{
        height: "245vh",
        overflowX: "clip",
      }}
    >
      <style>{`
        .ha-drum-stage {
          perspective: var(--drum-persp, 900px);
        }
        .ha-drum-rotor {
          transform-style: preserve-3d;
          transform: rotateX(var(--drum-turn, 0deg));
          will-change: transform;
        }
        .ha-drum-item {
          position: absolute;
          left: 50%;
          top: 50%;
          height: var(--drum-band-h, 80px);
          margin-top: calc(var(--drum-band-h, 80px) * -0.5);
          padding-inline: 16px;
          transform: translateX(-50%)
            rotateX(calc(var(--idx) * var(--drum-step, 14.5deg) * -1))
            translateZ(var(--drum-r, 300px));
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .ha-drum-band-clip {
          clip-path: inset(
            calc(50% - var(--drum-half-band, 40px)) 0
            calc(50% - var(--drum-half-band, 40px)) 0
          );
          -webkit-clip-path: inset(
            calc(50% - var(--drum-half-band, 40px)) 0
            calc(50% - var(--drum-half-band, 40px)) 0
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .ha-drum-scene-reduced {
            height: auto !important;
          }
          .ha-drum-rotor {
            transform: none !important;
          }
        }
      `}</style>

      <div
        ref={stageRef}
        className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden px-4 py-6 sm:px-8 sm:py-8"
      >
        {/* Top intro header that lifts out once drum turns */}
        <div
          ref={headRef}
          className="relative z-20 mx-auto max-w-2xl pt-4 text-center sm:pt-6"
        >
          <p className="inline-flex items-center gap-1.5 font-mono text-[12px] font-medium tracking-[0.04em] text-[#C2410C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B14]" />
            The library directions
          </p>
          <h2 className="font-display mt-2 text-[clamp(30px,3.8vw,44px)] font-semibold tracking-[-0.035em] text-[#1A0E08] leading-[1.08]">
            Ten directions. Built for craft.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#1A0E08]/62 sm:text-base">
            Instead of the same generic hero template every builder ships,
            HeroAtlas indexes ten distinct visual worlds with real typographic
            and layout intent.
          </p>
        </div>

        {/* 3D Cylindrical Drum Stage */}
        <div
          ref={drumLayerRef}
          className="ha-drum-stage pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* Focal horizontal band frame rules */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2"
            style={{ height: "var(--drum-band-h, 80px)" }}
          >
            <div
              ref={ruleTopRef}
              className="mx-auto h-px w-[min(92vw,960px)] bg-[#140A05]/10"
              style={{ transformOrigin: "50% 50%" }}
            />
            <div
              ref={ruleBottomRef}
              className="mx-auto h-px w-[min(92vw,960px)] bg-[#140A05]/10"
              style={{
                marginTop: "calc(var(--drum-band-h, 80px) - 2px)",
                transformOrigin: "50% 50%",
              }}
            />
          </div>

          {/* Muted background cylinder */}
          <ul
            aria-hidden="true"
            className="ha-drum-rotor relative h-full w-full list-none p-0"
          >
            {HERO_CATALOG.map((item, idx) => (
              <li
                key={`muted-${item.id}`}
                ref={(el) => {
                  mutedItemRefs.current[idx] = el;
                }}
                className="ha-drum-item font-semibold tracking-[-0.038em] text-[#1A0E08]"
                style={
                  {
                    "--idx": idx,
                    fontSize: "var(--drum-fs, 52px)",
                    opacity: idx === 0 ? 0.42 : 0.15,
                  } as React.CSSProperties
                }
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Highlighted focal band clipped outside perspective/preserve-3d so 3D scale matches */}
        <div
          ref={focalLayerRef}
          aria-hidden="true"
          className="ha-drum-band-clip pointer-events-none absolute inset-0"
        >
          <div className="ha-drum-stage flex h-full w-full items-center justify-center">
            <ul className="ha-drum-rotor relative h-full w-full list-none p-0">
              {HERO_CATALOG.map((item, idx) => (
                <li
                  key={`focal-${item.id}`}
                  ref={(el) => {
                    focalItemRefs.current[idx] = el;
                  }}
                  className="ha-drum-item font-semibold tracking-[-0.038em] text-[#FF5B14]"
                  style={
                    {
                      "--idx": idx,
                      fontSize: "var(--drum-fs, 52px)",
                      opacity: idx === 0 ? 1 : 0,
                    } as React.CSSProperties
                  }
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing rise statement + CTA before release */}
        <div
          ref={closeRef}
          className="pointer-events-none relative z-20 mx-auto my-auto flex max-w-3xl flex-col items-center text-center opacity-0"
        >
          <p className="text-2xl font-semibold tracking-[-0.035em] text-[#1A0E08] sm:text-4xl">
            Pick the hero architecture that fits.
          </p>
          <div className="mt-5 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {closingFeatured.map((card) => (
              <Link
                key={card.id}
                href={`/designs/${card.slug}`}
                className="rounded-2xl border border-[#140A05]/10 bg-white/90 px-4 py-3.5 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#FF5B14]/40 hover:shadow-md"
              >
                <span className="font-mono text-[10px] font-medium text-[#C2410C]">
                  SLOT {String(card.slotNumber).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-semibold text-[#1A0E08]">
                  {card.title}
                </p>
                <p className="mt-0.5 text-xs text-[#1A0E08]/60">
                  {card.typography.displayFont}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/designs"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#140A05] px-5 py-2.5 text-sm font-semibold text-[#FFF6EF] shadow-sm transition-colors hover:bg-[#2A1309]"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bottom live counter & active direction detail */}
        <div
          ref={metaRef}
          className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between text-sm font-medium"
        >
          <span className="font-mono text-xs tabular-nums text-[#1A0E08]/65">
            <strong className="font-semibold text-[#FF5B14]">
              {String(activeIndex + 1).padStart(2, "0")}
            </strong>{" "}
            of {HERO_CATALOG.length}
          </span>
          <span className="max-w-[65%] truncate text-right text-xs text-[#1A0E08]/75 sm:text-sm">
            {currentCategory.shortLabel} · {currentItem.tagline}
          </span>
        </div>
      </div>
    </section>
  );
}