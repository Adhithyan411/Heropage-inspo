import type { HeroCategoryId, HeroCategoryMeta } from "./types";

/**
 * Category metadata for homepage discovery and future gallery filtering.
 */
export const HERO_CATEGORIES: HeroCategoryMeta[] = [
  {
    id: "minimalist",
    label: "Minimalist & Atmospheric",
    shortLabel: "Minimalist",
    description:
      "High-key horizons, generous sky negative space, and restrained typography where stillness carries the message.",
    accentHex: "#3E6B1E",
    typicalLayout: "55/45 Horizon Split",
  },
  {
    id: "saas",
    label: "SaaS & Product Builders",
    shortLabel: "SaaS",
    description:
      "Conversion-focused above-the-fold layouts balancing sharp product headlines, dual CTAs, and crisp focal anchors.",
    accentHex: "#0F5CA8",
    typicalLayout: "Asymmetric & Top-Weighted",
  },
  {
    id: "developer-tools",
    label: "Developer Tools & Grids",
    shortLabel: "Dev Tools",
    description:
      "Blueprint hairlines, monospace eyebrows, and structured grid alignment built for technical products.",
    accentHex: "#0D7EE3",
    typicalLayout: "Grid-Snapped Canvas",
  },
  {
    id: "editorial",
    label: "Editorial & Publishing",
    shortLabel: "Editorial",
    description:
      "Expressive display serifs, thoughtful reading measure, and calm asymmetric or diagonal color blocking.",
    accentHex: "#1E3A5F",
    typicalLayout: "Diagonal & Editorial Grid",
  },
  {
    id: "directories",
    label: "Curated Directories",
    shortLabel: "Directories",
    description:
      "Search-first hero bars, category mood chips, and grounded multi-card preview strips for discovery platforms.",
    accentHex: "#44679B",
    typicalLayout: "Two-Tier Showcase",
  },
  {
    id: "storytelling",
    label: "Cinematic Storytelling",
    shortLabel: "Storytelling",
    description:
      "Analog film-grain textures, leading-line compositions, and poetic focal silhouettes with unhurried pacing.",
    accentHex: "#7A5C38",
    typicalLayout: "Centered Axial & Leading Line",
  },
];

export const HERO_CATEGORY_MAP: Record<HeroCategoryId, HeroCategoryMeta> =
  HERO_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.id] = category;
      return acc;
    },
    {} as Record<HeroCategoryId, HeroCategoryMeta>,
  );

