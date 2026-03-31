import Image from "next/image";
import { Container } from "../Container";


interface HeroProps {
  onOpenReel?: () => void;
}

export function Hero({ onOpenReel }: HeroProps) {


  return (
    <section id="top" className="relative z-[2] overflow-visible pt-28 pointer-events-none">

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 min-h-[78vh] relative z-[2] pointer-events-none">
          <div className="lg:col-span-12">
            <div className="relative">
              {/* Back text layer (will be masked later) */}
              <div
                className="select-none text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.06em] text-zinc-100/10"
                aria-hidden="true"
              >
                <div>MAYANK</div>
                <div className="pl-[0.06em]">SINGH</div>
              </div>

              {/* Foreground text */}
              <div className="pointer-events-none absolute inset-0">
                <div className="text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.9] font-semibold tracking-[-0.06em] text-zinc-100">
                  <div>MAYANK</div>
                  <div className="pl-[0.06em]">SINGH</div>
                </div>
              </div>

              {/* Portrait + cutout (so text feels “behind” the portrait) */}
              <div className="relative mt-12 lg:mt-0 lg:absolute lg:top-1/2 lg:right-[10%] lg:-translate-y-[35%]">
                <div className="pointer-events-none absolute inset-0 hidden lg:block">
                  <div className="heroCutout h-[380px] w-[300px] sm:h-[460px] sm:w-[360px] rounded-[28px] opacity-95" />
                </div>
                <div className="relative h-[380px] w-[300px] sm:h-[460px] sm:w-[360px] rounded-[28px] overflow-hidden border border-[color:var(--hairline)] bg-white/[0.02]">
                  <Image
                    src="/portrait.svg"
                    alt="Portrait of Mayank Singh"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-xl relative z-10">
              <div className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                Video Editor <span className="mx-2 opacity-50">•</span> Main Skill: Adobe After Effects
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-300 pr-4 sm:pr-0">
                Minimal cuts. Precise pacing. A cinematic finish—built for
                brands, artists, and stories that need restraint and impact.
              </p>
              <div className="mt-8">
                <a
                  href="#selected-work"
                  className="inline-block btnPrimary rounded-full bg-zinc-100 text-black px-7 py-4 text-xs tracking-[0.18em] uppercase hover:bg-white transition-colors pointer-events-auto font-medium"
                >
                  View Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Light leak */}
      <div
        className="pointer-events-none absolute -top-24 left-0 h-[420px] w-[520px] blur-3xl opacity-25 z-[2]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(191,199,213,0.55), transparent 70%)",
        }}
      />
    </section>
  );
}

