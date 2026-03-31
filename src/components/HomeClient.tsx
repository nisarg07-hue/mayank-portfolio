"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { ReelModal } from "@/components/ui/ReelModal";

export function HomeClient() {
  const [reelOpen, setReelOpen] = useState(false);

  return (
    <>
      <Hero onOpenReel={() => setReelOpen(true)} />
      <ReelModal
        isOpen={reelOpen}
        onClose={() => setReelOpen(false)}
        embedUrl={process.env.NEXT_PUBLIC_HERO_REEL_URL || ""}
      />
    </>
  );
}
