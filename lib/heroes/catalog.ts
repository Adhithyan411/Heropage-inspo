import { HERO_CATEGORIES } from "./categories";
import type {
  HeroCategoryId,
  HeroDesignEntry,
  HeroLayoutPattern,
  HeroVisualMood,
} from "./types";

export const HERO_MOODS: { id: HeroVisualMood; label: string }[] = [
  { id: "pastoral", label: "Pastoral" },
  { id: "architectural", label: "Architectural" },
  { id: "retro-tactile", label: "Retro-Tactile" },
  { id: "cinematic", label: "Cinematic" },
  { id: "daylight", label: "Daylight" },
  { id: "botanical", label: "Botanical" },
  { id: "playful", label: "Playful" },
];

export const HERO_LAYOUT_PATTERNS: { id: HeroLayoutPattern; label: string }[] = [
  { id: "asymmetric-split", label: "Asymmetric Split" },
  { id: "centered-horizon", label: "Centered Horizon" },
  { id: "top-canopy-frame", label: "Top Canopy Frame" },
  { id: "grid-snapped", label: "Grid-Snapped" },
  { id: "diagonal-color-block", label: "Diagonal Color Block" },
  { id: "two-tier-showcase", label: "Two-Tier Showcase" },
];

/**
 * HeroAtlas curated concept catalog derived from HERO-DESIGN-ANALYSIS.md.
 * Slots 01–09 display their matching original imported reference images from
 * `public/design-references/`. Slot 10 retains placeholder status until its own
 * multi-card showcase visual is created.
 */
export const HERO_CATALOG: HeroDesignEntry[] = [
  {
    id: "concept-01-horizon-atelier",
    slug: "horizon-atelier",
    slotNumber: 1,
    title: "Horizon Atelier",
    tagline: "High-key overcast sky over sculpted rolling hills",
    summary:
      "Editorial minimalism replacing sterile white SaaS canvases with diffused daylight airiness and sharp ink typography.",
    category: "minimalist",
    mood: "pastoral",
    layoutPattern: "asymmetric-split",
    status: "published",
    featured: true,
    image: {
      src: "/design-references/_ (1).jpeg",
      alt: "Minimalist landscape of three smooth green hills under an overcast pale sky",
      width: 612,
      height: 408,
      objectPosition: "50% 68%",
    },
    palette: [
      { name: "Mist Sky", hex: "#E4ECEF", role: "background" },
      { name: "Alabaster", hex: "#F3F1EA", role: "surface" },
      { name: "Obsidian Ink", hex: "#121714", role: "ink" },
      { name: "Meadow", hex: "#3E6B1E", role: "accent" },
    ],
    typography: {
      displayFont: "Instrument Serif",
      bodyFont: "Geist",
    },
    spec: {
      navStyle: "Single-row transparent dark-ink bar on pale sky",
      headlinePlacement: "Upper-left 58% sky zone above hill crest",
      ctaStructure: "Solid obsidian pill + subtle ghost text action",
      mobileAdaptation: "60/40 vertical sky-to-hill split with stacked left copy",
    },
    schematic: {
      skyTop: "#DCE5E8",
      skyBottom: "#F3F1EA",
      groundAccent: "#4E7B27",
      surfaceTint: "#FFFFFF",
      inkColor: "#121714",
      layoutPattern: "asymmetric-split",
      wireframeLines: {
        eyebrowWidth: "28%",
        headlineWidth: "68%",
        sublineWidth: "52%",
      },
    },
    tags: ["minimal", "serif", "light-mode", "pastoral"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-02-skygrid-studio",
    slug: "skygrid-studio",
    slotNumber: 2,
    title: "Skygrid Studio",
    tagline: "Architectural grid hairlines layered over daylight sky",
    summary:
      "Precision developer-tool layout snapping geometric grotesk typography to subtle blueprint intersections.",
    category: "developer-tools",
    mood: "architectural",
    layoutPattern: "grid-snapped",
    status: "published",
    featured: true,
    image: {
      src: "/design-references/Removing_text_and_symbols_60519d6f_2K.jpg",
      alt: "Cel-shaded azure sky with sparse clouds framed over subtle architectural grid hairlines",
      width: 2752,
      height: 1536,
      objectPosition: "50% 50%",
    },
    palette: [
      { name: "Azure Canvas", hex: "#0D7EE3", role: "background" },
      { name: "Cloud White", hex: "#FFFFFF", role: "surface" },
      { name: "Deep Navy", hex: "#091E3A", role: "ink" },
      { name: "Cloud Shadow", hex: "#A7D1F7", role: "accent" },
    ],
    typography: {
      displayFont: "Space Grotesk",
      bodyFont: "Geist",
      accentFont: "Geist Mono",
    },
    spec: {
      navStyle: "Floating frosted-glass pill bar with crisp navy CTA",
      headlinePlacement: "Centered inside open grid corridor",
      ctaStructure: "White primary pill + dark-navy outlined spec action",
      mobileAdaptation: "Full-width grid backdrop with centered stacked CTAs",
    },
    schematic: {
      skyTop: "#0B76D8",
      skyBottom: "#299CF5",
      groundAccent: "#A7D1F7",
      surfaceTint: "#FFFFFF",
      inkColor: "#FFFFFF",
      layoutPattern: "grid-snapped",
      wireframeLines: {
        eyebrowWidth: "34%",
        headlineWidth: "74%",
        sublineWidth: "56%",
      },
    },
    tags: ["blueprint", "grid", "dev-tools", "daylight"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-03-sunlit-canopy",
    slug: "sunlit-canopy",
    slotNumber: 3,
    title: "Sunlit Canopy",
    tagline: "Botanical top-arch framing a centered discovery bar",
    summary:
      "Organic proscenium framing that shelters lower-center headline copy and an interactive search prompt.",
    category: "directories",
    mood: "botanical",
    layoutPattern: "top-canopy-frame",
    status: "published",
    featured: true,
    image: {
      src: "/design-references/Text_and_boards_removal_d189d6f1_2K-clean.png",
      alt: "Sunlit pink cherry blossom branches arching across the top over a calm blue sky",
      width: 2752,
      height: 1536,
      objectPosition: "50% 35%",
    },
    palette: [
      { name: "Cornflower", hex: "#44679B", role: "background" },
      { name: "Cream Pill", hex: "#FFFBF7", role: "surface" },
      { name: "Bark Ink", hex: "#231F1D", role: "ink" },
      { name: "Blossom", hex: "#FF9E9E", role: "accent" },
    ],
    typography: {
      displayFont: "Instrument Serif",
      bodyFont: "Geist",
    },
    spec: {
      navStyle: "Floating cream pill container below overhanging top canopy",
      headlinePlacement: "Lower-center sky zone (42%–68% vertical band)",
      ctaStructure: "Centered search input + category mood chips",
      mobileAdaptation: "Corner-tucked blossom ribbon with centered search stack",
    },
    schematic: {
      skyTop: "#3E6195",
      skyBottom: "#6788B9",
      groundAccent: "#F49E9E",
      surfaceTint: "#FFFBF7",
      inkColor: "#FFFFFF",
      layoutPattern: "top-canopy-frame",
      wireframeLines: {
        eyebrowWidth: "30%",
        headlineWidth: "66%",
        sublineWidth: "58%",
      },
    },
    tags: ["search", "directory", "botanical", "centered"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-04-meadow-terminal",
    slug: "meadow-terminal",
    slotNumber: 4,
    title: "Meadow Terminal",
    tagline: "Retro-tactile hardware centerpiece in morning mist",
    summary:
      "Symmetrical central-axis showcase pairing uncluttered pale morning sky above with a warm glowing display anchor.",
    category: "saas",
    mood: "retro-tactile",
    layoutPattern: "centered-horizon",
    status: "published",
    featured: true,
    image: {
      src: "/design-references/Remove_text_background_89833fa7_2K.jpg",
      alt: "Vintage glowing beige CRT monitor atop a grassy mound framed by alpine peaks and red wildflower bokeh",
      width: 2752,
      height: 1536,
      objectPosition: "50% 52%",
    },
    palette: [
      { name: "Morning Haze", hex: "#DCE6EC", role: "background" },
      { name: "Dawn Cream", hex: "#F7EFE1", role: "surface" },
      { name: "Espresso", hex: "#1A1E1B", role: "ink" },
      { name: "Amber Glow", hex: "#FF9666", role: "accent" },
    ],
    typography: {
      displayFont: "Geist",
      bodyFont: "Geist",
      accentFont: "Geist Mono",
    },
    spec: {
      navStyle: "Minimal dark-ink bar floating across airy pale sky",
      headlinePlacement: "Centered in upper 36% sky band above focal hardware",
      ctaStructure: "Single centered dark-ink action pill",
      mobileAdaptation: "Center-cropped vertical stack preserving sky headline clearance",
    },
    schematic: {
      skyTop: "#D5E2EA",
      skyBottom: "#F6EFE1",
      groundAccent: "#4D6B1A",
      surfaceTint: "#FF9666",
      inkColor: "#1A1E1B",
      layoutPattern: "centered-horizon",
      wireframeLines: {
        eyebrowWidth: "26%",
        headlineWidth: "64%",
        sublineWidth: "46%",
      },
    },
    tags: ["retro", "hardware", "centered", "indie"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-05-parkbench-os",
    slug: "parkbench-os",
    slotNumber: 5,
    title: "Parkbench OS",
    tagline: "Playful 16-bit daylight narrative with calm copy pocket",
    summary:
      "Asymmetric 60/40 composition reserving crisp upper-left sky for copy while bottom-right grounds a tactile work scene.",
    category: "saas",
    mood: "playful",
    layoutPattern: "asymmetric-split",
    status: "published",
    featured: true,
    image: {
      src: "/design-references/Cofounder_lets_you_run_an_718aa0d1.jpg",
      alt: "16-bit pixel-art scene with an oak tree canopy, open laptop, field journal, park bench, and city skyline",
      width: 3900,
      height: 2280,
      objectPosition: "58% 60%",
    },
    palette: [
      { name: "Pixel Azure", hex: "#168CE2", role: "background" },
      { name: "Warm Paper", hex: "#FFFDF7", role: "surface" },
      { name: "Forest Ink", hex: "#14211D", role: "ink" },
      { name: "Meadow Lime", hex: "#76C44D", role: "accent" },
    ],
    typography: {
      displayFont: "Bricolage Grotesque",
      bodyFont: "Geist",
      accentFont: "Geist Mono",
    },
    spec: {
      navStyle: "Light bordered container spanning sky and dark canopy",
      headlinePlacement: "Left-aligned inside open upper-left sky quadrant",
      ctaStructure: "Warm paper primary button + white outline secondary link",
      mobileAdaptation: "Stacked top copy over cropped bottom-right desk scene",
    },
    schematic: {
      skyTop: "#1384D9",
      skyBottom: "#6EC0F5",
      groundAccent: "#56A83B",
      surfaceTint: "#FFFDF7",
      inkColor: "#FFFFFF",
      layoutPattern: "asymmetric-split",
      wireframeLines: {
        eyebrowWidth: "32%",
        headlineWidth: "58%",
        sublineWidth: "48%",
      },
    },
    tags: ["pixel-art", "playful", "asymmetric", "product"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-06-nocturne-valley",
    slug: "nocturne-valley",
    slotNumber: 6,
    title: "Nocturne Valley",
    tagline: "35mm analog film grain and misty horizon thirds",
    summary:
      "Restrained poetic editorial hero pairing classical serif display type with unhurried atmospheric depth.",
    category: "storytelling",
    mood: "cinematic",
    layoutPattern: "centered-horizon",
    status: "published",
    featured: true,
    image: {
      src: "/design-references/Removing_text_from_image_142fa3fe_2K-clean.png",
      alt: "Atmospheric 35mm landscape of a pianist seated outdoors in a wildflower meadow overlooking misty valleys",
      width: 2752,
      height: 1536,
      objectPosition: "50% 62%",
    },
    palette: [
      { name: "Sage Dawn", hex: "#7A9192", role: "background" },
      { name: "Warm Ivory", hex: "#F5EFE6", role: "surface" },
      { name: "Deep Umber", hex: "#1D1B18", role: "ink" },
      { name: "Amber Meadow", hex: "#A67E36", role: "accent" },
    ],
    typography: {
      displayFont: "Instrument Serif",
      bodyFont: "Geist",
    },
    spec: {
      navStyle: "Ultra-thin transparent cream nav without heavy pill chrome",
      headlinePlacement: "Centered along vertical axis in upper diffused sky",
      ctaStructure: "Single understated ghost CTA above horizon mist",
      mobileAdaptation: "Vertical central corridor spotlighting horizon & figure",
    },
    schematic: {
      skyTop: "#7B9293",
      skyBottom: "#D8B9A3",
      groundAccent: "#8B6F36",
      surfaceTint: "#F5EFE6",
      inkColor: "#F5EFE6",
      layoutPattern: "centered-horizon",
      wireframeLines: {
        eyebrowWidth: "24%",
        headlineWidth: "60%",
        sublineWidth: "42%",
      },
    },
    tags: ["cinematic", "film-grain", "serif", "editorial"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-07-cobalt-meadow",
    slug: "cobalt-meadow",
    slotNumber: 7,
    title: "Cobalt Meadow",
    tagline: "High-saturation cobalt sky over luminous rim-lit florals",
    summary:
      "Radiant daylight SaaS layout combining 65% unobstructed blue sky above with shallow depth-of-field warmth below.",
    category: "saas",
    mood: "daylight",
    layoutPattern: "centered-horizon",
    status: "published",
    featured: false,
    image: {
      src: "/design-references/Remove_text_from_image_e60b1da5_2K.jpg",
      alt: "High-saturation deep cobalt sky opening over sunlit pink and white wildflower daisies with foreground bokeh",
      width: 2752,
      height: 1536,
      objectPosition: "50% 58%",
    },
    palette: [
      { name: "Deep Cobalt", hex: "#043D6E", role: "background" },
      { name: "Cloud White", hex: "#FFFFFF", role: "surface" },
      { name: "Sky Azure", hex: "#1A75B8", role: "accent" },
      { name: "Petal Blush", hex: "#FADAD6", role: "ink" },
    ],
    typography: {
      displayFont: "Geist",
      bodyFont: "Geist",
    },
    spec: {
      navStyle: "Transparent white links over subtle top gradient scrim",
      headlinePlacement: "Upper-center deep blue sky clear of backlit horizon",
      ctaStructure: "Pure white pill + translucent glass secondary action",
      mobileAdaptation: "Natural 60/40 portrait ratio keeping flowers grounded",
    },
    schematic: {
      skyTop: "#033B6B",
      skyBottom: "#257CC0",
      groundAccent: "#3E7A25",
      surfaceTint: "#FFFFFF",
      inkColor: "#FFFFFF",
      layoutPattern: "centered-horizon",
      wireframeLines: {
        eyebrowWidth: "30%",
        headlineWidth: "68%",
        sublineWidth: "50%",
      },
    },
    tags: ["cobalt", "daylight", "high-contrast", "saas"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-08-riverbend-dispatch",
    slug: "riverbend-dispatch",
    slotNumber: 8,
    title: "Riverbend Dispatch",
    tagline: "S-curve golden-hour river balancing left-aligned story copy",
    summary:
      "Directional landscape composition where cool upper-left slate sky anchors editorial copy opposite a sunlit river bend.",
    category: "storytelling",
    mood: "pastoral",
    layoutPattern: "asymmetric-split",
    status: "published",
    featured: false,
    image: {
      src: "/design-references/nature.jpeg",
      alt: "Golden-hour meadow landscape with a silver river winding in an S-curve toward a sunlit horizon",
      width: 736,
      height: 414,
      objectPosition: "50% 55%",
    },
    palette: [
      { name: "Slate Sky", hex: "#64839C", role: "background" },
      { name: "Warm Paper", hex: "#FFFCF6", role: "surface" },
      { name: "Deep Pine", hex: "#182115", role: "ink" },
      { name: "Golden Field", hex: "#6C8122", role: "accent" },
    ],
    typography: {
      displayFont: "Instrument Serif",
      bodyFont: "Geist",
    },
    spec: {
      navStyle: "Frosted warm-paper floating strip across top container",
      headlinePlacement: "Upper-left cool sky quadrant avoiding right sun glare",
      ctaStructure: "Solid deep-pine pill + editorial text link",
      mobileAdaptation: "Vertical crop along river S-curve beneath sky header",
    },
    schematic: {
      skyTop: "#64839C",
      skyBottom: "#ECE2C8",
      groundAccent: "#6C8122",
      surfaceTint: "#FFFCF6",
      inkColor: "#182115",
      layoutPattern: "asymmetric-split",
      wireframeLines: {
        eyebrowWidth: "28%",
        headlineWidth: "56%",
        sublineWidth: "46%",
      },
    },
    tags: ["storytelling", "golden-hour", "leading-line", "editorial"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-09-cloudline-press",
    slug: "cloudline-press",
    slotNumber: 9,
    title: "Cloudline Press",
    tagline: "Diagonal hillside slope paired with painterly sky block",
    summary:
      "Bold editorial color-blocking inspired by painted cel backgrounds, giving left-aligned type crisp sky separation.",
    category: "editorial",
    mood: "daylight",
    layoutPattern: "diagonal-color-block",
    status: "published",
    featured: false,
    image: {
      src: "/design-references/Cloud, Blue Clear Sky, Green Hill, Anime, Wallpaper.jpeg",
      alt: "Painterly cerulean sky with a towering warm cumulus cloud above a diagonal sunlit green hillside",
      width: 736,
      height: 414,
      objectPosition: "50% 52%",
    },
    palette: [
      { name: "Deep Cerulean", hex: "#065E9E", role: "background" },
      { name: "Cloud Cream", hex: "#FFF1D4", role: "surface" },
      { name: "Forest Base", hex: "#1B4916", role: "ink" },
      { name: "Hillside", hex: "#5FA023", role: "accent" },
    ],
    typography: {
      displayFont: "Bricolage Grotesque",
      bodyFont: "Geist",
    },
    spec: {
      navStyle: "Full-width transparent white bar across cerulean top",
      headlinePlacement: "Upper-left blue sky beside right cumulus silhouette",
      ctaStructure: "Warm cream primary pill + ghost secondary link",
      mobileAdaptation: "Tighter crop on left sky with hillside grounding bottom 25%",
    },
    schematic: {
      skyTop: "#055A99",
      skyBottom: "#1781C2",
      groundAccent: "#4E8B21",
      surfaceTint: "#FFF1D4",
      inkColor: "#FFFDF7",
      layoutPattern: "diagonal-color-block",
      wireframeLines: {
        eyebrowWidth: "30%",
        headlineWidth: "60%",
        sublineWidth: "48%",
      },
    },
    tags: ["editorial", "diagonal", "painterly", "bold"],
    createdAt: "2026-11-12",
  },
  {
    id: "concept-10-glasshouse-index",
    slug: "glasshouse-index",
    slotNumber: 10,
    title: "Glasshouse Index",
    tagline: "Flagship directory hero with grounded multi-card preview deck",
    summary:
      "Two-tier inspiration showcase combining clean top mood filters with three browser-framed hero cards over soft hills.",
    category: "directories",
    mood: "architectural",
    layoutPattern: "two-tier-showcase",
    status: "placeholder",
    featured: false,
    palette: [
      { name: "Dawn Sky", hex: "#DCE9F2", role: "background" },
      { name: "Studio Card", hex: "#FFFFFF", role: "surface" },
      { name: "Ink Slate", hex: "#111827", role: "ink" },
      { name: "Meadow Base", hex: "#3F6A20", role: "accent" },
    ],
    typography: {
      displayFont: "Instrument Serif",
      bodyFont: "Geist",
      accentFont: "Geist Mono",
    },
    spec: {
      navStyle: "Translucent studio header with subtle 1px bottom hairline",
      headlinePlacement: "Centered upper sky above interactive mood filter chips",
      ctaStructure: "Primary obsidian explore pill + color mood browser link",
      mobileAdaptation: "Single-column header + horizontally scrollable preview deck",
    },
    schematic: {
      skyTop: "#DCE9F2",
      skyBottom: "#F7F3EA",
      groundAccent: "#3F6A20",
      surfaceTint: "#FFFFFF",
      inkColor: "#111827",
      layoutPattern: "two-tier-showcase",
      wireframeLines: {
        eyebrowWidth: "34%",
        headlineWidth: "70%",
        sublineWidth: "54%",
      },
    },
    tags: ["directory", "flagship", "two-tier", "showcase"],
    createdAt: "2026-11-12",
  },
];

export function getFeaturedHeroPlaceholders(limit = 6): HeroDesignEntry[] {
  const featured = HERO_CATALOG.filter((item) => item.featured);
  return featured.slice(0, limit);
}

export function getHeroCategoriesWithCounts() {
  return HERO_CATEGORIES.map((category) => {
    const items = HERO_CATALOG.filter((item) => item.category === category.id);
    return {
      ...category,
      count: items.length,
    };
  });
}

export function getHeroBySlug(slug: string): HeroDesignEntry | undefined {
  return HERO_CATALOG.find((item) => item.slug === slug);
}

export function getAdjacentHeroes(slug: string): {
  previous: HeroDesignEntry | null;
  next: HeroDesignEntry | null;
} {
  const index = HERO_CATALOG.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: index > 0 ? HERO_CATALOG[index - 1] : null,
    next: index < HERO_CATALOG.length - 1 ? HERO_CATALOG[index + 1] : null,
  };
}

export function filterHeroCatalog(options: {
  category?: HeroCategoryId | "all";
  mood?: HeroVisualMood | "all";
  layoutPattern?: HeroLayoutPattern | "all";
  query?: string;
  favoriteIds?: string[];
}): HeroDesignEntry[] {
  const normalizedQuery = options.query?.trim().toLowerCase() ?? "";
  const favoriteSet = options.favoriteIds
    ? new Set(options.favoriteIds)
    : null;

  return HERO_CATALOG.filter((entry) => {
    if (
      options.category &&
      options.category !== "all" &&
      entry.category !== options.category
    ) {
      return false;
    }
    if (options.mood && options.mood !== "all" && entry.mood !== options.mood) {
      return false;
    }
    if (
      options.layoutPattern &&
      options.layoutPattern !== "all" &&
      entry.layoutPattern !== options.layoutPattern
    ) {
      return false;
    }
    if (favoriteSet && !favoriteSet.has(entry.id)) {
      return false;
    }
    if (!normalizedQuery) return true;

    const haystack = [
      entry.title,
      entry.tagline,
      entry.summary,
      entry.category,
      entry.mood,
      entry.layoutPattern,
      entry.typography.displayFont,
      ...entry.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

/**
 * Next.js's built-in `/_next/image` optimizer fails with 404 in `next start`
 * when a local asset filename contains commas (e.g. `Cloud, Blue Clear Sky, ...`).
 * Encoding path segments and bypassing the optimizer for comma-containing filenames
 * ensures every original imported image renders reliably without altering source files.
 */
export function getHeroImageRenderProps(src: string): {
  src: string;
  unoptimized: boolean;
} {
  if (!src.includes(",")) {
    return { src, unoptimized: false };
  }
  const encodedPath = src
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .join("/");
  return { src: encodedPath, unoptimized: true };
}

