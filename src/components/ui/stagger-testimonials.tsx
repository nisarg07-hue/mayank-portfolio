"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SQRT_5000 = Math.sqrt(5000);

// ─── Inline cn utility — no @/lib/utils needed ───────────────────────────────
const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

// ─── Mayank Singh client testimonials ────────────────────────────────────────
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "The brand film Mayank delivered exceeded every expectation. 2.4M views in the first week alone.",
    by: "Rohit Shah, Founder @ Aether Studio",
    imgSrc: "https://i.pravatar.cc/150?img=11",
  },
  {
    tempId: 1,
    testimonial:
      "Mayank turned 4 hours of raw footage into a 60-second film that felt like a cinematic trailer. Unreal talent.",
    by: "Priya Mehta, Marketing Head @ Solar Inc",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    tempId: 2,
    testimonial:
      "Our reels went from 10K average views to 800K. Same content, completely different edit. That's the Mayank effect.",
    by: "Arjun Kapoor, Creator @ 2.1M followers",
    imgSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    tempId: 3,
    testimonial:
      "Fast, precise, and genuinely understands brand voice. We've worked with 5 editors — none came close.",
    by: "Simran Batra, CMO @ NovaBrands",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
  {
    tempId: 4,
    testimonial:
      "Delivered a 3-minute documentary in 8 days. The colour grade alone was worth every rupee.",
    by: "Dev Anand, Independent Filmmaker",
    imgSrc: "https://i.pravatar.cc/150?img=7",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

// ─── Single Card ──────────────────────────────────────────────────────────────
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  const centerStyle: React.CSSProperties = {
    background: "var(--accent)",
    color: "var(--background)",
    borderColor: "var(--accent)",
    boxShadow: "0px 8px 0px 4px rgba(191,199,213,0.2)",
  };

  const sideStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.02)",
    color: "var(--foreground)",
    borderColor: "var(--hairline)",
    boxShadow: "none",
  };

  return (
    <div
      onClick={() => handleMove(position)}
      role="button"
      tabIndex={0}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-500 ease-in-out",
        !isCenter && "hover:border-[color:var(--accent)]"
      )}
      style={{
        ...(isCenter ? centerStyle : sideStyle),
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        zIndex: isCenter ? 10 : 0,
      }}
    >
      {/* Corner cut accent line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1,
          background: isCenter ? "rgba(5,7,10,0.3)" : "var(--hairline)",
        }}
      />

      {/* Avatar */}
      <div
        className="mb-4 h-14 w-12 overflow-hidden relative flex-shrink-0"
        style={{ boxShadow: "3px 3px 0px var(--background)" }}
      >
        <Image
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          width={48}
          height={56}
          className="object-cover object-top w-full h-full"
          unoptimized // pravatar.cc is external — unoptimized avoids config changes
        />
      </div>

      {/* Quote */}
      <h3
        className="text-base sm:text-lg font-medium leading-snug"
        style={{
          color: isCenter ? "var(--background)" : "var(--foreground)",
        }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>

      {/* Attribution */}
      <p
        className="absolute bottom-8 left-8 right-8 mt-2 text-sm italic"
        style={{
          color: isCenter ? "rgba(5,7,10,0.65)" : "var(--muted)",
        }}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600, background: "transparent" }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Navigation buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-14 w-14 items-center justify-center transition-colors duration-200 focus-visible:outline-none"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--hairline)",
            color: "var(--muted)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "var(--accent)";
            el.style.color = "var(--background)";
            el.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.02)";
            el.style.color = "var(--muted)";
            el.style.borderColor = "var(--hairline)";
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-14 w-14 items-center justify-center transition-colors duration-200 focus-visible:outline-none"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--hairline)",
            color: "var(--muted)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "var(--accent)";
            el.style.color = "var(--background)";
            el.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.02)";
            el.style.color = "var(--muted)";
            el.style.borderColor = "var(--hairline)";
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
