import type { ComponentType, SVGProps } from "react"

import {
  AndroidDevIcon,
  CheckCircleIcon,
  CodeIcon,
  DesignerIcon,
  GrowthIcon,
  QaIcon,
  RobotIcon,
  UserCheckIcon,
} from "@/components/careers/job-icons"

type Icon = ComponentType<SVGProps<SVGSVGElement>>

export type JobRequirement = {
  title: string
  icon: Icon
  items: string[]
}

export type Job = {
  slug: string
  title: string
  icon: Icon
  /** "Mid · Senior · Onsite · Surat" */
  meta: string
  summary: string
  /** Lead copy on the Job Detail hero */
  intro: string
  tags: string[]
  requirements: JobRequirement[]
}

// Placeholder content from the Figma file — replace with real openings.
const LLM_TAGS = ["LLMs", "Prompt eval", "RAG", "Agents", "Python"]
const META = "Mid · Senior · Onsite · Surat"
const AI_SUMMARY =
  "Design, evaluate and ship LLM prompts and agent flows powering production AI products. Work alongside ML engineers and product designers."
const QA_SUMMARY =
  "Build and own automated QA pipelines across web and mobile products, catching regressions before they reach our clients."
const INTRO =
  "Join a senior, product-minded team building production software for funded startups and enterprises. You'll own meaningful work from day one, with the support and mentorship to grow."

function requirements(
  eligibility: string[],
  skills: string[],
  responsibilities: string[]
): JobRequirement[] {
  return [
    {
      title: "Eligibility & Qualifications",
      icon: UserCheckIcon,
      items: eligibility,
    },
    { title: "Required Skills & Tech Stack", icon: CodeIcon, items: skills },
    {
      title: "Key Responsibilities",
      icon: CheckCircleIcon,
      items: responsibilities,
    },
  ]
}

const FIGMA_REQUIREMENTS = requirements(
  [
    "Bachelor's degree in Computer Science, IT, Engineering, or a related field.",
    "5+ years of professional experience in Node.js/backend development. Strong experience designing scalable and maintainable backend architectures.",
    "Proven ability to lead technical discussions and mentor junior developers.",
  ],
  [
    "Advanced knowledge of Node.js, Express.js, JavaScript/TypeScript, and REST/GraphQL APIs.",
    "Strong experience with MongoDB, MySQL/PostgreSQL, database design, and optimization.",
    "Proficiency in Git, Docker, authentication, API security, caching, and microservices.",
    "Experience with AWS/Azure, CI/CD, testing frameworks, and performance optimization.",
  ],
  [
    "Design, develop, and maintain scalable, secure, and high-performance backend systems.",
    "Lead the development of complex APIs, integrations, and distributed backend services.",
    "Review code, establish development best practices, and mentor junior/mid-level developers.",
    "Troubleshoot performance and production issues while ensuring system reliability and scalability.",
  ]
)

const PLACEHOLDER_REQUIREMENTS = requirements(
  [
    "Bachelor's degree in a relevant field, or equivalent practical experience.",
    "2+ years of professional experience in a similar role.",
    "Clear written and spoken communication in English.",
  ],
  [
    "Solid command of the core tools and practices for this discipline.",
    "Comfortable working in agile sprints with design and engineering teams.",
    "A portfolio or track record of shipped work you can walk us through.",
  ],
  [
    "Own deliverables end to end, from brief to release.",
    "Collaborate closely with project managers, designers and developers.",
    "Share knowledge and help raise the quality bar across the team.",
  ]
)

export const JOBS: Job[] = [
  {
    slug: "ai-prompt-engineer",
    title: "AI Prompt Engineer",
    icon: RobotIcon,
    meta: META,
    summary: AI_SUMMARY,
    intro: INTRO,
    tags: LLM_TAGS,
    requirements: FIGMA_REQUIREMENTS,
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    icon: QaIcon,
    meta: META,
    summary: QA_SUMMARY,
    intro: INTRO,
    tags: LLM_TAGS,
    requirements: PLACEHOLDER_REQUIREMENTS,
  },
  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    icon: GrowthIcon,
    meta: META,
    summary:
      "Drive outbound pipeline and qualify inbound leads for AI, mobile and web product engagements with funded startups and enterprises worldwide.",
    intro: INTRO,
    tags: ["Outbound Sales", "Lead Qualification", "Agents", "Upwork Bidding"],
    requirements: PLACEHOLDER_REQUIREMENTS,
  },
  {
    slug: "android-developer",
    title: "Android Developer",
    icon: AndroidDevIcon,
    meta: META,
    summary: AI_SUMMARY,
    intro: INTRO,
    tags: LLM_TAGS,
    requirements: PLACEHOLDER_REQUIREMENTS,
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    icon: DesignerIcon,
    meta: META,
    summary: QA_SUMMARY,
    intro: INTRO,
    tags: LLM_TAGS,
    requirements: PLACEHOLDER_REQUIREMENTS,
  },
]

export function getJob(slug: string) {
  return JOBS.find((job) => job.slug === slug)
}
