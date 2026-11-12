"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "./brand-mark";

interface SiteFooterProps {
  seamlessDarkTop?: boolean;
}

const FOOTER_HEADING_WORDS = [
  "Browse",
  "the",
  "hero",
  "library",
  "in",
  "seconds.",
];

/**
 * TasteSkill-inspired dark espresso footer with continuous transition from
 * LightFloodTransition, clipped word-by-word heading reveal, compact directory,
 * and warm sunset horizon bottom wordmark.
 */
export function SiteFooter({ seamlessDarkTop = false }: SiteFooterProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      className="relative isolate overflow-hidden px-4 pt-6 pb-0 text-[#FFF0E4]/72 sm:px-6 sm:pt-10 lg:px-8"
      style={{
        background: seamlessDarkTop
          ? "radial-gradient(65% 36% at 50% 100%, rgba(255, 122, 46, 0.72), transparent 72%), linear-gradient(180deg, #140A05 0%, #140A05 68%, #451606 87%, #A8370B 100%)"
          : "radial-gradient(60% 30% at 50% 34%, rgba(255, 122, 46, 0.45), transparent 70%), linear-gradient(180deg, #F8F4EE 0%, #FFC9A3 12%, #FF7A2E 26%, #FF5B14 36%, #7A2306 54%, #2A1309 72%, #140A05 90%)",
      }}
    >
      <div
        aria-hidden="true"
        className="bg-grain-subtle pointer-events-none absolute inset-0 -z-10 opacity-12 mix-blend-overlay"
      />

      {/* Footer primary call-to-action with clipped word entrance */}
      <div ref={ctaRef} className="mx-auto max-w-4xl pt-4 pb-10 text-center sm:pt-6 sm:pb-12">
        <h2
          className={`font-display mx-auto max-w-[15ch] text-[clamp(36px,5.6vw,80px)] leading-[1.0] font-semibold tracking-[-0.048em] ${
            seamlessDarkTop ? "text-[#FFF6EF]" : "text-[#140A05]"
          }`}
        >
          {FOOTER_HEADING_WORDS.map((word, idx) => (
            <span key={word}>
              <span className="hero-word-clip">
                <span
                  className="inline-block transition-transform duration-700"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${idx * 55}ms`,
                    transform: entered ? "translate3d(0, 0, 0)" : "translate3d(0, 112%, 0)",
                  }}
                >
                  {word}
                </span>
              </span>
              {idx < FOOTER_HEADING_WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <p
          className={`mx-auto mt-4 max-w-lg text-sm leading-relaxed transition-all duration-700 sm:text-base ${
            seamlessDarkTop ? "text-[#FFF0E4]/72" : "text-[#1A0E08]/75"
          }`}
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translate3d(0, 0, 0)" : "translate3d(0, 14px, 0)",
            transitionDelay: "260ms",
          }}
        >
          Every concept specification includes responsive layout zones, palette
          tokens, and typography pairings—stored cleanly with local-only
          favorites.
        </p>

        <div
          className="mt-7 flex flex-wrap items-center justify-center gap-3 transition-all duration-700"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translate3d(0, 0, 0)" : "translate3d(0, 16px, 0)",
            transitionDelay: "340ms",
          }}
        >
          <Link
            href="/designs"
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#FFF6EF] px-6 text-sm font-semibold text-[#140A05] shadow-[0_0_0_5px_rgba(255,240,228,0.06),0_20px_50px_-20px_rgba(255,91,20,0.75)] transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <span>Explore Designs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/favorites"
            className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/18 bg-white/8 px-5 text-sm font-medium text-[#FFF6EF] backdrop-blur-xs transition-colors hover:bg-white/15"
          >
            <span>Saved Concepts</span>
          </Link>
        </div>
      </div>

      {/* Multi-column footer directory */}
      <div className="mx-auto max-w-6xl border-t border-white/12 pt-9 pb-7">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandMark tone="light" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#FFF0E4]/65">
              Website Hero Inspiration Library for builders, designers,
              developers, and founders.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-[#FFF0E4]/55">
              Library
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-[#FFF6EF]/88">
              <li>
                <Link href="/designs" className="hover:text-white">
                  All Concept Slots
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link href="/#hero-preview" className="hover:text-white">
                  Preview Stage
                </Link>
              </li>
              <li>
                <Link href="/#featured-designs" className="hover:text-white">
                  Featured Blueprints
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-[#FFF0E4]/55">
              Showcase
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-[#FFF6EF]/88">
              <li>
                <Link href="/#directions" className="hover:text-white">
                  10 Hero Directions
                </Link>
              </li>
              <li>
                <Link href="/#before-after" className="hover:text-white">
                  Before &amp; After
                </Link>
              </li>
              <li>
                <Link
                  href="/designs/horizon-atelier"
                  className="hover:text-white"
                >
                  Horizon Atelier Spec
                </Link>
              </li>
              <li>
                <Link
                  href="/designs/glasshouse-index"
                  className="hover:text-white"
                >
                  Glasshouse Index Spec
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-medium text-[#FFF0E4]/55">
              Architecture
            </h3>
            <ul className="mt-2.5 space-y-2 text-sm text-[#FFF6EF]/88">
              <li>Data-Driven Catalog</li>
              <li>Placeholder Schemas</li>
              <li>Local-Only Favorites</li>
              <li>Reduced-Motion Ready</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 text-xs text-[#FFF0E4]/55 sm:flex-row sm:items-center">
          <p>HeroAtlas — Website Hero Inspiration Library</p>
          <p className="font-mono text-[11px] text-[#FFF0E4]/50">
            9 imported hero canvases · 1 placeholder slot · local-only favorites
          </p>
        </div>
      </div>

      {/* Cropped monumental bottom wordmark over warm sunset horizon */}
      <div
        aria-hidden="true"
        className="mx-auto max-w-6xl overflow-hidden pt-2 text-center select-none"
      >
        <p className="font-display -mb-[0.18em] text-[clamp(64px,16vw,210px)] leading-[0.86] font-semibold tracking-[-0.055em] text-[#FFF6EF]/95">
          HeroAtlas
        </p>
      </div>
    </footer>
  );
}
