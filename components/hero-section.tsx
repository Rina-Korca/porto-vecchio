"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-restaurant.jpg"
          alt="Ristorante Bonfini Interieur"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/40 to-carbon/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className={`text-smoke/80 uppercase tracking-[0.3em] text-sm mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Fine Italian Dining in Berlin
        </p>
        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Ristorante
          <br />
          <span className="text-strawberry">Bonfini</span>
        </h1>
        <p
          className={`text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Authentische italienische Küche, meisterhaft zubereitet mit den
          feinsten Zutaten. Ein kulinarisches Erlebnis im Herzen Berlins.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#reservierung"
            className="magnetic-btn inline-block bg-mahogany text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded"
          >
            Tisch Reservieren
          </a>
          <a
            href="#kueche"
            className="magnetic-btn inline-block border border-white/40 text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/10 transition-colors rounded"
          >
            Entdecken
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#willkommen" aria-label="Scroll down">
          <ChevronDown className="text-white/60 w-8 h-8" />
        </a>
      </div>
    </section>
  )
}
