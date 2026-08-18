"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

interface SmoothScrollRootProps {
  children: ReactNode;
}

export function SmoothScrollRoot({
  children,
}: SmoothScrollRootProps): React.JSX.Element {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
