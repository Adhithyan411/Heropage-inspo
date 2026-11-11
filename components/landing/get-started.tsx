"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

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

function DraggableSticker({
  src,
  size,
  left,
  top,
  rot = 0,
}: {
  src: string;
  size: number;
  left: string;
  top: string;
  rot?: number;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });

  return (
    <div className="absolute hidden sm:block pointer-events-auto" style={{ left, top, width: size, zIndex: drag ? 30 : 15 }}>
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
          scale: drag ? 1.15 : hover ? 1.08 : 1,
          cursor: drag ? "grabbing" : "grab",
          filter: drag ? "drop-shadow(0 14px 12px rgba(0,0,0,0.18))" : "none",
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

export default function GetStarted() {
  const [sectionRef, inView] = useInView();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText("npm i stick-blush@latest");
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy command:", error);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="relative z-10 mx-4 mb-10 overflow-hidden rounded-[40px] px-6 py-20 sm:px-12 sm:py-24 text-center"
      
    >
      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0"
        
      />

      {/* Floating draggable stickers around the CTA */}
      <DraggableSticker src="/stickers/star.svg" size={66} left="6%" top="18%" rot={-12} />
      <DraggableSticker src="/stickers/face.svg" size={64} left="88%" top="16%" rot={10} />
      <DraggableSticker src="/stickers/pink-cat.svg" size={58} left="10%" top="70%" rot={8} />
      <DraggableSticker src="/stickers/Peace-hand.svg" size={56} left="86%" top="68%" rot={-10} />

      <div className="relative z-10 mx-auto max-w-3xl">
        

        <MotionBlur inView={inView} delay={80}>
          <h2 className="mt-5 font-sans text-4xl font-normal leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Ready to give your UI some personality?
          </h2>
        </MotionBlur>

        <MotionBlur inView={inView} delay={160}>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
            Install once, drop stickers anywhere, and make every empty state, card, and hero unforgettable.
          </p>
        </MotionBlur>

        {/* Action buttons */}
        <MotionBlur inView={inView} delay={240}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {/* Get started button */}
            <a
               href="/stickers"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl
                border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-900
                px-6 py-3.5 text-sm font-medium text-white
                shadow-[inset_0_1px_0_#ffffff18,0_1px_2px_#00000015]
                transition-all duration-150
                hover:-translate-y-px hover:from-zinc-700 hover:to-zinc-800
                active:translate-y-px active:shadow-inner select-none"
            >
              <span>Get started with Stick It Up</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Install copy button */}
            <button
              onClick={copyCommand}
              aria-label={copied ? "Copied to clipboard" : "Copy npm i stick-blush@latest"}
              className={`group relative inline-flex cursor-pointer items-center gap-3 rounded-xl
                border bg-gradient-to-b
                py-3.5 pl-4 pr-5 font-mono text-sm
                shadow-[inset_0_1px_0_white,0_1px_2px_#0000000a]
                transition-all duration-300 ease-out
                hover:-translate-y-px active:translate-y-px active:shadow-inner
                ${
                  copied
                    ? "border-emerald-200 from-emerald-50 to-emerald-100/70 text-emerald-800"
                    : "border-zinc-200 from-white to-zinc-50 text-zinc-800 hover:border-zinc-300 hover:shadow-[inset_0_1px_0_white,0_2px_4px_#0000000a]"
                }`}
            >
              <span className="relative grid" aria-live="polite">
                <span
                  className={`col-start-1 row-start-1 transition-all duration-300 ease-out ${
                    copied
                      ? "-translate-y-1 opacity-0 blur-[2px]"
                      : "translate-y-0 opacity-100 blur-0"
                  }`}
                >
                  npm i stick-blush@latest
                </span>

                <span
                  className={`col-start-1 row-start-1 font-medium transition-all duration-300 ease-out ${
                    copied
                      ? "translate-y-0 opacity-100 blur-0 delay-75"
                      : "translate-y-1 opacity-0 blur-[2px]"
                  }`}
                >
                  Copied!
                </span>
              </span>

              <span className="relative grid h-4 w-4 place-items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`col-start-1 row-start-1 h-4 w-4 transition-all duration-200 ease-out ${
                    copied ? "scale-75 opacity-0" : "scale-100 opacity-100"
                  }`}
                >
                  <rect x="8" y="3" width="12" height="15" rx="2" />
                  <path d="M5 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1" />
                </svg>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="col-start-1 row-start-1 h-4 w-4 overflow-visible"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    className="fill-emerald-500"
                    style={{
                      transformOrigin: "center",
                      transformBox: "fill-box",
                      transform: copied ? "scale(1)" : "scale(0.4)",
                      opacity: copied ? 1 : 0,
                      transition:
                        "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 150ms ease-out",
                    }}
                  />
                  <path
                    d="m7 12.5 3.2 3.2L17 8.8"
                    pathLength={1}
                    stroke="white"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: copied ? 0 : 1,
                      transition: copied
                        ? "stroke-dashoffset 280ms ease-out 140ms"
                        : "stroke-dashoffset 120ms ease-in",
                    }}
                  />
                </svg>
              </span>
            </button>
          </div>
        </MotionBlur>
      </div>
    </section>
  );
}

