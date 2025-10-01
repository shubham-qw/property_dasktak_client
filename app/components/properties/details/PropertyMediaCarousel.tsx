"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string; loop?: boolean; muted?: boolean };

export default function PropertyMediaCarousel({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  const current = items[index];

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  // Pause video when slide changes away from a video
  useEffect(() => {
    return () => {
      try { vidRef.current?.pause(); } catch {}
    };
  }, [index]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!items.length) return null;

  return (
    <section className="relative w-full">
      {/* MAIN media area */}
      <div className="relative">
        {/* Maintain aspect ratio */}
        <div className="relative h-[48vh] min-h-[360px] w-full overflow-hidden rounded-b-lg bg-black">
          {current.type === "image" ? (
            <img
              src={current.src}
              alt={current.alt ?? "Property media"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <video
              key={current.src}          // reset player when switching videos
              ref={vidRef}
              className="h-full w-full object-cover"
              poster={current.poster}
              controls
              playsInline
              // Safe defaults; you can change in the media item if needed
              muted={current.muted ?? false}
              loop={current.loop ?? false}
            >
              <source src={current.src} />
              {/* Optional: for HLS/DASH you’d use hls.js, but keeping it simple */}
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Nav arrows (show only if >1) */}
        {items.length > 1 && (
          <>
            <button
              aria-label="Previous"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur hover:bg-white"
            >
              ←
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur hover:bg-white"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      {items.length > 1 && (
        <div className="mx-auto mt-3 flex w-full max-w-5xl gap-2 overflow-x-auto px-4 pb-2">
          {items.map((m, i) => {
            const active = i === index;
            return (
              <button
                key={(m as any).src + i}
                onClick={() => setIndex(i)}
                className={clsx(
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border",
                  active ? "border-[#C76033]" : "border-transparent opacity-80 hover:opacity-100"
                )}
                aria-label={`Go to media ${i + 1}`}
              >
                {m.type === "image" ? (
                  <img src={m.src} alt={m.alt ?? "thumbnail"} className="h-full w-full object-cover" />
                ) : (
                  <>
                    <img
                      src={m.poster ?? "/video-thumb-fallback.jpg"}
                      alt={m.alt ?? "video thumbnail"}
                      className="h-full w-full object-cover"
                    />
                    {/* play badge */}
                    <span className="pointer-events-none absolute inset-0 grid place-items-center">
                      <span className="inline-block rounded-full bg-black/60 px-2 py-1 text-xs text-white">▶</span>
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
