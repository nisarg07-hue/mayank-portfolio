import Image from "next/image";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../motion/Reveal";

const tools = ["Adobe After Effects", "Adobe Premiere Pro"];

export function About() {
  return (
    <section id="about" className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10 items-center">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-[color:var(--hairline)] bg-white/[0.02]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/about-image.jpg"
                    alt="Mayank editing"
                    fill
                    className="object-cover opacity-95 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delayMs={120}>
              <SectionHeading
                eyebrow="My Story"
                title={
                  <>
                    Bringing ideas to life—<span className="text-zinc-400">through dynamic edits</span>.
                  </>
                }
              >
                <div className="mt-8 space-y-6 text-base sm:text-[17px] leading-8 font-light text-zinc-300">
                  <p>
                    I’m a passionate video editor with a strong eye for storytelling and visual aesthetics, focused on bringing ideas to life through dynamic, high-impact edits. With 1 year of corporate experience and 6 months of freelancing, I’ve worked across fitness, real estate, and short-form content, delivering results tailored to each client’s vision.
                  </p>
                  <p>
                    Currently, I collaborate with a marketing agency, creating performance-driven content designed to capture attention and drive engagement. I specialize in <strong className="text-zinc-100 font-medium">Adobe After Effects</strong> for motion graphics and cinematic effects, along with <strong className="text-zinc-100 font-medium">Adobe Premiere Pro</strong> for seamless and engaging edits.
                  </p>
                  <p>
                    I’m driven by creativity and precision, aiming to craft content that not only looks great but tells a compelling story.
                  </p>
                </div>
              </SectionHeading>
            </Reveal>

            <div className="mt-8">
              <div className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                Tools
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[color:var(--hairline)] px-4 py-2 text-[11px] tracking-[0.18em] uppercase text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

