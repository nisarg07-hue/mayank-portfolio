"use client";

import { createPortal } from "react-dom";
import { useModalLock } from "@/hooks/useModalLock";

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedUrl: string;
}

export function ReelModal({ isOpen, onClose, embedUrl }: ReelModalProps) {
  useModalLock(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-xs tracking-[0.22em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          ✕ Close
        </button>
        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-[color:var(--hairline)] bg-white/[0.02]">
          <iframe
            src={`${embedUrl}?autoplay=1&rel=0`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full"
            title="Showreel"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
