"use client"

import { AnimatePresence, motion } from "motion/react"
import {
  useId,
  useState,
  type ComponentProps,
  type SyntheticEvent,
  type ReactNode,
} from "react"

import {
  ArrowDownRightIcon,
  ChevronDownIcon,
  UploadIcon,
} from "@/components/icons"
import { Button } from "@/components/ui/button"
import { EASE_OUT, POP } from "@/lib/motion/motion"
import { cn } from "@/lib/utils"

/* Figma "Form - Job application form": 12px caps labels, 40px inputs with a
   divider border that turns brand-orange on focus.

   Feedback layer: on focus the label turns brand, steps right and a small
   indicator dot appears; a filled valid field shows a quiet check; an invalid
   submit shakes the field once and reveals an inline message (linked via
   aria-describedby) instead of the browser bubble. */

const fieldClass = "group/field flex flex-col gap-[9px]"

const controlClass =
  "peer w-full rounded-[1px] border border-divider bg-surface px-3 text-body-sm text-ink transition-[border-color,box-shadow] duration-300 outline-none placeholder:text-grey-1 hover:border-grey-2 focus:border-brand focus:shadow-[0_0_0_3px_rgb(255_124_26/0.12)] aria-invalid:border-destructive aria-invalid:focus:shadow-[0_0_0_3px_rgb(220_38_38/0.12)]"

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
      className="relative self-start pt-2 text-label leading-[15.6px] font-medium tracking-[0.121em] text-ink uppercase transition-[color,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within/field:translate-x-1 group-focus-within/field:text-brand"
    >
      {/* Focus indicator */}
      <span
        aria-hidden="true"
        className="absolute top-[calc(50%+4px)] -left-2.5 size-1 -translate-y-1/2 scale-0 rounded-full bg-brand transition-transform duration-300 group-focus-within/field:scale-100"
      />
      {children}
    </label>
  )
}

/**
 * Inline validation for one control: replaces the browser bubble with a
 * linked message, shakes the field once, and focuses the first invalid
 * control of the form.
 */
function useFieldValidation() {
  const errorId = useId()
  const [error, setError] = useState<string>()
  const [shaking, setShaking] = useState(false)

  const controlProps = {
    onInvalid(
      event: SyntheticEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) {
      event.preventDefault()
      const control = event.currentTarget
      setError(control.validationMessage)
      setShaking(true)
      if (control.form?.querySelector(":invalid") === control) control.focus()
    },
    onInput(
      event: SyntheticEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) {
      if (!error) return
      const control = event.currentTarget
      setError(control.validity.valid ? undefined : control.validationMessage)
    },
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  }

  const fieldProps = {
    "data-shake": shaking || undefined,
    onAnimationEnd: () => setShaking(false),
  }

  // Opens and closes smoothly; the negative margin folds away the field's
  // flex gap while collapsed so nothing jumps when it unmounts
  const message = (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          key="error"
          id={errorId}
          initial={{ opacity: 0, height: 0, marginTop: -9 }}
          animate={{ opacity: 1, height: "auto", marginTop: 0 }}
          exit={{ opacity: 0, height: 0, marginTop: -9 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="overflow-hidden text-xs leading-4 text-destructive"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )

  return { controlProps, fieldProps, message }
}

/** Quiet check shown once a filled field is valid (after user interaction). */
function ValidMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 scale-75 text-brand opacity-0 transition-[opacity,scale] duration-300 peer-[:user-valid:not(:placeholder-shown)]:scale-100 peer-[:user-valid:not(:placeholder-shown)]:opacity-100"
    >
      <path
        d="m3.5 8.5 3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  const { controlProps, fieldProps, message } = useFieldValidation()
  return (
    <div className={cn(fieldClass, className)} {...fieldProps}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <input
          id={id}
          className={cn(controlClass, "h-10 pr-9")}
          {...props}
          {...controlProps}
        />
        <ValidMark />
      </div>
      {message}
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
  const { controlProps, fieldProps, message } = useFieldValidation()
  return (
    <div className={cn(fieldClass, className)} {...fieldProps}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        rows={rows}
        className={cn(controlClass, "min-h-[98px] resize-y py-2.5 leading-5")}
        {...props}
        {...controlProps}
      />
      {message}
    </div>
  )
}

export function SelectField({
  label,
  options,
  placeholder = "Select…",
  className,
  ...props
}: FieldProps & {
  options: string[]
  placeholder?: string
} & ComponentProps<"select">) {
  const id = useId()
  const { controlProps, fieldProps, message } = useFieldValidation()
  return (
    <div className={cn(fieldClass, className)} {...fieldProps}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          className={cn(
            controlClass,
            "h-10 cursor-pointer appearance-none pr-9 invalid:text-grey-1 has-[option[value='']:checked]:text-grey-1"
          )}
          {...props}
          {...controlProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-grey-1"
        />
      </div>
      {message}
    </div>
  )
}

export function CheckboxField({
  label,
  className,
  ...props
}: FieldProps & ComponentProps<"input">) {
  const id = useId()
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        id={id}
        type="checkbox"
        className="mt-[3px] size-4 shrink-0 cursor-pointer accent-brand"
        {...props}
      />
      <label htmlFor={id} className="cursor-pointer text-body-sm text-ink">
        {label}
      </label>
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
  const { controlProps, fieldProps, message } = useFieldValidation()
  return (
    <div className={cn(fieldClass, className)} {...fieldProps}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex h-10 items-center rounded-[1px] border border-divider bg-surface transition-[border-color,box-shadow] duration-300 focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgb(255_124_26/0.12)] hover:border-grey-2 has-aria-invalid:border-destructive">
        <span className="flex h-full shrink-0 items-center gap-1.5 border-r border-divider px-3 text-body-sm leading-5 text-ink">
          <IndiaFlag />
          IN +91
        </span>
        <div className="relative h-full w-full">
          <input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            className="peer h-full w-full bg-transparent pr-9 pl-3 text-body-sm text-ink outline-none placeholder:text-grey-1"
            {...props}
            {...controlProps}
          />
          <ValidMark />
        </div>
      </div>
      {message}
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
  const { controlProps, fieldProps, message } = useFieldValidation()
  return (
    <div className={cn(fieldClass, className)} {...fieldProps}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor={id}
          className="group/upload inline-flex h-11 cursor-pointer items-center gap-2 border border-divider bg-canvas px-5 text-body-sm font-medium text-ink transition-colors focus-within:border-brand hover:border-ink has-aria-invalid:border-destructive"
        >
          <UploadIcon className="size-4 transition-transform duration-300 group-hover/upload:-translate-y-0.5" />
          {buttonLabel}
          <input
            id={id}
            type="file"
            className="sr-only"
            {...props}
            {...controlProps}
            onChange={(event) => {
              setFileName(event.target.files?.[0]?.name)
              props.onChange?.(event)
            }}
          />
        </label>
        {fileName && (
          <span className="flex animate-in items-center gap-1.5 text-body-sm text-grey-1 duration-300 fade-in slide-in-from-left-1 motion-reduce:animate-none">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand"
            />
            {fileName}
          </span>
        )}
      </div>
      {message}
      {hint && <p className="text-xs leading-4 text-grey-1">{hint}</p>}
    </div>
  )
}

/** SUBMIT → PROCESSING (label + indeterminate sweep) → SUCCESS (FormSuccess). */
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
      className="self-start transition-[color,background-color,border-color,box-shadow,opacity,scale,translate] duration-200"
    >
      <span data-magnetic-label className="inline-block">
        {pending ? "Processing…" : children}
      </span>
      <ArrowDownRightIcon
        className={cn(
          "transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5",
          pending && "animate-pulse"
        )}
      />
      {pending && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
        >
          <span className="progress-sweep block h-full w-2/5 bg-surface/80" />
        </span>
      )}
    </Button>
  )
}

/** Shared submit handling until a backend endpoint exists. */
export function useFormSubmit() {
  const [status, setStatus] = useState<"idle" | "pending" | "sent">("idle")

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    // Grab the form now: React clears currentTarget once the handler yields
    const form = event.currentTarget
    setStatus("pending")
    // TODO: POST new FormData(form) to the real endpoint.
    await new Promise((resolve) => setTimeout(resolve, 600))
    form.reset()
    setStatus("sent")
  }

  return { status, onSubmit }
}

export function FormSuccess({ children }: { children: ReactNode }) {
  return (
    // Small confirming pop (springs in with a hint of overshoot)
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={POP}
      role="status"
      className="flex items-start gap-3 border border-brand/30 bg-brand-soft px-4 py-3 text-body-sm text-ink"
    >
      {/* Check draws itself in */}
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-brand"
      >
        <path
          d="m3.5 8.5 3 3 6-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={24}
          className="motion-safe:animate-[check-draw_0.5s_0.2s_cubic-bezier(0.16,1,0.3,1)_both]"
        />
      </svg>
      <div className="flex flex-col gap-1">
        <span
          aria-hidden="true"
          className="font-mono text-micro tracking-[0.14em] text-brand uppercase"
        >
          Status · Success
        </span>
        <p>{children}</p>
      </div>
    </motion.div>
  )
}
