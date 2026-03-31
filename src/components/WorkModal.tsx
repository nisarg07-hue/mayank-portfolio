"use client";

import type { WorkItem } from "@/lib/work";
import { prefersReducedMotion } from "@/lib/motion";
import { useEffect, useMemo, useState } from "react";
import { useModalLock } from "@/hooks/useModalLock";

export function WorkModal({
  item,
  onClose,
}: {
  item: WorkItem;
  onClose: () => void;
}) {
  const reduce = useMemo(() => prefersReducedMotion(), []);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reduce) {
      setOpen(true);
      return;
    }
    const t = window.setTimeout(() => setOpen(true), 10);
    return () => window.clearTimeout(t);
  }, [reduce]);

  function requestClose() {
    if (reduce) return onClose();
    setOpen(false);
    window.setTimeout(onClose, 220);
  }

  useModalLock(open, requestClose);

  return (
    <div
      data-open={open ? "true" : "false"}
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center transition-[opacity] duration-300"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px] transition-opacity duration-300 data-[open=false]:opacity-0"
        data-open={open ? "true" : "false"}
        onClick={requestClose}
        aria-label="Close"
      />
      <div
        data-open={open ? "true" : "false"}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[color:var(--hairline)] bg-black/70 backdrop-blur-xl transition-[transform,opacity] duration-[650ms] [transition-timing-function:var(--ease-premium)] data-[open=false]:translate-y-4 data-[open=false]:opacity-0"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs tracking-[0.26em] uppercase text-zinc-500">
              {item.brand ?? "Selected Work"}
            </div>
            <div className="mt-1 text-lg tracking-tight text-zinc-100">
              {item.title}
            </div>
          </div>
          <button
            onClick={requestClose}
            className="rounded-full border border-[color:var(--hairline)] px-4 py-2 text-xs tracking-[0.18em] uppercase text-zinc-100 hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="border-t border-[color:var(--hairline)]">
          <div className="grid gap-0 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="aspect-video bg-white/[0.02]">
                {item.video ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="none"
                    poster={item.poster}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
                    Add video for this project to enable playback.
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="p-6">
                <dl className="grid gap-4">
                  <div>
                    <dt className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                      Role
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-200">{item.role}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                        Year
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-200">
                        {item.year}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                        Duration
                      </dt>
                      <dd className="mt-1 text-sm text-zinc-200">
                        {item.duration ?? "—"}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                      Tags
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[color:var(--hairline)] px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

