"use client";

import * as React from "react";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";

type EducationItem = {
  degree: string;
  institution: string;
  year: string;
  description?: string;
};

type Props = {
  // Card height in px
  height?: number;
};

export function EducationWidget({ height = 180 }: Props) {
  const items: EducationItem[] = site.education ?? [];

  const [revealed, setRevealed] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = React.useState<boolean[]>(() =>
    new Array(items.length).fill(false)
  );

  const revealOnIntent = React.useCallback(() => {
    if (!revealed) setRevealed(true);
  }, [revealed]);

  React.useEffect(() => {
    if (!revealed || !scrollRef.current) return;

    const root = scrollRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const next = prev.slice();
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const i = Number((entry.target as HTMLElement).dataset.index);
              if (!Number.isNaN(i)) next[i] = true;
            }
          }
          return next;
        });
      },
      { root, threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    const nodes = root.querySelectorAll<HTMLElement>("[data-index]");
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [revealed, items.length]);

  return (
    <Widget
      title="EDUCATION"
      compact
      style={{ height }}
      className="self-start overflow-hidden"
      bodyClassName="min-h-0"
      titleClassName={revealed ? "opacity-100" : "opacity-0"}
      overlay={
        <div
          className={`flex h-full w-full items-center justify-center text-center transition-opacity duration-300 ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="select-none text-3xl md:text-4xl font-semibold tracking-wide text-muted-foreground">
              EDUCATION
            </span>
            <span className="select-none text-xs md:text-sm text-muted-foreground/80 motion-safe:animate-bounce">
              scroll to view
            </span>
          </div>
        </div>
      }
    >
      <div
        ref={scrollRef}
        className={`relative h-full min-h-0 ${
          revealed ? "overflow-y-auto pr-2" : "overflow-hidden"
        }`}
        onWheelCapture={revealOnIntent}
        onTouchStart={revealOnIntent}
        onScroll={() => {
          if (
            !revealed &&
            scrollRef.current &&
            scrollRef.current.scrollTop > 0
          ) {
            setRevealed(true);
          }
        }}
      >
        <div className={revealed ? "opacity-100" : "opacity-0"}>
          <div className="relative">
            {/* Align the vertical line with the bullets' center */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />
            {/* Removed padding from UL; add padding per LI so content clears the bullet + ring */}
            <ul className="space-y-2">
              {items.map((item, idx) => {
                const isVisible = visibleItems[idx];
                return (
                  <li
                    key={`${item.degree}-${item.year}-${idx}`}
                    data-index={idx}
                    className={[
                      "relative pl-9", // gives content room so the bullet never overlaps
                      "transition-all duration-400 ease-out",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2",
                    ].join(" ")}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    {/* Bullet positioned so its center is at 7px to match the line */}
                    <span className="absolute left-[2px] top-2.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background border border-primary" />
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium leading-tight">
                        {item.degree}
                      </h4>
                      <span className="text-[10px] text-muted-foreground">
                        {item.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {item.institution}
                    </div>
                    {item.description ? (
                      <p className="mt-0.5 text-[11px] leading-snug">
                        {item.description}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div className="h-1" />
          </div>
        </div>
      </div>
    </Widget>
  );
}
