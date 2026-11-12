"use client";

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { HERO_CATALOG } from "@/lib/heroes/catalog";
import { useHeroFavorites } from "@/lib/heroes/favorites";
import { BeforeAfterShowcase } from "./before-after-showcase";
import { FeaturedDesignsSection } from "./featured-designs-section";
import { HeroDirectionsDrum } from "./hero-directions-drum";
import { HeroStagePreview } from "./hero-stage-preview";
import { LightFloodTransition } from "./light-flood-transition";
import { RevealWords } from "./reveal-text";
import { SiteFooter } from "./site-footer";
import { SiteNavbar } from "./site-navbar";

const STAGE_CONCEPT_IDS = new Set([
  "concept-10-glasshouse-index",
  "concept-01-horizon-atelier",
  "concept-02-skygrid-studio",
  "concept-03-sunlit-canopy",
]);

/**
 * Client shell for the HeroAtlas — Website Hero Inspiration Library homepage.
 * Incorporates TasteSkill-inspired sunset gradient, word-by-word clipped hero reveal,
 * sticky glass navigation, pinned 3D directions drum, staged Before-and-After
 * circular transformation, and solar flood wrap into the dark footer.
 */
export function HomepageClient() {
  const { favoriteCount, isFavorite, toggleFavorite } = useHeroFavorites();

  const stageConcepts = HERO_CATALOG.filter((item) =>
    STAGE_CONCEPT_IDS.has(item.id),
  );

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#1A0E08]">
      <SiteNavbar favoriteCount={favoriteCount} heroDarkHeader />

      <main>
        {/* Hero with warm espresso-to-sunset-to-cream gradient */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 bottom-8 -z-20"
            style={{
              background:
                "radial-gradient(60% 36% at 50% 62%, rgba(255, 122, 46, 0.5), transparent 70%), linear-gradient(180deg, #140A05 0%, #2A1309 18%, #7A2306 44%, #FF5B14 63%, #FF7A2E 72%, #FFC9A3 86%, #F8F4EE 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="bg-grain-subtle pointer-events-none absolute inset-x-0 top-0 bottom-8 -z-10 opacity-20 mix-blend-overlay"
          />

          <div className="mx-auto max-w-6xl px-4 pt-24 pb-8 sm:px-6 sm:pt-30 sm:pb-12 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              {/* Announcement / identity pill */}
              <Link
                href="/designs"
                className="hero-pill-enter group inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs tracking-[-0.01em] text-[#FFF0E4]/88 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur-md transition-colors hover:bg-white/16 sm:text-[13px]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5B14] font-mono text-[10px] font-bold text-white">
                  10
                </span>
                <span>
                  <strong className="font-semibold text-white">HeroAtlas</strong>{" "}
                  curated hero architectures
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* Word-by-word clipped headline reveal matching TasteSkill proportions */}
              <h1 className="font-display mt-5 max-w-[16ch] text-[clamp(40px,6vw,84px)] leading-[1.02] font-semibold tracking-[-0.042em] text-[#FFF6EF] [text-wrap:balance]">
                <RevealWords
                  lines={["The hero library for", "thoughtful builders"]}
                  baseDelayMs={90}
                  wordStepMs={50}
                />
              </h1>

              {/* Staggered subtitle */}
              <p
                className="hero-rise-enter mx-auto mt-4 max-w-[35rem] text-[clamp(16px,1.45vw,19px)] leading-[1.55] tracking-[-0.01em] text-[#FFF0E4]/92 [text-wrap:pretty]"
                style={{ animationDelay: "300ms" }}
              >
                Discover original website hero-section directions, typography
                pairings, and responsive layout patterns—built for designers,
                developers, and founders.
              </p>

              {/* Primary & secondary CTAs */}
              <div
                className="hero-rise-enter mt-7 flex w-full max-w-md flex-col items-stretch justify-center gap-2.5 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
                style={{ animationDelay: "380ms" }}
              >
                <Link
                  href="/designs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#FFF6EF] px-6 text-sm font-semibold tracking-[-0.01em] text-[#140A05] shadow-[0_8px_24px_-8px_rgba(20,10,5,0.45)] transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  <span>Explore Designs</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#featured-designs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-[#140A05]/45 px-5 text-sm font-medium text-[#FFF6EF] backdrop-blur-md transition-all hover:bg-[#140A05]/65"
                >
                  <Layers className="h-4 w-4 text-[#FFC9A3]" />
                  <span>Featured Blueprints</span>
                </a>
              </div>
            </div>

            {/* Perspective-tilted interactive preview stage */}
            <HeroStagePreview concepts={stageConcepts} />
          </div>
        </section>

        {/* Pinned 3D scroll drum showcasing the 10 hero directions */}
        <HeroDirectionsDrum />

        {/* Pinned Before-and-After staged transformation */}
        <BeforeAfterShowcase />

        {/* Preserved Featured Placeholder Designs grid */}
        <FeaturedDesignsSection
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        {/* Solar sunrise bloom & nightfall transition into footer */}
        <LightFloodTransition />
      </main>

      <SiteFooter seamlessDarkTop />
    </div>
  );
}
