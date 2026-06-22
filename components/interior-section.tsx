"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function InteriorSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-smoke">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div
            className={cn(
              "order-2 lg:order-1 transition-all duration-1000",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <span className="inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6">
              Das Ambiente
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight">
              Eleganz in jedem{" "}
              <span className="text-mahogany">Detail</span>
            </h2>
            <div className="thin-divider w-16 mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Unser Restaurant verbindet italienisches Flair mit der besonderen
              Lage direkt am Rhein. Warme Gastlichkeit, mediterrane Details und
              der Blick zur Promenade schaffen eine Atmosphäre, die zum
              Verweilen einlädt.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Für Feierlichkeiten stehen unser separater Nebenraum Salette für
              bis zu 45 Personen und das Domzimmer für bis zu 30 Personen zur
              Verfügung.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-serif text-4xl text-mahogany mb-1">45</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Salette
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-mahogany mb-1">30</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Domzimmer
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-mahogany mb-1">2</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Parkplätze
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div
            className={cn(
              "order-1 lg:order-2 relative transition-all duration-1000 delay-300",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/porto/gallery-02.jpg"
                alt="Innenbereich im Porto Vecchio in Speyer"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlapping image */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-lg overflow-hidden shadow-xl hidden md:block">
              <Image
                src="/images/porto/gallery-08.jpg"
                alt="Detailansicht des Porto Vecchio Innenbereichs"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
