"use client"

import { animate } from "animejs"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"

import { ArrowDownRightIcon, UploadIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* Figma "Form - Job application form": 12px caps labels, 40px inputs with a
   divider border that turns brand-orange on focus. The field's label follows
   the focus too, and the control gets a soft brand halo. */

const fieldClass = "group/field flex flex-col gap-[9px]"

const focusHalo = "focus:shadow-[0_0_0_3px_rgb(255_124_26/0.12)]"

const controlClass = cn(
  "w-full rounded-[1px] border border-divider bg-surface px-3 text-body-sm text-ink transition-[border-color,box-shadow] duration-300 outline-none placeholder:text-grey-1 hover:border-grey-2 focus:border-brand",
  focusHalo
)

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="pt-2 text-label leading-[15.6px] font-medium tracking-[0.121em] text-ink uppercase transition-colors duration-300 group-focus-within/field:text-brand"
    >
      {children}
    </label>
  )
}

type FieldProps = {
  label: string
  className?: string
}

export function TextField({
  label,
  className,
  ...props
}: FieldProps & ComponentProps<"input">) {
  const id = useId()
  return (
    <div className={cn(fieldClass, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input id={id} className={cn(controlClass, "h-10")} {...props} />
    </div>
  )
}

export function TextAreaField({
  label,
  className,
  rows = 4,
  ...props
}: FieldProps & ComponentProps<"textarea">) {
  const id = useId()
  return (
    <div className={cn(fieldClass, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        rows={rows}
        className={cn(controlClass, "min-h-[98px] resize-y py-2.5 leading-5")}
        {...props}
      />
    </div>
  )
}

function IndiaFlag() {
  return (
    <svg
      viewBox="0 0 18 12"
      aria-hidden="true"
      className="h-3 w-[18px] shrink-0 rounded-[1px] ring-1 ring-divider"
    >
      <rect width="18" height="4" fill="#FF9933" />
      <rect y="4" width="18" height="4" fill="#fff" />
      <rect y="8" width="18" height="4" fill="#138808" />
      <circle
        cx="9"
        cy="6"
        r="1.4"
        fill="none"
        stroke="#000080"
        strokeWidth=".4"
      />
    </svg>
  )
}

/** Phone number with a fixed country prefix (design shows IN +91). */
export function PhoneField({
  label,
  className,
  ...props
}: FieldProps & ComponentProps<"input">) {
  const id = useId()
  return (
    <div className={cn(fieldClass, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex h-10 items-center rounded-[1px] border border-divider bg-surface transition-[border-color,box-shadow] duration-300 focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgb(255_124_26/0.12)] hover:border-grey-2">
        <span className="flex h-full shrink-0 items-center gap-1.5 border-r border-divider px-3 text-body-sm leading-5 text-ink">
          <IndiaFlag />
          IN +91
        </span>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className="h-full w-full bg-transparent px-3 text-body-sm text-ink outline-none placeholder:text-grey-1"
          {...props}
        />
      </div>
    </div>
  )
}

/** CV upload: styled trigger + chosen file name + helper text. */
export function FileField({
  label,
  hint,
  buttonLabel = "Choose PDF",
  className,
  ...props
}: FieldProps & {
  hint?: string
  buttonLabel?: string
} & ComponentProps<"input">) {
  const id = useId()
  const [fileName, setFileName] = useState<string>()
  return (
    <div className={cn(fieldClass, className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={id}
          className="group/upload inline-flex h-11 cursor-pointer items-center gap-2 border border-divider bg-canvas px-5 text-body-sm font-medium text-ink transition-colors focus-within:border-brand hover:border-ink"
        >
          <UploadIcon className="size-4 transition-transform duration-300 group-hover/upload:-translate-y-0.5" />
          {buttonLabel}
          <input
            id={id}
            type="file"
            className="sr-only"
            onChange={(event) => setFileName(event.target.files?.[0]?.name)}
            {...props}
          />
        </label>
        {fileName && (
          <span className="text-body-sm text-grey-1">{fileName}</span>
        )}
      </div>
      {hint && <p className="text-xs leading-4 text-grey-1">{hint}</p>}
    </div>
  )
}

export function SubmitButton({
  children,
  pending,
}: {
  children: ReactNode
  pending?: boolean
}) {
  return (
    <Button
      type="submit"
      variant="brand"
      size="cta"
      disabled={pending}
      aria-busy={pending || undefined}
      data-magnetic="0.3"
      // Not transition-all: GSAP drives transform for the magnetic pull
      className="self-start transition-[color,background-color,border-color,box-shadow,opacity] duration-200"
    >
      {pending ? "Sending…" : children}
      <ArrowDownRightIcon
        className={cn(
          "transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5",
          pending && "animate-pulse"
        )}
      />
    </Button>
  )
}

/** Shared submit handling until a backend endpoint exists. */
export function useFormSubmit() {
  const [status, setStatus] = useState<"idle" | "pending" | "sent">("idle")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("pending")
    // TODO: POST new FormData(event.currentTarget) to the real endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600))
    event.currentTarget?.reset()
    setStatus("sent")
  }

  return { status, onSubmit }
}

export function FormSuccess({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)

  // Small confirming pop; skipped for reduced motion
  useEffect(() => {
    if (
      !ref.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const animation = animate(ref.current, {
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.98, 1],
      duration: 650,
      ease: "outBack(1.4)",
    })
    return () => {
      animation.revert()
    }
  }, [])

  return (
    <p
      ref={ref}
      role="status"
      className="border border-brand/30 bg-brand-soft px-4 py-3 text-body-sm text-ink"
    >
      {children}
    </p>
  )
}
