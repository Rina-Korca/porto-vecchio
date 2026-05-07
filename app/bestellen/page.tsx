import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { OrderPageClient } from "@/components/order-page-client"
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Bestellung zur Abholung",
  description:
    "Bestellung ohne Online-Zahlung beim Ristorante Bonfini in Berlin aufgeben. Das Team bestätigt Abholzeit und Verfügbarkeit direkt.",
  path: "/bestellen",
})

export default function OrderPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Startseite", path: "/" },
          { name: "Bestellung zur Abholung", path: "/bestellen" },
        ])}
      />
      <OrderPageClient />
    </>
  )
}
