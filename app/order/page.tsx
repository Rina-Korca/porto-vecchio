import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Reservierung",
  description: "Weiterleitung zur telefonischen Reservierung im Porto Vecchio.",
  path: "/#reservierung",
  noIndex: true,
})

export default function OrderRedirectPage() {
  redirect("/#reservierung")
}
