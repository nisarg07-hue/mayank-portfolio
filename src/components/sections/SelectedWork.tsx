"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../motion/Reveal";
import { WorkModal } from "../WorkModal";
import { selectedWork, type WorkItem } from "@/lib/work";

export function SelectedWork() {
  const [active, setActive] = useState<WorkItem | null>(null);
  const work = useMemo(() => selectedWork, []);

  return (
    <section id="work" className="py-24">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                A small set of pieces—<span className="text-zinc-400">crafted, not collected</span>.
              </>
            }
          >
            Tap a tile for details. Keep the curation tight and premium.
          </SectionHeading>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {work.map((item, idx) => {
              const span =
                idx === 0
                  ? "lg:col-span-7"
                  : idx === 1
                    ? "lg:col-span-5"
                    : "lg:col-span-4";

              return (
                <Reveal key={item.id} delayMs={idx * 80}>
                  <button
                    onClick={() => setActive(item)}
                    className={`group relative w-full overflow-hidden rounded-3xl border border-[color:var(--hairline)] bg-white/[0.02] text-left ${span}`}
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={item.poster}
                        alt=""
                        fill
                        className="object-cover opacity-80 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs tracking-[0.26em] uppercase text-zinc-400">
                            {item.brand ?? "Selected Work"} • {item.year}
                          </div>
                          <div className="mt-1 text-base tracking-tight text-zinc-100">
                            {item.title}
                          </div>
                        </div>
                        <div className="hidden sm:block text-xs tracking-[0.18em] uppercase text-zinc-200/80">
                          View
                        </div>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 ring-1 ring-white/10" />
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>

      {active ? <WorkModal item={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}

