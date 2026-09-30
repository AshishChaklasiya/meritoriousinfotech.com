"use client"

import { animate, stagger } from "animejs"
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"

import {
  AccelerateIcon,
  AndroidIcon,
  AppleIcon,
  BackendIcon,
  CmsIcon,
  DevicesIcon,
  EcommerceIcon,
  FlutterIcon,
  FrontendIcon,
  InterfaceIcon,
  LandingPageIcon,
  PrototypeIcon,
  ReactNativeIcon,
  UserExperienceIcon,
  UserResearchIcon,
  WebDesignIcon,
} from "@/components/services/tab-icons"
import type { ServiceTab, ServiceTabIcon } from "@/lib/content/service-details"
import { cn } from "@/lib/utils"

const TAB_ICONS: Record<ServiceTabIcon, typeof UserExperienceIcon> = {
  "user-experience": UserExperienceIcon,
  interface: InterfaceIcon,
  "user-research": UserResearchIcon,
  devices: DevicesIcon,
  "web-design": WebDesignIcon,
  prototype: PrototypeIcon,
  frontend: FrontendIcon,
  backend: BackendIcon,
  accelerate: AccelerateIcon,
  "landing-page": LandingPageIcon,
  cms: CmsIcon,
  ecommerce: EcommerceIcon,
  android: AndroidIcon,
  apple: AppleIcon,
  flutter: FlutterIcon,
  "react-native": ReactNativeIcon,
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function TabPanelContent({ tab }: { tab: ServiceTab }) {
  const [expanded, setExpanded] = useState(false)
  const moreId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const visiblePoints = expanded ? [...tab.points, ...tab.more] : tab.points

  // Panel content cascades in on each tab switch (keyed remount)
  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return
    const animation = animate(rootRef.current.children, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 600,
      delay: stagger(60),
      ease: "outExpo",
    })
    return () => {
      animation.revert()
    }
  }, [])

  // "Read More" points slide in as they are revealed
  useEffect(() => {
    if (!expanded || !listRef.current || prefersReducedMotion()) return
    const added = Array.from(listRef.current.children).slice(tab.points.length)
    const animation = animate(added, {
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 500,
      delay: stagger(40),
      ease: "outExpo",
    })
    return () => {
      animation.revert()
    }
  }, [expanded, tab.points.length])

  return (
    <div ref={rootRef} className="flex flex-col gap-[22px]">
      {tab.intro.map((paragraph) => (
        <p
          key={paragraph}
          className="text-body text-grey-1 md:text-lg md:leading-[1.28]"
        >
          {paragraph}
        </p>
      ))}

      <div>
        <h3 className="text-xl leading-[1.25] font-medium tracking-[-0.02em] text-ink">
          {tab.heading}
        </h3>
        {visiblePoints.length > 0 && (
          <ul
            ref={listRef}
            id={moreId}
            className="list-disc pt-3.5 pl-6 text-base leading-[29px] text-ink marker:text-ink"
          >
            {visiblePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </div>

      {tab.more.length > 0 && (
        <div className="pt-2.5">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={moreId}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-body-sm leading-5 font-medium text-brand"
          >
            {expanded ? "Read Less" : "Read More"}
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className={cn(
                "size-5 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            >
              <path
                d="m5 7.5 5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * Vertical tab list + content panel (Figma "Navigation - AEO topic navigation").
 * Arrow keys move between tabs; the active tab is the brand-orange row.
 *
 * Deep-linkable: `/services/<slug>#<tab-id>` (used by the mega menu and the
 * Home services cards) opens that tab and scrolls it into view.
 */
export function ServiceCapabilityTabs({ tabs }: { tabs: ServiceTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id)
  const baseId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0]

  const openFromHash = useCallback(
    (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""))
      if (!tabs.some((tab) => tab.id === id)) return false
      setActiveId(id)
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      return true
    },
    [tabs]
  )

  useEffect(() => {
    // Next frame: the page has laid out, so the scroll lands on the tabs
    const frame = requestAnimationFrame(() =>
      openFromHash(window.location.hash)
    )

    const onHashChange = () => openFromHash(window.location.hash)
    // Same-page tab links (e.g. the mega menu while on this page): handle them
    // in the capture phase so Next.js doesn't also run its own hash scroll,
    // which would cut ours short. Link's own onClick (closing menus) still runs.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href*='#']")
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.pathname !== window.location.pathname ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      if (openFromHash(link.hash)) {
        event.preventDefault()
        window.history.pushState(null, "", link.hash)
      }
    }

    window.addEventListener("hashchange", onHashChange)
    document.addEventListener("click", onClick, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", onHashChange)
      document.removeEventListener("click", onClick, true)
    }
  }, [openFromHash])

  function selectTab(id: string) {
    setActiveId(id)
    // Keep the URL shareable without adding history entries
    window.history.replaceState(null, "", `#${id}`)
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = (keys[event.key] + tabs.length) % tabs.length
    selectTab(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      ref={rootRef}
      className="flex scroll-mt-28 flex-col border border-divider lg:flex-row"
    >
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Service capabilities"
        className="flex shrink-0 flex-col border-b border-divider lg:w-[367px] lg:border-r lg:border-b-0"
      >
        {tabs.map((tab, index) => {
          const active = tab.id === activeTab.id
          const Icon = TAB_ICONS[tab.icon]
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "flex items-center gap-4 border-divider p-6 text-left text-base leading-5 font-medium transition-colors not-last:border-b lg:whitespace-nowrap",
                active
                  ? "bg-brand text-surface"
                  : "bg-surface text-ink hover:bg-canvas-muted hover:text-brand"
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${activeTab.id}`}
        className="flex-1 px-6 py-6 md:px-[50px]"
      >
        {/* Keyed so "Read More" resets when switching tabs */}
        <TabPanelContent key={activeTab.id} tab={activeTab} />
      </div>
    </div>
  )
}
