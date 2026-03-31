import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact — Mayank Singh",
  description:
    "Start a video project with Mayank Singh. Brand films, reels, and cinematic content.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT — info */}
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Get in Touch"
                title={
                  <>
                    Start a{" "}
                    <span className="text-zinc-400">Project</span>
                  </>
                }
              >
                Currently accepting projects for Q3 2026.
              </SectionHeading>
              <p className="mt-2 text-sm text-zinc-500">
                Typical response time: within 24 hours.
              </p>

              <div className="mt-12 flex flex-col gap-8">
                <div>
                  <p className="text-xs tracking-[0.26em] uppercase text-zinc-500 mb-2">
                    Email
                  </p>
                  <a href="mailto:msingh83904@gmail.com" className="text-lg font-medium hover:text-white transition-colors">
                    msingh83904@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs tracking-[0.26em] uppercase text-zinc-500 mb-2">
                    Phone
                  </p>
                  <a href="tel:7988736877" className="text-lg font-medium hover:text-white transition-colors">
                    +91 7988736877
                  </a>
                </div>

                <div>
                  <p className="text-xs tracking-[0.26em] uppercase text-zinc-500 mb-2">
                    Socials
                  </p>
                  <div className="flex gap-4 text-xs tracking-[0.18em] uppercase text-zinc-400">
                    <a className="hover:text-zinc-100 transition-colors inline-flex items-center gap-2 font-medium" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>


        </div>
      </Container>
    </main>
  );
}
