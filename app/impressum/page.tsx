import { Clock, MapPin, Phone } from "lucide-react"

import { companyInfo, openingHours } from "@/lib/company-info"

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#fbf3e5] px-6 py-20 text-carbon md:px-10 md:py-28">
      <section className="mx-auto max-w-4xl">
        <div className="mb-12">
          <img
            src="/images/logo/logo-red.png"
            alt="Bonfini"
            className="mb-8 h-auto w-44 object-contain"
          />
          <p className="mb-3 text-sm uppercase tracking-[0.28em] text-mahogany">
            Rechtliche Angaben
          </p>
          <h1 className="font-serif text-4xl text-carbon md:text-5xl">Impressum</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <article className="bg-white p-8 shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-carbon">{companyInfo.name}</h2>
            <div className="space-y-5">
              <a
                href={companyInfo.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-mahogany"
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mahogany" />
                <span>
                  {companyInfo.addressLine1}
                  <br />
                  {companyInfo.addressLine2}
                  <br />
                  {companyInfo.country}
                </span>
              </a>
              <a
                href={companyInfo.phoneHref}
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-mahogany"
              >
                <Phone className="h-5 w-5 shrink-0 text-mahogany" />
                <span>{companyInfo.phoneDisplay}</span>
              </a>
            </div>
          </article>

          <article className="bg-white p-8 shadow-lg">
            <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl text-carbon">
              <Clock className="h-5 w-5 text-mahogany" />
              <span>Öffnungszeiten</span>
            </h2>
            <div className="space-y-3">
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className="flex justify-between gap-5 border-b border-dust pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-carbon">{item.day}</span>
                  <span className="text-right text-muted-foreground">{item.hours}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
