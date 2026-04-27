"use client"

import { useEffect, useState, useRef } from "react"
import { MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Scroll-driven animation for headline movement
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }
          
          const scrollY = window.scrollY
          const sectionHeight = sectionRef.current.offsetHeight
          const progress = Math.min(1, scrollY / (sectionHeight * 0.8))
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate scroll-based transforms
  const headlineOffset = scrollProgress * -60
  const headlineScale = 1 - scrollProgress * 0.1
  const bgScale = 1 + scrollProgress * 0.15
  const contentOpacity = 1 - scrollProgress * 1.5

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Scroll Zoom */}
      <div 
        className="absolute inset-0 hero-zoom"
        style={{
          transform: `scale(${bgScale})`,
          transition: "transform 0.1s linear"
        }}
      >
        <Image
          src="/images/hero-restaurant.jpg"
          alt="Ristorante Bonfini Interieur"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>
      
      {/* Gradient Overlays - Layered for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/30 to-carbon/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/30 via-transparent to-carbon/30" />

      {/* Content - Editorial Layout with scroll-driven movement */}
      <div 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12"
        style={{
          transform: `translateY(${headlineOffset}px) scale(${headlineScale})`,
          opacity: Math.max(0, contentOpacity),
          transition: "transform 0.1s linear, opacity 0.1s linear"
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Small intro text */}
          <span
            className={`text-white/60 text-xs md:text-sm uppercase tracking-[0.4em] mb-6 transition-all duration-1000 ease-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Benvenuti
          </span>

          {/* Main Headline - moves up faster on scroll */}
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6 leading-[0.95] tracking-tight transition-all duration-1000 delay-150 ease-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Ristorante
            <br />
            <span className="italic">Bonfini</span>
          </h1>

          {/* Decorative Line */}
          <div
            className={`w-20 h-[2px] bg-gradient-to-r from-transparent via-mahogany to-transparent mb-8 transition-all duration-800 delay-300 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />

          {/* Subheadline */}
          <p
            className={`text-white/85 text-lg md:text-xl lg:text-2xl font-serif italic mb-6 transition-all duration-1000 delay-400 ease-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Italienische Gastfreundschaft im Herzen Berlins
          </p>

          {/* Description */}
          <p
            className={`text-white/60 text-sm md:text-base font-light max-w-xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-500 ease-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Ein Ort für Freude, Genuß und Geselligkeit. 
            Wo sich Tradition und Moderne zu einem unvergesslichen Erlebnis verbinden.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-600 ease-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#reservierung"
              className="group relative inline-flex items-center justify-center bg-mahogany text-white px-8 md:px-10 py-3.5 md:py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(164,22,26,0.4)] magnetic-btn"
            >
              <span className="relative z-10">Tisch reservieren</span>
              <div className="absolute inset-0 bg-garnet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            <a
              href="#empfehlungen"
              className="group relative inline-flex items-center justify-center border border-white/40 text-white px-8 md:px-10 py-3.5 md:py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-medium overflow-hidden transition-all duration-500 hover:border-white/70"
            >
              <span className="relative z-10">Speisekarte</span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          </div>

          {/* Contact Details */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-white/50 text-xs md:text-sm transition-all duration-1000 delay-700 ease-luxury ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a 
              href="https://maps.google.com/?q=Chausseestr.+15,+10115+Berlin" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300"
            >
              <MapPin className="w-4 h-4 text-mahogany/80" />
              <span>Chausseestr. 15, 10115 Berlin</span>
            </a>
            <a 
              href="tel:+493095614848"
              className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300"
            >
              <Phone className="w-4 h-4 text-mahogany/80" />
              <span>030 95 61 48 48</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - fades out on scroll */}
      <div 
        className={`absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000 ease-luxury ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Entdecken</span>
        <a 
          href="#willkommen" 
          aria-label="Scroll to content"
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5 hover:border-white/40 transition-colors duration-300"
        >
          <div className="w-0.5 h-1.5 bg-white/50 rounded-full animate-scroll-indicator" />
        </a>
      </div>

      {/* Side decorative elements */}
      <div 
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:block"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-white/30 text-[10px] uppercase tracking-widest transform -rotate-90 origin-center whitespace-nowrap">
            Est. 2008
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
