"use client";

import { useEffect, useRef } from "react";

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * TasteSkill-inspired solar light-flood & nightfall transition leading seamlessly
 * into the dark espresso footer (#140A05).
 *
 * Scroll choreography:
 *   Entry (rect.top > 0): Soft warm solar orb rises from the bottom edge beneath
 *     dark "Stop guessing," over cream (#F8F4EE), while "start designing." waits diffused.
 *   Phase 1 (p: 0.00 -> 0.48): Blurred peach/orange sun expands and rises to center,
 *     flooding the canvas with warm #E8500E heat as "start designing." sharpens crisp white.
 *   Phase 2 (p: 0.52 -> 0.70): "Stop guessing," blurs softly, scales back, and recedes.
 *   Phase 3 (p: 0.58 -> 0.96): Feathered #140A05 nightfall sweeps downward while the
 *     solar orb sinks back into the lower horizon, leaving crisp white "start designing."
 *     drifting upward seamlessly into SiteFooter.
 */
export function LightFloodTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const coreGroundRef = useRef<HTMLDivElement>(null);
  const nightGroundRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const nightCanopyRef = useRef<HTMLDivElement>(null);
  const leadTextRef = useRef<HTMLSpanElement>(null);
  const keyTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const applyFrame = () => {
      rafId = 0;
      if (!sceneEl) return;

      if (motionQuery.matches) {
        if (coreGroundRef.current) coreGroundRef.current.style.opacity = "0";
        if (nightGroundRef.current) nightGroundRef.current.style.opacity = "1";
        if (sunRef.current) {
          sunRef.current.style.opacity = "0";
        }
        if (nightCanopyRef.current) {
          nightCanopyRef.current.style.opacity = "0";
        }
        if (leadTextRef.current) {
          leadTextRef.current.style.opacity = "0";
        }
        if (keyTextRef.current) {
          keyTextRef.current.style.opacity = "1";
          keyTextRef.current.style.filter = "none";
          keyTextRef.current.style.transform = "none";
        }
        return;
      }

      const rect = sceneEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const totalTravel = Math.max(1, sceneEl.offsetHeight - vh);

      // Entry progress while section approaches top of viewport (0 -> 1 before pinning)
      const enterT = clamp(1 - rect.top / Math.max(1, vh * 0.9), 0, 1);
      // Pinned travel progress (0 -> 1)
      const p = clamp(-rect.top / totalTravel, 0, 1);

      // Ground layers blend: cream -> #E8500E orange core -> #140A05 night
      const coreGroundAlpha = smoothstep(0.26, 0.46, p);
      const nightGroundAlpha = smoothstep(0.6, 0.84, p);
      if (coreGroundRef.current) {
        coreGroundRef.current.style.opacity = coreGroundAlpha.toFixed(3);
      }
      if (nightGroundRef.current) {
        nightGroundRef.current.style.opacity = nightGroundAlpha.toFixed(3);
      }

      // Soft solar orb path: rises from below frame -> fills viewport -> sinks down cleanly at horizon
      const riseT = smoothstep(0.0, 0.46, p);
      const sinkT = smoothstep(0.58, 0.96, p);
      const sunEntryY = (1 - enterT) * 28; // +28% -> 0% on initial approach
      const sunYOffset =
        sunEntryY + (1 - riseT) * 14 - riseT * 48 + sinkT * 74;
      const sunScale = 0.46 + enterT * 0.14 + riseT * 2.35 - sinkT * 1.75;
      const sunAlpha =
        smoothstep(0.15, 0.75, enterT) * (1 - smoothstep(0.82, 0.98, p));

      if (sunRef.current) {
        sunRef.current.style.transform = `translate3d(-50%, ${sunYOffset.toFixed(2)}%, 0) scale(${sunScale.toFixed(4)})`;
        sunRef.current.style.opacity = sunAlpha.toFixed(3);
      }

      // Top-down dark espresso canopy descending smoothly before footer reveal
      const canopyT = smoothstep(0.58, 0.9, p);
      if (nightCanopyRef.current) {
        const canopyY = -115 + canopyT * 105; // -115svh -> -10svh
        nightCanopyRef.current.style.transform = `translate3d(0, ${canopyY.toFixed(2)}svh, 0)`;
        nightCanopyRef.current.style.opacity = canopyT > 0.01 ? "1" : "0";
      }

      // Lead text ("Stop guessing,"): visible early on approach, blurs out cleanly at p: 0.52 -> 0.68
      if (leadTextRef.current) {
        const leadOut = smoothstep(0.52, 0.68, p);
        const leadOpacity =
          (0.35 + 0.65 * smoothstep(0.0, 0.35, enterT)) * (1 - leadOut);
        const leadY = -26 * leadOut;
        const leadScale = 1 - 0.05 * leadOut;
        const leadBlur = leadOut * 5.5;
        leadTextRef.current.style.opacity = leadOpacity.toFixed(3);
        leadTextRef.current.style.transform = `translate3d(0, ${leadY.toFixed(2)}px, 0) scale(${leadScale.toFixed(4)})`;
        leadTextRef.current.style.filter =
          leadBlur > 0.05 ? `blur(${leadBlur.toFixed(2)}px)` : "none";
      }

      // Key text ("start designing."): diffused bloom on sun rise -> crisp white -> glides upward into footer
      if (keyTextRef.current) {
        const keyIn = smoothstep(0.14, 0.42, p);
        const keyBlur = (1 - keyIn) * 6;
        const keyAlpha = 0.04 + 0.96 * keyIn;
        const keyDrift = smoothstep(0.7, 0.98, p) * -68;
        const keyScale = 0.97 + 0.03 * keyIn;
        keyTextRef.current.style.opacity = keyAlpha.toFixed(3);
        keyTextRef.current.style.transform = `translate3d(0, ${keyDrift.toFixed(2)}px, 0) scale(${keyScale.toFixed(4)})`;
        keyTextRef.current.style.filter =
          keyBlur > 0.05 ? `blur(${keyBlur.toFixed(2)}px)` : "none";
      }
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(applyFrame);
    };

    applyFrame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      aria-label="Closing statement transition"
      className="relative w-full bg-[#F8F4EE]"
      style={{ height: "155vh", overflowX: "clip" }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-start justify-center overflow-hidden bg-[#F8F4EE] pt-[15svh] sm:pt-[22svh]">
        {/* Smooth layered grounds matching TasteSkill's cream -> core -> night progression */}
        <div
          ref={coreGroundRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#E8500E]"
          style={{ opacity: 0 }}
        />
        <div
          ref={nightGroundRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#140A05]"
          style={{ opacity: 0 }}
        />

        {/* Soft diffused solar orb (peach halo + orange core matching .lf-sun) */}
        <div
          ref={sunRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-full left-1/2 h-[160%] w-[180%] origin-center"
          style={{
            transform: "translate3d(-50%, 14%, 0) scale(0.46)",
            opacity: 0,
          }}
        >
          <div
            className="absolute rounded-full bg-[#FFC9A3]"
            style={{
              inset: "-7%",
              filter: "blur(clamp(28px, 5svh, 52px))",
            }}
          />
          <div
            className="absolute inset-0 rounded-full bg-[#E8500E]"
            style={{
              filter: "blur(clamp(24px, 4.5svh, 48px))",
            }}
          />
        </div>

        {/* Feathered top-down dark canopy sweep before footer seam */}
        <div
          ref={nightCanopyRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -right-[10%] -left-[10%] h-[115svh]"
          style={{
            opacity: 0,
            transform: "translate3d(0, -115svh, 0)",
            background:
              "linear-gradient(180deg, #140A05 0%, #140A05 70%, rgba(20, 10, 5, 0) 100%)",
          }}
        />

        {/* Subtle grain overlay */}
        <div
          aria-hidden="true"
          className="bg-grain-subtle pointer-events-none absolute inset-0 opacity-18 mix-blend-overlay"
        />

        {/* Centered display statement matching TasteSkill's .lf-line scale & Google Sans Flex */}
        <h2 className="font-display relative z-10 w-full px-4 text-center font-semibold tracking-[-0.048em]">
          <span
            ref={leadTextRef}
            className="block leading-[1.0] whitespace-nowrap text-[#1A0E08]"
            style={{
              fontSize: "clamp(2.35rem, 8.2vw, 7.6rem)",
              opacity: 1,
            }}
          >
            Stop guessing,
          </span>
          <span
            ref={keyTextRef}
            className="mt-1 block leading-[1.0] whitespace-nowrap text-[#FFF6EF]"
            style={{
              fontSize: "clamp(2.7rem, 9.6vw, 9rem)",
              opacity: 0.04,
              filter: "blur(6px)",
            }}
          >
            start designing.
          </span>
        </h2>
      </div>
    </section>
  );
}
