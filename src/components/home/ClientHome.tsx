"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useHeroOverlay } from "@/hooks/useHeroOverlay";

// Load hero overlay only on client to avoid any SSR hydration edge cases
const HeroOverlay = dynamic(
  () => import("@/components/hero/HeroOverlay").then((m) => m.HeroOverlay),
  { ssr: false }
);

interface ClientHomeProps {
  children: React.ReactNode;
}

export function ClientHome({ children }: ClientHomeProps) {
  const { open, dismiss, reset } = useHeroOverlay(true);

  // Allow forcing the intro overlay via query param: ?hero=1 or ?resetHero=1
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("hero") || params.has("resetHero")) {
        reset();
      }
    } catch {}
  }, [reset]);

  return (
    <>
      <HeroOverlay open={open} onDismiss={dismiss} />

      <div
        className={[
          "transition",
          open ? "pointer-events-none select-none blur-[2px]" : "",
        ].join(" ")}
        aria-hidden={open ? "true" : "false"}
      >
        {children}
      </div>
    </>
  );
}
