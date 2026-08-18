"use client";

import { useEffect, useState } from "react";

interface ReducedMotionPreference {
  prefersReducedMotion: boolean;
  isReady: boolean;
}

export function useReducedMotion(): ReducedMotionPreference {
  const [preference, setPreference] = useState<ReducedMotionPreference>({
    prefersReducedMotion: false,
    isReady: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPreference({
        prefersReducedMotion: mediaQuery.matches,
        isReady: true,
      });
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return preference;
}
