import Image from "next/image"

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
          title="Passion and Purpose We Stand By"
          description="We exist to create meaningful work, driven by passion, guided by integrity, and fueled by a promise to always grow, improve, and make a difference."
          divider
          titleClassName="max-w-[515px]"
          descriptionClassName="max-w-[499px]"
        />
        <div data-anim="stagger" className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <IconCard icon={TargetIcon} title="Our Mission">
            <p>
              Our focus is on crafting intuitive, engaging digital experiences
              that leave a lasting impact. Through expert guidance, we help
              clients navigate the evolving digital landscape with confidence.
              We create user-friendly interfaces that simplify complexity while
              strengthening their online presence. Our vision is to keep every
              digital experience impactful, attractive, and relevant as
              technology continues to evolve.
            </p>
          </IconCard>
          <IconCard icon={RocketIcon} title="Our Vision">
            <p>
              We empower growth through digital excellence, delivering
              innovative and reliable solutions that drive success. Our
              commitment to continuous innovation helps clients navigate the
              digital landscape with confidence, unlock new opportunities, and
              reach greater heights.
            </p>
          </IconCard>
        </div>
      </div>
    </section>
  )
}

const TEAM = [
  {
    name: "Victor Riparbelli",
    role: "CEO & Co-founder",
    photo: "/images/about/team/victor-riparbelli.jpg",
  },
  {
    name: "Steffen Tjerrild",
    role: "COO & Co-Founder",
    photo: "/images/about/team/steffen-tjerrild.jpg",
  },
  {
    name: "Prof. Matt Niessner",
    role: "Co-Founder",
    photo: "/images/about/team/matt-niessner-1.jpg",
  },
  {
    name: "Prof. Matt Niessner",
    role: "Co-Founder",
    photo: "/images/about/team/matt-niessner-2.jpg",
  },
]

export function TeamSection() {
  return (
    <section
      aria-labelledby="team-title"
      className="border-b border-divider bg-canvas py-16 md:py-24 xl:py-36"
    >
      <div className="container-content flex flex-col gap-11">
        <SectionHeader
          id="team-title"
          eyebrow="Founding team"
          title="Meet the Core Team Leaders"
          description="We leverage the industry's most advanced frameworks and languages to design scalable, secure, and future-proof digital solutions."
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
              className="group/member flex flex-col gap-5 xl:gap-7"
            >
              <div
                data-anim="image"
                data-delay="0.1"
                className="relative aspect-[298/318] overflow-hidden rounded-[4px]"
              >
                <div data-anim-inner className="absolute inset-0">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 298px, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/member:scale-105"
                  />
                </div>
                {/* Brand rule sweeps across the portrait's foot on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/member:scale-x-100"
                />
              </div>
              <div className="flex flex-col gap-1">
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
          eyebrow="Who we are"
          title="People-first culture"
          description="We invest in comfortable, collaborative environments across the world - where everyone can do their best work."
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
            data-velocity-skew
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
