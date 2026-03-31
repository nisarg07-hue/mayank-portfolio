import { useEffect } from "react";

export function useModalLock(isOpen: boolean, onClose?: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // Save previous body styles
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    
    // Prevent layout shift from scrollbar disappearing
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
}
