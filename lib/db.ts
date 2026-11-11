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

