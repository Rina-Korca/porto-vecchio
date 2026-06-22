"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Clock, ExternalLink, MapPin, Navigation, Phone, Car } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { companyInfo, openingHours } from "@/lib/company-info"

export function HoursContactSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="kontakt"
      className="relative overflow-hidden bg-smoke py-32"
    >
      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(0, 100, 102, 0.05) 0%, transparent 45%), radial-gradient(circle at 75% 75%, rgba(77, 25, 77, 0.05) 0%, transparent 45%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-20 text-center">
          <span
            className={`mb-4 inline-block text-sm uppercase tracking-[0.3em] text-mahogany transition-all duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Besuchen Sie uns
          </span>
          <h2
            className={`font-serif text-4xl text-carbon transition-all delay-100 duration-700 md:text-5xl lg:text-6xl ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Öffnungszeiten & Kontakt
          </h2>
          <div
            className={`mx-auto mt-6 h-0.5 w-24 bg-mahogany transition-all delay-200 duration-700 ${
              isInView ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          />
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <InfoCard
            delay="delay-200"
            isInView={isInView}
            icon={Clock}
            title="Öffnungszeiten"
          >
            <p className="mb-4 text-sm uppercase tracking-wider text-mahogany">
              Heute und die Woche
            </p>
            <div className="space-y-3">
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className="flex justify-between gap-5 border-b border-dust pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-carbon">{item.day}</span>
                  <span className="text-right text-muted-foreground">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard
            delay="delay-300"
            isInView={isInView}
            icon={MapPin}
            title="Adresse"
          >
            <span className="block mb-5 font-serif text-xl text-carbon">Porto Vecchio</span>
            <a
              href={companyInfo.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-base leading-relaxed text-muted-foreground transition hover:text-mahogany"
            >
              {companyInfo.addressLine1}
              <br />
              {companyInfo.addressLine2}
              <br />
              {companyInfo.country}
            </a>
            <div className="mt-6 flex gap-3 rounded-sm bg-smoke p-4 text-sm leading-6 text-muted-foreground">
              <Car className="mt-0.5 h-4 w-4 shrink-0 text-mahogany" />
              <p>{companyInfo.parkingNote}</p>
            </div>
            <a
              href={companyInfo.mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-sm bg-mahogany px-6 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-garnet"
            >
              <Navigation className="h-4 w-4" />
              <span>Route planen</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </InfoCard>

          <InfoCard
            delay="delay-400"
            isInView={isInView}
            icon={Phone}
            title="Reservierung"
          >
            <p className="mb-2 text-sm uppercase tracking-wider text-mahogany">
              Telefon
            </p>
            <a
              href={companyInfo.phoneHref}
              className="font-serif text-2xl text-carbon transition hover:text-mahogany"
            >
              {companyInfo.phoneDisplay}
            </a>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Reservierungen sind ausschließlich telefonisch möglich. Auf der
              Terrasse können keine Tische reserviert werden.
            </p>
            <a
              href={companyInfo.phoneHref}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-mahogany px-5 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-garnet"
            >
              <Phone className="h-4 w-4" />
              <span>Anrufen</span>
            </a>
          </InfoCard>
        </div>

        <div
          className={`mt-16 flex items-center justify-center gap-4 transition-all delay-500 duration-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px w-16 bg-mahogany/30" />
          <span className="font-serif text-sm italic text-mahogany">
            Wir freuen uns auf Sie
          </span>
          <div className="h-px w-16 bg-mahogany/30" />
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  children,
  delay,
  icon: Icon,
  isInView,
  title,
}: {
  children: ReactNode
  delay: string
  icon: LucideIcon
  isInView: boolean
  title: string
}) {
  return (
    <div
      className={`relative rounded-sm bg-white p-8 shadow-lg transition-all duration-700 ${delay} ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mahogany to-garnet" />
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mahogany/10 text-mahogany">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-2xl text-carbon">{title}</h3>
      </div>
      {children}
    </div>
  )
}
