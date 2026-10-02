"use client"

import {
  CheckboxField,
  FormSuccess,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  useFormSubmit,
} from "@/components/ui/form-controls"
import { cn } from "@/lib/utils"

const NEEDS = [
  "Website",
  "Online store",
  "Mobile app",
  "UI/UX or branding",
  "Custom software",
  "Hire developers",
  "Not sure yet",
]

const BUDGETS = [
  "Under ₹1 lakh (under US$1,200)",
  "₹1–5 lakh (US$1,200–6,000)",
  "₹5–15 lakh (US$6,000–18,000)",
  "₹15 lakh+ (US$18,000+)",
  "Not sure yet",
]

const TIMELINES = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "Just exploring",
]

/** Project enquiry: who you are, what you need, budget and timing. */
export function ContactForm({ className }: { className?: string }) {
  const { status, onSubmit } = useFormSubmit()

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Project enquiry form"
      className={cn(
        "flex flex-col gap-5 border border-divider bg-surface p-5 sm:p-7",
        className
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <TextField
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
        />
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          placeholder="Optional"
        />
        <SelectField
          label="What do you need?"
          name="need"
          options={NEEDS}
          required
        />
        <SelectField label="Budget" name="budget" options={BUDGETS} />
        <SelectField
          label="Timeline"
          name="timeline"
          options={TIMELINES}
          className="sm:col-span-2"
        />
      </div>
      <TextAreaField
        label="Project details"
        name="message"
        placeholder="What are you building, and who is it for?"
        required
      />
      <CheckboxField label="Send me an NDA before we talk" name="nda" />

      {status === "sent" ? (
        <FormSuccess>
          Thanks, we&apos;ve got your enquiry. You&apos;ll hear from a real
          person within one working day.
        </FormSuccess>
      ) : (
        <div className="flex flex-col gap-3">
          <SubmitButton pending={status === "pending"}>
            Send and get an estimate
          </SubmitButton>
          <p className="text-caption text-grey-1">
            We&apos;ll never share your details. You&apos;ll hear from a real
            person, not an automated sequence.
          </p>
        </div>
      )}
    </form>
  )
}
