import Link from "next/link";

interface BrandMarkProps {
  href?: string;
  compact?: boolean;
  tone?: "dark" | "light";
}

/**
 * Geometric brand identity and logo placeholder for Website Hero Inspiration Library.
 */
export function BrandMark({
  href = "/",
  compact = false,
  tone = "dark",
}: BrandMarkProps) {
  const isLightText = tone === "light";

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5B14]"
    >
      <span
        aria-hidden="true"
        className={`relative flex h-7 w-7 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:-translate-y-0.5 ${
          isLightText
            ? "border-white/20 bg-white/12 text-[#FFF6EF]"
            : "border-[#140A05]/12 bg-white text-[#1A0E08] shadow-xs"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.25"
            y="3.25"
            width="15.5"
            height="13.5"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M2.5 11.75C5.6 10.1 8.4 10.2 10.8 11.4C13.1 12.55 15.2 12.35 17.5 10.9"
            stroke="#FF5B14"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="6.25" cy="7.25" r="1.25" fill="currentColor" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span
          className={`text-[15px] font-semibold tracking-[-0.03em] transition-colors ${
            isLightText ? "text-[#FFF6EF]" : "text-[#1A0E08]"
          }`}
        >
          HeroAtlas
        </span>
        {!compact && (
          <span
            className={`hidden font-mono text-[10px] tracking-[0.06em] uppercase sm:inline ${
              isLightText ? "text-[#FFF0E4]/65" : "text-[#1A0E08]/55"
            }`}
          >
            Library
          </span>
        )}
      </span>
    </Link>
  );
}
