/**
 * Content for the service detail pages (Figma frames 6:3878, 6:4216, 6:4571).
 *
 * Only the first tab of each page has copy in the design. Every other tab —
 * and each "Read More" extension — uses PLACEHOLDER copy (see `placeholder()`),
 * to be replaced with final content before launch.
 */

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
  /** Breadcrumb + metadata name */
  name: string
  title: { before: string; highlight: string; after?: string }
  description: string
  capabilitiesTitle: string
  capabilitiesTitleClassName?: string
  tabs: ServiceTab[]
}

const MORE_PLACEHOLDER = [
  "Additional Detail: Placeholder text describing a further aspect of this service. Replace with final copy.",
  "Our Approach: Placeholder text outlining how we plan, build and deliver this service for your team.",
  "Ongoing Support: Placeholder text covering maintenance, iteration and long-term support.",
]

/** Temporary copy for tabs the design does not specify. */
function placeholder(
  id: string,
  label: string,
  icon: ServiceTabIcon
): ServiceTab {
  return {
    id,
    label,
    icon,
    intro: [
      `Placeholder overview for ${label}. This is temporary copy that will be replaced with a description of the service, the problems it solves and the value it brings to your business.`,
    ],
    heading: "Key highlights include:",
    points: [
      "Highlight One: Placeholder description for the first key benefit of this service.",
      "Highlight Two: Placeholder description for the second key benefit of this service.",
      "Highlight Three: Placeholder description for the third key benefit of this service.",
    ],
    more: MORE_PLACEHOLDER,
  }
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "graphic-ui-ux-design",
    name: "Graphic & UI/UX System Design",
    title: {
      before: "Graphics & ",
      highlight: "UI UX Designing",
      after: " Services",
    },
    description:
      "Bringing your product vision into crystal clarity. We construct cohesive design systems, atomic UI components, and accessible digital touchpoint that command authority in saturated industries.",
    capabilitiesTitle: "Our Designing Capabilities",
    capabilitiesTitleClassName: "max-w-[477px]",
    tabs: [
      {
        id: "elevating-user-experiences",
        label: "Elevating User Experiences",
        icon: "user-experience",
        intro: [
          "Meritorious Infotech offers comprehensive User Interface (UI) services to create visually stunning and intuitive digital experiences that captivate and engage your audience.",
        ],
        heading: "Our UI services encompass the following key aspects:",
        points: [
          "Design Strategy: We work closely with you to understand your business goals, target audience, and brand identity to develop a tailored design strategy that aligns with your objectives.",
          "UI Design: Our expert designers leverage the latest design trends and technologies to create visually appealing interfaces that enhance user experience and drive engagement.",
          "Interactive Prototyping: We develop interactive prototypes that allow you to visualize the user journey and provide valuable insights early in the design process, ensuring that the final product meets your expectations.",
        ],
        more: MORE_PLACEHOLDER,
      },
      placeholder(
        "craft-exceptional-user-interfaces",
        "Craft Exceptional User Interfaces",
        "interface"
      ),
      placeholder(
        "user-research-services",
        "User Research Services",
        "user-research"
      ),
      placeholder(
        "mobile-and-web-apps-ui-design",
        "Mobile and Web Apps UI Design Services",
        "devices"
      ),
      placeholder(
        "custom-web-design-services",
        "Custom Web Design Services",
        "web-design"
      ),
      placeholder(
        "ui-prototyping-services",
        "UI Prototyping Services",
        "prototype"
      ),
    ],
  },
  {
    slug: "web-engineering-platforms",
    name: "Web Engineering & Platforms",
    title: { before: "Web Engineering & ", highlight: "Platforms" },
    description:
      "Bringing your product vision into crystal clarity. We construct cohesive design systems, atomic UI components, and accessible digital touchpoint that command authority in saturated industries.",
    capabilitiesTitle: "Our Web Engineering & Platforms Capabilities",
    capabilitiesTitleClassName: "max-w-[582px]",
    tabs: [
      {
        id: "dynamic-frontend-development",
        label: "Dynamic Frontend Development Solutions",
        icon: "frontend",
        intro: [
          "Meritorious Infotech offers comprehensive frontend development services to bring your digital vision to life and create engaging user experiences across all devices and platforms. Our team of skilled frontend developers combines creativity, technical expertise, and industry best practices to deliver visually stunning and interactive interfaces that captivate users and drive results.",
        ],
        heading: "Key features of our frontend development services include:",
        points: [
          "Customized Solutions: We tailor our frontend development solutions to suit your specific business requirements, ensuring that your digital products and applications reflect your brand identity and objectives.",
          "Responsive Design: We design responsive interfaces that adapt seamlessly to different screen sizes and devices, providing a consistent and optimal user experience across desktops, tablets, and smartphones.",
        ],
        more: MORE_PLACEHOLDER,
      },
      placeholder(
        "powerful-backend-development",
        "Powerful Backend Development Solutions",
        "backend"
      ),
      placeholder(
        "accelerating-your-development",
        "Accelerating Your Development",
        "accelerate"
      ),
      placeholder(
        "landing-page-solutions",
        "Landing Page Solutions",
        "landing-page"
      ),
      placeholder("efficient-cms-solutions", "Efficient CMS Solutions", "cms"),
      placeholder(
        "tailored-ecommerce-solutions",
        "Tailored E-commerce Solutions",
        "ecommerce"
      ),
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    title: { before: "Mobile App ", highlight: "Development" },
    description:
      "Meritorious Infotech: Pioneering Creative Website Development Since 2014. Building Long-term Partnerships, Offering Comprehensive Website and Mobile App Development Solutions Globally",
    capabilitiesTitle: "Our Mobile\nApp Capabilities",
    tabs: [
      {
        id: "android-app-development",
        label: "Android App Development Services",
        icon: "android",
        intro: [
          "At Meritorious Infotech, our Android development services empower you to expand your reach and tap into new markets effectively. With our tailored apps, you can seamlessly align your brand identity with your app’s interface.",
          "Meritorious Infotech leverages cutting-edge tools and resources to craft exceptional Android experiences that resonate across diverse devices. Don’t hesitate – connect with us today to explore the possibilities for your business.",
        ],
        heading: "Our comprehensive Android services include:",
        // The design shows the list collapsed behind "Read More"
        points: [],
        more: MORE_PLACEHOLDER,
      },
      placeholder(
        "ios-app-development",
        "IOS App Development Services",
        "apple"
      ),
      placeholder(
        "flutter-development",
        "Flutter Development Services",
        "flutter"
      ),
      placeholder(
        "react-native-development",
        "React Native Development Services",
        "react-native"
      ),
    ],
  },
]

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((service) => service.slug === slug)
}
