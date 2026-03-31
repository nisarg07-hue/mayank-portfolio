"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../motion/Reveal";
import { AccordionRow } from "../ui/AccordionRow";
import { SERVICES } from "@/lib/constants";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="services" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What I Do"
            title={
              <>
                Precision first—
                <span className="text-zinc-400">then style</span>.
              </>
            }
          >
            High-end outcomes with minimalism as a constraint, not a trend.
          </SectionHeading>
        </Reveal>

        <div role="list" className="mt-12 lg:mt-16">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delayMs={i * 50}>
              <AccordionRow
                service={service}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Need something custom?
            </p>
            <Link
              href="/contact"
              className="text-sm text-accent hover:underline transition-colors"
            >
              Let&apos;s talk →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
