"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import "./LogoLoop.css";

export interface LogoItem {
  src?: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  node?: ReactNode;
  href?: string;
  ariaLabel?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  logoHeight?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
  width?: number | string;
}

const clampCssLength = (v: number | string | undefined): string | undefined =>
  typeof v === "number" ? `${v}px` : v ?? undefined;

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  gap = 32,
  logoHeight = 60,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = true,
  className,
  ariaLabel = "logos",
  style,
  width = "100%",
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSeqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  // Hover ref (no re-render on hover changes)
  const hoverRef = useRef(false);

  // Animation state refs
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  const velocity = useMemo(() => {
    const base = Math.abs(speed);
    return direction === "left" ? base : -base;
  }, [speed, direction]);

  const baseList = useMemo(
    () =>
      logos.map((item, idx) => {
        const key = `base-${idx}`;
        const label = item.ariaLabel ?? item.alt ?? item.title ?? "logo";

        const visual = item.node ? (
          <span
            className="logoloop__node"
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {item.node}
          </span>
        ) : (
          <img
            src={item.src!}
            alt={item.alt ?? item.title ?? ""}
            title={item.title}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const wrapped = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={label}
            target="_blank"
            rel="noreferrer noopener"
          >
            {visual}
          </a>
        ) : (
          visual
        );

        return (
          <li key={key} className="logoloop__item" role="listitem">
            {wrapped}
          </li>
        );
      }),
    [logos]
  );

  const renderedLists = useMemo(
    () =>
      Array.from({ length: copies }, (_, i) => (
        <ul
          key={`copy-${i}`}
          className="logoloop__list"
          role="list"
          aria-hidden={i > 0}
          ref={i === 0 ? firstSeqRef : undefined}
        >
          {baseList}
        </ul>
      )),
    [copies, baseList]
  );

  const measure = useCallback(() => {
    if (!containerRef.current || !firstSeqRef.current) return;
    const containerW = containerRef.current.clientWidth;
    const seqW = Math.ceil(firstSeqRef.current.getBoundingClientRect().width);
    if (seqW !== seqWidth) setSeqWidth(seqW);
    if (seqW > 0 && containerW > 0) {
      const needed = Math.max(2, Math.ceil(containerW / seqW) + 2);
      setCopies(needed);
    }
  }, [seqWidth]);

  // Image loading measurement
  useEffect(() => {
    if (!firstSeqRef.current) return;
    const imgs: HTMLImageElement[] = Array.from(
      firstSeqRef.current.querySelectorAll("img")
    );
    if (imgs.length === 0) {
      measure();
      return;
    }
    let remaining = imgs.length;

    const done = () => {
      remaining -= 1;
      if (remaining === 0) measure();
    };

    imgs.forEach((img) => {
      if (img.complete) {
        done();
      } else {
        img.onload = done;
        img.onerror = done;
      }
    });

    return () => {
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [logos, measure]);

  // Resize observer / fallback
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => measure());
      ro.observe(el);
      measure();
      return () => ro.disconnect();
    } else {
      const handler = () => measure();
      (window as Window).addEventListener("resize", handler);
      measure();
      return () => (window as Window).removeEventListener("resize", handler);
    }
  }, [measure]);

  // Animation loop (does NOT depend on hover)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;

    const animate = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = pauseOnHover && hoverRef.current ? 0 : velocity;
      const tau = 0.25;
      const ease = 1 - Math.exp(-dt / tau);
      velocityRef.current += (target - velocityRef.current) * ease;

      if (seqWidth > 0) {
        offsetRef.current += velocityRef.current * dt;
        offsetRef.current =
          ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [seqWidth, velocity, pauseOnHover]);

  const rootClass = [
    "logoloop",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    width: clampCssLength(width) ?? "100%",
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={mergedStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => {
        if (pauseOnHover) hoverRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) hoverRef.current = false;
      }}
    >
      <div ref={trackRef} className="logoloop__track">
        {renderedLists}
      </div>
    </div>
  );
});

export default LogoLoop;