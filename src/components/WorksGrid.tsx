"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface WorksGridProps {
  projects: Project[];
  limit?: number;
  showDescription?: boolean;
  showViewAll?: boolean;
}

export function WorksGrid({
  projects,
  limit,
  showDescription = false,
  showViewAll = false,
}: WorksGridProps) {
  const items = limit ? projects.slice(0, limit) : projects;
  const colClass = limit === 4
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div className={`grid gap-4 ${colClass}`}>
        {items.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={i < 2}
            showDescription={showDescription}
          />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="text-xs tracking-[0.18em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            See all work →
          </Link>
        </div>
      )}
    </div>
  );
}
