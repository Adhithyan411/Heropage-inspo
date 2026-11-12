import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignDetailClient } from "@/components/heroes/design-detail-client";
import {
  getAdjacentHeroes,
  getHeroBySlug,
  HERO_CATALOG,
} from "@/lib/heroes/catalog";

export function generateStaticParams() {
  return HERO_CATALOG.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getHeroBySlug(slug);
  if (!entry) {
    return { title: "Concept Not Found" };
  }
  return {
    title: `${entry.title} — Concept Spec`,
    description: entry.summary,
  };
}

export default async function DesignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getHeroBySlug(slug);
  if (!entry) {
    notFound();
  }

  const { previous, next } = getAdjacentHeroes(slug);

  return (
    <DesignDetailClient entry={entry} previous={previous} next={next} />
  );
}

