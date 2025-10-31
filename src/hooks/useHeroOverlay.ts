"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "heroDismissed";

export function useHeroOverlay(initiallyOpen = true) {
  const [open, setOpen] = useState(initiallyOpen);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(SESSION_KEY);
      if (dismissed === "1") setOpen(false);
    } catch {
      // sessionStorage might be blocked; ignore and default to open.
    }
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setOpen(false);
  };

  const reset = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
    setOpen(true);
  };

  return { open, dismiss, reset };
}