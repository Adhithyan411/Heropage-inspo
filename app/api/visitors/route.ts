import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  ensureVisitorTables,
  getDb,
  isUndefinedTableError,
} from "../../../lib/db";

// Preserve the historical site key "stick-it-up" so existing Neon rows remain intact.
const DEFAULT_SITE = "stick-it-up";
const SITE_REGEX = /^[a-zA-Z0-9_\-\.]{1,64}$/;
const VISITOR_COOKIE_NAME = "sb_visitor_id";
const VISITOR_TOKEN_REGEX = /^[a-zA-Z0-9_-]{16,128}$/;

interface MemoryVisitorRecord {
  firstSeen: number;
  lastSeen: number;
  visitCount: number;
}

interface MemorySiteEntry {
  totalVisits: number;
  visitors: Map<string, MemoryVisitorRecord>;
}

// Local development / offline fallback when DATABASE_URL is not configured outside production.
const memoryVisitors = new Map<string, MemorySiteEntry>();

function getMemorySite(site: string): MemorySiteEntry {
  let entry = memoryVisitors.get(site);
  if (!entry) {
    entry = { totalVisits: 0, visitors: new Map() };
    memoryVisitors.set(site, entry);
  }
  return entry;
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-visitor-id",
  };
}

function noStoreHeaders(): Record<string, string> {
  return {
    ...corsHeaders(),
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: noStoreHeaders(),
  });
}

function sanitizeSite(input?: string | null): string {
  if (!input) return DEFAULT_SITE;
  const clean = input.trim();
  if (!SITE_REGEX.test(clean)) return DEFAULT_SITE;
  return clean;
}

function sanitizeVisitorToken(input?: string | null): string | null {
  if (!input) return null;
  const clean = input.trim();
  return VISITOR_TOKEN_REGEX.test(clean) ? clean : null;
}

function resolveVisitorIdentity(
  req: NextRequest,
  site: string
): { visitorToken: string; visitorHash: string; shouldSetCookie: boolean } {
  const cookieToken = sanitizeVisitorToken(
    req.cookies.get(VISITOR_COOKIE_NAME)?.value
  );
  const headerToken = sanitizeVisitorToken(req.headers.get("x-visitor-id"));
  const visitorToken = cookieToken ?? headerToken ?? crypto.randomUUID();
  const shouldSetCookie = cookieToken !== visitorToken;

  // Hash an opaque per-browser UUID rather than network IPs so users behind shared NAT/proxies stay distinct.
  const visitorHash = crypto
    .createHash("sha256")
    .update(`${site}:v2:${visitorToken}`)
    .digest("hex");

  return { visitorToken, visitorHash, shouldSetCookie };
}

function attachVisitorCookie(
  res: NextResponse,
  visitorToken: string,
  shouldSetCookie: boolean
): NextResponse {
  if (!shouldSetCookie) return res;
  res.cookies.set({
    name: VISITOR_COOKIE_NAME,
    value: visitorToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

async function withVisitorTables<T>(
  sql: ReturnType<typeof getDb>,
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isUndefinedTableError(error)) {
      throw error;
    }
    await ensureVisitorTables(sql);
    return await operation();
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const site = sanitizeSite(searchParams.get("site"));

  if (!process.env.DATABASE_URL) {
    if (process.env.VERCEL_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          site,
          error: "DATABASE_URL is not configured in production environment",
        },
        { status: 500, headers: noStoreHeaders() }
      );
    }

    const entry = getMemorySite(site);
    return NextResponse.json(
      {
        success: true,
        site,
        unique_visitors: entry.visitors.size,
        total_visits: entry.totalVisits,
        storage: "memory",
        fallback: true,
      },
      { headers: noStoreHeaders() }
    );
  }

  try {
    const sql = getDb();
    const rows = await withVisitorTables(sql, () =>
      sql`
        SELECT site_name, total_visits, unique_visitors
        FROM sites
        WHERE site_name = ${site}
        LIMIT 1;
      `
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: true,
          site,
          unique_visitors: 0,
          total_visits: 0,
          storage: "postgres",
        },
        { headers: noStoreHeaders() }
      );
    }

    const row = rows[0];
    return NextResponse.json(
      {
        success: true,
        site: row.site_name,
        unique_visitors: Number(row.unique_visitors),
        total_visits: Number(row.total_visits),
        storage: "postgres",
      },
      { headers: noStoreHeaders() }
    );
  } catch (error) {
    console.error("Visitors GET error:", error);
    return NextResponse.json(
      {
        success: false,
        site,
        error: "Failed to read visitor stats from database",
      },
      { status: 500, headers: noStoreHeaders() }
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
  const { visitorToken, visitorHash, shouldSetCookie } = resolveVisitorIdentity(
    req,
    site
  );

  if (!process.env.DATABASE_URL) {
    if (process.env.VERCEL_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          site,
          error: "DATABASE_URL is not configured in production environment",
        },
        { status: 500, headers: noStoreHeaders() }
      );
    }

    const entry = getMemorySite(site);
    const now = Date.now();
    const existing = entry.visitors.get(visitorHash);
    const isNewUnique = existing === undefined;

    entry.totalVisits += 1;
    entry.visitors.set(visitorHash, {
      firstSeen: existing?.firstSeen ?? now,
      lastSeen: now,
      visitCount: (existing?.visitCount ?? 0) + 1,
    });

    const res = NextResponse.json(
      {
        success: true,
        site,
        unique_visitors: entry.visitors.size,
        total_visits: entry.totalVisits,
        is_new_unique: isNewUnique,
        storage: "memory",
        fallback: true,
      },
      { headers: noStoreHeaders() }
    );
    return attachVisitorCookie(res, visitorToken, shouldSetCookie);
  }

  try {
    const sql = getDb();
    const updatedStats = await withVisitorTables(sql, async () => {
      // Ensure the parent site row exists before the atomic visitor upsert references it via FK.
      await sql`
        INSERT INTO sites (site_name, total_visits, unique_visitors)
        VALUES (${site}, 0, 0)
        ON CONFLICT (site_name) DO NOTHING;
      `;

      return await sql`
        WITH upsert_visitor AS (
          INSERT INTO site_visitors (
            site_name,
            visitor_hash,
            first_visited_at,
            last_visited_at,
            visit_count
          )
          VALUES (${site}, ${visitorHash}, NOW(), NOW(), 1)
          ON CONFLICT (site_name, visitor_hash)
          DO UPDATE SET
            last_visited_at = NOW(),
            visit_count = site_visitors.visit_count + 1
          RETURNING (xmax = 0) AS is_new_unique
        )
        UPDATE sites
        SET
          unique_visitors = sites.unique_visitors + CASE WHEN upsert_visitor.is_new_unique THEN 1 ELSE 0 END,
          total_visits = sites.total_visits + 1,
          updated_at = NOW()
        FROM upsert_visitor
        WHERE sites.site_name = ${site}
        RETURNING
          sites.site_name,
          sites.unique_visitors,
          sites.total_visits,
          upsert_visitor.is_new_unique;
      `;
    });

    const row = updatedStats[0];
    if (!row) {
      throw new Error(`Site row "${site}" missing after upsert`);
    }

    const res = NextResponse.json(
      {
        success: true,
        site: row.site_name,
        unique_visitors: Number(row.unique_visitors),
        total_visits: Number(row.total_visits),
        is_new_unique: Boolean(row.is_new_unique),
        storage: "postgres",
      },
      { headers: noStoreHeaders() }
    );
    return attachVisitorCookie(res, visitorToken, shouldSetCookie);
  } catch (error) {
    console.error("Visitors POST error:", error);
    return NextResponse.json(
      {
        success: false,
        site,
        error: "Failed to record visit in database",
      },
      { status: 500, headers: noStoreHeaders() }
    );
  }
}
