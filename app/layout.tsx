import { JetBrains_Mono, Manrope, Outfit } from "next/font/google"
import { siteConfig, constructMetadata } from "@/lib/metadata"

import "./globals.css"
import { MotionRoot } from "@/components/motion/motion-root"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import {
  OrganizationSchema,
  LocalBusinessSchema,
} from "@/components/seo/schema"

// Brand typefaces from the Figma design system
const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
})

const fontTech = Manrope({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-manrope",
})

/**
 * Runs before first paint. Enables the motion system (hidden entrance states,
 * loader) only when motion is allowed, plays the loader once per session and
 * never for crawlers/audits, and un-hides everything if JS fails to hydrate.
 */
const MOTION_BOOT = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("motion");var seen=null;try{seen=sessionStorage.getItem("mi-intro")}catch(e){}if(!seen&&!/bot|crawl|spider|lighthouse|pagespeed/i.test(navigator.userAgent))d.classList.add("intro");setTimeout(function(){if(!window.__motionReady)d.classList.remove("motion","intro")},5000)}catch(e){}})()`

// TASK 1: METADATA SETUP
// Set up default metadata for the entire application.
export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // TASK 7: ACCESSIBILITY
    // Add lang="en" to the root layout for screen readers and search engines.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        fontTech.variable,
        "font-sans"
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        {/* The design system is light-only; don't follow the OS theme */}
        <ThemeProvider defaultTheme="light" enableSystem={false}>
          {children}
          <MotionRoot />
        </ThemeProvider>
      </body>
    </html>
  )
}
