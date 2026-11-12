import type { HeroDesignEntry } from "@/lib/heroes/types";

interface HeroSchematicCanvasProps {
  entry: HeroDesignEntry;
  compact?: boolean;
  viewportMode?: "desktop" | "mobile";
}

/**
 * Renders a clearly labeled architectural wireframe schematic for a placeholder
 * hero concept without using reference images or fake finished artwork.
 */
export function HeroSchematicCanvas({
  entry,
  compact = false,
  viewportMode = "desktop",
}: HeroSchematicCanvasProps) {
  const { schematic } = entry;
  const isCentered =
    schematic.layoutPattern === "centered-horizon" ||
    schematic.layoutPattern === "grid-snapped" ||
    schematic.layoutPattern === "top-canopy-frame" ||
    schematic.layoutPattern === "two-tier-showcase";
  const isGrid = schematic.layoutPattern === "grid-snapped";
  const isTopCanopy = schematic.layoutPattern === "top-canopy-frame";
  const isTwoTier = schematic.layoutPattern === "two-tier-showcase";
  const isDiagonal = schematic.layoutPattern === "diagonal-color-block";

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none"
      style={{
        background: `linear-gradient(180deg, ${schematic.skyTop} 0%, ${schematic.skyBottom} 100%)`,
      }}
    >
      {/* Subtle architectural blueprint grid for grid-snapped concepts */}
      {isGrid && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: compact ? "24px 24px" : "36px 36px",
          }}
        />
      )}

      {/* Organic top canopy frame hint */}
      {isTopCanopy && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 flex justify-between opacity-35"
        >
          <div
            className="h-10 w-2/5 rounded-br-[48px]"
            style={{ backgroundColor: schematic.groundAccent }}
          />
          <div
            className="h-10 w-2/5 rounded-bl-[48px]"
            style={{ backgroundColor: schematic.groundAccent }}
          />
        </div>
      )}

      {/* Ground / horizon silhouette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: isDiagonal ? "36%" : isTopCanopy ? "18%" : "30%",
          backgroundColor: schematic.groundAccent,
          opacity: isGrid ? 0.22 : 0.88,
          clipPath: isDiagonal
            ? "polygon(0 72%, 100% 18%, 100% 100%, 0% 100%)"
            : "ellipse(75% 85% at 50% 100%)",
        }}
      />

      {/* Simulated navigation wireframe */}
      <div
        className={`relative z-10 flex items-center justify-between ${compact ? "px-3 pt-2.5" : "px-5 pt-4"
          }`}
      >
        <div
          className="h-2 w-10 rounded-full opacity-55"
          style={{ backgroundColor: schematic.inkColor }}
        />
        {viewportMode === "desktop" ? (
          <div className="flex items-center gap-1.5 opacity-40">
            <span
              className="h-1.5 w-6 rounded-full"
              style={{ backgroundColor: schematic.inkColor }}
            />
            <span
              className="h-1.5 w-6 rounded-full"
              style={{ backgroundColor: schematic.inkColor }}
            />
            <span
              className="h-1.5 w-6 rounded-full"
              style={{ backgroundColor: schematic.inkColor }}
            />
          </div>
        ) : null}
        <div
          className="h-3 w-8 rounded-full opacity-70"
          style={{ backgroundColor: schematic.surfaceTint }}
        />
      </div>

      {/* Simulated headline + subtitle + CTA wireframe block */}
      <div
        className={`relative z-10 flex flex-col ${isCentered ? "items-center text-center" : "items-start text-left"
          } ${isTopCanopy
            ? compact
              ? "mt-6 px-4"
              : "mt-12 px-6"
            : compact
              ? "mt-4 px-3.5"
              : "mt-8 px-6"
          }`}
      >
        <div
          className="mb-2 h-1.5 rounded-full opacity-45"
          style={{
            width: schematic.wireframeLines.eyebrowWidth,
            backgroundColor: schematic.inkColor,
          }}
        />
        <div
          className={`rounded-full opacity-80 ${compact ? "h-2.5" : "h-3.5"}`}
          style={{
            width: schematic.wireframeLines.headlineWidth,
            backgroundColor: schematic.inkColor,
          }}
        />
        <div
          className={`mt-1.5 rounded-full opacity-40 ${compact ? "h-1.5" : "h-2"}`}
          style={{
            width: schematic.wireframeLines.sublineWidth,
            backgroundColor: schematic.inkColor,
          }}
        />
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`rounded-full opacity-90 ${compact ? "h-3 w-12" : "h-4 w-16"}`}
            style={{ backgroundColor: schematic.surfaceTint }}
          />
          <span
            className={`rounded-full border opacity-55 ${compact ? "h-3 w-9" : "h-4 w-12"}`}
            style={{ borderColor: schematic.inkColor }}
          />
        </div>
      </div>

      {/* Grounded preview deck wireframe for two-tier directory layout */}
      {isTwoTier && (
        <div
          aria-hidden="true"
          className={`relative z-10 grid grid-cols-3 gap-2 ${compact ? "mx-3 mt-4" : "mx-6 mt-7"
            }`}
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`rounded-md border border-zinc-900/10 bg-white/85 shadow-xs ${compact ? "h-7" : "h-12"
                }`}
            />
          ))}
        </div>
      )}

      {/* Explicit placeholder badge */}
      <div className="absolute right-2.5 bottom-2.5 z-20">
        <span className="inline-flex items-center gap-1 rounded-full border border-zinc-900/15 bg-white/90 px-2 py-0.5 font-mono text-[10px] font-medium tracking-tight text-zinc-700 shadow-xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Placeholder · Slot {String(entry.slotNumber).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}