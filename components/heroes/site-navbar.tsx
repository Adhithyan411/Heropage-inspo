"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Bookmark, Menu, X } from "lucide-react";
import { BrandMark } from "./brand-mark";

interface SiteNavbarProps {
  favoriteCount: number;
  heroDarkHeader?: boolean;
}

const NAV_LINKS = [
  { label: "Gallery", href: "/designs" },
  { label: "Directions", href: "/#directions" },
  { label: "Before & After", href: "/#before-after" },
  { label: "Featured", href: "/#featured-designs" },
];

/**
 * Floating sticky glass pill navigation bar inspired by TasteSkill.
 * Transitions smoothly between dark translucent glass over the sunset hero
 * and frosted cream glass once scrolled onto the light editorial canvas.
 */
export function SiteNavbar({
  favoriteCount,
  heroDarkHeader = false,
}: SiteNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOverDarkHero, setIsOverDarkHero] = useState(heroDarkHeader);
  const pathname = usePathname();

  useEffect(() => {
    if (!heroDarkHeader) {
      const frame = requestAnimationFrame(() => setIsOverDarkHero(false));
      return () => cancelAnimationFrame(frame);
    }

    let rafId = 0;
    const syncNavTone = () => {
      rafId = 0;
      const darkThreshold = Math.min(window.innerHeight * 0.62, 540);
      const nextDark = window.scrollY < darkThreshold;
      setIsOverDarkHero((prev) => (prev === nextDark ? prev : nextDark));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(syncNavTone);
      }
    };

    syncNavTone();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroDarkHeader]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex flex-col items-center px-3 sm:top-4">
      <nav
        aria-label="Primary navigation"
        style={{
          backdropFilter: "blur(14px) saturate(1.4)",
          WebkitBackdropFilter: "blur(14px) saturate(1.4)",
        }}
        className={`pointer-events-auto flex h-[50px] w-full max-w-[780px] items-center justify-between gap-3 rounded-2xl px-3.5 transition-all duration-300 sm:px-4 ${
          isOverDarkHero
            ? "border border-white/15 bg-[#140A05]/45 text-[#FFF6EF] shadow-[0_8px_30px_-10px_rgba(20,10,5,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]"
            : "border border-[#140A05]/10 bg-[#F8F4EE]/86 text-[#1A0E08] shadow-[0_8px_28px_-12px_rgba(20,10,5,0.14),inset_0_1px_0_rgba(255,255,255,0.75)]"
        }`}
      >
        <BrandMark compact tone={isOverDarkHero ? "light" : "dark"} />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/designs" && pathname?.startsWith("/designs");
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-2.5 py-1.5 text-[14px] font-medium tracking-[-0.01em] transition-colors ${
                    isOverDarkHero
                      ? isActive
                        ? "bg-white/15 text-white"
                        : "text-[#FFF0E4]/85 hover:bg-white/10 hover:text-white"
                      : isActive
                        ? "bg-[#140A05]/8 text-[#1A0E08]"
                        : "text-[#1A0E08]/70 hover:bg-[#140A05]/5 hover:text-[#1A0E08]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/favorites"
            title="View saved placeholder concepts (stored locally)"
            className={`inline-flex h-8 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-medium transition-colors ${
              isOverDarkHero
                ? "border-white/15 bg-white/10 text-[#FFF6EF] hover:bg-white/18"
                : pathname === "/favorites"
                  ? "border-[#FF5B14]/40 bg-[#FF5B14]/10 text-[#C2410C]"
                  : "border-[#140A05]/10 bg-white/80 text-[#1A0E08]/80 hover:border-[#140A05]/20 hover:text-[#1A0E08]"
            }`}
          >
            <Bookmark className="h-3.5 w-3.5 text-[#FF5B14]" />
            <span className="font-mono text-[11px]">{favoriteCount}</span>
          </Link>

          <Link
            href="/designs"
            className={`inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-[13px] font-semibold tracking-[-0.01em] transition-all ${
              isOverDarkHero
                ? "bg-[#FFF6EF] text-[#140A05] shadow-xs hover:bg-white"
                : "bg-[#140A05] text-[#FFF6EF] shadow-xs hover:bg-[#2A1309]"
            }`}
          >
            <span>Explore Designs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border md:hidden ${
            isOverDarkHero
              ? "border-white/20 bg-white/10 text-white"
              : "border-[#140A05]/12 bg-white text-[#1A0E08]"
          }`}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className={`pointer-events-auto mt-2 w-full max-w-[780px] rounded-2xl border p-3.5 shadow-xl backdrop-blur-xl md:hidden ${
            isOverDarkHero
              ? "border-white/15 bg-[#140A05]/92 text-[#FFF6EF]"
              : "border-[#140A05]/10 bg-[#F8F4EE]/95 text-[#1A0E08]"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                    isOverDarkHero
                      ? "text-[#FFF0E4]/90 hover:bg-white/10"
                      : "text-[#1A0E08]/80 hover:bg-[#140A05]/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={`mt-3 flex items-center justify-between gap-3 border-t pt-3 ${
              isOverDarkHero ? "border-white/12" : "border-[#140A05]/10"
            }`}
          >
            <Link
              href="/favorites"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-medium"
            >
              <Bookmark className="h-3.5 w-3.5 text-[#FF5B14]" />
              Saved locally: <strong className="font-mono">{favoriteCount}</strong>
            </Link>
            <Link
              href="/designs"
              onClick={() => setMobileOpen(false)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold ${
                isOverDarkHero
                  ? "bg-[#FFF6EF] text-[#140A05]"
                  : "bg-[#140A05] text-[#FFF6EF]"
              }`}
            >
              <span>Explore Designs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
