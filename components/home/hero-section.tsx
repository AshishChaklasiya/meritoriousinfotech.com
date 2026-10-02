import type { CSSProperties } from "react"

import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { HeroMotion } from "@/components/home/hero-motion"
import { HeroTelemetry } from "@/components/home/hero-telemetry"
import { HeroBackdrop } from "@/components/layout/hero-backdrop"
import { CtaLink } from "@/components/ui/cta-link"
import { LearnMoreLink } from "@/components/ui/learn-more-link"
import { COMMITMENTS } from "@/lib/content/company"

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      data-scene="hero"
      data-pointer
      className="relative isolate overflow-hidden bg-canvas"
    >
      <HeroBackdrop leftGlow>
        <HeroMotion />
      </HeroBackdrop>

      <HeroTelemetry />

      {/* Two owners, two elements: GSAP drifts the outer wrapper on scroll;
          CSS shifts the inner one a few px against the pointer */}
      <div data-hero-content>
        <div
          data-depth
          style={{ "--depth": -6 } as CSSProperties}
          className="container-content flex flex-col items-center pt-16 pb-20 text-center md:pt-24 md:pb-28 xl:pt-[112px] xl:pb-[145px]"
        >
          <div className="flex flex-col items-center gap-6 md:gap-10">
            <p className="font-mono text-eyebrow font-bold tracking-[0.12em] text-brand uppercase">
              Software development company in Surat, India
            </p>
            <h1
              id="hero-title"
              data-hero-el="title"
              className="text-display font-medium text-ink"
            >
              Software That Fits How
              <br />
              Your Business Actually{" "}
              <span
                data-hero-el="accent"
                className="inline-block font-mono font-bold tracking-[0.014em] text-brand uppercase italic"
              >
                Works
              </span>
            </h1>
            <p
              data-hero-el="lead"
              className="max-w-[968px] text-body font-light text-grey-1 md:text-lead"
            >
              Meritorious Infotech is a software development company in Surat.
              Our designers and developers plan, design and build websites,
              mobile apps and custom business software for founders and growing
              companies in India and abroad. You work with one team and one
              point of contact, and you get a fixed quote before work starts.
            </p>
          </div>

          <div
            data-hero-el="cta"
            className="mt-10 flex flex-col items-center gap-5 xl:mt-[62px]"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <CtaLink
                href="/contact"
                icon={<ArrowUpRightSolidIcon />}
                hoverIcon={<ArrowRightIcon />}
              >
                Get an estimate in {COMMITMENTS.estimateHours} hours
              </CtaLink>
              <LearnMoreLink
                href="/portfolio"
                label="See our work"
                className="text-body"
              />
            </div>
            <p className="text-caption text-grey-1">
              Free 30-minute call. No obligation. NDA on request.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
