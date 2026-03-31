import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../motion/Reveal";

export function Reel() {
  return (
    <section id="reel" className="py-24">
      <Container>
        <div className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Reel"
            title={
              <>
                A tight, cinematic cut—<span className="text-zinc-400">no filler</span>.
              </>
            }
          >
            Keep the player minimal. Let the work do the talking.
          </SectionHeading>

          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--hairline)] bg-white/[0.02]">
              <div className="aspect-video w-full">
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="none"
                  poster="/reel-poster.svg"
                >
                  <source src="/reel.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

