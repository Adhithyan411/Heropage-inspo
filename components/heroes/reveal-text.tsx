"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealWordsProps {
  lines: string[];
  className?: string;
  baseDelayMs?: number;
  wordStepMs?: number;
}

/**
 * Word-by-word clipped upward reveal inspired by TasteSkill's hero headline entrance.
 */
export function RevealWords({
  lines,
  className = "",
  baseDelayMs = 80,
  wordStepMs = 55,
}: RevealWordsProps) {
  const tokenizedLines = lines.map((line, lineIdx) => {
    const priorWordCount = lines
      .slice(0, lineIdx)
      .reduce((sum, prev) => sum + prev.split(" ").length, 0);
    const words = line.split(" ").map((word, wordIdx) => ({
      word,
      delay: baseDelayMs + (priorWordCount + wordIdx) * wordStepMs,
    }));
    return { line, words };
  });

  return (
    <span className={className}>
      {tokenizedLines.map(({ line, words }, lineIdx) => (
        <span key={`${line}-${lineIdx}`} className="block">
          {words.map(({ word, delay }, wordIdx) => (
            <span key={`${word}-${wordIdx}`}>
              <span className="hero-word-clip">
                <span
                  className="hero-word-inner"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {word}
                </span>
              </span>
              {wordIdx < words.length - 1 ? " " : ""}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  delayMs?: number;
  yOffset?: number;
  className?: string;
}

/**
 * Smooth scroll-triggered reveal with subtle vertical glide and zero bounce.
 * Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  delayMs = 0,
  yOffset = 20,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${yOffset}px, 0)`,
        transition: `opacity 680ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 760ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
