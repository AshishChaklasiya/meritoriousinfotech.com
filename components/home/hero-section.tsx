import { ArrowRightIcon, ArrowUpRightSolidIcon } from "@/components/icons"
import { HeroMotion } from "@/components/home/hero-motion"
import { HeroBackdrop } from "@/components/layout/hero-backdrop"
import { CtaLink } from "@/components/ui/cta-link"

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

      <div
        data-hero-content
        className="container-content flex flex-col items-center pt-16 pb-20 text-center md:pt-24 md:pb-28 xl:pt-[112px] xl:pb-[145px]"
      >
        <div className="flex flex-col items-center gap-6 md:gap-10">
          <h1
            id="hero-title"
            data-hero-el="title"
            className="text-display font-medium text-ink"
          >
            Your Trusted
            <br />
            Development{" "}
            <span
              data-hero-el="accent"
              className="inline-block font-mono font-bold tracking-[0.014em] text-brand uppercase italic"
            >
              Partner
            </span>
          </h1>
          <p
            data-hero-el="lead"
            className="max-w-[968px] text-body font-light text-grey-1 md:text-lead"
          >
            Dedicated to synthesizing resilient web applications, complex cloud
            architectures, and surgical native mobile ecosystems. Engineered for
            enterprise scale, governed by disciplined code aesthetics.
          </p>
        </div>

        <div data-hero-el="cta" className="mt-10 xl:mt-[62px]">
          <CtaLink
            href="/services"
            icon={<ArrowUpRightSolidIcon />}
            hoverIcon={<ArrowRightIcon />}
          >
            Our Services
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
