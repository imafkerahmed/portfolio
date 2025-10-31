"use client";

import React from "react";

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
    <div className={["flex flex-col gap-5 max-w-xl", className].filter(Boolean).join(" ")}>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        {title}
      </h1>
      <p className="text-lg font-medium text-primary/90">
        {subtitle}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {paragraph}
      </p>
    </div>
  );
}