/**
 * Contact details and service commitments reused across pages, the footer and
 * the structured data. Values marked "confirm" are suggestions from the
 * content plan: check them with the business before launch.
 */

export const CONTACT = {
  phones: ["+91 99795 07813", "+91 87801 44391"],
  emails: {
    business: "info@meritoriousinfotech.com",
    hr: "hr@meritoriousinfotech.com",
  },
  address: {
    street: "401 - 4th Floor, 1/954 Palia street, Nanpura",
    city: "Surat",
    region: "Gujarat",
    postalCode: "395001",
    country: "India",
  },
}

export const FULL_ADDRESS = `${CONTACT.address.street}, ${CONTACT.address.city} - ${CONTACT.address.postalCode}, ${CONTACT.address.region}, ${CONTACT.address.country}`

/** "tel:" href for a display number such as "+91 99795 07813" */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[\s-]/g, "")}`
}

export const COMMITMENTS = {
  /** Price range + timeline after the first call */
  estimateHours: 48,
  /** Free bug fixes after launch (confirm) */
  freeSupportDays: 30,
  /** Minimum overlap with an overseas client's working day (confirm) */
  overlapHours: 3,
}
