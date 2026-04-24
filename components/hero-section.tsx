"use client"

import { useEffect, useState, useRef } from "react"
import { MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Initial load animation
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 50)
    const visibleTimer = setTimeout(() => setIsVisible(true), 300)
    return () => {
      clearTimeout(loadTimer)
      clearTimeout(visibleTimer)
    }
  }, [])

  // Check for mobile/reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Scroll-driven animation for multi-layer parallax
  useEffect(() => {
    if (isMobile) return

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
  }, [isMobile])

  // Multi-layer scroll-based transforms
  // Background: slowest (0.3x speed), with zoom
  const bgY = scrollProgress * 100 * 0.3
  // Start at 1.0, zoom to 1.05 on load, then continue to 1.15 on scroll
  const bgBaseScale = isLoaded ? 1.05 : 1.0
  const bgScale = bgBaseScale + scrollProgress * 0.1
  const bgBlur = scrollProgress * 3

  // Mid layer: medium speed (0.6x)
  const midY = scrollProgress * 100 * 0.6

  // Foreground content: normal speed with parallax
  const headlineOffset = scrollProgress * -100
  const headlineScale = 1 - scrollProgress * 0.1
  const contentOpacity = 1 - scrollProgress * 1.8

  const shouldAnimate = !isMobile

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen min-h-[700px] max-h-[1200px] flex items-center justify-center overflow-hidden"
    >
      {/* === BACKGROUND LAYER (0.3x scroll speed) with cinematic slow zoom === */}
      <div 
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
        style={{
          transform: shouldAnimate 
            ? `translateY(${bgY}px) scale(${bgScale})` 
            : `scale(${isLoaded ? 1.05 : 1})`,
          filter: shouldAnimate ? `blur(${bgBlur}px)` : 'none',
          transition: isLoaded 
            ? "transform 8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s linear" 
            : "transform 0.1s linear",
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

      {/* === GRAIN/NOISE OVERLAY for cinematic premium feel === */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* === MID LAYER (0.6x scroll speed) - Decorative elements === */}
      <div 
        className="absolute inset-0 pointer-events-none z-[2]"
        style={shouldAnimate ? {
          transform: `translateY(${midY}px)`,
          transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)"
        } : {}}
      >
        {/* Floating decorative circles */}
        <div 
          className={`absolute top-1/4 left-[10%] w-48 h-48 border border-white/5 rounded-full hidden lg:block transition-all duration-[2s] ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ transitionDelay: '1.2s' }}
        />
        <div 
          className={`absolute bottom-1/3 right-[15%] w-32 h-32 border border-mahogany/10 rounded-full hidden lg:block transition-all duration-[2s] ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ transitionDelay: '1.4s' }}
        />
        <div 
          className={`absolute top-1/2 right-[25%] w-24 h-24 bg-mahogany/5 rounded-full blur-2xl hidden lg:block transition-all duration-[2s] ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1.6s' }}
        />
        
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,9,10,0.15)_50%,rgba(11,9,10,0.6)_100%)]" />
      </div>

      {/* === GRADIENT OVERLAYS (dark → transparent cinematic look) === */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-carbon/70 via-carbon/20 to-carbon/75" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-carbon/40 via-transparent to-carbon/40" />
      {/* Extra top fade for cinematic letterbox feel */}
      <div className="absolute top-0 left-0 right-0 h-32 z-[3] bg-gradient-to-b from-carbon/50 to-transparent" />

      {/* === FOREGROUND LAYER - Content (normal/fast scroll speed) === */}
      <div 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12"
        style={shouldAnimate ? {
          transform: `translateY(${headlineOffset}px) scale(${headlineScale})`,
          opacity: Math.max(0, contentOpacity),
          transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.1s linear"
        } : {}}
      >
        <div className="flex flex-col items-center text-center">
          {/* Small intro text - Step 1 */}
          <span
            className={`text-subhead text-white/50 mb-8 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Benvenuti
          </span>

          {/* Main Headline - Word by word animation */}
          <h1 className="mb-8">
            {/* First line - "Ristorante" */}
            <span className="block overflow-hidden">
              <span
                className={`block text-display-1 text-white leading-[0.9] tracking-[-0.02em] transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[110%]"
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                Ristorante
              </span>
            </span>
            {/* Second line - "Bonfini" with italic */}
            <span className="block overflow-hidden">
              <span
                className={`block text-display-1 text-white leading-[0.9] tracking-[-0.02em] italic transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[110%]"
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                Bonfini
              </span>
            </span>
          </h1>

          {/* Decorative Line - Step 3 */}
          <div className="relative mb-10 overflow-hidden">
            <div
              className={`w-24 h-[2px] bg-gradient-to-r from-transparent via-mahogany to-transparent transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: '500ms' }}
            />
          </div>

          {/* Subheadline - Step 4 */}
          <p
            className={`text-quote text-white/85 mb-5 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Italienische Gastfreundschaft im Herzen Berlins
          </p>

          {/* Description - Step 5 */}
          <p
            className={`text-body text-white/50 max-w-lg mx-auto mb-14 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '750ms' }}
          >
            Ein Ort für Freude, Genuß und Geselligkeit. 
            Wo sich Tradition und Moderne zu einem unvergesslichen Erlebnis verbinden.
          </p>

          {/* CTA Buttons - Step 6 */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-20 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            <a
              href="#reservierung"
              className="group relative inline-flex items-center justify-center bg-mahogany text-white px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_15px_50px_rgba(164,22,26,0.5)] hover:scale-[1.02]"
            >
              <span className="relative z-10">Tisch reservieren</span>
              <div className="absolute inset-0 bg-garnet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
            <a
              href="#empfehlungen"
              className="group relative inline-flex items-center justify-center border border-white/30 text-white px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium overflow-hidden transition-all duration-500 hover:border-white/60 hover:scale-[1.02]"
            >
              <span className="relative z-10">Speisekarte</span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
          </div>

          {/* Contact Details - Step 7 */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-white/40 text-xs transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: '1050ms' }}
          >
            <a 
              href="https://maps.google.com/?q=Chausseestr.+15,+10115+Berlin" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white/70 transition-colors duration-300 group"
            >
              <MapPin className="w-3.5 h-3.5 text-mahogany/70 group-hover:text-mahogany transition-colors" />
              <span className="tracking-wide">Chausseestr. 15, 10115 Berlin</span>
            </a>
            <a 
              href="tel:+493095614848"
              className="flex items-center gap-2 hover:text-white/70 transition-colors duration-300 group"
            >
              <Phone className="w-3.5 h-3.5 text-mahogany/70 group-hover:text-mahogany transition-colors" />
              <span className="tracking-wide">030 95 61 48 48</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - fades in last, fades out on scroll */}
      <div 
        className={`absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-4"
        }`}
        style={{ 
          transitionDelay: '1.5s',
          opacity: shouldAnimate ? Math.max(0, 1 - scrollProgress * 4) : 1 
        }}
      >
        <span className="text-white/25 text-[9px] uppercase tracking-[0.4em]">Entdecken</span>
        <a 
          href="#willkommen" 
          aria-label="Scroll to content"
          className="w-6 h-10 border border-white/15 rounded-full flex items-start justify-center p-2 hover:border-white/30 transition-colors duration-500"
        >
          <div className="w-0.5 h-2 bg-white/40 rounded-full animate-scroll-indicator" />
        </a>
      </div>

      {/* Side decorative element - fades out on scroll */}
      <div 
        className={`absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          transitionDelay: '1.8s',
          opacity: shouldAnimate ? Math.max(0, 1 - scrollProgress * 2.5) : 1 
        }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] transform -rotate-90 origin-center whitespace-nowrap">
          Est. 2008
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </div>

      {/* Right side decorative element */}
      <div 
        className={`absolute right-8 md:right-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          transitionDelay: '2s',
          opacity: shouldAnimate ? Math.max(0, 1 - scrollProgress * 2.5) : 1 
        }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] transform rotate-90 origin-center whitespace-nowrap">
          Berlin Mitte
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-smoke to-transparent z-[5] pointer-events-none" />
    </section>
  )
}
