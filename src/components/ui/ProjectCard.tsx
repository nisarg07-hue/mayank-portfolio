"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";
import VideoPreview from "./VideoPreview";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  showDescription?: boolean;
}

export function ProjectCard({
  project,
  priority = false,
  showDescription = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }} // standard pointer for now
    >
      <article
        className="group relative overflow-hidden"
        style={{ borderRadius: "2px" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          {/* Thumbnail Image */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-all duration-500 brightness-[0.65] saturate-0 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            onError={(e) => {
              // Hide broken image gracefully — show dark placeholder instead
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
            }}
          />

          {/* Dark placeholder shown when image is missing */}
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "var(--color-surface, #0b1220)" }}
          />

          {/* VideoPreview — loads on hover */}
          <VideoPreview src={project.video} isHovered={isHovered} />

          {/* Gradient overlay — always present, darkens bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(5,7,10,0.92) 0%, rgba(5,7,10,0.2) 45%, transparent 70%)",
            }}
          />

          {/* Play icon — fades in on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(212, 175, 55, 0.9)", // gold
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Triangle play icon using CSS border trick */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "7px 0 7px 13px",
                  borderColor: "transparent transparent transparent #05070a",
                  marginLeft: "2px", // optical center adjustment
                }}
              />
            </div>
          </div>

          {/* Card info — bottom, slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-[4px] group-hover:translate-y-0 transition-transform duration-300">
            <span
              className="block text-[11px] font-medium tracking-[0.18em] uppercase mb-2"
              style={{ color: "var(--color-gold, #d4af37)" }}
            >
              {project.category}
            </span>
            <h3
              className="text-[17px] font-semibold leading-tight"
              style={{ color: "var(--color-text-primary, #f0ede8)" }}
            >
              {project.title}
            </h3>
            <p
              className="text-[13px] mt-1"
              style={{ color: "rgba(240,237,232,0.5)" }}
            >
              {project.client} · {project.year}
            </p>
          </div>
        </div>
      </article>

      {/* Description — only on /work page */}
      {showDescription && project.description && (
        <p
          className="mt-3 text-[13px] leading-relaxed line-clamp-2"
          style={{ color: "var(--color-text-secondary, #8a9ab0)" }}
        >
          {project.description}
        </p>
      )}
    </Link>
  );
}
