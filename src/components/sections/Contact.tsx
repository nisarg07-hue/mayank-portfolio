"use client";

import { useState } from "react";
import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../motion/Reveal";

const email = "msingh83904@gmail.com";
const phone = "7988736877";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  }

  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Contact"
                title={
                  <>
                    Let’s cut something{" "}
                    <span className="text-zinc-400">beautiful</span>.
                  </>
                }
              >
                Available for premium edits and ongoing collaborations.
              </SectionHeading>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delayMs={120}>
              <div className="rounded-3xl border border-[color:var(--hairline)] bg-white/[0.02] p-8 flex flex-col gap-8 items-start">
                <div className="flex flex-col gap-2">
                  <div className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                    Email
                  </div>
                  <a href={`mailto:${email}`} className="text-lg font-medium hover:text-white transition-colors">
                    {email}
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs tracking-[0.26em] uppercase text-zinc-500">
                    Phone
                  </div>
                  <a href={`tel:${phone}`} className="text-lg font-medium hover:text-white transition-colors">
                    +91 {phone}
                  </a>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs tracking-[0.26em] uppercase text-zinc-500 mt-2">
                    Social
                  </div>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 btnPrimary rounded-full bg-zinc-100 text-black px-7 py-4 text-xs tracking-[0.18em] uppercase hover:bg-white transition-colors font-medium mt-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    Instagram
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

