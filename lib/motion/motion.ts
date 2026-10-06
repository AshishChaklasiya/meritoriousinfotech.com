import type { Transition } from "motion/react"

/* Motion (motion.dev) owns React-driven UI state: menus, tabs, filters and
   form feedback — anything that mounts, unmounts or changes layout. GSAP
   (lib/motion/gsap.ts) keeps the scroll system, curtain, cursor and hero.
   Same language as GSAP's: fast starts, long settles. */

/** Entrances. Matches the CSS cubic-bezier(0.16,1,0.3,1) used site-wide */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** Panels and wipes */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

/** Shared-element indicators (active tab, active filter) glide and settle */
export const GLIDE: Transition = { type: "spring", stiffness: 420, damping: 38 }

/** Small confirmations: a hint of overshoot, then still */
export const POP: Transition = { type: "spring", stiffness: 380, damping: 22 }
