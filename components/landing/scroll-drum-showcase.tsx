"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DrumItem {
  title: string;
  caption: string;
  svg: string;
}

const DRUM_ITEMS: DrumItem[] = [
  {
    title: "Stickers with soul",
    caption: "Hand-crafted pastel SVGs",
    svg: "/stickers/mochi-heart.svg",
  },
  {
    title: "Drag, tilt and snap",
    caption: "Spring physics built in",
    svg: "/stickers/kuro-cool.svg",
  },
  {
    title: "Mochi, Kuro & Nori",
    caption: "Illustrated character packs",
    svg: "/stickers/nori-headphones.svg",
  },
  {
    title: "Pip the wizard",
    caption: "Playful micro-mascots",
    svg: "/stickers/pip-wizard.svg",
  },
  {
    title: "Pop off the page",
    caption: "Tactile peel & stick feel",
    svg: "/stickers/SparkleTrio.svg",
  },
  {
    title: "Zero config setup",
    caption: "One React component away",
    svg: "/stickers/star.svg",
  },
  {
    title: "Crisp at any scale",
    caption: "Pure vector clarity",
    svg: "/stickers/Cosmiceye.svg",
  },
  {
    title: "Playful pink accents",
    caption: "Warm blush aesthetic",
    svg: "/stickers/pink-cat.svg",
  },
  {
    title: "Made for React 19",
    caption: "Lightweight & tree-shakable",
    svg: "/stickers/luffy-hat.svg",
  },
  {
    title: "Light as a feather",
    caption: "Zero heavy runtime bloat",
    svg: "/stickers/bunny.svg",
  },
  {
    title: "Peel, place, pin",
    caption: "Drops right into any card",
    svg: "/stickers/cherry.svg",
  },
  {
    title: "Built to explore",
    caption: "Interactive on desktop & touch",
    svg: "/stickers/nazar.svg",
  },
  {
    title: "Ready out of box",
    caption: "Sensible defaults included",
    svg: "/stickers/Flame.svg",
  },
  {
    title: "Pure vector joy",
    caption: "Hover, tap & wobble states",
    svg: "/stickers/Peace-hand.svg",
  },
  {
    title: "Sticker everything.",
    caption: "npm i stick-blush@latest",
    svg: "/stickers/heart.svg",
  },
];

const FEATURED_CARDS = [
  {
    index: "01",
    name: "Mochi Pack",
    detail: "Cozy cat expressions",
    svg: "/stickers/mochi-heart.svg",
  },
  {
    index: "03",
    name: "Nori Vibes",
    detail: "Music & chill moods",
    svg: "/stickers/nori-headphones.svg",
  },
  {
    index: "04",
    name: "Pip Mascots",
    detail: "Wizard, detective & coffee",
    svg: "/stickers/pip-wizard.svg",
  },
] as const;

const STEP_DEG = 14.5;
const MAX_TURN_DEG = (DRUM_ITEMS.length - 1) * STEP_DEG;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Scroll-linked 3D cylindrical drum transition anchored immediately after the Folder section.
 * Pins inside a sticky viewport stage while scroll progress rotates the 3D cylinder across
 * a framed focal band, smoothly reveals closing pack cards, and unpins into Bento.
 */
export default function ScrollDrumShowcase() {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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

      const fs = clamp(vw * 0.056, 26, 76);
      const bandH = Math.round(fs * 1.56);
      const radius = clamp(Math.round(fs * 5.25), 200, Math.min(415, Math.round(vh * 0.46)));
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

      // Entrance rule draw as the scene enters the viewport (rect.top: 0.72*vh -> 0)
      const enterT = clamp(1 - rect.top / Math.max(1, vh * 0.72), 0, 1);
      const ruleScale = 0.25 + 0.75 * smoothstep(0, 1, enterT);
      if (ruleTopRef.current) {
        ruleTopRef.current.style.transform = `scale(${ruleScale.toFixed(4)}, 1)`;
      }
      if (ruleBottomRef.current) {
        ruleBottomRef.current.style.transform = `scale(${ruleScale.toFixed(4)}, 1)`;
      }

      // Main pinned scroll progress p in [0, 1]
      const p = clamp(-rect.top / totalTravel, 0, 1);

      // Phase 1: early scroll lifts & fades the top header out so rotating items have headroom
      const headHide = smoothstep(0.01, 0.11, p);
      if (headRef.current) {
        const yOffset = -64 * headHide;
        const opacity = 1 - headHide;
        headRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
        headRef.current.style.opacity = opacity.toFixed(4);
        headRef.current.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
      }

      // Phase 2: cylindrical 3D barrel turn across items (starts slightly after head begins lifting)
      const turnLinear = clamp((p - 0.04) / 0.8, 0, 1);
      // Gentle ease at start & soft settle onto the final item
      const turnEased =
        turnLinear < 0.08
          ? smoothstep(0, 0.08, turnLinear) * 0.08
          : turnLinear > 0.92
            ? 0.92 + smoothstep(0.92, 1, turnLinear) * 0.08
            : turnLinear;

      const turnDeg = turnEased * MAX_TURN_DEG;
      stageEl.style.setProperty("--drum-turn", `${turnDeg.toFixed(3)}deg`);

      const currentFloatIdx = turnDeg / STEP_DEG;
      const nearestIdx = clamp(Math.round(currentFloatIdx), 0, DRUM_ITEMS.length - 1);

      // Smooth angular visibility & muted opacity falloff around the cylinder
      for (let i = 0; i < DRUM_ITEMS.length; i++) {
        const deltaDeg = Math.abs(i * STEP_DEG - turnDeg);
        const rawVis = clamp(1 - deltaDeg / 62, 0, 1);
        const fadedVis = rawVis * rawVis;

        // Uniformly muted zinc layer outside the focal clip band so straddling letters stay soft grey
        const mutedOpacity = fadedVis * 0.42;

        const mutedEl = mutedItemRefs.current[i];
        if (mutedEl) {
          mutedEl.style.opacity = mutedOpacity.toFixed(3);
        }

        const focalEl = focalItemRefs.current[i];
        if (focalEl) {
          focalEl.style.opacity = deltaDeg < STEP_DEG * 1.4 ? "1" : "0";
        }
      }

      // Phase 3: bottom index/caption fades out before closing cards appear
      const metaFadeOut = smoothstep(0.81, 0.87, p);
      if (metaRef.current) {
        const metaOpacity = (1 - metaFadeOut) * smoothstep(0.15, 0.9, enterT);
        metaRef.current.style.opacity = metaOpacity.toFixed(4);
      }

      // Phase 4: closing featured pack cards + CTA rise in at p: 0.83 -> 0.91 so they rest at full opacity before unpinning
      const closeIn = smoothstep(0.83, 0.91, p);
      if (closeRef.current) {
        const closeY = 28 * (1 - closeIn);
        closeRef.current.style.transform = `translate3d(0, ${closeY.toFixed(2)}px, 0)`;
        closeRef.current.style.opacity = closeIn.toFixed(4);
        closeRef.current.style.pointerEvents = closeIn > 0.25 ? "auto" : "none";
      }

      if (nearestIdx !== lastActiveRef.current) {
        lastActiveRef.current = nearestIdx;
        setActiveIndex(nearestIdx);
      }
    }

    function scheduleUpdate() {
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyFrame);
      }
    }

    function handleResize() {
      updateMetrics();
      scheduleUpdate();
    }

    updateMetrics();
    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    motionQuery.addEventListener("change", handleResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const currentItem = DRUM_ITEMS[activeIndex] ?? DRUM_ITEMS[0];

  return (
    <section
      ref={sceneRef}
      aria-label="Interactive sticker showcase progression"
      className="relative z-10 w-full bg-white motion-reduce:h-auto"
      style={{
        height: "calc(3.3 * 100svh)",
      }}
    >
      {/* Static accessible fallback for prefers-reduced-motion */}
      <div className="hidden px-4 py-16 sm:px-8 motion-reduce:block">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-medium text-rose-600">
            Stick Blush Collection
          </span>
          <h2 className="mt-4 font-sans text-3xl font-normal tracking-tight text-zinc-900 sm:text-5xl">
            Every pack, built to stick.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500 sm:text-base">
            15 expressive vector themes ready to drag, tilt, and drop straight into your React app.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {FEATURED_CARDS.map((card) => (
              <div
                key={card.name}
                className="flex items-center gap-3.5 rounded-2xl border border-zinc-200/90 bg-white p-4 text-left shadow-xs"
              >
                <img src={card.svg} alt="" className="h-10 w-10 shrink-0" draggable={false} />
                <div>
                  <p className="text-sm font-medium text-zinc-900">{card.name}</p>
                  <p className="text-xs text-neutral-500">{card.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-driven pinned 3D drum stage */}
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] w-full overflow-clip bg-white motion-reduce:hidden"
        style={{
          contain: "layout paint",
        }}
      >
        {/* Top intro header above focal window */}
        <div
          ref={headRef}
          className="pointer-events-none absolute inset-x-0 z-20 flex flex-col items-center px-6 text-center will-change-transform"
          style={{
            bottom: "calc(50% + var(--drum-half-band, 44px) + clamp(24px, 5svh, 54px))",
          }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-rose-500 uppercase sm:text-[13px]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
            The Sticker Roll
          </span>
          <h2 className="mt-2.5 max-w-2xl font-sans text-3xl font-normal leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl">
            Fifteen directions.
            <br />
            Built to play with.
          </h2>
          <p className="mt-2.5 max-w-md text-xs leading-relaxed text-neutral-500 sm:text-sm">
            Scroll through the roll to inspect how each Stick Blush pack brings interfaces to life.
          </p>
        </div>

        {/* Muted 3D cylindrical drum (receding zinc text) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            perspective: "var(--drum-persp, 1000px)",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <ol
            className="absolute inset-0 m-0 list-none p-0 will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              transform:
                "translateZ(calc(var(--drum-r, 340px) * -1)) rotateX(var(--drum-turn, 0deg))",
            }}
          >
            {DRUM_ITEMS.map((item, idx) => (
              <li
                key={item.title}
                ref={(el) => {
                  mutedItemRefs.current[idx] = el;
                }}
                className="absolute inset-x-0 top-1/2 select-none whitespace-nowrap text-center font-sans font-medium tracking-tight text-zinc-900"
                style={{
                  fontSize: "var(--drum-fs, 64px)",
                  lineHeight: 1.1,
                  height: "1.1em",
                  marginTop: "-0.55em",
                  padding: "0 var(--drum-gutter, 64px)",
                  backfaceVisibility: "hidden",
                  transform: `rotateX(calc(${idx} * var(--drum-step, 14.5deg) * -1)) translateZ(var(--drum-r, 340px))`,
                  opacity: idx === 0 ? 1 : clamp(1 - idx / 4.5, 0, 1) * 0.46,
                }}
              >
                {item.title}
              </li>
            ))}
          </ol>
        </div>

        {/* Soft white veil over center band so focal rose layer stays crisp without double-text bleed */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2"
          style={{
            height: "var(--drum-band-h, 90px)",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,245,247,0.97) 50%, rgba(255,255,255,0.94) 100%)",
          }}
        />

        {/* Subtle warm blush ambient glow across focal band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2"
          style={{
            height: "calc(var(--drum-band-h, 90px) * 1.9)",
            background:
              "radial-gradient(ellipse 52% 60% at 50% 50%, rgba(244, 63, 94, 0.08), transparent 72%)",
          }}
        />

        {/* Focal-clipped 3D cylindrical drum (vibrant Stick Blush rose highlight inside hairline band) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            clipPath:
              "inset(calc(50% - var(--drum-half-band, 45px)) 0px calc(50% - var(--drum-half-band, 45px)) 0px)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              perspective: "var(--drum-persp, 1000px)",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <ol
              className="absolute inset-0 m-0 list-none p-0 will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  "translateZ(calc(var(--drum-r, 340px) * -1)) rotateX(var(--drum-turn, 0deg))",
              }}
            >
              {DRUM_ITEMS.map((item, idx) => (
                <li
                  key={`${item.title}-focal`}
                  ref={(el) => {
                    focalItemRefs.current[idx] = el;
                  }}
                  className="absolute inset-x-0 top-1/2 select-none whitespace-nowrap text-center font-sans font-medium tracking-tight text-rose-500"
                  style={{
                    fontSize: "var(--drum-fs, 64px)",
                    lineHeight: 1.1,
                    height: "1.1em",
                    marginTop: "-0.55em",
                    padding: "0 var(--drum-gutter, 64px)",
                    backfaceVisibility: "hidden",
                    transform: `rotateX(calc(${idx} * var(--drum-step, 14.5deg) * -1)) translateZ(var(--drum-r, 340px))`,
                    opacity: idx <= 1 ? 1 : 0,
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Framed focal top & bottom hairlines + blush pointer triangles */}
        <div
          ref={ruleTopRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 h-px bg-zinc-900/12 will-change-transform"
          style={{
            left: "var(--drum-gutter, 64px)",
            right: "var(--drum-gutter, 64px)",
            top: "calc(50% - var(--drum-half-band, 45px))",
            transformOrigin: "50% center",
          }}
        />
        <div
          ref={ruleBottomRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 h-px bg-zinc-900/12 will-change-transform"
          style={{
            left: "var(--drum-gutter, 64px)",
            right: "var(--drum-gutter, 64px)",
            top: "calc(50% + var(--drum-half-band, 45px))",
            transformOrigin: "50% center",
          }}
        />

        {/* Side pointer ticks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 text-[10px] leading-none text-rose-500"
          style={{
            left: "max(8px, calc(var(--drum-gutter, 64px) * 0.35))",
          }}
        >
          &#9654;
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 text-[10px] leading-none text-rose-500"
          style={{
            right: "max(8px, calc(var(--drum-gutter, 64px) * 0.35))",
          }}
        >
          &#9664;
        </span>

        {/* Bottom-corner live index + active sticker preview */}
        <div
          ref={metaRef}
          className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex items-center justify-between sm:bottom-10"
          style={{
            padding: "0 var(--drum-gutter, 64px)",
          }}
        >
          <div className="text-xs font-medium tabular-nums text-neutral-400 sm:text-sm">
            <span className="text-rose-500">{activeIndex + 1}</span>{" "}
            <span>of {DRUM_ITEMS.length}</span>
          </div>

          <div className="flex items-center gap-2.5 text-right">
            <img
              src={currentItem.svg}
              alt=""
              draggable={false}
              className="h-6 w-6 object-contain sm:h-7 sm:w-7"
            />
            <span className="text-xs font-medium text-zinc-900 sm:text-sm">
              {currentItem.caption}
            </span>
          </div>
        </div>

        {/* Closing summary cards + CTA at end of drum roll */}
        <div
          ref={closeRef}
          className="pointer-events-none absolute inset-x-0 z-20 flex flex-col items-center px-4 text-center will-change-transform sm:px-6"
          style={{
            top: "calc(50% + var(--drum-half-band, 45px) + clamp(20px, 4.5svh, 46px))",
            opacity: 0,
            transform: "translate3d(0, 28px, 0)",
          }}
        >
          <div className="grid w-full max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3.5">
            {FEATURED_CARDS.map((card, i) => (
              <div
                key={card.index}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-3.5 py-2.5 text-left shadow-[0_8px_24px_-12px_rgba(24,24,27,0.12)] sm:py-3"
                style={{
                  transform:
                    i === 0 ? "rotate(-1deg)" : i === 2 ? "rotate(1.2deg)" : "rotate(0deg)",
                }}
              >
                <img
                  src={card.svg}
                  alt=""
                  draggable={false}
                  className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-zinc-900 sm:text-[13px]">
                    <span className="mr-1.5 text-[11px] font-medium text-rose-500">
                      {card.index}
                    </span>
                    {card.name}
                  </p>
                  <p className="truncate text-[11px] text-neutral-500">{card.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 font-sans text-lg font-normal tracking-tight text-zinc-900 sm:mt-5 sm:text-2xl">
            Pick the pack that fits your vibe.
          </p>

          <Link
            href="/stickers"
            className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 sm:mt-4 sm:text-sm"
          >
            Explore Stickers
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
