import type { Metadata } from "next";
import { FavoritesClient } from "@/components/heroes/favorites-client";

export const metadata: Metadata = {
  title: "Saved Concepts",
  description:
    "View your locally saved website hero-section concept blueprints.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}

