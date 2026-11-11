import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PACKAGE = "stick-blush";
const PACKAGE_REGEX = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const ONE_HOUR_MS = 60 * 60 * 1000;

interface CacheEntry {
  downloads: number;
  timestamp: number;
  start: string;
  end: string;
}

// In-memory 1-hour cache
const memoryCache = new Map<string, CacheEntry>();

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

/**
 * Split a date span [start, end] into 365-day chunks to adhere to npm's API limits
 */
function createDateChunks(startDateStr: string, endDateStr: string): Array<{ start: string; end: string }> {
  const chunks: Array<{ start: string; end: string }> = [];
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    return [{ start: startDateStr, end: endDateStr }];
  }

  let current = new Date(start);

  while (current < end) {
    const chunkStart = formatDate(current);
    const next = new Date(current);
    next.setDate(next.getDate() + 365);
    const chunkEnd = next > end ? formatDate(end) : formatDate(next);
    chunks.push({ start: chunkStart, end: chunkEnd });
    current = next;
  }

  return chunks.length > 0 ? chunks : [{ start: startDateStr, end: endDateStr }];
}

/**
 * Fetches total npm downloads across the entire available lifetime of a package
 */
async function fetchTotalDownloads(pkg: string): Promise<{ downloads: number; start: string; end: string }> {
  const todayStr = formatDate(new Date());
  let createdStr = "2026-11-01"; // Default conservative start for stick-blush

  // 1. Fetch package creation date from registry
  try {
    const regRes = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (regRes.ok) {
      const regData = await regRes.json();
      if (regData.time?.created) {
        createdStr = regData.time.created.split("T")[0];
      }
    }
  } catch (err) {
    console.warn("Could not fetch package created date from npm registry:", err);
  }

  // 2. Generate chunks up to 365 days
  const chunks = createDateChunks(createdStr, todayStr);

  // 3. Fetch downloads for each date window in parallel
  const results = await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const url = `https://api.npmjs.org/downloads/point/${chunk.start}:${chunk.end}/${encodeURIComponent(pkg)}`;
        const res = await fetch(url, {
          next: { revalidate: 3600 },
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          // If custom range failed, try fallback
          return 0;
        }

        const data = await res.json();
        return typeof data.downloads === "number" ? data.downloads : 0;
      } catch (err) {
        console.warn(`npm download fetch failed for chunk ${chunk.start}:${chunk.end}:`, err);
        return 0;
      }
    })
  );

  let total = results.reduce((acc, curr) => acc + curr, 0);

  // Fallback check if point query returned 0 downloads unexpectedly
  if (total === 0) {
    try {
      const monthRes = await fetch(
        `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg)}`,
        { next: { revalidate: 3600 } }
      );
      if (monthRes.ok) {
        const monthData = await monthRes.json();
        if (typeof monthData.downloads === "number" && monthData.downloads > 0) {
          total = monthData.downloads;
        }
      }
    } catch {}
  }

  return {
    downloads: total,
    start: createdStr,
    end: todayStr,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pkgParam = searchParams.get("package") || DEFAULT_PACKAGE;
  const pkg = PACKAGE_REGEX.test(pkgParam) ? pkgParam : DEFAULT_PACKAGE;

  // 1. Check in-memory 1-hour cache
  const cached = memoryCache.get(pkg);
  const now = Date.now();

  if (cached && now - cached.timestamp < ONE_HOUR_MS) {
    return NextResponse.json(
      {
        package: pkg,
        downloads: cached.downloads,
        formatted: cached.downloads.toLocaleString(),
        start: cached.start,
        end: cached.end,
        cached: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  // 2. Fetch fresh data
  try {
    const data = await fetchTotalDownloads(pkg);

    // Save to memory cache
    memoryCache.set(pkg, {
      downloads: data.downloads,
      timestamp: now,
      start: data.start,
      end: data.end,
    });

    return NextResponse.json(
      {
        package: pkg,
        downloads: data.downloads,
        formatted: data.downloads.toLocaleString(),
        start: data.start,
        end: data.end,
        cached: false,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching npm downloads:", error);

    // Use stale cache if available
    if (cached) {
      return NextResponse.json(
        {
          package: pkg,
          downloads: cached.downloads,
          formatted: cached.downloads.toLocaleString(),
          start: cached.start,
          end: cached.end,
          stale: true,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Default graceful fallback if npm is down
    return NextResponse.json(
      {
        package: pkg,
        downloads: 453,
        formatted: "453",
        fallback: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

