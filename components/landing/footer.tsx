"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------
   tokens (same language as the rest of the landing page)
------------------------------------------------------------------- */
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const GRAIN =
  "radial-gradient(rgba(0,0,0,0.18) 0.6px, transparent 0.7px)";

function useInView({
  threshold = 0.05,
  rootMargin = "250px 0px 100px 0px",
}: {
  threshold?: number;
  rootMargin?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}

function MotionBlur({
  inView,
  delay = 0,
  blur = 8,
  children,
  className = "",
}: {
  inView: boolean;
  delay?: number;
  blur?: number;
  children: ReactNode;
  className?: string;
}) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setSettled(true), delay + 850);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
        filter: settled ? "none" : inView ? "blur(0px)" : `blur(${blur}px)`,
        transition: settled
          ? "none"
          : `opacity 650ms ${EASE_OUT} ${delay}ms, transform 750ms ${EASE_OUT} ${delay}ms, filter 650ms ${EASE_OUT} ${delay}ms`,
        willChange: settled ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   data
------------------------------------------------------------------- */
type LegalModalTab = "privacy" | "about" | "license";

interface FooterLink {
  label: string;
  href?: string;
  action?: LegalModalTab;
  sticker: string;
  rot?: number;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Stickers", href: "/stickers", sticker: "/stickers/star.svg", rot: 12 },
      { label: "Docs", href: "/stickers#docs", sticker: "/stickers/Sparkles.svg", rot: -8 },
      { label: "npm", href: "https://www.npmjs.com/package/stick-blush", sticker: "/stickers/blueberry.svg", rot: 6 },
      { label: "Releases", href: "https://github.com/Adhithyan411/Sticky/releases", sticker: "/stickers/Flame.svg", rot: -10 },
    ],
  },
  {
    title: "Contribute",
    links: [
      { label: "Submit a Sticker", href: "https://github.com/Adhithyan411/Sticky/pulls", sticker: "/stickers/SparkleTrio.svg", rot: -10 },
      { label: "Contribution Guide", href: "https://github.com/Adhithyan411/Sticky/blob/main/CONTRIBUTING.md", sticker: "/stickers/dogsticker.svg", rot: 8 },
      { label: "Request a Sticker", href: "https://github.com/Adhithyan411/Sticky/issues/new?labels=sticker-request&title=[Sticker+Request]:+", sticker: "/stickers/Curious%20blue%20globe.svg", rot: 6 },
      { label: "Sticker Files", href: "https://github.com/Adhithyan411/Sticky/tree/main/public/stickers", sticker: "/stickers/Spiral.svg", rot: -8 },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/Adhithyan411/Sticky", sticker: "/stickers/cat.svg", rot: 8 },
      { label: "Sponsor (GitHub)", href: "https://github.com/sponsors/Adhithyan411", sticker: "/stickers/nori-heart.svg", rot: -8 },
      { label: "Profile", href: "https://github.com/Adhithyan411", sticker: "/stickers/pip-coffee.svg", rot: 10 },
      { label: "Issues & Feedback", href: "https://github.com/Adhithyan411/Sticky/issues", sticker: "/stickers/face.svg", rot: -6 },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", action: "privacy", sticker: "/stickers/heart.svg", rot: 8 },
      { label: "About the Design", action: "about", sticker: "/stickers/Peace-hand.svg", rot: -10 },
      { label: "MIT License", action: "license", sticker: "/stickers/star.svg", rot: -8 },
    ],
  },
];

/* ------------------------------------------------------------------
   small inline sticker in the tagline (click = spin, like the hero)
------------------------------------------------------------------- */
function InlineSticker({ src }: { src: string }) {
  const [turns, setTurns] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <img
      data-sticker
      src={src}
      alt=""
      draggable={false}
      onClick={() => setTurns((t) => t + 1)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="mx-1 inline-block h-[0.95em] w-[0.95em] cursor-pointer select-none align-[-0.1em]"
      style={{
        rotate: `${turns * 360 + (hover ? 14 : 0)}deg`,
        scale: hover ? 1.12 : 1,
        transition: `rotate 650ms ${SPRING}, scale 300ms ${SPRING}`,
      }}
    />
  );
}

/* ------------------------------------------------------------------
   draggable sticker (sits on top of the wordmark)
------------------------------------------------------------------- */
function DraggableSticker({
  src,
  size,
  left,
  top,
  rot = 0,
  inView,
  delay = 0,
}: {
  src: string;
  size: number;
  left: string;
  top: string;
  rot?: number;
  inView: boolean;
  delay?: number;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });

  return (
    // layer 1: placement + entrance pop
    <div
      className="absolute"
      style={{
        left,
        top,
        width: `clamp(36px, ${size / 10.24}vw, ${size}px)`,
        zIndex: drag ? 30 : 20,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1) rotate(0deg)" : "scale(0) rotate(-20deg)",
        transition: `transform 650ms ${SPRING} ${delay}ms, opacity 300ms ease-out ${delay}ms`,
      }}
    >
      {/* layer 2: drag, hover, tilt */}
      <div
        data-sticker
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y };
          setDrag(true);
        }}
        onPointerMove={(e) => {
          if (!drag) return;
          setPos({
            x: start.current.x + e.clientX - start.current.px,
            y: start.current.y + e.clientY - start.current.py,
          });
        }}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="touch-none select-none"
        style={{
          translate: `${pos.x}px ${pos.y}px`,
          rotate: `${rot + (drag ? -5 : hover ? 8 : 0)}deg`,
          scale: drag ? 1.14 : hover ? 1.08 : 1,
          cursor: drag ? "grabbing" : "grab",
          filter: drag ? "drop-shadow(0 14px 12px rgba(10,40,100,0.28))" : "none",
          transition: drag
            ? "scale 200ms ease-out"
            : `scale 450ms ${SPRING}, rotate 450ms ${SPRING}`,
        }}
      >
        <img src={src} alt="" draggable={false} className="block h-auto w-full" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   footer
------------------------------------------------------------------- */
export default function Footer() {
  const [ref, inView] = useInView();
  const [modalTab, setModalTab] = useState<LegalModalTab | null>(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    if (!modalTab) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalTab(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalTab]);

  return (
    <>
      <footer
        ref={ref}
        className="relative z-10 -mx-5 overflow-hidden px-6 pt-14 sm:px-12 sm:pt-16"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #e6f2ff 26%, #8cc7fb 62%, #52aef9 100%)",
        }}
      >
        {/* paper grain */}
        <div
          className="pointer-events-none absolute inset-0 mask-t-from-10% to-100%"
          style={{ backgroundImage: GRAIN, backgroundSize: "3px 3px", opacity: 0.06 }}
        />

        {/* top: tagline + links */}
        <div className="relative z-10 mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.85fr] lg:gap-14">
          <MotionBlur inView={inView} delay={0} className="text-center lg:text-left">
            <p className="font-sans text-3xl font-normal leading-[1.1] tracking-tight text-zinc-900 sm:text-4xl">
              Stick it on.
              <br />
              Ship it fun
              <InlineSticker src="/stickers/Peace-hand.svg" />
            </p>
          </MotionBlur>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-4 sm:text-left">
            {COLUMNS.map((col, ci) => (
              <MotionBlur key={col.title} inView={inView} delay={140 + ci * 80}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.action ? (
                        <button
                          type="button"
                          onClick={() => setModalTab(link.action!)}
                          className="group relative inline-flex cursor-pointer items-center py-0.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900 text-left"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                            style={{
                              transitionTimingFunction: SPRING,
                            }}
                          >
                            <img
                              src={link.sticker}
                              alt=""
                              className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                              style={{
                                transform: `rotate(${link.rot ?? 0}deg)`,
                              }}
                            />
                          </span>
                        </button>
                      ) : link.href?.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative inline-flex items-center py-0.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                            style={{
                              transitionTimingFunction: SPRING,
                            }}
                          >
                            <img
                              src={link.sticker}
                              alt=""
                              className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                              style={{
                                transform: `rotate(${link.rot ?? 0}deg)`,
                              }}
                            />
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={link.href || "#"}
                          onClick={(e) => {
                            if (link.href?.includes("#docs") && window.location.pathname === "/stickers") {
                              const el = document.getElementById("docs");
                              if (el) {
                                e.preventDefault();
                                el.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState(null, "", "#docs");
                              }
                            }
                          }}
                          className="group relative inline-flex items-center py-0.5 text-sm font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
                        >
                          <span>{link.label}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 opacity-0 scale-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100"
                            style={{
                              transitionTimingFunction: SPRING,
                            }}
                          >
                            <img
                              src={link.sticker}
                              alt=""
                              className="h-[24px] w-[24px] max-w-none select-none object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                              style={{
                                transform: `rotate(${link.rot ?? 0}deg)`,
                              }}
                            />
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </MotionBlur>
            ))}
          </div>
        </div>

        {/* full-bleed wordmark + live stickers */}
        <MotionBlur
          inView={inView}
          delay={380}
          className="relative z-10 -mx-6 mt-14 sm:-mx-12 sm:mt-20"
        >
          <div className="relative select-none" style={{ containerType: "inline-size" }}>
            <div
              aria-hidden
              className="overflow-hidden whitespace-nowrap text-center font-bold leading-[0.8] tracking-[-0.055em] text-white"
              style={{
                fontSize: "21cqw",
                height: "14.5cqw",
                marginBottom: "-2cqw",
                textShadow: "0 0.02em 0 rgba(20,90,190,0.25)",
              }}
            >
              Stick it up
            </div>
            <span className="sr-only">Stick it up</span>

            <DraggableSticker inView={inView} delay={640} src="/stickers/star.svg" size={84} left="4%" top="-6%" rot={-12} />
            <DraggableSticker inView={inView} delay={720} src="/stickers/blueberry.svg" size={92} left="28%" top="52%" rot={8} />
            <DraggableSticker inView={inView} delay={800} src="/stickers/Flame.svg" size={65} left="46%" top="-10%" rot={-6} />
            <DraggableSticker inView={inView} delay={880} src="/stickers/flower.svg" size={70} left="66%" top="32%" rot={14} />
            <DraggableSticker inView={inView} delay={960} src="/stickers/cat.svg" size={86} left="84%" top="-4%" rot={-10} />
          </div>
        </MotionBlur>
      </footer>

      {/* ------------------------------------------------------------------
         Minimal Pop-up Modal Window for Legal & Notices
      ------------------------------------------------------------------- */}
      {modalTab && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalTab(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs transition-opacity duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col rounded-3xl border border-zinc-200/80 bg-white shadow-2xl transition-transform duration-200"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "privacy", label: "Privacy Policy" },
                  { id: "about", label: "About the Design" },
                  { id: "license", label: "MIT License" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setModalTab(tab.id as LegalModalTab)}
                    className={`cursor-pointer rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                      modalTab === tab.id
                        ? "bg-zinc-900 text-white shadow-xs"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setModalTab(null)}
                className="ml-3 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                title="Close (Esc)"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="max-h-[calc(85vh-72px)] overflow-y-auto px-6 py-6 text-sm text-zinc-600">
              {modalTab === "privacy" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900">
                      Privacy Policy
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Zero tracking, zero ads, zero data selling.
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600">
                    Stick It Up is built with a minimal, privacy-first mindset. We do not track you across the web, use advertising cookies, or collect personal identifiers.
                  </p>
                  <div className="divide-y divide-zinc-100 border-y border-zinc-100 text-xs text-zinc-600">
                    <div className="py-2.5">
                      <span className="font-medium text-zinc-900">Zero Personal Data:</span> We do not collect names, emails, passwords, phone numbers, or payment info. No account registration is required to use the package or site.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-zinc-900">Anonymous Visitor Counter:</span> When a visitor loads the site, an anonymous aggregate numeric counter increments. We do not record IP addresses, device fingerprints, or locations.
                    </div>
                    <div className="py-2.5">
                      <span className="font-medium text-zinc-900">Local Storage Only:</span> Browser storage is strictly used on your own device for client-side UI states (such as remembering copied snippets or active preview preferences).
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "about" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900">
                      Original Design &amp; Craft
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Designed, illustrated, and built by Adhithyan S.
                    </p>
                  </div>
                  <div className="space-y-2.5 text-xs leading-relaxed text-zinc-600">
                    <p>
                      Every sticker component in Stick It Up — from the metallic chrome finishes and halftone stars to the pixel art mascots (Nori, Pip, Kuro, Mochi) and playful vector decals — is crafted and engineered by Adhithyan S.
                    </p>
                    <p>
                      While the artwork and aesthetic draw inspiration from visual moodboards on Pinterest and retro sticker culture, every single piece is vectorized and built for modern React interfaces by Adhithyan S.
                    </p>
                    <p>
                      The entire library, including code, shaders, interactive peel physics, and SVG assets, is released under the permissive MIT License for everyone to use freely in personal and commercial web projects.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href="https://github.com/Adhithyan411/Sticky"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white shadow-xs transition-colors hover:bg-zinc-800"
                    >
                      View GitHub Repo &rarr;
                    </a>
                    <a
                      href="https://github.com/Adhithyan411"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-800 shadow-xs transition-colors hover:bg-zinc-50"
                    >
                      GitHub Profile &rarr;
                    </a>
                  </div>
                </div>
              )}

              {modalTab === "license" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-zinc-900">
                      MIT License
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Free for both personal and commercial use.
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-600">
                    Stick It Up is open-source software maintained by Adhithyan S. Permission is granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software in any project.
                  </p>
                  <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 font-mono text-[11px] leading-relaxed text-zinc-600 select-all whitespace-pre-wrap">
                    {`MIT License

Copyright (c) 2026 Adhithyan S (https://github.com/Adhithyan411)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
