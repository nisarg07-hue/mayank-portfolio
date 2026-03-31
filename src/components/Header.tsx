"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container } from "./Container";
import { AVAILABILITY } from "@/lib/constants";

const nav = [
  { label: "Work", href: "/#selected-work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chrome = useMemo(() => {
    if (!scrolled) return "bg-transparent";
    return "bg-black/55 backdrop-blur-md";
  }, [scrolled]);

  function isActive(href: string) {
    if (href === "/contact") {
      return pathname === "/contact";
    }
    return false;
  }

  const dot = AVAILABILITY.isAvailable
    ? { color: "#22c55e", pulse: true }
    : { color: "#ef4444", pulse: false };

  const text = AVAILABILITY.isAvailable
    ? `${AVAILABILITY.label} ${AVAILABILITY.subLabel} — ${AVAILABILITY.quarter}`
    : "Not taking projects";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${chrome} transition-colors duration-500`}
    >
      <style>{`
        @keyframes availability-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
      <div className="border-b border-[color:var(--hairline)]">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm tracking-[0.22em] uppercase text-zinc-100"
                aria-label="Mayank Singh home"
              >
                MS
              </Link>
              
              {/* Desktop Indicator */}
              <div className="hidden lg:flex items-center gap-2 rounded-full border border-[color:var(--hairline)] px-[10px] py-[5px] bg-transparent">
                <div
                  className="w-[6px] h-[6px] rounded-full shrink-0"
                  style={{
                    backgroundColor: dot.color,
                    animation: dot.pulse ? "availability-pulse 2s ease-in-out infinite" : "none",
                  }}
                />
                <span className="font-sans text-[11px] font-normal whitespace-nowrap text-[color:var(--muted)]">
                  {text}
                </span>
              </div>
            </div>

            {/* Mobile Indicator - since no mobile menu overlay exists, showing in header on mobile */}
            <div className="flex lg:hidden justify-center mx-auto items-center gap-2 rounded-full border border-[color:var(--hairline)] px-[8px] py-[4px] bg-transparent">
              <div
                className="w-[6px] h-[6px] rounded-full shrink-0"
                style={{
                  backgroundColor: dot.color,
                  animation: dot.pulse ? "availability-pulse 2s ease-in-out infinite" : "none",
                }}
              />
              <span className="font-sans text-[10px] font-normal whitespace-nowrap text-[color:var(--muted)]">
                {text}
              </span>
            </div>

            <nav className="hidden items-center gap-6 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-xs tracking-[0.22em] uppercase transition-colors ${
                    isActive(item.href)
                      ? "text-zinc-100"
                      : "text-zinc-300 hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-zinc-100/70 transition-transform duration-500 ${
                      isActive(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="rounded-full border border-[color:var(--hairline)] px-4 py-2 text-xs tracking-[0.18em] uppercase text-zinc-100 hover:bg-white/5 transition-colors"
            >
              Contact
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
