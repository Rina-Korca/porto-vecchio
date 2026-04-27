"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import Link from "next/link"

export function ParallaxStorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [bgOffset, setBgOffset] = useState(0)
  const [cardOffset, setCardOffset] = useState(0)
  const { ref: contentRef, isInView } = useInView({ threshold: 0.2 })

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight
      
      // Calculate how far through the section we've scrolled
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight)
      
      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
      
      // Background moves slower (parallax effect)
      setBgOffset(clampedProgress * 80)
      
      // Card moves slightly faster for depth effect
      setCardOffset(clampedProgress * 30 - 15)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[80vh] lg:min-h-[90vh] overflow-hidden"
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ 
          transform: `translateY(${bgOffset}px)`,
          willChange: "transform"
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/parallax-wine.jpg')" }}
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/40 to-[#1a1a1a]/70" />
        <div className="absolute inset-0 bg-[#722F37]/20" />
      </div>

      {/* Floating Content Card */}
      <div className="relative z-10 min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div
          ref={contentRef}
          className="relative max-w-3xl mx-auto"
          style={{ 
            transform: `translateY(${cardOffset}px)`,
            willChange: "transform"
          }}
        >
          {/* Glassmorphism Card */}
          <div 
            className={`
              relative backdrop-blur-xl bg-white/90 rounded-sm p-10 md:p-16 
              shadow-2xl border border-white/50
              transition-all duration-1000 ease-out
              ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            `}
          >
            {/* Burgundy accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#722F37] to-transparent" />
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#722F37]/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#722F37]/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#722F37]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#722F37]/30" />

            {/* Content */}
            <div className="text-center space-y-8">
              {/* Italian quote decoration */}
              <p 
                className={`
                  text-sm tracking-[0.3em] uppercase text-[#722F37] font-medium
                  transition-all duration-700 delay-200
                  ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                La Dolce Vita
              </p>

              {/* Main heading */}
              <h2 
                className={`
                  font-serif text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] leading-tight
                  transition-all duration-700 delay-300
                  ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                Ein Ort für Freude,
                <br />
                <span className="italic text-[#722F37]">Genuß</span> und Geselligkeit.
              </h2>

              {/* Decorative divider */}
              <div 
                className={`
                  flex items-center justify-center gap-4
                  transition-all duration-700 delay-400
                  ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"}
                `}
              >
                <span className="w-12 h-px bg-[#722F37]/40" />
                <span className="w-2 h-2 rounded-full bg-[#722F37]/60" />
                <span className="w-12 h-px bg-[#722F37]/40" />
              </div>

              {/* Description */}
              <p 
                className={`
                  font-sans text-lg md:text-xl text-[#4a4a4a] leading-relaxed max-w-xl mx-auto
                  transition-all duration-700 delay-500
                  ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                Im Bonfini verbinden sich italienische Gastfreundschaft, hochwertige Produkte 
                und Berliner Lebendigkeit zu einem Erlebnis, das bleibt.
              </p>

              {/* CTA Button */}
              <div 
                className={`
                  pt-4
                  transition-all duration-700 delay-600
                  ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                <Link
                  href="#reservierung"
                  className="
                    group relative inline-flex items-center gap-3 
                    bg-[#722F37] text-white px-10 py-4 
                    text-sm tracking-wider uppercase font-medium
                    overflow-hidden transition-all duration-500
                    hover:bg-[#5a252c] hover:shadow-xl hover:shadow-[#722F37]/20
                  "
                >
                  <span className="relative z-10">Jetzt reservieren</span>
                  <svg 
                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div 
            className={`
              absolute -top-6 -left-6 w-32 h-32 border border-[#722F37]/20 rounded-full
              transition-all duration-1000 delay-700
              ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"}
            `}
          />
          <div 
            className={`
              absolute -bottom-8 -right-8 w-24 h-24 border border-white/30 rounded-full
              transition-all duration-1000 delay-800
              ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"}
            `}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f3f4] to-transparent z-20" />
    </section>
  )
}
