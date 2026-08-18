"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";

interface MagneticContactCardProps {
  children: ReactNode;
}

export function MagneticContactCard({ children }: MagneticContactCardProps) {
  const { hasFinePointer, hasHover, hasTouch, isDesktop, prefersReducedMotion } =
    useMotionCapabilities();
  const enabled =
    isDesktop &&
    hasHover &&
    hasFinePointer &&
    !hasTouch &&
    !prefersReducedMotion;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const resetOffset = useCallback(() => {
    offsetRef.current = { x: 0, y: 0 };
    if (wrapperRef.current) wrapperRef.current.style.transform = "none";
  }, []);

  useEffect(() => {
    if (!enabled) resetOffset();
  }, [enabled, resetOffset]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = Math.max(-3, Math.min(3, (event.clientX - rect.left - rect.width / 2) * 0.1));
      const y = Math.max(-3, Math.min(3, (event.clientY - rect.top - rect.height / 2) * 0.1));
      offsetRef.current = { x, y };
      wrapperRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [enabled],
  );

  return (
    <div
      ref={wrapperRef}
      data-magnetic-contact
      data-magnetic={enabled ? "enabled" : "disabled"}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetOffset}
      style={{ transform: "none", transition: "transform 150ms ease-out" }}
    >
      {children}
    </div>
  );
}
