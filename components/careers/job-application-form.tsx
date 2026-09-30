"use client"

import {
  FileField,
  FormSuccess,
  PhoneField,
  SubmitButton,
  TextAreaField,
  TextField,
  useFormSubmit,
} from "@/components/ui/form-controls"

/** Figma "Form - Job application form" (Job Detail sidebar). */
export function JobApplicationForm({ jobTitle }: { jobTitle: string }) {
  const { status, onSubmit } = useFormSubmit()

  return (
    <form
      id="apply"
      onSubmit={onSubmit}
      aria-labelledby="apply-title"
      className="flex scroll-mt-28 flex-col gap-5 border border-divider bg-surface p-5 sm:p-7"
    >
      <input type="hidden" name="role" value={jobTitle} />
      <div className="flex flex-col gap-1">
        <h2
          id="apply-title"
          className="text-lg leading-7 font-semibold tracking-[-0.025em] text-ink"
        >
          Apply for this position
        </h2>
        <p className="text-body-sm leading-5 text-grey-1">
          Attach your CV - we read every application.
        </p>
      </div>

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
      <PhoneField label="Phone" name="phone" placeholder="98765 43210" />
      <TextAreaField
        label="Bio"
        name="bio"
        placeholder="Tell us a little about yourself and why this role fits…"
      />
      <FileField
        label="Upload CV / Résumé"
        name="cv"
        accept=".pdf,.doc,.docx"
        hint="Accepted formats: PDF, DOC, DOCX · Max 5MB"
        required
      />

      {status === "sent" ? (
        <FormSuccess>
          Thanks — your application has been received. We&apos;ll be in touch
          soon.
        </FormSuccess>
      ) : (
        <SubmitButton pending={status === "pending"}>
          Submit Application
        </SubmitButton>
      )}
    </form>
  )
}
