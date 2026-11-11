import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { ensureVisitorTables, getDb } from "../../../lib/db";

// Fallback in-memory visitor store when DATABASE_URL is not configured locally
const DEFAULT_SITE = "stick-it-up";
const SITE_REGEX = /^[a-zA-Z0-9_\-\.]{1,64}$/;
const memoryVisitors = new Map<
  string,
  { totalVisits: number; visitors: Map<string, number> }
>();

function getMemorySite(site: string) {
  let entry = memoryVisitors.get(site);
  if (!entry) {
    entry = { totalVisits: 0, visitors: new Map() };
    memoryVisitors.set(site, entry);
  }
  return entry;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-visitor-id",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

function sanitizeSite(input?: string | null): string {
  if (!input) return DEFAULT_SITE;
  const clean = input.trim();
  if (!SITE_REGEX.test(clean)) return DEFAULT_SITE;
  return clean;
}

function extractClientHash(req: NextRequest, site: string): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const customVisitorId = req.headers.get("x-visitor-id") || "";

  // One-way non-reversible SHA-256 hash for privacy-safe unique visitor identification
  return crypto
    .createHash("sha256")
    .update(`${site}:${ip}:${userAgent}:${customVisitorId}`)
    .digest("hex");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const site = sanitizeSite(searchParams.get("site"));

  if (!process.env.DATABASE_URL) {
    const entry = getMemorySite(site);
    return NextResponse.json(
      {
        site,
        unique_visitors: entry.visitors.size,
        total_visits: entry.totalVisits,
        fallback: true,
      },
      {
        headers: {
          ...corsHeaders(),
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  try {
    const sql = getDb();
    await ensureVisitorTables(sql);

    // Query site stats
    const rows = await sql`
      SELECT site_name, total_visits, unique_visitors
      FROM sites
      WHERE site_name = ${site}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      // Auto-initialize site if not present
      await sql`
        INSERT INTO sites (site_name, total_visits, unique_visitors)
        VALUES (${site}, 0, 0)
        ON CONFLICT (site_name) DO NOTHING;
      `;

      return NextResponse.json(
        {
          site,
          unique_visitors: 0,
          total_visits: 0,
        },
        { headers: corsHeaders() }
      );
    }

    const row = rows[0];
    return NextResponse.json(
      {
        site: row.site_name,
        unique_visitors: Number(row.unique_visitors),
        total_visits: Number(row.total_visits),
      },
      {
        headers: {
          ...corsHeaders(),
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Visitors GET error:", error);
    // Graceful fallback response
    return NextResponse.json(
      {
        site,
        unique_visitors: 0,
        total_visits: 0,
        fallback: true,
      },
      { headers: corsHeaders() }
    );
  }
}

export async function POST(req: NextRequest) {
  let siteInput: string | null = null;

  try {
    const body = await req.json().catch(() => null);
    if (body && typeof body.site === "string") {
      siteInput = body.site;
    }
  } catch {}

  if (!siteInput) {
    const { searchParams } = new URL(req.url);
    siteInput = searchParams.get("site");
  }

  const site = sanitizeSite(siteInput);
  const visitorHash = extractClientHash(req, site);

  if (!process.env.DATABASE_URL) {
    const entry = getMemorySite(site);
    const now = Date.now();
    const lastSeen = entry.visitors.get(visitorHash);
    const isNewUnique = lastSeen === undefined;
    const cooledDown = lastSeen !== undefined && now - lastSeen > 15 * 60 * 1000;

    if (isNewUnique || cooledDown) {
      entry.totalVisits += 1;
    }
    entry.visitors.set(visitorHash, now);

    return NextResponse.json(
      {
        success: true,
        site,
        unique_visitors: entry.visitors.size,
        total_visits: entry.totalVisits,
        is_new_unique: isNewUnique,
        fallback: true,
      },
      {
        headers: {
          ...corsHeaders(),
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }

  try {
    const sql = getDb();
    await ensureVisitorTables(sql);

    // 1. Ensure site exists
    await sql`
      INSERT INTO sites (site_name, total_visits, unique_visitors)
      VALUES (${site}, 0, 0)
      ON CONFLICT (site_name) DO NOTHING;
    `;

    // 2. Check previous visit timestamp before upsert, then upsert visitor
    // (xmax = 0) returns true if the row was freshly inserted (new unique visitor)
    const visitorRows = await sql`
      WITH prev AS (
        SELECT last_visited_at
        FROM site_visitors
        WHERE site_name = ${site} AND visitor_hash = ${visitorHash}
      ),
      upserted AS (
        INSERT INTO site_visitors (site_name, visitor_hash, first_visited_at, last_visited_at, visit_count)
        VALUES (${site}, ${visitorHash}, NOW(), NOW(), 1)
        ON CONFLICT (site_name, visitor_hash)
        DO UPDATE SET
          last_visited_at = NOW(),
          visit_count = site_visitors.visit_count + 1
        RETURNING (xmax = 0) AS is_new_unique
      )
      SELECT
        upserted.is_new_unique,
        COALESCE((SELECT (NOW() - prev.last_visited_at) > INTERVAL '15 minutes' FROM prev), FALSE) AS cooled_down
      FROM upserted;
    `;

    const isNewUnique = Boolean(visitorRows[0]?.is_new_unique);
    const cooledDown = Boolean(visitorRows[0]?.cooled_down);

    let updatedStats;

    if (isNewUnique) {
      // Brand new unique visitor: increment unique_visitors AND total_visits
      updatedStats = await sql`
        UPDATE sites
        SET
          unique_visitors = unique_visitors + 1,
          total_visits = total_visits + 1,
          updated_at = NOW()
        WHERE site_name = ${site}
        RETURNING unique_visitors, total_visits;
      `;
    } else if (cooledDown) {
      // Returning visitor after at least 15 minutes: increment total_visits only
      updatedStats = await sql`
        UPDATE sites
        SET
          total_visits = total_visits + 1,
          updated_at = NOW()
        WHERE site_name = ${site}
        RETURNING unique_visitors, total_visits;
      `;
    } else {
      // Rapid refresh or navigation within 15 minutes: do not increment to prevent spam
      updatedStats = await sql`
        SELECT unique_visitors, total_visits
        FROM sites
        WHERE site_name = ${site}
        LIMIT 1;
      `;
    }

    const row = updatedStats[0];

    return NextResponse.json(
      {
        success: true,
        site,
        unique_visitors: Number(row?.unique_visitors ?? 0),
        total_visits: Number(row?.total_visits ?? 0),
        is_new_unique: isNewUnique,
      },
      {
        headers: {
          ...corsHeaders(),
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Visitors POST error:", error);
    // Graceful fallback response
    return NextResponse.json(
      {
        success: false,
        site,
        unique_visitors: 0,
        total_visits: 0,
        fallback: true,
      },
      { headers: corsHeaders() }
    );
  }
}

