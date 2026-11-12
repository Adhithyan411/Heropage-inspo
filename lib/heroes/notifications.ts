"use client";

import { toast } from "sonner";
import type { HeroColorToken, HeroDesignEntry } from "./types";

const CLIPBOARD_ERROR_DESCRIPTION =
  "Clipboard access was blocked or unavailable in this browser.";

async function copyTextToClipboard(text: string): Promise<void> {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    throw new Error("Clipboard API unavailable");
  }
  await navigator.clipboard.writeText(text);
}

/**
 * Copies a HeroAtlas concept's canonical URL to the clipboard with a
 * single deduplicated Sonner promise notification (loading -> success / error).
 */
export async function copyDesignUrl(entry: HeroDesignEntry): Promise<boolean> {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/designs/${entry.slug}`
      : `/designs/${entry.slug}`;

  const task = copyTextToClipboard(url);

  toast.promise(task, {
    id: `copy-url-${entry.id}`,
    loading: `Copying link for ${entry.title}...`,
    success: {
      message: `Copied ${entry.title} URL`,
      description: url,
    },
    error: {
      message: `Could not copy ${entry.title} URL`,
      description: CLIPBOARD_ERROR_DESCRIPTION,
    },
  });

  try {
    await task;
    return true;
  } catch {
    return false;
  }
}

/**
 * Copies a color token hex value and surfaces immediate feedback.
 */
export async function copyColorToken(token: HeroColorToken): Promise<boolean> {
  try {
    await copyTextToClipboard(token.hex);
    toast.success(`Copied ${token.hex}`, {
      id: `copy-hex-${token.hex}`,
      description: `${token.name} (${token.role}) copied to clipboard.`,
    });
    return true;
  } catch {
    toast.error(`Could not copy ${token.hex}`, {
      id: `copy-hex-${token.hex}`,
      description: CLIPBOARD_ERROR_DESCRIPTION,
    });
    return false;
  }
}

/**
 * Generates and downloads a real JSON specification file for a HeroAtlas concept.
 */
export async function exportDesignSpecJson(
  entry: HeroDesignEntry,
): Promise<boolean> {
  const filename = `${entry.slug}-spec.json`;

  const task = (async () => {
    if (typeof window === "undefined" || typeof Blob === "undefined") {
      throw new Error("File download unavailable");
    }
    const payload = {
      schema: "heroatlas.concept.v1",
      exportedAt: new Date().toISOString(),
      concept: entry,
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);

    try {
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    }
  })();

  toast.promise(task, {
    id: `export-spec-${entry.id}`,
    loading: `Preparing ${filename}...`,
    success: {
      message: `Exported ${entry.title} spec`,
      description: `Downloaded ${filename} with palette and layout tokens.`,
    },
    error: {
      message: `Failed to export ${entry.title}`,
      description: "Your browser prevented generating the JSON file.",
    },
  });

  try {
    await task;
    return true;
  } catch {
    return false;
  }
}

