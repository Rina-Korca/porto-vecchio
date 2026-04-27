"use client"

import Link from "next/link"
import { ScrollReveal, MultiLayerParallax, DepthCard } from "@/components/scroll-animations"

export function ParallaxStorytellingSection() {
  // Mid-layer decorative content
  const MidLayerContent = (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Floating decorative circles at mid-depth */}
      <div className="absolute top-1/4 left-1/6 w-48 h-48 border border-white/10 rounded-full" />
      <div className="absolute bottom-1/4 right-1/5 w-32 h-32 border border-mahogany/20 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-mahogany/5 rounded-full blur-xl" />
      
      {/* Floating text elements */}
      <div className="absolute top-20 left-10 lg:left-20">
        <p className="font-serif text-white/10 text-6xl lg:text-8xl italic select-none">
          Dolce
        </p>
      </div>
      <div className="absolute bottom-20 right-10 lg:right-20">
        <p className="font-serif text-white/10 text-6xl lg:text-8xl italic select-none">
          Vita
        </p>
      </div>
    </div>
  )

  return (
    <MultiLayerParallax
      backgroundImage="/images/parallax-wine.jpg"
      backgroundAlt="Wine cellar atmosphere at Ristorante Bonfini"
      midLayerContent={MidLayerContent}
      minHeight="85vh"
      overlayColor="rgba(11, 9, 10, 0.55)"
      disableOnMobile={true}
    >
      <div className="relative w-full max-w-3xl mx-auto px-4 py-20">
        <ScrollReveal direction="scale" delay={0}>
          <DepthCard className="p-10 md:p-16" glassEffect={true}>
            {/* Burgundy accent line at top */}
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
                    className="group relative inline-flex items-center gap-3 bg-mahogany text-white px-10 py-4 text-sm tracking-wider uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-garnet hover:shadow-xl hover:shadow-mahogany/20"
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
          </DepthCard>
        </ScrollReveal>

        {/* Outer floating decorative elements */}
        <div className="absolute -top-8 -left-8 w-40 h-40 border border-white/20 rounded-full pointer-events-none hidden lg:block" />
        <div className="absolute -bottom-10 -right-10 w-28 h-28 border border-mahogany/30 rounded-full pointer-events-none hidden lg:block" />
      </div>
    </MultiLayerParallax>
  )
}
