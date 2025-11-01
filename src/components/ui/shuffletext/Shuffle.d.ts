declare module "@/components/ui/shuffletext/Shuffle" {
  import type { ComponentType, CSSProperties } from "react";

  export interface ShuffleProps {
    text: string;
    className?: string;
    style?: CSSProperties;
    shuffleDirection?: "left" | "right";
    duration?: number;
    maxDelay?: number;
    ease?: string;
    threshold?: number;
    rootMargin?: string;
  tag?: keyof JSX.IntrinsicElements | ComponentType<unknown>;
    textAlign?: "left" | "center" | "right";
    onShuffleComplete?: () => void;
    shuffleTimes?: number;
    animationMode?: "evenodd" | "random" | "all";
    loop?: boolean;
    loopDelay?: number;
    stagger?: number;
    scrambleCharset?: string;
    colorFrom?: string;
    colorTo?: string;
    triggerOnce?: boolean;
    respectReducedMotion?: boolean;
    triggerOnHover?: boolean;
    autoplay?: boolean;
  }

  const Shuffle: ComponentType<ShuffleProps>;
  export default Shuffle;
}
