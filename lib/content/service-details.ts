/**
 * Content for the service detail pages (Figma frames 6:3878, 6:4216, 6:4571).
 *
 * Tab ids stay stable: the mega menu and the Home service cards deep-link to
 * them (`/services/<slug>#<tab-id>`), so relabel tabs without renaming ids.
 *
 * Points and "Read More" items are written "Label: text"; the label renders
 * bold. Timelines are typical ranges from the content plan (confirm).
 */

import type { FaqItem } from "@/components/sections/faq-section"
import { COMMITMENTS } from "@/lib/content/company"

export type ServiceTabIcon =
  | "user-experience"
  | "interface"
  | "user-research"
  | "devices"
  | "web-design"
  | "prototype"
  | "frontend"
  | "backend"
  | "accelerate"
  | "landing-page"
  | "cms"
  | "ecommerce"
  | "android"
  | "apple"
  | "flutter"
  | "react-native"

export type ServiceTab = {
  id: string
  label: string
  icon: ServiceTabIcon
  intro: string[]
  heading: string
  points: string[]
  /** Revealed by "Read More" */
  more: string[]
}

export type ServiceDetail = {
  slug: string
  /** Breadcrumb, menu and schema name */
  name: string
  title: { before: string; highlight: string; after?: string }
  /** Hero lead copy */
  description: string
  heroCta: string
  metaTitle: string
  metaDescription: string
  capabilitiesTitle: string
  capabilitiesTitleClassName?: string
  capabilitiesDescription: string
  tabs: ServiceTab[]
  problems: { title: string; items: string[] }
  /** Optional decision table (mobile: native vs cross-platform) */
  comparison?: { title: string; columns: string[]; rows: string[][] }
  timelines: { project: string; timeline: string }[]
  faq: FaqItem[]
}

const INCLUDED = "What's included:"

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "graphic-ui-ux-design",
    name: "UI/UX & Graphic Design",
    title: {
      before: "UI/UX & Graphic Design ",
      highlight: "Services",
      after: " in Surat",
    },
    description:
      "We design brands, websites and app interfaces that people understand at first glance. Your developers get files they can build from without guessing. We're based in Surat and work with clients across India and abroad.",
    heroCta: "Request a free design review",
    metaTitle: "UI UX Design Company in Surat",
    metaDescription:
      "UI UX design company in Surat for websites, apps and brands: research, interface design, prototypes and graphic design, with developer-ready files.",
    capabilitiesTitle: "Our design capabilities",
    capabilitiesTitleClassName: "max-w-[477px]",
    capabilitiesDescription:
      "Research, interface design, prototyping and branding from one team, so what you approve is what gets built.",
    tabs: [
      {
        id: "elevating-user-experiences",
        label: "User Experience (UX) Design",
        icon: "user-experience",
        intro: [
          "Good UX is mostly invisible. People find what they need, finish what they started, and don't have to call your support line to ask how. We map how your users think and design the path around them.",
        ],
        heading: INCLUDED,
        points: [
          "User flows and site maps: every screen and the route between them, agreed before visual design starts.",
          "Wireframes: low-detail layouts that settle structure and content quickly and cheaply.",
          "Usability review: we test key tasks with real users, find where people get stuck, and fix it.",
        ],
        more: [
          "When you need it: before a new product is built, or when an existing one has high drop-off, low conversion or too many support tickets.",
          "What you receive: user flows, annotated wireframes and a short findings report with prioritised fixes.",
          "Typical timeline: 1–3 weeks, depending on the number of screens and user types.",
        ],
      },
      {
        id: "craft-exceptional-user-interfaces",
        label: "User Interface (UI) Design",
        icon: "interface",
        intro: [
          "Customers judge your product by its interface. We design screens that look like your brand, read clearly on every device and stay consistent as the product grows.",
        ],
        heading: INCLUDED,
        points: [
          "Visual design: colour, typography and layout built from your brand, or a new direction if you need one.",
          "Component library: buttons, forms, cards and their states designed once in Figma and reused everywhere.",
          "Developer handover: specs, assets and spacing values, so what gets built matches what you approved.",
        ],
        more: [
          "Accessibility: contrast, text size and touch targets checked against WCAG 2.2 AA.",
          "Responsive layouts: every screen designed for mobile, tablet and desktop, not stretched to fit afterwards.",
          "Typical timeline: 2–5 weeks for a website or app of 15–30 screens.",
        ],
      },
      {
        id: "user-research-services",
        label: "User Research",
        icon: "user-research",
        intro: [
          "Building the wrong thing is the most expensive mistake in software. A short research phase tells you what to build first, and what not to build at all.",
        ],
        heading: INCLUDED,
        points: [
          "Stakeholder and user interviews: 5–8 conversations that uncover the real problems behind feature requests.",
          "Competitor review: how similar products handle the same task, and where they fall short.",
          "Personas and journey maps: a shared picture of who you're designing for, used by the whole team.",
        ],
        more: [
          "Best for: new products, new markets, or redesigns where the team disagrees on direction.",
          "What you receive: a research summary, personas, a journey map and a prioritised feature list.",
          "Typical timeline: 1–2 weeks.",
        ],
      },
      {
        id: "mobile-and-web-apps-ui-design",
        label: "Mobile & Web App UI Design",
        icon: "devices",
        intro: [
          "Apps succeed or fail on their first few screens. We design onboarding, dashboards and everyday flows that follow Android and iOS conventions, so users feel at home without a tutorial.",
        ],
        heading: INCLUDED,
        points: [
          "Platform guidelines: Material Design for Android and Apple's Human Interface Guidelines for iOS.",
          "Dashboards and data screens: complex information arranged so the most important number is the first thing people see.",
          "Every state designed: empty, loading, error and offline screens are designed too, not left to the developer.",
        ],
        more: [
          "Works with: native Android and iOS, Flutter and React Native builds.",
          "Redesigns: we can redesign an existing app screen by screen, without a full rebuild.",
          "Typical timeline: 3–6 weeks for an MVP app.",
        ],
      },
      {
        id: "custom-web-design-services",
        label: "Custom Web Design & Branding",
        icon: "web-design",
        intro: [
          "A template gets you online. A custom design gets you remembered, and shows visitors exactly what to do next. We design websites around your customers' questions and your sales process, with branding to match.",
        ],
        heading: INCLUDED,
        points: [
          "Content-first layouts: pages planned around what buyers search for and ask before they call.",
          "Designed to convert: clear calls to action, enquiry forms and trust signals placed where people make decisions.",
          "Brand & graphic design: logos, brand guidelines, brochures, catalogues, packaging and social media templates that match the website.",
        ],
        more: [
          "SEO-ready structure: headings, page speed and mobile layout planned with search in mind from day one.",
          "Built by the same team: our developers turn the approved design into a fast website your team can edit.",
          "Typical timeline: 2–4 weeks to design a 5–15 page website.",
        ],
      },
      {
        id: "ui-prototyping-services",
        label: "UI Prototyping",
        icon: "prototype",
        intro: [
          "A clickable prototype lets you test an idea, win over stakeholders or pitch investors before you pay for development. At this stage a change costs hours, not weeks.",
        ],
        heading: INCLUDED,
        points: [
          "Clickable Figma prototypes: realistic flows that run on a phone or laptop just like the real product.",
          "User testing: we put the prototype in front of target users and report what worked and what didn't.",
          "Build-ready: the approved prototype becomes the development brief, so nothing is lost in translation.",
        ],
        more: [
          "Best for: founders validating an idea, investor pitches, and internal sign-off on large projects.",
          "What you receive: the prototype, a test summary and a list of recommended changes.",
          "Typical timeline: 1–2 weeks.",
        ],
      },
    ],
    problems: {
      title: "Signs it's time to invest in design",
      items: [
        "Visitors reach your website but don't get in touch.",
        "People download your app and don't come back.",
        "Your brand looks different on the website, the app and the brochure.",
        "Developers keep asking what a screen is supposed to do.",
      ],
    },
    timelines: [
      { project: "Logo and brand identity", timeline: "1–2 weeks" },
      { project: "Website design, 5–15 pages", timeline: "2–4 weeks" },
      { project: "App UI design, MVP", timeline: "3–6 weeks" },
      { project: "UX audit of an existing product", timeline: "1 week" },
    ],
    faq: [
      {
        question: "What if I don't like the first design?",
        answer:
          "We show two directions for the key screens before designing the rest, and each stage includes two rounds of revisions. Most disagreements are settled at the wireframe stage, where changes are cheap.",
      },
      {
        question: "Do I get the source files?",
        answer:
          "Yes. You receive the full Figma files, exported assets and brand guidelines, and they're yours to keep.",
      },
      {
        question: "Can you just design, and our own developers build it?",
        answer:
          "Yes. We prepare developer-ready specs and stay available to answer questions during the build.",
      },
      {
        question: "Do you design logos and print material too?",
        answer:
          "Yes. The same team designs brand identities, brochures, catalogues, packaging and social media creatives, so they match your website and app.",
      },
      {
        question:
          "Can you redesign our existing app or website without rebuilding it?",
        answer:
          "Often, yes. We review what you have, then redesign the screens that matter most first, so improvements go live in stages.",
      },
    ],
  },
  {
    slug: "web-engineering-platforms",
    name: "Web Development",
    title: {
      before: "Website & Web App ",
      highlight: "Development",
      after: " in Surat",
    },
    description:
      "We build business websites, online stores and web applications that load quickly, show up in search and are easy for your team to run. Every project comes with a fixed quote, weekly demos and a named project lead.",
    heroCta: "Get a website estimate",
    metaTitle: "Website Development Company in Surat",
    metaDescription:
      "Website development company in Surat building business websites, online stores and web apps that load fast and rank well. Fixed quote, weekly demos.",
    capabilitiesTitle: "Our web development capabilities",
    capabilitiesTitleClassName: "max-w-[582px]",
    capabilitiesDescription:
      "From a one-page campaign site to a customer portal, built on a stack chosen for your project, not our habits.",
    tabs: [
      {
        id: "dynamic-frontend-development",
        label: "Frontend Development",
        icon: "frontend",
        intro: [
          "The frontend is everything your visitors see and click. We build it to load quickly on a mobile connection, work in every modern browser and match the approved design exactly.",
        ],
        heading: INCLUDED,
        points: [
          "Modern frameworks: React, Angular or Vue for interactive applications; lighter builds for content-led websites.",
          "Responsive by default: layouts tested on real phones, tablets and desktops before launch.",
          "Speed and SEO: Core Web Vitals, clean markup and server-side rendering wherever search visibility matters.",
        ],
        more: [
          "Accessibility: keyboard navigation, screen-reader labels and colour contrast checked before go-live.",
          "Faster existing sites: we can rebuild a slow frontend on top of your current backend without touching your data.",
          "Handover: clean, commented code in your own repository.",
        ],
      },
      {
        id: "powerful-backend-development",
        label: "Backend Development",
        icon: "backend",
        intro: [
          "The backend holds your data, business rules and integrations. We build it to be secure, documented and easy for any future developer to pick up.",
        ],
        heading: INCLUDED,
        points: [
          "APIs: REST and GraphQL APIs that serve your website, mobile app and partners from one place.",
          "Integrations: payment gateways, SMS and WhatsApp messaging, and the accounting and CRM tools you already use.",
          "Security: role-based access, encrypted data, scheduled backups and checks against the OWASP Top 10.",
        ],
        more: [
          "Stack: Node.js, Laravel/PHP, Python or Java, with MySQL, PostgreSQL or MongoDB.",
          "Hosting: set up on AWS, Google Cloud, Azure or a managed host, in an account you own, with uptime monitoring.",
          "Documentation: every API endpoint documented, so your next developer doesn't start from scratch.",
        ],
      },
      {
        id: "accelerating-your-development",
        label: "Custom Web Apps & Portals",
        icon: "accelerate",
        intro: [
          "When off-the-shelf software doesn't fit, a custom web application does exactly what your business needs and nothing more. We build internal tools, customer portals and SaaS products around the way your team already works.",
        ],
        heading: INCLUDED,
        points: [
          "Internal tools: order management, inventory, job tracking and approvals that replace spreadsheets and paper registers.",
          "Customer and dealer portals: clients place orders, track status and download invoices without phoning your office.",
          "SaaS products: multi-user platforms with subscriptions, user roles and reporting dashboards.",
        ],
        more: [
          "Start with one workflow: we usually ship the process that saves the most time first, then build on it.",
          "Your data stays yours: hosted in your account and exportable whenever you want.",
          "Typical timeline: 8–16 weeks for a first version.",
        ],
      },
      {
        id: "landing-page-solutions",
        label: "Landing Pages",
        icon: "landing-page",
        intro: [
          "A landing page has one job: turning ad clicks into enquiries. We design and build fast, focused pages for campaigns, product launches and events.",
        ],
        heading: INCLUDED,
        points: [
          "One goal per page: a single call to action, with nothing competing for attention.",
          "Quick to launch: 5–7 working days from brief to live page.",
          "Measurable: Google Analytics, Meta Pixel and conversion tracking in place before the first ad runs.",
        ],
        more: [
          "A/B variants: alternative headlines and layouts, so you can see which one converts better.",
          "Leads where you need them: form entries sent to your email, CRM or WhatsApp.",
          "Reusable: a page template your team can copy for the next campaign.",
        ],
      },
      {
        id: "efficient-cms-solutions",
        label: "CMS & Business Websites",
        icon: "cms",
        intro: [
          "Your marketing team shouldn't need a developer to change a price or publish a blog post. We build websites on a CMS your team can edit safely without breaking the design.",
        ],
        heading: INCLUDED,
        points: [
          "WordPress: custom themes built for your design and kept light, so the site stays fast.",
          "Headless CMS: content managed in a headless CMS such as Strapi or Sanity, with a fast React frontend.",
          "Training: a recorded walkthrough, so new staff can update the site too.",
        ],
        more: [
          "Multilingual: English, Hindi, Gujarati or any other language your customers read.",
          "SEO set-up: meta tags, sitemaps, schema and redirects configured before launch.",
          "Safe migration: moving from an old site without losing content or Google rankings.",
        ],
      },
      {
        id: "tailored-ecommerce-solutions",
        label: "E-commerce Development",
        icon: "ecommerce",
        intro: [
          "Whether you sell sarees to shoppers across India or machine parts to dealers abroad, we build online stores that make buying easy. Stock, orders and payments stay in sync behind the scenes.",
        ],
        heading: INCLUDED,
        points: [
          "Shopify, WooCommerce or custom: we recommend the platform that fits your catalogue size, budget and growth plans.",
          "Payments and shipping: Indian and international payment gateways, cash on delivery, GST invoices and courier integrations.",
          "B2B features: wholesale price lists, minimum order quantities and dealer logins.",
        ],
        more: [
          "Fast on mobile data: product and checkout pages built for the phones your customers actually use.",
          "Owner-friendly: add products, run offers and manage orders from one dashboard.",
          "Typical timeline: 6–10 weeks for a typical store.",
        ],
      },
    ],
    problems: {
      title: "When it's time for a new website or web app",
      items: [
        "Your website is slow, looks dated or needs a developer for every small change.",
        "Orders arrive by phone and WhatsApp, and some of them get lost.",
        "Your team types the same data into three different systems.",
        "You've outgrown your template store or your off-the-shelf software.",
      ],
    },
    timelines: [
      { project: "Landing page", timeline: "5–7 working days" },
      { project: "Business website, 5–15 pages", timeline: "3–6 weeks" },
      { project: "E-commerce store", timeline: "6–10 weeks" },
      {
        project: "Custom web application, first version",
        timeline: "8–16 weeks",
      },
    ],
    faq: [
      {
        question: "Should I use WordPress or a custom-built website?",
        answer:
          "WordPress suits most business websites and blogs, because your team can edit it easily and it's quick to build. A custom build makes sense when you need complex features, very high speed or tight integration with other systems. We'll recommend one and explain why.",
      },
      {
        question: "Will my website rank on Google?",
        answer:
          "Every site we build has the technical SEO basics in place: fast pages, clean structure, schema markup and a sitemap. Rankings also depend on your content and your competitors, so we'll tell you honestly what to expect, and we can help with content too.",
      },
      {
        question:
          "Can you redesign my website without losing my Google rankings?",
        answer:
          "Yes. We keep your best-performing content, redirect every old URL to its new page, and monitor Google Search Console after launch.",
      },
      {
        question: "Who owns the hosting and domain?",
        answer:
          "You do. Everything is set up in accounts under your name. We can manage hosting for you on a support plan, but you're never locked in.",
      },
      {
        question: "Can you take over a website another agency built?",
        answer:
          "Yes. We start with a short technical review, fix what's urgent, then continue development or plan a rebuild if that's cheaper in the long run.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    title: {
      before: "Mobile App ",
      highlight: "Development",
      after: " Company in Surat",
    },
    description:
      "We design and build Android and iOS apps for startups and growing businesses, from a first MVP to a product people use every day. We'll tell you honestly whether native or cross-platform suits your budget, and you'll test a new build on your own phone every week.",
    heroCta: "Share your app idea",
    metaTitle: "Mobile App Development Company in Surat",
    metaDescription:
      "Mobile app development company in Surat building Android, iOS, Flutter and React Native apps, from MVP to launch. Share your idea under NDA.",
    capabilitiesTitle: "Our mobile\napp capabilities",
    capabilitiesDescription:
      "Native when performance matters most, cross-platform when budget and speed matter more. We'll help you choose.",
    tabs: [
      {
        id: "android-app-development",
        label: "Android App Development",
        icon: "android",
        intro: [
          "Android runs on about 95% of smartphones in India, so for most Indian businesses it's the first app to build. We build Android apps in Kotlin that run smoothly on budget phones as well as flagships.",
        ],
        heading: INCLUDED,
        points: [
          "Kotlin and Jetpack Compose: Google's recommended tools, which keep your app fast and easy to maintain.",
          "Tested on real devices: the screen sizes, Android versions and low-memory phones your customers actually use.",
          "Play Store launch: store listing, screenshots, privacy policy and release management, all handled for you.",
        ],
        more: [
          "Built for Indian users: UPI payments, regional languages and offline mode for patchy connections.",
          "Engagement: push notifications, in-app messaging and analytics to see which features people use.",
          "Updates: compatibility with each new Android version, covered under a support plan.",
        ],
      },
      {
        id: "ios-app-development",
        label: "iOS App Development",
        icon: "apple",
        intro: [
          "iPhone users tend to spend more in apps, which makes iOS important for premium brands and overseas markets. We build in Swift and SwiftUI and follow Apple's guidelines closely, so App Store review goes smoothly.",
        ],
        heading: INCLUDED,
        points: [
          "Swift and SwiftUI: native code that feels right on iPhone and iPad.",
          "Apple features: Apple Pay, Sign in with Apple, widgets and notifications where they add real value.",
          "App Store submission: listing, screenshots, privacy details and TestFlight beta testing.",
        ],
        more: [
          "Privacy first: App Tracking Transparency and data-use labels handled correctly from the start.",
          "Beyond iPhone: iPad layouts, and Apple Watch companions where they're useful.",
          "Updates: compatibility with each year's new iOS release.",
        ],
      },
      {
        id: "flutter-development",
        label: "Flutter App Development",
        icon: "flutter",
        intro: [
          "Flutter runs one codebase on both Android and iOS with a native look and feel. That usually costs less than building two separate apps, which makes it a strong choice for MVPs and business apps.",
        ],
        heading: INCLUDED,
        points: [
          "One codebase, two apps: features ship to both platforms at the same time.",
          "Consistent design: the same brand experience on every device.",
          "Fast iteration: during review sessions, changes appear in seconds, so feedback turns into fixes quickly.",
        ],
        more: [
          "Native where needed: platform-specific code for camera, Bluetooth or payments when a plugin isn't enough.",
          "Web and desktop too: the same codebase can extend to a web or desktop version later.",
          "Typical timeline: 10–16 weeks for an MVP on both platforms.",
        ],
      },
      {
        id: "react-native-development",
        label: "React Native App Development",
        icon: "react-native",
        intro: [
          "If your team already works in JavaScript or React, React Native lets you share skills, and some code, between your website and your app.",
        ],
        heading: INCLUDED,
        points: [
          "Shared logic: business rules and API code reused across web and mobile.",
          "Native modules: native Swift or Kotlin code wherever performance needs it.",
          "Over-the-air updates: small fixes delivered without waiting for store review.",
        ],
        more: [
          "Easy handover: a codebase your in-house React developers can take over.",
          "Existing apps: we can maintain and extend React Native apps built by other teams.",
          "Typical timeline: 10–16 weeks for an MVP on both platforms.",
        ],
      },
    ],
    problems: {
      title: "Where we usually come in",
      items: [
        "You need an app live before a funding round, a trade show or the festive season.",
        "Your app has poor reviews for crashes, slowness or confusing screens.",
        "A previous developer left the app half-finished.",
        "Your field staff need an app for orders, site visits or deliveries.",
      ],
    },
    comparison: {
      title: "Native or cross-platform?",
      columns: ["Choose", "When"],
      rows: [
        [
          "Flutter or React Native",
          "You need Android and iOS, your budget is limited and the features are standard",
        ],
        [
          "Native Android and iOS",
          "The app relies heavily on camera, Bluetooth, AR or background processing, or needs top performance",
        ],
        [
          "Android first",
          "Most of your customers are in India and you want to launch quickly",
        ],
      ],
    },
    timelines: [
      { project: "MVP, one platform", timeline: "8–12 weeks" },
      {
        project: "MVP, Android and iOS (cross-platform)",
        timeline: "10–16 weeks",
      },
      { project: "App with admin panel and backend", timeline: "4–6 months" },
      { project: "Review of an existing app's code", timeline: "1 week" },
    ],
    faq: [
      {
        question: "Should I build for Android or iOS first?",
        answer:
          "If most of your users are in India, start with Android. If you're targeting the US, UK or Australia, or a premium audience, start with iOS. If you need both from day one, Flutter or React Native is usually the most cost-effective route.",
      },
      {
        question: "Can you take over my existing app?",
        answer:
          "Yes. We review the code, the server set-up and the store accounts, tell you what's worth keeping, and then continue development. You get a written summary before you commit.",
      },
      {
        question: "Will you publish the app to the app stores?",
        answer:
          "Yes. We publish under your own Google Play and Apple developer accounts, so you keep full ownership of the app and its reviews.",
      },
      {
        question: "Do you build the admin panel and backend too?",
        answer:
          "Yes. Most apps need an admin panel for your team and a backend for data, and we build and host all three together.",
      },
      {
        question: "What does it cost to maintain an app?",
        answer: `Plan on roughly 15–20% of the build cost each year. That covers new Android and iOS versions, bug fixes and small improvements. Every project includes ${COMMITMENTS.freeSupportDays} days of free fixes after launch, then you can choose a monthly support plan.`,
      },
    ],
  },
]

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((service) => service.slug === slug)
}
