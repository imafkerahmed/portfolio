"use client";

import { useEffect, useState } from "react";

// Always show hero overlay on full page refresh: do not persist dismissal between reloads
export function useHeroOverlay(initiallyOpen = true) {
  const [open, setOpen] = useState(initiallyOpen);

  // No persisted state: on each mount (including hard refresh), start from the initial state
  useEffect(() => {
    setOpen(initiallyOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    setOpen(false);
  };

  const reset = () => {
    setOpen(true);
  };

  return { open, dismiss, reset };
}