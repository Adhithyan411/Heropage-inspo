/**
 * Core data models for the Website Hero Inspiration Library.
 * Designed to scale from early concept placeholders to hundreds of
 * curated, filterable hero-section designs.
 */

export type HeroCategoryId =
  | "editorial"
  | "saas"
  | "developer-tools"
  | "directories"
  | "storytelling"
  | "minimalist";

export type HeroVisualMood =
  | "pastoral"
  | "architectural"
  | "retro-tactile"
  | "cinematic"
  | "daylight"
  | "botanical"
  | "playful";

export type HeroLayoutPattern =
  | "asymmetric-split"
  | "centered-horizon"
  | "top-canopy-frame"
  | "grid-snapped"
  | "diagonal-color-block"
  | "two-tier-showcase";

export type HeroDesignStatus = "placeholder" | "draft" | "published";

export interface HeroColorToken {
  name: string;
  hex: string;
  role: "background" | "surface" | "ink" | "accent";
}

export interface HeroTypographySpec {
  displayFont: string;
  bodyFont: string;
  accentFont?: string;
}

export interface HeroCompositionSpec {
  navStyle: string;
  headlinePlacement: string;
  ctaStructure: string;
  mobileAdaptation: string;
}

export interface HeroSchematicPreview {
  skyTop: string;
  skyBottom: string;
  groundAccent: string;
  surfaceTint: string;
  inkColor: string;
  layoutPattern: HeroLayoutPattern;
  wireframeLines: {
    eyebrowWidth: string;
    headlineWidth: string;
    sublineWidth: string;
  };
}

export interface HeroReferenceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
}

export interface HeroDesignEntry {
  id: string;
  slug: string;
  slotNumber: number;
  title: string;
  tagline: string;
  summary: string;
  category: HeroCategoryId;
  mood: HeroVisualMood;
  layoutPattern: HeroLayoutPattern;
  status: HeroDesignStatus;
  featured: boolean;
  image?: HeroReferenceImage;
  palette: HeroColorToken[];
  typography: HeroTypographySpec;
  spec: HeroCompositionSpec;
  schematic: HeroSchematicPreview;
  tags: string[];
  createdAt: string;
}

export interface HeroCategoryMeta {
  id: HeroCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  accentHex: string;
  typicalLayout: string;
}

