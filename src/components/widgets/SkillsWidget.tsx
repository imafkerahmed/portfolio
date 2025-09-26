"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";
import clsx from "clsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export function SkillsWidget() {
  const skills = site.skills ?? [];
  const pluginRef = React.useRef(
    Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Widget title="Skills" compact className="overflow-hidden">
      <div className="relative" style={{ height: 120 }}>
        <Carousel
          className="h-full"
          opts={{ align: "start", loop: true, dragFree: true }}
          plugins={[pluginRef.current]}
          setApi={setApi}
        >
          {/* Reduced gap to gap-1, and increased logo size */}
          <CarouselContent className="h-full items-center gap-1">
            {skills.map((skill, idx) => (
              <CarouselItem
                key={skill.name}
                className="flex items-center justify-center"
                style={{
                  flex: "0 0 130px",
                  maxWidth: "130px",
                }}
              >
                {skill.logo ? (
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    width={110}
                    height={60}
                    className="h-16 w-auto object-contain transition hover:brightness-110 hover:contrast-110"
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <span className="rounded-md border bg-background/60 px-2 py-1 text-[12px] font-medium text-muted-foreground">
                    {skill.name}
                  </span>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="pointer-events-none absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 gap-1">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className={clsx(
                "h-1.5 w-1.5 rounded-full transition-colors",
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </Widget>
  );
}