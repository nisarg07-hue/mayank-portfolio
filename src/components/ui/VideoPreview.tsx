"use client";

import { useRef, useEffect, useState } from "react";

interface VideoPreviewProps {
  src?: string; // optional — not all projects have video
  isHovered: boolean;
}

export default function VideoPreview({ src, isHovered }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (isHovered) {
      // Load src only on first hover
      if (!hasAttempted) {
        video.src = src;
        setHasAttempted(true);
        video.load();
        video.oncanplaythrough = () => {
          setHasLoaded(true);
          video.play().catch(() => {
            // Autoplay blocked — silently fail, thumbnail stays visible
          });
        };
        video.onerror = () => {
          // Video file doesn't exist yet — silently fail
          setHasLoaded(false);
        };
      } else if (hasLoaded) {
        video.play().catch(() => {});
      }
    } else {
      // Mouse left — pause and reset
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovered, src, hasAttempted, hasLoaded]);

  // Don't render if no src provided
  if (!src) return null;

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      preload="none" // CRITICAL — do not load until hover
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      style={{ opacity: isHovered && hasLoaded ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
