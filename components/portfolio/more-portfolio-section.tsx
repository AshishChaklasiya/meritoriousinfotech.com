import { PortfolioGrid } from "@/components/portfolio/portfolio-grid"
import { SectionHeader } from "@/components/ui/section-header"
import type { PortfolioProject } from "@/lib/content/portfolio"

/** "Explore Our Portfolio" band used on the services and portfolio detail pages. */
export function MorePortfolioSection({
  projects,
}: {
  projects?: PortfolioProject[]
}) {
  return (
    <section
      aria-labelledby="more-portfolio-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="more-portfolio-title"
          eyebrow="More Portfolio"
          title="Explore Our Portfolio"
          divider
          titleClassName="max-w-[477px]"
        />
        <PortfolioGrid projects={projects} />
      </div>
    </section>
  )
}
