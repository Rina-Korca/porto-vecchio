import type { Metadata } from "next"
import { CalendarCheck, Download } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { MENU_PAGE_IMAGES, MENU_PDF_HREF } from "@/lib/menu"
import { createBreadcrumbJsonLd, createPageMetadata } from "@/lib/seo"
import { BrandWordmark } from "@/components/brand-wordmark"

export const metadata: Metadata = createPageMetadata({
  title: "Speisekarte",
  description:
    "Aktuelle Speisekarte des Porto Vecchio ansehen und als PDF herunterladen.",
  path: "/menu",
})

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-smoke text-carbon">
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Startseite", path: "/" },
          { name: "Speisekarte", path: "/menu" },
        ])}
      />
      <header className="border-b border-mahogany/15 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <a href="/" className="transition hover:opacity-80" aria-label="Porto Vecchio Startseite">
            <BrandWordmark className="text-carbon" />
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/#reservierung"
              className="hidden items-center gap-2 rounded-lg border border-mahogany/25 px-4 py-2 text-sm font-medium text-mahogany transition hover:bg-mahogany/10 sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" />
              Telefonisch reservieren
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-mahogany">
            Porto Vecchio
          </p>
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">
            Speisekarte
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            Die aktuelle Karte steht als PDF bereit. Reservierungen sind
            ausschließlich telefonisch möglich.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={MENU_PDF_HREF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-mahogany px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-garnet"
            >
              <Download className="h-4 w-4" />
              PDF herunterladen
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid grid-cols-2 gap-3 self-start md:gap-4">
            {MENU_PAGE_IMAGES.slice(0, 4).map((src, index) => (
              <a
                key={src}
                href={MENU_PDF_HREF}
                className="overflow-hidden rounded-lg border border-mahogany/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label={`Speisekarte Seite ${index + 1} als PDF oeffnen`}
              >
                <img
                  src={src}
                  alt={`Speisekarte Seite ${index + 1}`}
                  className="h-auto w-full"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="min-h-[680px] overflow-hidden rounded-xl border border-mahogany/18 bg-white shadow-[0_28px_70px_rgba(33,47,69,0.12)]">
            <iframe
              title="Porto Vecchio Speisekarte PDF"
              src={MENU_PDF_HREF}
              className="h-[78vh] min-h-[680px] w-full"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
