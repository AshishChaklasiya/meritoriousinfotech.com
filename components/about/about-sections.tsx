import Image from "next/image"
import type { CSSProperties } from "react"

import { RocketIcon, TargetIcon } from "@/components/icons"
import { IconCard } from "@/components/ui/icon-card"
import { Marquee } from "@/components/ui/marquee"
import { SectionHeader } from "@/components/ui/section-header"

export function MissionVisionSection() {
  return (
    <section
      aria-labelledby="mission-title"
      className="border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="mission-title"
          eyebrow="Who we are"
          title="What Drives Our Work"
          description="We measure ourselves by one thing: whether clients come back, and whether they send their friends."
          divider
          titleClassName="max-w-[515px]"
          descriptionClassName="max-w-[499px]"
        />
        <div data-anim="stagger" className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <IconCard icon={TargetIcon} title="Our Mission">
            <p>
              To give growing businesses the design and engineering care that
              big agencies reserve for their largest clients. That means clear
              advice, honest estimates and software that keeps working long
              after launch.
            </p>
          </IconCard>
          <IconCard icon={RocketIcon} title="Our Vision">
            <p>
              To be the first name businesses in Surat and Gujarat think of when
              they need software built properly, and a team clients abroad
              recommend to each other.
            </p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}

type TeamMember = { name: string; role: string; photo: string }

/**
 * TODO: add the real Meritorious team (name, role, photo). The section stays
 * hidden while this is empty; the design's placeholder names belonged to
 * another company's founders and must not ship.
 */
const TEAM: TeamMember[] = []

export function TeamSection() {
  if (TEAM.length === 0) return null

  return (
    <section
      aria-labelledby="team-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-11">
        <SectionHeader
          id="team-title"
          eyebrow="Our team"
          title="The People You'll Work With"
          description="A senior team member leads every project. These are the people you'll meet on your first call."
          titleClassName="max-w-[647px]"
          descriptionClassName="max-w-[480px]"
        />
        <ul
          data-anim="stagger"
          className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-11"
        >
          {TEAM.map((member) => (
            <li
              key={member.photo}
              data-pointer
              className="group/member flex flex-col gap-5 xl:gap-7"
            >
              <div
                data-anim="image"
                data-delay="0.1"
                className="relative aspect-[298/318] overflow-hidden rounded-[4px]"
              >
                <div data-anim-inner className="absolute inset-0">
                  <div
                    data-depth
                    style={{ "--depth": -12 } as CSSProperties}
                    className="absolute inset-0"
                  >
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 298px, 50vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/member:scale-[1.04]"
                    />
                  </div>
                </div>
                {/* Brand rule sweeps across the portrait's foot on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/member:scale-x-100"
                />
              </div>
              <div className="flex flex-col gap-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/member:translate-x-1">
                <h3 className="text-xl leading-[1.25] font-medium tracking-[-0.01em] text-ink md:text-2xl">
                  {member.name}
                </h3>
                <p className="text-base leading-[1.25] tracking-[-0.004em] text-grey-1 md:text-[1.2rem]">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const CULTURE_ROWS = [
  [1, 2, 3, 4],
  [4, 3, 5, 6, 7],
].map((row) => row.map((n) => `/images/about/culture/culture-${n}.jpg`))

export function CultureSection() {
  return (
    <section
      aria-labelledby="culture-title"
      className="overflow-x-clip border-b border-divider bg-surface py-16 md:py-24 xl:py-[110px]"
    >
      <div className="container-content">
        <SectionHeader
          id="culture-title"
          eyebrow="Our culture"
          title="Life at Meritorious"
          description="We work together from one office in Nanpura, Surat. Teams are small, knowledge is shared openly, and everyone gets time to learn new tools, because the best work comes from people who enjoy doing it."
          divider
          descriptionClassName="max-w-[402px]"
        />
      </div>

      {/* Full-bleed photo rows, drifting in opposite directions */}
      <div
        data-anim="fade"
        className="mt-10 flex flex-col gap-[14.4px] md:mt-16"
      >
        {CULTURE_ROWS.map((row, index) => (
          <Marquee
            key={index}
            reverse={index % 2 === 1}
            duration={70}
            gap={14.4}
            fadeClassName="from-surface"
            fadeWidthClassName="w-16 md:w-[200px]"
            data-parallax-x={index % 2 === 1 ? -3 : 3}
            data-velocity="skew"
          >
            {[...row, ...row].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-[528/345] w-[280px] shrink-0 overflow-hidden rounded-[4px] md:w-[528px]"
              >
                <Image
                  src={src}
                  alt={i < row.length ? "Meritorious Infotech team" : ""}
                  fill
                  sizes="528px"
                  className="object-cover"
                />
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}

const VALUES = [
  {
    title: "Straight answers",
    description:
      "If something won't work or isn't worth the money, we say so before you pay for it.",
  },
  {
    title: "Senior attention",
    description:
      "A senior designer or developer leads every project, from the first call to launch.",
  },
  {
    title: "Show, don't report",
    description:
      "You see working software every week, not a slide deck about progress.",
  },
  {
    title: "Your product, your code",
    description:
      "You own everything we build, and we document it so you're never locked in.",
  },
]

export function ValuesSection() {
  return (
    <section
      aria-labelledby="values-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-[110px]"
    >
      <div className="container-content flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="values-title"
          eyebrow="How we work"
          title="Four Promises We Keep"
          description="The habits that keep clients coming back, written down so you can hold us to them."
          divider
          titleClassName="max-w-[515px]"
          descriptionClassName="max-w-[420px]"
        />
        <ul
          data-anim="stagger"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {VALUES.map((value, index) => (
            <li
              key={value.title}
              data-pointer
              className="spotlight flex flex-col gap-5 border border-divider bg-surface p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-brand/40 sm:p-8"
            >
              <span className="font-mono text-eyebrow text-grey-2">
                0{index + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-h4 font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="text-body text-grey-1">{value.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
