"use client";

import dynamic from "next/dynamic";

export const SplineBackgroundClient = dynamic(
  () => import("./SplineBackground").then((mod) => mod.SplineBackground),
  { ssr: false }
);
