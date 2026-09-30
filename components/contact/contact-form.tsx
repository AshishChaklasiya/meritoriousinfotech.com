"use client"

import {
  FormSuccess,
  SubmitButton,
  TextAreaField,
  TextField,
  useFormSubmit,
} from "@/components/ui/form-controls"
import { cn } from "@/lib/utils"

/** Figma "Contact form": name, email, message. */
export function ContactForm({ className }: { className?: string }) {
  const { status, onSubmit } = useFormSubmit()

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Contact form"
      className={cn(
        "flex flex-col gap-5 border border-divider bg-surface p-5 sm:p-7",
        className
      )}
    >
      <TextField
        label="Full Name"
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
      <TextAreaField
        label="Your Message"
        name="message"
        placeholder="Tell us about your project…"
        required
      />

      {status === "sent" ? (
        <FormSuccess>
          Thanks for reaching out — we&apos;ll get back to you within one
          business day.
        </FormSuccess>
      ) : (
        <SubmitButton pending={status === "pending"}>Send</SubmitButton>
      )}
    </form>
  )
}
