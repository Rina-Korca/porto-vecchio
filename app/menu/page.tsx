import type { Metadata } from "next"
import { CalendarCheck, Download, ShoppingBag } from "lucide-react"
import { companyInfo } from "@/lib/company-info"
import { MENU_PAGE_IMAGES, MENU_PDF_HREF } from "@/lib/menu"

export const metadata: Metadata = {
  title: "Speisekarte | Ristorante Bonfini",
  description:
    "Aktuelle Speisekarte des Ristorante Bonfini in Berlin ansehen, als PDF herunterladen oder eine Bestellung ohne Online-Zahlung aufgeben.",
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#fbf3e5] text-carbon">
      <header className="border-b border-[#8b1e22]/15 bg-[#fffaf1]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <a href="/" className="block w-32 transition hover:opacity-80" aria-label="Bonfini Startseite">
            <img src="/images/logo/logo-red.png" alt="Bonfini" className="h-auto w-full" />
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/#reservierung"
              className="hidden items-center gap-2 rounded-lg border border-[#8b1e22]/25 px-4 py-2 text-sm font-medium text-[#8b1e22] transition hover:bg-[#8b1e22]/10 sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" />
              Tisch reservieren
            </a>
            <a
              href={companyInfo.orderHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[#8b1e22] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6f171b]"
            >
              <ShoppingBag className="h-4 w-4" />
              Bestellen
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#8b1e22]">
            Ristorante Bonfini
          </p>
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">
            Speisekarte
          </h1>
          <p className="mt-5 text-base leading-7 text-[#6c5240] md:text-lg">
            Die aktuelle Karte steht als PDF bereit. Fuer Bestellungen koennen
            Sie Speisen und Getraenke direkt im Bestellbereich auswaehlen.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={MENU_PDF_HREF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b1e22] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#6f171b]"
            >
              <Download className="h-4 w-4" />
              PDF herunterladen
            </a>
            <a
              href={companyInfo.orderHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#8b1e22]/25 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#8b1e22] transition hover:border-[#8b1e22] hover:bg-white/50"
            >
              <ShoppingBag className="h-4 w-4" />
              Bestellung aufgeben
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid grid-cols-2 gap-3 self-start md:gap-4">
            {MENU_PAGE_IMAGES.slice(0, 4).map((src, index) => (
              <a
                key={src}
                href={MENU_PDF_HREF}
                className="overflow-hidden rounded-lg border border-[#8b1e22]/15 bg-[#fffaf1] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                aria-label={`Speisekarte Seite ${index + 1} als PDF oeffnen`}
              >
                <img
                  src={src}
                  alt={`Bonfini Speisekarte Seite ${index + 1}`}
                  className="h-auto w-full"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </a>
            ))}
          </div>

          <div className="min-h-[680px] overflow-hidden rounded-xl border border-[#8b1e22]/18 bg-white shadow-[0_28px_70px_rgba(48,28,12,0.12)]">
            <iframe
              title="Bonfini Speisekarte PDF"
              src={MENU_PDF_HREF}
              className="h-[78vh] min-h-[680px] w-full"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
