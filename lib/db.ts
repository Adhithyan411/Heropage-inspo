import { neon } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured in environment variables");
  }
  return url;
}

export function getDb() {
  const url = getDatabaseUrl();
  return neon(url);
}

let schemaReady: Promise<void> | null = null;

/**
 * Ensures the visitor tracking tables exist in a fresh Neon database.
 * Runs once per serverless instance and resets on error so transient failures can retry.
 */
export function ensureVisitorTables(sql: ReturnType<typeof getDb>): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS sites (
          site_name TEXT PRIMARY KEY,
          total_visits INTEGER NOT NULL DEFAULT 0,
          unique_visitors INTEGER NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS site_visitors (
          site_name TEXT NOT NULL REFERENCES sites(site_name) ON DELETE CASCADE,
          visitor_hash TEXT NOT NULL,
          first_visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          visit_count INTEGER NOT NULL DEFAULT 1,
          PRIMARY KEY (site_name, visitor_hash)
        );
      `;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

