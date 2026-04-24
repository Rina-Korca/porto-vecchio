"use client"

import { useInView } from "@/hooks/use-in-view"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

export function LocationSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="anfahrt"
      className="relative w-full"
    >
      {/* Full-width Map Container */}
      <div className="relative h-[500px] md:h-[600px] w-full">
        {/* Google Maps Iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.2076890518387!2d13.382185076892!3d52.52898097981082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e3c3f4d5d7%3A0x1234567890abcdef!2sChausseestr.%2015%2C%2010115%20Berlin!5e0!3m2!1sde!2sde!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[30%] contrast-[1.1]"
          title="Ristorante Bonfini Standort"
        />

        {/* Gradient Overlay for better card visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Floating Address Card */}
        <div
          className={`absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 lg:p-10 shadow-2xl max-w-sm md:max-w-md relative">
            {/* Burgundy Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--garnet)] to-[var(--mahogany)]" />

            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[var(--garnet)]/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[var(--garnet)]/30" />

            {/* Heading */}
            <p className="text-[var(--garnet)] text-sm tracking-[0.2em] uppercase mb-2">
              Im Herzen Berlins
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--onyx)] mb-6">
              Ristorante Bonfini
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
                  <p className="text-[var(--carbon)]/70 text-sm leading-relaxed">
                    Chausseestr. 15<br />
                    10115 Berlin
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--garnet)]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[var(--garnet)]" />
                </div>
                <div>
                  <p className="text-[var(--onyx)] font-medium">Telefon</p>
                  <a 
                    href="tel:+493028389288" 
                    className="text-[var(--carbon)]/70 text-sm hover:text-[var(--garnet)] transition-colors"
                  >
                    +49 30 2838 9288
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--garnet)]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[var(--garnet)]" />
                </div>
                <div>
                  <p className="text-[var(--onyx)] font-medium">Öffnungszeiten</p>
                  <p className="text-[var(--carbon)]/70 text-sm">
                    Mo–Sa: 12:00–23:00 Uhr
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://www.google.com/maps/dir//Chausseestr.+15,+10115+Berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[var(--garnet)] text-white px-6 py-3.5 text-sm tracking-wider uppercase hover:bg-[var(--mahogany)] transition-all duration-300 w-full justify-center"
            >
              <Navigation className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span>Route planen</span>
            </a>

            {/* Secondary Link */}
            <a
              href="tel:+493028389288"
              className="block text-center mt-4 text-sm text-[var(--carbon)]/60 hover:text-[var(--garnet)] transition-colors"
            >
              oder rufen Sie uns an
            </a>
          </div>
        </div>

        {/* Bottom Info Bar - Mobile */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[var(--onyx)]/95 backdrop-blur-sm p-4 md:hidden transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[var(--garnet)]" />
              <div>
                <p className="text-white text-sm font-medium">Ristorante Bonfini</p>
                <p className="text-white/70 text-xs">Chausseestr. 15, 10115 Berlin</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir//Chausseestr.+15,+10115+Berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--garnet)] text-white px-4 py-2 text-xs tracking-wider uppercase"
            >
              Route
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-[var(--garnet)] via-[var(--mahogany)] to-[var(--garnet)]" />
    </section>
  )
}
