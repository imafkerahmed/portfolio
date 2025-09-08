import * as React from "react";
import clsx from "clsx";

type WidgetProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  compact?: boolean;
  action?: React.ReactNode;
  style?: React.CSSProperties;
  // Control the header title appearance (used to fade in after reveal)
  titleClassName?: string;
  // NEW: absolutely-positioned overlay rendered across the entire card
  overlay?: React.ReactNode;
};

export function Widget({
  title,
  children,
  className,
  bodyClassName,
  compact = false,
  action,
  style,
  titleClassName,
  overlay,
}: WidgetProps) {
  return (
    <section
      style={style}
      className={clsx(
        // relative so overlays can center against the whole card
        "relative flex flex-col rounded-2xl border bg-card text-card-foreground shadow",
        "p-4 md:p-6",
        compact && "min-h-0",
        className
      )}
    >
      <header className="mb-3 md:mb-4 flex items-center justify-between">
        <h3
          className={clsx(
            "text-sm font-semibold tracking-wide text-muted-foreground transition-all duration-300",
            titleClassName
          )}
        >
          {title}
        </h3>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>

      <div className={clsx("flex-1 min-h-0", bodyClassName)}>{children}</div>

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 z-20">
          {overlay}
        </div>
      ) : null}
    </section>
  );
}
