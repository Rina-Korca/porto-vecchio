"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const openingHours = [
  { day: "Montag", hours: "Ruhetag" },
  { day: "Dienstag - Freitag", hours: "12:00 - 14:30 | 18:00 - 23:00" },
  { day: "Samstag", hours: "18:00 - 23:30" },
  { day: "Sonntag", hours: "12:00 - 15:00 | 18:00 - 22:00" },
]

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="kontakt" ref={ref} className="py-24 md:py-32 bg-smoke">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-1000",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <span className="inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6">
              Kontakt
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight">
              Besuchen Sie{" "}
              <span className="text-mahogany">uns</span>
            </h2>
            <div className="thin-divider w-16 mb-10" />

            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <MapPin className="w-6 h-6 text-mahogany" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon mb-1">Adresse</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unter den Linden 42
                    <br />
                    10117 Berlin-Mitte
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Phone className="w-6 h-6 text-mahogany" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon mb-1">Telefon</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="tel:+493012345678"
                      className="hover:text-mahogany transition-colors"
                    >
                      +49 30 1234 5678
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Mail className="w-6 h-6 text-mahogany" />
                </div>
                <div>
                  <h3 className="font-medium text-carbon mb-1">E-Mail</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:info@bonfini.de"
                      className="hover:text-mahogany transition-colors"
                    >
                      info@bonfini.de
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-smoke rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-mahogany" />
                </div>
                <h3 className="font-serif text-2xl text-carbon">
                  Öffnungszeiten
                </h3>
              </div>

              <div className="space-y-4">
                {openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-3 border-b border-smoke last:border-0"
                  >
                    <span className="text-carbon font-medium">{item.day}</span>
                    <span
                      className={cn(
                        "text-right",
                        item.hours === "Ruhetag"
                          ? "text-mahogany"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm text-muted-foreground text-center">
                Küche schließt 30 Minuten vor Schließung
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
