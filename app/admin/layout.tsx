import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Admin",
  description: "Geschützter Administrationsbereich des Ristorante Bonfini.",
  path: "/admin",
  noIndex: true,
})

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children
}
