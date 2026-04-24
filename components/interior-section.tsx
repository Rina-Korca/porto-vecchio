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
              Unser Restaurant vereint italienische Eleganz mit Berliner
              Modernität. Warme Holztöne, sanftes Kerzenlicht und
              zeitgenössische Kunstwerke schaffen eine Atmosphäre, die zum
              Verweilen einlädt.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Mit 60 Sitzplätzen im Hauptraum, einem privaten Veranstaltungsraum
              für bis zu 20 Gäste und unserer sonnigen Terrasse bieten wir den
              perfekten Rahmen für jeden Anlass.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-serif text-4xl text-mahogany mb-1">60</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Sitzplätze
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-mahogany mb-1">20</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Privat
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl text-mahogany mb-1">30</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Terrasse
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
                src="/images/interior.jpg"
                alt="Elegantes Restaurant Interieur"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlapping image */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-lg overflow-hidden shadow-xl hidden md:block">
              <Image
                src="/images/interior-detail.jpg"
                alt="Restaurant Detail"
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
