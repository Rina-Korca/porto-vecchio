"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollReveal, HeadlineScroll, AnimatedHeading } from "@/components/scroll-animations"
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

function CardWithScrollZoom({ item, index }: { item: typeof recommendations[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          // Check if in view
          const inView = rect.top < windowHeight && rect.bottom > 0
          setIsInView(inView)
          
          if (inView) {
            // Calculate scale based on position in viewport
            const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)))
            const newScale = 1 + (progress * 0.08) // Scale from 1 to 1.08
            setScale(newScale)
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={cardRef}
      className={cn(
        "flex-shrink-0 w-[300px] md:w-[340px] snap-center transition-all duration-700 ease-luxury",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="group relative bg-white overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-600 ease-luxury h-full card-hover">
        {/* Image container with scroll zoom */}
        <div className="relative h-64 md:h-72 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-100 ease-out group-hover:scale-110"
            style={{ transform: `scale(${scale})` }}
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
  )
}

export function RecommendationsSection() {
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
      className="py-24 md:py-32 lg:py-40 bg-smoke relative overflow-hidden"
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-40" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header with scroll animations */}
        <div className="text-center mb-16">
          {/* Decorative line */}
          <ScrollReveal direction="scale" delay={0}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-mahogany/30" />
              <div className="w-2 h-2 rounded-full bg-mahogany" />
              <div className="w-12 h-px bg-mahogany/30" />
            </div>
          </ScrollReveal>

          <HeadlineScroll speed={0.05}>
            <AnimatedHeading
              as="h2"
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-carbon mb-4"
              wordDelay={100}
            >
              Empfehlungen
            </AnimatedHeading>
          </HeadlineScroll>
          
          <ScrollReveal direction="up" delay={200}>
            <p className="text-lg md:text-xl text-mahogany italic font-serif">
              Ausgewählte Momente aus unserer Küche
            </p>
          </ScrollReveal>
        </div>

        {/* Navigation buttons - Desktop */}
        <ScrollReveal direction="right" delay={300}>
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
        </ScrollReveal>

        {/* Cards container with individual scroll animations */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          {recommendations.map((item, index) => (
            <CardWithScrollZoom key={item.id} item={item} index={index} />
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
        <ScrollReveal direction="up" delay={600}>
          <div className="flex items-center justify-center gap-4 mt-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-mahogany/30 to-transparent" />
            <p className="text-mahogany/50 font-serif italic text-sm">
              Lassen Sie sich verführen
            </p>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-mahogany/30 to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
