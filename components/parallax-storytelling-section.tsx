"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-animations"

export function ParallaxStorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [bgOffset, setBgOffset] = useState(0)
  const [bgScale, setBgScale] = useState(1)
  const [cardOffset, setCardOffset] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }
          
          const rect = sectionRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const sectionHeight = sectionRef.current.offsetHeight
          
          // Calculate how far through the section we've scrolled
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight)
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
          
          // Background moves slower (parallax effect) and scales
          setBgOffset(clampedProgress * 100)
          setBgScale(1 + clampedProgress * 0.1) // Scale from 1 to 1.1
          
          // Card moves slightly faster for depth effect
          setCardOffset(clampedProgress * 40 - 20)
          
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
    <section 
      ref={sectionRef}
      className="relative min-h-[80vh] lg:min-h-[90vh] overflow-hidden"
    >
      {/* Parallax Background with scroll zoom */}
      <div 
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ 
          transform: `translateY(${bgOffset}px) scale(${bgScale})`,
          willChange: "transform",
          transition: "transform 0.1s linear"
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/parallax-wine.jpg')" }}
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/40 to-carbon/70" />
        <div className="absolute inset-0 bg-mahogany/20" />
      </div>

      {/* Floating Content Card with different parallax speed */}
      <div className="relative z-10 min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center px-4 py-20">
        <div
          className="relative max-w-3xl mx-auto"
          style={{ 
            transform: `translateY(${cardOffset}px)`,
            willChange: "transform",
            transition: "transform 0.1s linear"
          }}
        >
          {/* Glassmorphism Card */}
          <ScrollReveal direction="scale" delay={0}>
            <div className="relative backdrop-blur-xl bg-white/92 rounded-sm p-10 md:p-16 shadow-2xl border border-white/50">
              {/* Burgundy accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-mahogany to-transparent" />
              
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-mahogany/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-mahogany/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-mahogany/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-mahogany/30" />

              {/* Content */}
              <div className="text-center space-y-8">
                {/* Italian quote decoration */}
                <ScrollReveal direction="up" delay={200}>
                  <p className="text-sm tracking-[0.3em] uppercase text-mahogany font-medium">
                    La Dolce Vita
                  </p>
                </ScrollReveal>

                {/* Main heading */}
                <ScrollReveal direction="up" delay={300}>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-carbon leading-tight">
                    Ein Ort für Freude,
                    <br />
                    <span className="italic text-mahogany">Genuß</span> und Geselligkeit.
                  </h2>
                </ScrollReveal>

                {/* Decorative divider */}
                <ScrollReveal direction="scale" delay={400}>
                  <div className="flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-mahogany/40" />
                    <span className="w-2 h-2 rounded-full bg-mahogany/60" />
                    <span className="w-12 h-px bg-mahogany/40" />
                  </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal direction="up" delay={500}>
                  <p className="font-sans text-lg md:text-xl text-carbon/70 leading-relaxed max-w-xl mx-auto">
                    Im Bonfini verbinden sich italienische Gastfreundschaft, hochwertige Produkte 
                    und Berliner Lebendigkeit zu einem Erlebnis, das bleibt.
                  </p>
                </ScrollReveal>

                {/* CTA Button */}
                <ScrollReveal direction="up" delay={600}>
                  <div className="pt-4">
                    <Link
                      href="#reservierung"
                      className="group relative inline-flex items-center gap-3 bg-mahogany text-white px-10 py-4 text-sm tracking-wider uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-garnet hover:shadow-xl hover:shadow-mahogany/20 magnetic-btn"
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
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* Floating decorative elements */}
          <ScrollReveal direction="scale" delay={700}>
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-mahogany/20 rounded-full" />
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={800}>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 border border-white/30 rounded-full" />
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-smoke to-transparent z-20 pointer-events-none" />
    </section>
  )
}
