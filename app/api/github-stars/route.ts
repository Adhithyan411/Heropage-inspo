import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/Adhithyan411/Sticky", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "stick-blush-app",
      },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      if (typeof data.stargazers_count === "number") {
        return NextResponse.json(
          { stars: data.stargazers_count },
          {
            headers: {
              "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
          }
        );
      }
    }
  } catch (err) {
    console.error("GitHub stars route error:", err);
  }

  // Graceful fallback
  return NextResponse.json(
    { stars: 0 },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}

