import type { SVGProps } from "react"

/**
 * Icons exported from the Figma file (Home frame 6:64). Colours are
 * `currentColor` so hover/active states recolour them via `text-*`.
 */

type IconProps = SVGProps<SVGSVGElement>

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

/** Stroked ↗ used by "Learn more" links (6:129) */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.333}>
        <path d="M4.667 4.667h6.666v6.666" />
        <path d="M4.667 11.333l6.666-6.666" />
      </g>
    </svg>
  )
}

/** Filled ↗ used in the "Link" CTA default state (I6:72;6:5266) */
export function ArrowUpRightSolidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 17 17" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.011 3.5v1.333h4.4L3.677 12.567l.934.933 7.733-7.733v4.4h1.333V3.5H7.011Z" />
    </svg>
  )
}

/** Stroked → (I6:716;6:5204) */
export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 17 17" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M13.565 8.5H3.365" />
        <path d="m9.704 4.232 4.286 4.267-4.286 4.268" />
      </g>
    </svg>
  )
}

/** ↑ back-to-top (6:696) */
export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth={1.9}>
        <path d="M10.767 4.352v12.92" />
        <path d="m5.362 9.241 5.404-5.428 5.406 5.428" />
      </g>
    </svg>
  )
}

/** Nav dropdown chevron (6:708) */
export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 17 17" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33 11.842 2.608 6.12l.962-.962 4.76 4.76 4.76-4.76.961.962-5.721 5.722Z"
      />
    </svg>
  )
}

/** Rating star (6:391) */
export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.644 1.721a.4.4 0 0 1 .713 0l1.732 3.51a2.4 2.4 0 0 0 1.196 1.07l3.875.567a.4.4 0 0 1 .22.678l-2.802 2.729a1.6 1.6 0 0 0-.458 1.408l.661 3.855a.4.4 0 0 1-.578.42l-3.464-1.82a1.6 1.6 0 0 0-1.48 0l-3.462 1.82a.4.4 0 0 1-.577-.42l.66-3.854a1.6 1.6 0 0 0-.458-1.41L1.62 7.346a.4.4 0 0 1 .22-.68l3.875-.566a1.6 1.6 0 0 0 1.197-1.07l1.732-3.509Z"
      />
    </svg>
  )
}

/* Capability icons (24px, 1.5 stroke) */

export function PenToolIcon(props: IconProps) {
  return (
    // strokeWidth is overridable (the mega menu draws it at 18px with a 1.3 stroke)
    <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth={1.5} {...props}>
      <g {...strokeProps}>
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
        <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
        <path d="m2.3 2.3 7.286 7.286" />
        <circle cx="11" cy="11" r="2" />
      </g>
    </svg>
  )
}

export function UsersGroupIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <path d="M17 21a5 5 0 0 0-10 0" />
        <path d="M22 10.5a3.5 3.5 0 0 0-5.507-2.868" />
        <path d="M7.507 7.632A3.5 3.5 0 0 0 2 10.5" />
        <circle cx="12" cy="13" r="3" />
        <circle cx="18.5" cy="4.5" r="2.5" />
        <circle cx="5.5" cy="4.5" r="2.5" />
      </g>
    </svg>
  )
}

export function MonitorPlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
        <path d="M7 21h10" />
        <rect x="2" y="3" width="20" height="14" rx="2" />
      </g>
    </svg>
  )
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </g>
    </svg>
  )
}

/* Services mega menu icons (18px, 1.3 stroke) */

export function MonitorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" strokeWidth={1.3} {...props}>
      <g {...strokeProps}>
        <path d="M5.25 15.75h7.5" />
        <rect x="1.5" y="2.25" width="15" height="10.5" rx="1.5" />
      </g>
    </svg>
  )
}

export function SmartphoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.125}>
        <path d="M10.125 1.5h-2.25c-1.768 0-2.652 0-3.2.55-.55.548-.55 1.432-.55 3.2v7.5c0 1.768 0 2.652.55 3.2.548.55 1.432.55 3.2.55h2.25c1.768 0 2.652 0 3.2-.55.55-.548.55-1.432.55-3.2v-7.5c0-1.768 0-2.652-.55-3.2-.548-.55-1.432-.55-3.2-.55Z" />
        <path d="M9.094 14.25H9" />
      </g>
    </svg>
  )
}

/** Phone outline (Services overview card, 24px grid) */
export function DeviceMobileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </g>
    </svg>
  )
}

/* About page icons (24px, 1.5 stroke) */

export function TargetIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <path d="M17 12a5 5 0 1 1-5-5" />
        <path d="M14 2.2A10 10 0 1 0 21.8 10" />
        <path d="m12.03 11.962 4.553-4.553m3.157-3.065-.553-1.987a.4.4 0 0 0-.761-.24c-1.436 1.173-3 2.754-1.723 5.247 2.574 1.2 4.043-.418 5.17-1.779a.4.4 0 0 0-.249-.775z" />
      </g>
    </svg>
  )
}

export function RocketIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <path d="M16.2 2.621c.806-.468 1.21-.702 1.605-.596.396.107.629.512 1.095 1.323l1.482 2.58c.466.811.699 1.217.593 1.614-.106.397-.51.632-1.316 1.1l-3.424 1.986c-.807.468-1.21.702-1.606.596-.395-.107-.628-.512-1.094-1.323l-1.482-2.58c-.466-.811-.7-1.217-.593-1.614.106-.397.51-.632 1.316-1.1z" />
        <path d="m11.559 6.461 2.47 4.3-3.423 1.987c-.807.468-1.21.702-1.606.596-.395-.107-.628-.512-1.094-1.323l-.494-.86c-.466-.811-.7-1.216-.593-1.614.106-.397.51-.631 1.316-1.1z" />
        <path d="m6.918 10.3 1.482 2.581-2.996 1.738c-.398.232-.598.347-.793.373a1 1 0 0 1-.73-.197c-.157-.12-.272-.32-.502-.721-.23-.4-.345-.601-.37-.797a1 1 0 0 1 .195-.734c.12-.157.32-.272.718-.504z" />
        <path d="m7.5 22 4.5-10 4.5 10" />
      </g>
    </svg>
  )
}

/** ↘ used on form submit buttons */
export function ArrowDownRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.333}>
        <path d="M4.667 4.667l6.666 6.666" />
        <path d="M11.333 4.667v6.666H4.667" />
      </g>
    </svg>
  )
}

export function UploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.333}>
        <path d="M14 10v2.667A1.333 1.333 0 0 1 12.667 14H3.333A1.333 1.333 0 0 1 2 12.667V10" />
        <path d="M11.333 5.333 8 2 4.667 5.333" />
        <path d="M8 2v8" />
      </g>
    </svg>
  )
}

/* Social icons */

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6.325h-3v-2a1 1 0 0 1 1-1h1v-2.5h-2a3 3 0 0 0-3 3v2.5H5v2.5h2v8h3v-8h2l1-2.5Z"
      />
    </svg>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 19.19 19.19"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.767 0H1.417C.633 0 0 .618 0 1.383v16.418c0 .764.633 1.386 1.417 1.386h16.35c.784 0 1.42-.622 1.42-1.382V1.383C19.188.618 18.552 0 17.768 0ZM5.693 16.35H2.844V7.192h2.849v9.159ZM4.268 5.944a1.65 1.65 0 1 1 0-3.298 1.649 1.649 0 0 1 0 3.298ZM16.35 16.35h-2.844v-4.452c0-1.06-.019-2.428-1.48-2.428-1.48 0-1.705 1.158-1.705 2.353v4.527H7.48V7.192h2.728v1.251h.038c.378-.72 1.308-1.48 2.69-1.48 2.883 0 3.415 1.896 3.415 4.362v5.025Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps} strokeWidth={1.5}>
        <path d="M3 12c0-4.243 0-6.364 1.318-7.682S7.758 3 12 3s6.364 0 7.682 1.318S21 7.758 21 12s0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12Z" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.375 6.75h-.125" />
      </g>
    </svg>
  )
}
