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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || hasError) return;

    if (isHovered) {
      if (!hasAttempted) {
        video.src = src;
        setHasAttempted(true);
        video.load();
        
        video.oncanplay = () => {
          setHasLoaded(true);
          video.play().catch((err) => {
            console.warn("Autoplay blocked or playback failed:", err);
          });
        };
        
        video.onerror = () => {
          console.error(`Failed to load video: ${src}`);
          setHasError(true);
          setHasLoaded(false);
        };
      } else if (hasLoaded) {
        video.play().catch((err) => console.warn("Playback failed:", err));
      }
    } else {
      if (hasLoaded) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isHovered, src, hasAttempted, hasLoaded, hasError]);

  if (!src) return null;

  return (
    <>
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isHovered && hasLoaded && !hasError ? 1 : 0 }}
        aria-hidden="true"
      />
      {hasError && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10">
          <span className="text-xs tracking-wider uppercase text-zinc-400">Video Unavailable</span>
        </div>
      )}
    </>
  );
}
