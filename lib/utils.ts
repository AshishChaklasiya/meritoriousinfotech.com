import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom theme scales from app/globals.css so e.g.
// `text-label` is treated as a font size (not a colour) and merges correctly.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "stat",
        "h2",
        "cta",
        "h3",
        "h4",
        "title-lg",
        "lead",
        "title",
        "body",
        "body-sm",
        "caption",
        "label",
        "eyebrow",
        "micro",
      ],
      shadow: ["brutal", "brutal-inverse", "dropdown"],
      radius: ["card"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
