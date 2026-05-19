"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import SpotlightCard from "@/components/SpotlightCard";
import type { Repo } from "@/lib/github";

type ProjectsCarouselProps = {
  repos: Repo[];
};

function RepoItem({ repo }: { repo: Repo }) {
  return (
    <SpotlightCard
      className="group h-full w-full !p-0"
      spotlightColor="rgba(148, 163, 184, 0.22)"
    >
      <article className="flex h-full flex-col">
        <div className="relative flex aspect-[16/8] items-center justify-center border-b border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
          <ImageIcon className="h-6 w-6 text-white/35" />
          <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.16em] text-white/40">
            Preview
          </span>
        </div>

        <div className="flex flex-1 items-start justify-between gap-4 p-4 md:p-5">
          <div className="min-w-0">
            <Link
              href={repo.html_url}
              className="font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
            </Link>
            {repo.description ? (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {repo.description}
              </p>
            ) : (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                A recent repository from my GitHub profile.
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {repo.language ? <span>{repo.language}</span> : null}
              {typeof repo.stargazers_count === "number" ? (
                <span>★ {repo.stargazers_count}</span>
              ) : null}
            </div>
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
        </div>
      </article>
    </SpotlightCard>
  );
}

export function ProjectsCarousel({ repos }: ProjectsCarouselProps) {
  const autoplay = React.useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ).current;

  return (
    <div className="relative h-full overflow-hidden">
      <Carousel
        className="h-full w-full"
        plugins={[autoplay]}
        opts={{ align: "start", slidesToScroll: 1, loop: true }}
      >
        <CarouselContent className="h-full py-1">
          {repos.map((repo) => (
            <CarouselItem
              key={repo.id}
              className="h-full basis-[280px] shrink-0 sm:basis-[220px] md:basis-[240px] lg:basis-[280px] xl:basis-[330px]"
            >
              <RepoItem repo={repo} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
