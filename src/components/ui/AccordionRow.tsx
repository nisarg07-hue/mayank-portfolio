"use client";

import { useState } from "react";
import Image from "next/image";
import type { Service } from "@/types";

interface AccordionRowProps {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionRow({
  service,
  index,
  isOpen,
  onToggle,
}: AccordionRowProps) {
  const [imgError, setImgError] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div role="listitem" className="border-b border-[color:var(--hairline)]">
      {/* ROW HEADER */}
      <button
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`service-panel-${service.id}`}
        id={`service-header-${service.id}`}
        className="group flex w-full items-center justify-between text-left py-4 sm:py-6 cursor-pointer"
      >
        {/* Left: number + title */}
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-mono text-xs text-zinc-500 min-w-[28px]">
            {num}
          </span>
          <span className="text-[16px] sm:text-[20px] font-medium text-zinc-100 group-hover:text-accent transition-colors duration-200">
            {service.title}
          </span>
        </div>

        {/* Right: price + arrow */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <span
            className={`hidden sm:inline text-sm text-zinc-400 ${isOpen ? "lg:inline sm:hidden" : ""}`}
          >
            {service.price}
          </span>

          {/* Arrow icon — rotates 45° on open */}
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-[350ms] ${
              isOpen
                ? "border-accent rotate-45"
                : "border-[color:var(--hairline)] rotate-0"
            }`}
          >
            <div className="relative h-[10px] w-[10px]">
              {/* horizontal */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-current -translate-y-px" />
              {/* vertical */}
              <div
                className={`absolute left-1/2 top-0 h-full w-px bg-current -translate-x-px transition-opacity duration-200 ${
                  isOpen ? "opacity-40" : "opacity-100"
                }`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* EXPANDED PANEL — CSS grid animation */}
      <div
        id={`service-panel-${service.id}`}
        role="region"
        aria-labelledby={`service-header-${service.id}`}
        className="grid transition-[grid-template-rows] duration-[350ms]"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="pb-8 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* LEFT: description + deliverables */}
              <div>
                <p className="text-sm leading-7 text-zinc-400 max-w-[480px]">
                  {service.description}
                </p>

                <ul className="mt-6 flex flex-col gap-2">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 text-accent">—</span>
                      <span className="text-sm text-zinc-400">{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Price on mobile */}
                <div className="mt-6 lg:hidden">
                  <span className="text-lg font-medium text-zinc-100">
                    {service.price}
                  </span>
                  <span className="text-sm text-zinc-400">
                    {" "}
                    · {service.duration}
                  </span>
                </div>
              </div>

              {/* RIGHT: image (desktop only) */}
              {service.image && !imgError && (
                <div className="hidden lg:block relative aspect-video overflow-hidden rounded-sm border border-[color:var(--hairline)] bg-white/[0.02]">
                  <Image
                    src={service.image}
                    fill
                    alt={service.title}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    onError={() => setImgError(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
