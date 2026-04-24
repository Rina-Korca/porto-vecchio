"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

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
      const scrollAmount = 400
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
      className="py-24 md:py-32 bg-[#f8f7f5] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#722f37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#722f37]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#722f37]/30" />
            <div className="w-2 h-2 rounded-full bg-[#722f37]" />
            <div className="w-12 h-px bg-[#722f37]/30" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-4">
            Empfehlungen
          </h2>
          <p className="text-lg md:text-xl text-[#722f37] italic font-serif">
            Ausgewählte Momente aus unserer Küche
          </p>
        </div>

        {/* Navigation buttons - Desktop */}
        <div className="hidden md:flex justify-end gap-2 mb-8 pr-4">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-[#722f37]/20 flex items-center justify-center text-[#722f37] hover:bg-[#722f37] hover:text-white hover:border-[#722f37] transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-[#722f37]/20 flex items-center justify-center text-[#722f37] hover:bg-[#722f37] hover:text-white hover:border-[#722f37] transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Cards container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {recommendations.map((item, index) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-[300px] md:w-[340px] snap-center transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isInView ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                {/* Image container */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Burgundy overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#722f37]/90 via-[#722f37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover content */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="text-white font-serif text-lg italic">
                      Mehr entdecken
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Decorative accent */}
                  <div className="w-8 h-0.5 bg-[#722f37] mb-4 transition-all duration-300 group-hover:w-12" />
                  
                  <h3 className="font-serif text-xl md:text-2xl text-[#1a1a1a] mb-3 group-hover:text-[#722f37] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed">
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
        <div className="flex md:hidden justify-center mt-4 gap-2">
          {recommendations.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-[#722f37]/20"
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div
          className={`flex items-center justify-center gap-4 mt-16 transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#722f37]/30 to-transparent" />
          <p className="text-[#722f37]/60 font-serif italic text-sm">
            Lassen Sie sich verführen
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#722f37]/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
