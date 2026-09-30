import { SectionHeader } from "@/components/ui/section-header"
import { StarIcon } from "@/components/icons"
import { Marquee } from "@/components/ui/marquee"

type Review = {
  name: string
  postedAgo: string
  quote: string
  rating: number
}

const REVIEWS: Review[] = [
  {
    name: "Chetan Vaghani",
    postedAgo: "3 Years Ago",
    quote:
      "Good for your social media handle and digital marketing strategy. Excellent design deliverables and turnaround times.",
    rating: 5,
  },
  {
    name: "Hardik Beladiya",
    postedAgo: "3 Years Ago",
    quote:
      "Awesome company for work, continuous learning, and exploring new cutting-edge technology stacks.",
    rating: 5,
  },
  {
    name: "Mohammed Rangrej",
    postedAgo: "4 Years Ago",
    quote:
      "Nice work here. Professional developers who understand contemporary software architecture and client requirements deeply.",
    rating: 5,
  },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure
      data-pointer
      className="spotlight flex min-h-[221px] w-[min(389px,80vw)] shrink-0 flex-col justify-between gap-4 rounded-card border border-divider bg-surface p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-brand/40"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <figcaption className="text-title font-medium text-ink">
            {review.name}
          </figcaption>
          <div className="flex shrink-0 gap-1 text-star sm:gap-2">
            <span className="sr-only">{review.rating} out of 5 stars</span>
            {Array.from({ length: review.rating }, (_, i) => (
              <StarIcon key={i} className="size-[18px]" />
            ))}
          </div>
        </div>
        <p className="font-mono text-micro text-grey-1">{review.postedAgo}</p>
        <blockquote className="pt-[2.75px] text-body-sm text-grey-1">
          &quot;{review.quote}&quot;
        </blockquote>
      </div>
      <div className="flex justify-between gap-4 border-t border-divider pt-3 font-mono text-micro uppercase">
        <span className="text-grey-2">Auth: Google_OAuth</span>
        <span className="flex items-center gap-1.5 text-brand">
          <span
            aria-hidden="true"
            className="animate-breathe size-1 rounded-full bg-brand"
          />
          Verified
        </span>
      </div>
    </figure>
  )
}

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-11">
        <SectionHeader
          id="testimonials-title"
          index="05"
          eyebrow="Testimonials"
          title={"Customer Voices:\nVerified Telemetry"}
          description="Authentic reviews and verified ratings from global enterprise stakeholders, partners, and founders who trust our architectural execution."
          descriptionClassName="max-w-[441px]"
        />

        <Marquee
          duration={60}
          gap={16}
          fadeClassName="from-canvas"
          className="py-1.5"
        >
          {/* Repeat so one copy always spans wider than the container */}
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
