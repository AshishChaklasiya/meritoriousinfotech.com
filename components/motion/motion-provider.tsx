"use client"

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

/**
 * Motion defaults for the whole app. With reduced motion requested, Motion
 * drops transform and layout animations and keeps only opacity/colour fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
