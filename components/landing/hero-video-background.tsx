"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/homepage-koi-pond.mp4";
const POSTER_SRC = "/videos/homepage-koi-pond-poster.jpg";

/**
 * Full-bleed looping koi pond video backdrop for the landing hero.
 * Renders an instant poster fallback underneath, fades in a single muted
 * inline <video> once ready, pauses playback off-screen, and disables motion
 * automatically when `prefers-reduced-motion: reduce` is enabled.
 */
export function HeroVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;

    const syncPlayback = () => {
      if (motionQuery.matches || !inView) {
        video.pause();
        return;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy; poster fallback remains visible.
        });
      }
    };

    if (video.readyState >= 2) {
      queueMicrotask(() => setVideoReady(true));
    }

    syncPlayback();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.02 },
    );
    io.observe(container);

    const onMotionChange = () => syncPlayback();
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      io.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden bg-[#103229]"
    >
      {/* Immediate static poster fallback (also active under prefers-reduced-motion) */}
      <img
        src={POSTER_SRC}
        alt=""
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Single responsive looping background video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
        className={`motion-reduce:hidden absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-out ${videoReady ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Subtle atmospheric emerald-dark scrim for crisp text contrast */}
      <div className="absolute inset-0 bg-[#071f19]/30" />

      {/* Gentle radial depth behind centered headline & CTAs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_98%_92%_at_90%_6%,rgba(6,26,22,0.42)_0%,rgba(6,26,22,0.14)_68%,transparent_100%)]" />

      {/* Top edge tint so transparent fixed navbar links stay sharp over blossoms */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

      {/* Subtle vertical edge fade into the white showcase section below */}
      <div className="absolute inset-x-0 bottom-0 h-10 sm:h-55 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.28)_55%,rgba(255,255,255,0.78)_85%,#ffffff_100%)]" />
    </div>
  );
}