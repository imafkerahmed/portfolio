"use client";

import React from "react";
import Shuffle from "@/components/ui/shuffletext/Shuffle";

interface HeroIntroLeftProps {
  title?: string;
  subtitle?: string;
  paragraph?: string;
  className?: string;
}

export function HeroIntroLeft({
  title = "Afker Ahmed",
  subtitle = "Front-End Web Developer",
  paragraph = "I craft performant, accessible interfaces using modern React, TypeScript, and thoughtful UI patterns. Constantly learning, iterating, and shipping polished experiences.",
  className
}: HeroIntroLeftProps) {
  return (
    <div className={["flex flex-col gap-2 md:gap-3 max-w-3xl md:max-w-4xl", className].filter(Boolean).join(" ")}>
      <Shuffle
        text={title}
        tag="h1"
        className="whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-extrabold tracking-tight leading-none"
        shuffleDirection="right"
        duration={0.35}
        stagger={0.03}
        animationMode="evenodd"
        triggerOnce
        triggerOnHover
        autoplay
        loop
        loopDelay={2.5}
        textAlign="left"
      />
      <p className="-mt-1 md:-mt-2 text-lg font-medium text-primary/90">
        {subtitle}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {paragraph}
      </p>
    </div>
  );
}