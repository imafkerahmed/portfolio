"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { HeroIntroLeft } from "./HeroIntroLeft";

interface HeroOverlayProps {
  open: boolean;
  onDismiss?: () => void;
  rightSide?: React.ReactNode; // optional right-side content
}

export function HeroOverlay({ open, onDismiss, rightSide = null }: HeroOverlayProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [sliding, setSliding] = useState(false);

  const startSlideOut = useCallback(() => {
    if (sliding) return;
    setSliding(true);
    // Wait for CSS transition to complete before unmounting
    const DURATION = 500; // ms — keep in sync with class duration-500
    const t = setTimeout(() => {
      onDismiss?.();
    }, DURATION);
    return () => clearTimeout(t);
  }, [onDismiss, sliding]);

  // ESC to dismiss (optional)
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") startSlideOut();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, startSlideOut]);

  // Slide-away on scroll/touch drag (downwards intent)
  useEffect(() => {
    if (!open) return;
    let touchStartY = 0;
    let handled = false;

    const onWheel = (e: WheelEvent) => {
      if (handled || sliding) return;
      if (e.deltaY > 30) {
        handled = true;
        startSlideOut();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (handled || sliding) return;
      const dy = (e.touches[0]?.clientY ?? 0) - touchStartY;
      // swipe up gesture (content revealing) is negative dy; accept either dir beyond threshold
      if (Math.abs(dy) > 40) {
        handled = true;
        startSlideOut();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [open, sliding, startSlideOut]);

  // If closed, unmount to avoid accidental overlays
  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className={[
        "fixed inset-0 z-40",
        "bg-gradient-to-b from-background via-background/95 to-background",
        "flex items-center justify-center",
        // Slide-out animation
        "transition-transform duration-500 ease-out",
        sliding ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center px-6 sm:px-10">
        {/* Left content */}
        <HeroIntroLeft />

        {/* Optional right side content */}
        <div className="hidden md:flex justify-center items-start min-h-[320px]">
          {rightSide}
        </div>
      </div>

      {/* Bottom CTA to reveal content (simple, accessible) */}
      <button
        type="button"
        onClick={() => startSlideOut()}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition"
        aria-label="Scroll to explore"
      >
        <span className="flex flex-col items-center text-sm">
          <span className="animate-pulse">Scroll to Explore</span>
          <ChevronDown className="mt-1 h-5 w-5 animate-bounce" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
}