import type { Metadata } from "next"
import { OrderPageClient } from "@/components/order-page-client"

export const metadata: Metadata = {
  title: "Bestellung aufgeben | Ristorante Bonfini",
  description:
    "Bestellung ohne Online-Zahlung beim Ristorante Bonfini in Berlin aufgeben. Das Team bestaetigt Abholzeit und Verfuegbarkeit direkt.",
}

export default function OrderPage() {
  return <OrderPageClient />
}
