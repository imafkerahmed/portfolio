"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useHeroOverlay } from "@/hooks/useHeroOverlay";
import { site } from "@/lib/config";

// Load hero overlay only on client to avoid any SSR hydration edge cases
const HeroOverlay = dynamic(
  () => import("@/components/hero/HeroOverlay").then((m) => m.HeroOverlay),
  { ssr: false }
);

// Profile card is an interactive client component with CSS and event handlers
const ProfileCard: any = dynamic(
  () => import("@/components/profilecard/ProfileCard").then((m) => m.default),
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
      <HeroOverlay
        open={open}
        onDismiss={dismiss}
        rightSide={
          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-[60vh] md:h-[70vh] lg:h-[75vh] flex items-start justify-center">
            <ProfileCard
              name={site.name}
              title={site.role}
              avatarUrl={site.avatarUrl}
              miniAvatarUrl={site.avatarUrl}
              handle={site.githubUsername}
              contactText="Contact Me"
              enableMobileTilt={false}
              behindGradient={undefined}
              innerGradient={undefined}
              onContactClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "mailto:imafkerahmed@gmail.com";
                }
              }}
            />
          </div>
        }
      />

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
