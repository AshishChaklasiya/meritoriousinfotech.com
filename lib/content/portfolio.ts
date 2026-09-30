export const PORTFOLIO_CATEGORIES = [
  "Mobile App Development",
  "React Native",
  "Website",
] as const

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]

export type PortfolioStat = {
  value: string
  label: string
  /** Renders a star after the value (app-store rating) */
  rating?: boolean
}

export type PortfolioBlock =
  | { heading: string; items: { label: string; text: string }[] }
  | { heading: string; paragraph: string }

export type PortfolioProject = {
  slug: string
  title: string
  category: PortfolioCategory
  /** Card copy */
  summary: string
  image: string
  /** Detail hero: title with the highlighted last word, stats and device screenshot */
  heroTitle: { before: string; highlight: string }
  stats: PortfolioStat[]
  screenshot: string
  intro: string
  blocks: PortfolioBlock[]
}

// Placeholder projects — replace with real case studies.
const CARD_IMAGE = "/images/home/portfolio-placeholder.jpg"
const SCREENSHOT = "/images/portfolio/messages-app.png"
const SUMMARY_A =
  "Techniques for constructing distributed, resilient cloud database backends that scale horizontally under heavy traffic surges."
const SUMMARY_B =
  "Tailored engineering solutions that combine technical precision, modular frontend scaffolding, and high-velocity sprints."

const DEFAULT_STATS: PortfolioStat[] = [
  { value: "4", label: "397 Reviews", rating: true },
  { value: "50K", label: "Downloads" },
  { value: "12+", label: "Rated for 12+" },
]

function placeholderDetail(name: string) {
  return {
    stats: DEFAULT_STATS,
    screenshot: SCREENSHOT,
    intro: `${name} is a placeholder case study. Replace this copy with an overview of the client's goals, the product we built together and the results it delivered.`,
    blocks: [
      {
        heading: "Key Features:",
        items: [
          {
            label: "Feature One",
            text: "Short description of a headline feature and the problem it solves.",
          },
          {
            label: "Feature Two",
            text: "Short description of a second feature and why users love it.",
          },
          {
            label: "Feature Three",
            text: "Short description of a third feature and its business impact.",
          },
        ],
      },
      {
        heading: "Outcome:",
        paragraph:
          "Summarise the measurable outcome of the project here — adoption, performance or revenue improvements.",
      },
    ] satisfies PortfolioBlock[],
  }
}

const MESSAGES_APP: PortfolioProject = {
  slug: "messages-app",
  title: "Messages App",
  category: "Mobile App Development",
  summary: SUMMARY_B,
  image: CARD_IMAGE,
  heroTitle: { before: "Messages App – Texting ", highlight: "App" },
  stats: DEFAULT_STATS,
  screenshot: SCREENSHOT,
  intro:
    "Take your conversations to the next level with Message App! This versatile messaging platform allows you to send text messages, make voice calls, and share photos, videos, and other files instantly. Enhance your messaging experience with advanced features like message search, ensuring convenience and control over your communications.",
  blocks: [
    {
      heading: "Key Features:",
      items: [
        {
          label: "Instant Messaging",
          text: "Send text messages to friends, family, and colleagues quickly and effortlessly.",
        },
        {
          label: "Voice Calls",
          text: "Make clear and reliable voice calls directly from the app.",
        },
        {
          label: "Media Sharing",
          text: "Share photos, videos, and other files instantly with your contacts.",
        },
        {
          label: "Message Search",
          text: "Easily find past conversations and specific messages with the powerful search feature.",
        },
        {
          label: "User-Friendly Interface",
          text: "Enjoy a clean, intuitive interface that makes communication seamless and enjoyable.",
        },
        {
          label: "Enhanced Privacy",
          text: "Experience peace of mind with robust security features to keep your conversations private and secure.",
        },
        {
          label: "Cross-Platform Support",
          text: "Use Message App across various devices and platforms, ensuring you stay connected no matter where you are.",
        },
      ],
    },
    {
      heading: "Why Choose Message App?",
      items: [
        {
          label: "Convenience",
          text: "Streamline your communications with a single app that handles text, voice, and media sharing.",
        },
        {
          label: "Control",
          text: "Stay organized and in control of your conversations with advanced search and privacy features.",
        },
        {
          label: "Versatility",
          text: "Whether you're chatting, calling, or sharing files, Message App provides all the tools you need for effective communication.",
        },
      ],
    },
    {
      heading: "Stay Connected:",
      paragraph:
        "With Message App, you get the best of both worlds – convenience and control. Elevate your messaging experience by downloading Message App today and enjoy seamless communication like never before!",
    },
  ],
}

const PLACEHOLDERS: PortfolioProject[] = (
  [
    ["calendar-2025", "Calendar 2025", "Mobile App Development", SUMMARY_A],
    ["calculator-2026", "Calculator 2026", "Mobile App Development", SUMMARY_B],
    ["translated-app", "Translated App", "React Native", SUMMARY_B],
    ["fitness-tracker", "Fitness Tracker", "Mobile App Development", SUMMARY_A],
    ["expense-manager", "Expense Manager", "React Native", SUMMARY_B],
    ["recipe-book", "Recipe Book", "Mobile App Development", SUMMARY_A],
    ["travel-planner", "Travel Planner", "React Native", SUMMARY_B],
    ["agency-website", "Agency Website", "Website", SUMMARY_A],
  ] as const
).map(([slug, title, category, summary]) => {
  const words = title.split(" ")
  return {
    slug,
    title,
    category,
    summary,
    image: CARD_IMAGE,
    heroTitle: {
      before: words.slice(0, -1).join(" ") + (words.length > 1 ? " " : ""),
      highlight: words[words.length - 1],
    },
    ...placeholderDetail(title),
  }
})

// First row mirrors the Figma grid (Calendar, Calculator, Translated).
export const PORTFOLIO: PortfolioProject[] = [
  ...PLACEHOLDERS.slice(0, 3),
  MESSAGES_APP,
  ...PLACEHOLDERS.slice(3),
]

/** Home and detail pages feature these three. */
export const FEATURED_SLUGS = [
  "calendar-2025",
  "calculator-2026",
  "translated-app",
]

export function getProject(slug: string) {
  return PORTFOLIO.find((project) => project.slug === slug)
}
