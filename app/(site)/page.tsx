import { CapabilitiesSection } from "@/components/home/capabilities-section"
import { HeroSection } from "@/components/home/hero-section"
import { PortfolioSection } from "@/components/home/portfolio-section"
import { ServicesSection } from "@/components/home/services-section"
import { StatsSection } from "@/components/home/stats-section"
import { TechnologiesSection } from "@/components/home/technologies-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CapabilitiesSection />
      <TechnologiesSection />
      <PortfolioSection />
      <TestimonialsSection />
    </>
  )
}
