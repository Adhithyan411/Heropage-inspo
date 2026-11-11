"use client";

import { useEffect, useState } from "react";

interface VisitorStats {
  uniqueVisitors: number;
  totalVisits: number;
}

const VISITOR_STORAGE_KEY = "sb_vid";
const VISITOR_TOKEN_REGEX = /^[a-zA-Z0-9_-]{16,128}$/;
const recordedVisitsInPageLoad = new Map<string, Promise<VisitorStats>>();

function getOrCreateClientVisitorId(): string | null {
  try {
    const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (existing && VISITOR_TOKEN_REGEX.test(existing)) {
      return existing;
    }

    const generated =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 18)}`;

    window.localStorage.setItem(VISITOR_STORAGE_KEY, generated);
    return generated;
  } catch {
    return null;
  }
}

function recordVisitOnce(site: string): Promise<VisitorStats> {
  const existingPromise = recordedVisitsInPageLoad.get(site);
  if (existingPromise) {
    return existingPromise;
  }

  const requestPromise = (async () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const clientVisitorId = getOrCreateClientVisitorId();
    if (clientVisitorId) {
      headers["x-visitor-id"] = clientVisitorId;
    }

    const res = await fetch("/api/visitors", {
      method: "POST",
      cache: "no-store",
      credentials: "same-origin",
      headers,
      body: JSON.stringify({ site }),
    });

    if (!res.ok) {
      throw new Error(`Visitor API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const uniqueVisitors = Number(data.unique_visitors ?? 0);
    const totalVisits = Number(data.total_visits ?? uniqueVisitors);

    if (!Number.isFinite(uniqueVisitors) || uniqueVisitors < 0) {
      throw new Error("Visitor API returned invalid visitor count");
    }

    return {
      uniqueVisitors,
      totalVisits: Number.isFinite(totalVisits) ? totalVisits : uniqueVisitors,
    };
  })().catch((err) => {
    // Allow retries if this attempt failed (e.g., transient network error)
    recordedVisitsInPageLoad.delete(site);
    throw err;
  });

  recordedVisitsInPageLoad.set(site, requestPromise);
  return requestPromise;
}

// visitor counter connected to Neon PostgreSQL
export function VisitorCounter({ site = "stick-it-up" }: { site?: string }) {
  const [count, setCount] = useState<number>(0);
  const [totalVisits, setTotalVisits] = useState<number | null>(null);

  useEffect(() => {
    let unmounted = false;
    let frameId = 0;

    async function recordAndFetch() {
      try {
        const stats = await recordVisitOnce(site);
        const target = stats.uniqueVisitors;

        if (unmounted) return;
        setTotalVisits(stats.totalVisits);

        try {
          window.localStorage.setItem(`siu_visitors_${site}`, String(target));
        } catch {}

        // Smooth roll-up animation starting dynamically from 0
        const startCount = 0;
        const startTime = performance.now();
        const duration = Math.min(1000, Math.max(450, target * 120));

        const tick = (now: number) => {
          if (unmounted) return;
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const val = Math.round(startCount + (target - startCount) * ease);
          setCount(val);
          if (progress < 1) {
            frameId = requestAnimationFrame(tick);
          }
        };

        frameId = requestAnimationFrame(tick);
      } catch (err) {
        console.warn("Could not connect to live visitor DB, using last cached count", err);
        if (!unmounted) {
          try {
            const cached = Number(window.localStorage.getItem(`siu_visitors_${site}`));
            if (Number.isFinite(cached) && cached > 0) {
              setCount(cached);
              return;
            }
          } catch {}
          setCount((prev) => prev ?? 0);
        }
      }
    }

    recordAndFetch();

    return () => {
      unmounted = true;
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [site]);

  return (
    <div
      title={
        totalVisits !== null
          ? `Live verified unique visitors (Neon PostgreSQL) — ${totalVisits.toLocaleString()} total visits`
          : "Live verified unique visitors (Neon PostgreSQL)"
      }
      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white/85 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-medium text-zinc-700 shadow-xs backdrop-blur-xs transition-all hover:border-zinc-300 select-none"
    >
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-mono font-semibold text-zinc-900">
        {count.toLocaleString()}
      </span>
      <span className="hidden text-[11px] text-zinc-500 sm:inline">visitors</span>
    </div>
  );
}

// total npm downloads badge
export function NpmDownloadsBadge({ pkg = "stick-blush" }: { pkg?: string }) {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    let unmounted = false;

    fetch(`/api/npm-downloads?package=${encodeURIComponent(pkg)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!unmounted && typeof data?.downloads === "number") {
          setDownloads(data.downloads);
        }
      })
      .catch(() => {
        if (!unmounted) setDownloads(453);
      });

    return () => {
      unmounted = true;
    };
  }, [pkg]);

  return (
    <a
      href={`https://www.npmjs.com/package/${pkg}`}
      target="_blank"
      rel="noreferrer"
      title="Total npm downloads"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white/85 px-2 sm:px-2.5 py-1.5 sm:py-2 text-xs font-medium text-zinc-700 shadow-xs backdrop-blur-xs transition-all hover:border-zinc-300 select-none"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-red-600">
        <path d="M0 7.334v9.332h24V7.334H0zm4 8h-2.666V8.667H4v6.667zm5.334 0H6.668V8.667H9.334v6.667zm8 0h-4v-4h-1.334v4H10.668V8.667h6.666v6.667zm5.332 0h-4v-4h-1.332v4H16V8.667h6.666v6.667z" />
      </svg>
      <span className="font-mono  text-zinc-800">
        {downloads !== null ? downloads.toLocaleString() : "..."}
      </span>
      <span className="hidden text-[11px] text-zinc-500 sm:inline">total npm downloads</span>
    </a>
  );
}

// github star button
export function GitHubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let unmounted = false;

    // Read cached star count immediately after mount on client to avoid SSR hydration mismatch
    queueMicrotask(() => {
      if (unmounted) return;
      try {
        const cached = sessionStorage.getItem("sticky_gh_stars");
        if (cached !== null) {
          const val = parseInt(cached, 10);
          if (!isNaN(val)) setStars(val);
        }
      } catch {}
    });

    // Fetch from internal cached API route to avoid browser CORS/rate-limits
    fetch("/api/github-stars")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!unmounted && data && typeof data.stars === "number") {
          setStars(data.stars);
          try {
            sessionStorage.setItem("sticky_gh_stars", String(data.stars));
          } catch {}
        }
      })
      .catch(() => {
        // Fallback to direct fetch
        fetch("https://api.github.com/repos/Adhithyan411/Sticky")
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (!unmounted && data && typeof data.stargazers_count === "number") {
              setStars(data.stargazers_count);
              try {
                sessionStorage.setItem("sticky_gh_stars", String(data.stargazers_count));
              } catch {}
            }
          })
          .catch(() => {});
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <a
      href="https://github.com/Adhithyan411/Sticky"
      target="_blank"
      rel="noreferrer"
      aria-label="Star Sticky on GitHub"
      className="group inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl
        border border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-900
        px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-white
        shadow-[inset_0_1px_0_#ffffff18,0_1px_2px_#00000015]
        transition-all duration-150
        hover:from-zinc-700 hover:to-zinc-800
        active:scale-95"
    >
      {/* GitHub Octocat Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:scale-110"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>

      <span className="flex items-center gap-1 font-medium">
        Star
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 drop-shadow-xs"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </span>

      <span
        suppressHydrationWarning
        className="ml-0.5 rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[10px] sm:text-[11px] text-zinc-300"
      >
        {stars !== null ? stars : "..."}
      </span>
    </a>
  );
}
