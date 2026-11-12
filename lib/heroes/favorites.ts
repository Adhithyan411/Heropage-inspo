"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { HERO_CATALOG } from "./catalog";

const FAVORITES_STORAGE_KEY = "whil_favorites_v1";

function getConceptMeta(id: string) {
  const entry = HERO_CATALOG.find((item) => item.id === id);
  return {
    title: entry?.title ?? "Concept",
    slotLabel: entry
      ? `Slot ${String(entry.slotNumber).padStart(2, "0")}`
      : "Saved Concept",
  };
}

function readStoredFavorites(): { ids: string[]; corrupted: boolean } {
  if (typeof window === "undefined") return { ids: [], corrupted: false };
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return { ids: [], corrupted: false };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return { ids: [], corrupted: true };
    }
    return {
      ids: parsed.filter((item): item is string => typeof item === "string"),
      corrupted: false,
    };
  } catch {
    return { ids: [], corrupted: true };
  }
}

function persistStoredFavorites(next: string[]): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (next.length === 0) {
      window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
    } else {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Local-only favorites state for the Website Hero Inspiration Library.
 * Intentionally avoids any remote database calls.
 */
export function useHeroFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const favoriteIdsRef = useRef<string[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const { ids, corrupted } = readStoredFavorites();
      favoriteIdsRef.current = ids;
      setFavoriteIds(ids);
      if (corrupted) {
        toast.warning("Saved favorites data was reset", {
          id: "favorites-corrupt-reset",
          description: "Stored browser favorites were unreadable and restored to empty.",
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const applyNextFavorites = useCallback((next: string[]) => {
    favoriteIdsRef.current = next;
    setFavoriteIds(next);
    const savedToStorage = persistStoredFavorites(next);
    if (!savedToStorage) {
      toast.warning("Browser storage is unavailable", {
        id: "favorites-storage-warning",
        description:
          "Favorites updated for this session, but could not persist to localStorage.",
      });
    }
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      const current = favoriteIdsRef.current;
      const isRemoving = current.includes(id);
      const next = isRemoving
        ? current.filter((item) => item !== id)
        : [...current, id];

      applyNextFavorites(next);

      const { title, slotLabel } = getConceptMeta(id);
      if (isRemoving) {
        toast.info(`Removed "${title}"`, {
          id: `fav-${id}`,
          description: `${slotLabel} · Removed from Saved Concepts.`,
          action: {
            label: "Undo",
            onClick: () => {
              const latest = favoriteIdsRef.current;
              if (!latest.includes(id)) {
                applyNextFavorites([...latest, id]);
                toast.success(`Restored "${title}"`, {
                  id: `fav-restored-${id}`,
                  description: `${slotLabel} · Saved again to your local favorites.`,
                });
              }
            },
          },
        });
      } else {
        toast.success(`Saved "${title}"`, {
          id: `fav-${id}`,
          description: `${slotLabel} · Added to Saved Concepts.`,
        });
      }
    },
    [applyNextFavorites],
  );

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const clearFavorites = useCallback(() => {
    const previous = favoriteIdsRef.current;
    if (previous.length === 0) return;

    applyNextFavorites([]);

    const count = previous.length;
    toast.info(`Cleared ${count} saved ${count === 1 ? "concept" : "concepts"}`, {
      id: "favorites-clear",
      description: "Your local Saved Concepts list is now empty.",
      action: {
        label: "Undo",
        onClick: () => {
          applyNextFavorites(previous);
          toast.success(
            `Restored ${count} saved ${count === 1 ? "concept" : "concepts"}`,
            {
              id: "favorites-restored",
              description: "Recovered your local favorites list.",
            },
          );
        },
      },
    });
  }, [applyNextFavorites]);

  return {
    favoriteIds,
    favoriteCount: favoriteIds.length,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}

