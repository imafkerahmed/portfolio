"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import WITHOUT SSR (ogl needs window)
const Particles = dynamic(
  () => import("./Particles").then(m => m.Particles),
  { ssr: false }
);

interface BackgroundParticlesProps {
  density?: number; // Multiplier for particleCount
  disabledOnMobile?: boolean;
  colors?: string[];
}

export function BackgroundParticles({
  density = 1,
  disabledOnMobile = true,
  colors = ["#ffffff", "#ffffff"]
}: BackgroundParticlesProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable after mount (client) & optionally skip on narrow screens
    const isMobile = window.innerWidth < 640;
    if (disabledOnMobile && isMobile) return;
    setEnabled(true);
  }, [disabledOnMobile]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      // Optional gradient overlay behind particles:
      style={{
        background:
          "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05), transparent 60%)"
      }}
    >
      <Particles
        particleCount={Math.round(200 * density)}
        particleSpread={10}
        speed={0.12}
        particleBaseSize={80}
        sizeRandomness={0.9}
        moveParticlesOnHover={true}
        particleHoverFactor={1.2}
        particleColors={colors}
        alphaParticles={false}
        disableRotation={false}
      />
      {/* Subtle dark overlay (optional) */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}