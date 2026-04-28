"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Users, Wine, Utensils } from "lucide-react"

const eventTypes = [
  {
    icon: Users,
    title: "Private Dining",
    description:
      "Unser separater Raum für bis zu 20 Gäste. Perfekt für Geburtstage, Jubiläen oder Firmenfeiern.",
  },
  {
    icon: Wine,
    title: "Weinverkostung",
    description:
      "Entdecken Sie mit unserem Sommelier die besten italienischen Weine bei einer exklusiven Verkostung.",
  },
  {
    icon: Utensils,
    title: "Kochkurse",
    description:
      "Lernen Sie die Geheimnisse der italienischen Küche direkt von unserem Küchenchef.",
  },
]

export function EventsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative transition-all duration-1000",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/private-dining.jpg"
                alt="Private Dining Raum"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-mahogany/10 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <span className="inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6">
              Veranstaltungen
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight">
              Feiern Sie besondere{" "}
              <span className="text-mahogany">Momente</span>
            </h2>
            <div className="thin-divider w-16 mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Ob private Feier, Firmenveranstaltung oder ein besonderer Anlass:
              Wir gestalten Ihr Event zu einem unvergesslichen Erlebnis mit
              maßgeschneiderten Menüs und persönlichem Service.
            </p>

            <div className="space-y-6">
              {eventTypes.map((event, index) => (
                <div
                  key={event.title}
                  className="flex gap-5"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-smoke rounded-full flex items-center justify-center">
                    <event.icon className="w-6 h-6 text-mahogany" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-carbon mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="mailto:reservierung@ristorante-bonfini.de"
              className="magnetic-btn inline-block mt-10 bg-mahogany text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded"
            >
              Anfrage senden
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
