"use client"

import { useEffect, useState } from "react"
import { ChevronDown, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 hero-zoom">
        <Image
          src="/images/hero-restaurant.jpg"
          alt="Ristorante Bonfini Interieur"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/50 via-carbon/40 to-carbon/60" />
      <div className="absolute inset-0 bg-carbon/20" />

      {/* Content - Editorial Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1
            className={`font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-[0.9] tracking-tight transition-all duration-1200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Ristorante Bonfini
          </h1>

          {/* Decorative Line */}
          <div
            className={`w-24 h-px bg-gradient-to-r from-transparent via-strawberry to-transparent mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />

          {/* Subheadline */}
          <p
            className={`text-white/90 text-xl md:text-2xl lg:text-3xl font-serif italic mb-8 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Italienische Gastfreundschaft im Herzen Berlins
          </p>

          {/* Description */}
          <p
            className={`text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Im Bonfini konzentrieren wir uns auf ein komplettes Erlebnis. Dabei möchten wir 
            die Beziehung zwischen der rohen Natur, dem Produkt und unserer Kulturgeschichte hervorheben.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-5 justify-center mb-16 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#reservierung"
              className="group relative inline-flex items-center justify-center bg-mahogany text-white px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium overflow-hidden rounded transition-all duration-300 hover:shadow-[0_8px_30px_rgba(128,0,32,0.4)]"
            >
              <span className="relative z-10">Tisch reservieren</span>
              <div className="absolute inset-0 bg-garnet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <a
              href="#menu"
              className="group relative inline-flex items-center justify-center border border-white/50 text-white px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium overflow-hidden rounded transition-all duration-300 hover:border-white"
            >
              <span className="relative z-10">Speisekarten ansehen</span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          </div>

          {/* Contact Details */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-white/60 text-sm transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-strawberry/80" />
              <span>Chausseestr. 15, 10115 Berlin</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-strawberry/80" />
              <span>030 95 61 48 48</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.3em]">Entdecken</span>
        <a 
          href="#willkommen" 
          aria-label="Scroll down"
          className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-2 hover:border-white/50 transition-colors"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll-indicator" />
        </a>
      </div>
    </section>
  )
}
