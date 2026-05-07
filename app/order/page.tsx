import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Bestellung",
  description: "Weiterleitung zur Bestellung zur Abholung beim Ristorante Bonfini.",
  path: "/bestellen",
  noIndex: true,
})

export default function OrderRedirectPage() {
  redirect("/bestellen")
}
