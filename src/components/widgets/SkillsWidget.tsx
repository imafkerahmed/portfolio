"use client";

import React from "react";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";
import LogoLoop, { LogoItem } from "@/components/ui/LogoLoop";

const CARD_HEIGHT = 206;
const LOGO_HEIGHT = 60; 
const GAP = 40;
const SPEED = 140;

export function SkillsWidget() {
  const logos: LogoItem[] = React.useMemo(
    () =>
      (site.skills ?? []).map((s) =>
        s.logo
          ? {
              src: s.logo,
              alt: s.name,
              title: s.name,
              width: 110,          // optional: slight width hint
              height: LOGO_HEIGHT, // not strictly required; logoLoop enforces height via CSS var
            }
          : {
              node: (
                <span className="rounded-md border bg-background/60 px-2 py-1 text-[12px] font-medium text-muted-foreground">
                  {s.name}
                </span>
              ),
              ariaLabel: s.name,
              title: s.name,
            }
      ),
    []
  );

  return (
    <Widget
      title="Skills"
      compact
      className="overflow-hidden"
      style={{ height: CARD_HEIGHT }}
      bodyClassName="flex h-full items-center"
    >
      <LogoLoop
        logos={logos}
        speed={SPEED}
        gap={GAP}
        logoHeight={LOGO_HEIGHT}   // <— Bigger size here
        direction="left"
        pauseOnHover
        fadeOut={false}
        scaleOnHover
        ariaLabel="Skill logos"
        className="w-full"
      />
    </Widget>
  );
}