"use client";

import React, {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  memo,
} from "react";
import "./LogoLoop.css";

interface ProjectLoopProps {
  children: ReactNode[];
  speed?: number;
  gap?: number;
  className?: string;
  pauseOnHover?: boolean;
  style?: React.CSSProperties;
}

const ProjectLoop = memo(function ProjectLoop({
  children,
  speed = 120,
  className = "",
  pauseOnHover = true,
  style,
}: ProjectLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [copies, setCopies] = useState(2);
  const hoverRef = useRef(false);
  const offsetRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  // Calculate width of one sequence
  useEffect(() => {
    if (!trackRef.current) return;
    const width = trackRef.current.scrollWidth / copies;
    setSeqWidth(width);
    // Ensure enough copies to fill container
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setCopies(Math.ceil(containerWidth / width) + 2);
    }
  }, [children, copies]);

  // Animation loop
  useEffect(() => {
    let running = true;
    function step(ts: number) {
      if (!running) return;
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      if (!hoverRef.current) {
        offsetRef.current -= (speed * dt) / 1000;
        if (Math.abs(offsetRef.current) > seqWidth) {
          offsetRef.current += seqWidth;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return () => {
      running = false;
    };
  }, [seqWidth, speed]);

  // Pause on hover
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const onEnter = () => (hoverRef.current = true);
    const onLeave = () => (hoverRef.current = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover]);

  // Render enough copies for seamless loop
  // Use original card sizing classes for each item
  const cardClass =
    "min-w-[84%] sm:min-w-[62%] lg:min-w-[48%] xl:min-w-[36%] snap-start";
  const items = [];
  for (let i = 0; i < copies; ++i) {
    items.push(
      <div key={i} className="flex gap-4">
        {children.map((child, idx) => (
          <div key={i + "-" + idx} className={cardClass}>
            {child}
          </div>
        ))}
      </div>,
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full ${className}`}
      style={style}
    >
      <div ref={trackRef} className="flex">
        {items}
      </div>
    </div>
  );
});

export default ProjectLoop;
