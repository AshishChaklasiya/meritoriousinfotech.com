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
          index="04"
          eyebrow="Portfolio"
          title={"Recent Work,\nand What It Changed"}
          description="Websites, mobile apps and business tools we've designed and built, with the difference each one made for the client."
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
          See all projects
        </CtaLink>
      </div>
    </section>
  )
}
