"use client";

import { prefersReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delayMs = 0,
}: {
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { root: null, threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      style={{ ["--reveal-delay" as never]: `${delayMs}ms` }}
      className="reveal"
    >
      {children}
    </div>
  );
}

