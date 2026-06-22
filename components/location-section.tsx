"use client"

import { useInView } from "@/hooks/use-in-view"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"
import { companyInfo, openingHours } from "@/lib/company-info"

export function LocationSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="anfahrt"
      className="relative w-full"
    >
      {/* Full-width Map Container */}
      <div className="relative h-[300px] md:h-[600px] w-full">
        {/* Google Maps Iframe */}
        <iframe
          src="https://www.google.com/maps?q=Porto%20Vecchio%20Im%20Hafenbecken%2011%2067346%20Speyer&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[30%] contrast-[1.1]"
          title="Porto Vecchio Standort"
        />

        {/* Gradient Overlay for better card visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Floating Address Card - hidden on mobile, shown on md+ */}
        <div
          className={`hidden md:block absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 lg:p-10 shadow-2xl max-w-sm md:max-w-md relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--garnet)] to-[var(--mahogany)]" />

            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[var(--garnet)]/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[var(--garnet)]/30" />

            {/* Heading */}
            <span className="block mb-5 font-serif text-xl text-[var(--onyx)]">Porto Vecchio</span>
            <p className="text-[var(--garnet)] text-sm tracking-[0.2em] uppercase mb-2">
              Direkt an der Rheinpromenade
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--onyx)] mb-6">
              Porto Vecchio
            </h2>

            {/* Divider */}
            <div className="w-12 h-px bg-[var(--garnet)] mb-6" />

            {/* Address */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--garnet)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--garnet)]" />
                </div>
                <div>
                  <p className="text-[var(--onyx)] font-medium">Adresse</p>
                  <a
                    href={companyInfo.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--carbon)]/70 text-sm leading-relaxed transition-colors hover:text-[var(--garnet)]"
                  >
                    {companyInfo.addressLine1}<br />
                    {companyInfo.addressLine2}<br />
                    {companyInfo.country}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--garnet)]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[var(--garnet)]" />
                </div>
                <div>
                  <p className="text-[var(--onyx)] font-medium">Telefon</p>
                  <a 
                    href={companyInfo.phoneHref}
                    className="text-[var(--carbon)]/70 text-sm hover:text-[var(--garnet)] transition-colors"
                  >
                    {companyInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--garnet)]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[var(--garnet)]" />
                </div>
                <div>
                  <p className="text-[var(--onyx)] font-medium">Öffnungszeiten</p>
                  <div className="space-y-1 text-[var(--carbon)]/70 text-xs">
                    {openingHours.map((item) => (
                      <div key={item.day} className="flex justify-between gap-3">
                        <span>{item.day}</span>
                        <span className="text-right">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={companyInfo.mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[var(--garnet)] text-white px-6 py-3.5 text-sm tracking-wider uppercase hover:bg-[var(--mahogany)] transition-all duration-300 w-full justify-center"
            >
              <Navigation className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span>Route planen</span>
            </a>

            {/* Secondary Link */}
            <a
              href={companyInfo.phoneHref}
              className="block text-center mt-4 text-sm text-[var(--carbon)]/60 hover:text-[var(--garnet)] transition-colors"
            >
              oder rufen Sie uns an
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Info Card - below the map */}
      <div className="md:hidden bg-white p-6">
        <p className="text-[var(--garnet)] text-xs tracking-[0.2em] uppercase mb-1">
          Direkt an der Rheinpromenade
        </p>
        <h2 className="font-serif text-xl text-[var(--onyx)] mb-4">
          Porto Vecchio
        </h2>
        <div className="w-10 h-px bg-[var(--garnet)] mb-4" />
        <div className="space-y-3 mb-6">
          <a
            href={companyInfo.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[var(--carbon)]/70 text-sm hover:text-[var(--garnet)] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[var(--garnet)] flex-shrink-0" />
            <span>{companyInfo.addressDisplay}</span>
          </a>
          <a
            href={companyInfo.phoneHref}
            className="flex items-center gap-3 text-[var(--carbon)]/70 text-sm hover:text-[var(--garnet)] transition-colors"
          >
            <Phone className="w-4 h-4 text-[var(--garnet)] flex-shrink-0" />
            <span>{companyInfo.phoneDisplay}</span>
          </a>
        </div>
        <a
          href={companyInfo.mapsDirectionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-[var(--garnet)] text-white px-6 py-3 text-sm tracking-wider uppercase hover:bg-[var(--mahogany)] transition-all duration-300 w-full justify-center"
        >
          <Navigation className="w-4 h-4" />
          <span>Route planen</span>
        </a>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-[var(--garnet)] via-[var(--mahogany)] to-[var(--garnet)]" />
    </section>
  )
}
