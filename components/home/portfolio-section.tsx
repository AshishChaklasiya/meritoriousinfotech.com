import { SectionHeader } from "@/components/ui/section-header"
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons"
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"
import { CtaLink } from "@/components/ui/cta-link"

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="border-b border-divider bg-surface py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col items-center gap-10 md:gap-16">
        <SectionHeader
          id="portfolio-title"
          eyebrow="Portfolio"
          title={"Discover Our Winning\nProject Portfolio"}
          description="Real products, real users, real results - see how we’ve helped founders and enterprises launch web, mobile, and AI-powered applications across industries."
          divider
          className="w-full"
          descriptionClassName="max-w-[463px]"
        />

        <PortfolioGrid />

        <CtaLink
          href="/portfolio"
          icon={<ArrowUpRightIcon />}
          hoverIcon={<ArrowRightIcon />}
        >
          Discover More
        </CtaLink>
      </div>
    </section>
  )
}
