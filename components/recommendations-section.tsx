"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const recommendations = [
  {
    id: 1,
    title: "Hausgemachte Pasta",
    description: "Täglich frisch zubereitet nach überlieferten Familienrezepten",
    image: "/images/rec-pasta.jpg",
  },
  {
    id: 2,
    title: "Frische Antipasti",
    description: "Eine Auswahl mediterraner Vorspeisen aus besten Zutaten",
    image: "/images/rec-antipasti.jpg",
  },
  {
    id: 3,
    title: "Italienische Klassiker",
    description: "Zeitlose Gerichte der italienischen Küche, meisterhaft interpretiert",
    image: "/images/rec-klassiker.jpg",
  },
  {
    id: 4,
    title: "Ausgewählte Weine",
    description: "Erlesene Tropfen aus den besten Anbaugebieten Italiens",
    image: "/images/rec-wine.jpg",
  },
  {
    id: 5,
    title: "Saisonale Empfehlungen",
    description: "Kreationen aus den frischesten Zutaten der Saison",
    image: "/images/rec-seasonal.jpg",
  },
  {
    id: 6,
    title: "Dolci della Casa",
    description: "Süße Verführungen zum krönenden Abschluss",
    image: "/images/rec-dolci.jpg",
  },
]

export function RecommendationsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="empfehlungen"
      ref={ref}
      className="py-24 md:py-32 lg:py-40 bg-smoke relative overflow-hidden"
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-40" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000 ease-luxury",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-mahogany/30" />
            <div className="w-2 h-2 rounded-full bg-mahogany" />
            <div className="w-12 h-px bg-mahogany/30" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-carbon mb-4">
            Empfehlungen
          </h2>
          <p className="text-lg md:text-xl text-mahogany italic font-serif">
            Ausgewählte Momente aus unserer Küche
          </p>
        </div>

        {/* Navigation buttons - Desktop */}
        <div className="hidden md:flex justify-end gap-3 mb-8 pr-4">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 border border-mahogany/20 flex items-center justify-center text-mahogany hover:bg-mahogany hover:text-white hover:border-mahogany transition-all duration-400 ease-luxury"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 border border-mahogany/20 flex items-center justify-center text-mahogany hover:bg-mahogany hover:text-white hover:border-mahogany transition-all duration-400 ease-luxury"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {recommendations.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "flex-shrink-0 w-[300px] md:w-[340px] snap-center transition-all duration-800 ease-luxury",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{
                transitionDelay: isInView ? `${index * 80}ms` : "0ms",
              }}
            >
              <div className="group relative bg-white overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-600 ease-luxury h-full card-hover">
                {/* Image container */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-800 ease-luxury group-hover:scale-105"
                  />
                  {/* Burgundy overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-garnet/90 via-mahogany/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover content */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-luxury translate-y-4 group-hover:translate-y-0">
                    <span className="text-white font-serif text-lg italic">
                      Mehr entdecken
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Decorative accent */}
                  <div className="w-8 h-0.5 bg-mahogany mb-4 transition-all duration-400 group-hover:w-12" />
                  
                  <h3 className="font-serif text-xl md:text-2xl text-carbon mb-3 group-hover:text-mahogany transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-carbon/60 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex md:hidden justify-center mt-6 gap-2">
          {recommendations.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-mahogany/20"
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div
          className={cn(
            "flex items-center justify-center gap-4 mt-16 transition-all duration-1000 delay-500 ease-luxury",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-mahogany/30 to-transparent" />
          <p className="text-mahogany/50 font-serif italic text-sm">
            Lassen Sie sich verführen
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-mahogany/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
