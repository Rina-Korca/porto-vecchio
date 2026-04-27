"use client"

import { MultiLayerParallax, ScrollReveal, DepthCard } from "@/components/scroll-animations"

export function ParallaxSection() {
  // Mid-layer decorative content for depth
  const MidLayerContent = (
    <div className="absolute inset-0 pointer-events-none">
      {/* Subtle floating elements at mid-depth */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-mahogany/5 rounded-full blur-2xl" />
      
      {/* Decorative grape/wine motif */}
      <div className="absolute top-10 right-1/4 opacity-10">
        <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="8" cy="6" r="3" />
          <circle cx="16" cy="6" r="3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="12" r="3" />
          <circle cx="10" cy="16" r="3" />
          <circle cx="14" cy="16" r="3" />
          <path d="M12 18 L12 22" strokeWidth="2" stroke="currentColor" />
        </svg>
      </div>
    </div>
  )

  return (
    <MultiLayerParallax
      backgroundImage="/images/gallery-wine.jpg"
      backgroundAlt="Italian wine selection at Ristorante Bonfini"
      midLayerContent={MidLayerContent}
      minHeight="60vh"
      overlayColor="rgba(11, 9, 10, 0.65)"
      disableOnMobile={true}
    >
      <div className="w-full max-w-4xl mx-auto px-6 py-16">
        <ScrollReveal direction="scale" delay={0}>
          <blockquote className="text-center">
            {/* Decorative quote marks */}
            <ScrollReveal direction="up" delay={100}>
              <div className="flex justify-center mb-6">
                <svg className="w-12 h-12 text-mahogany/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </ScrollReveal>
            
            {/* Main quote */}
            <ScrollReveal direction="up" delay={200}>
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-relaxed mb-8 italic">
                La vita è troppo breve per bere vino cattivo
              </p>
            </ScrollReveal>
            
            {/* Decorative divider */}
            <ScrollReveal direction="scale" delay={300}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="w-16 h-px bg-white/30" />
                <span className="w-2 h-2 rounded-full bg-mahogany" />
                <span className="w-16 h-px bg-white/30" />
              </div>
            </ScrollReveal>
            
            {/* Translation */}
            <ScrollReveal direction="up" delay={400}>
              <footer className="text-white/60 text-base md:text-lg uppercase tracking-[0.2em]">
                Das Leben ist zu kurz für schlechten Wein
              </footer>
            </ScrollReveal>
          </blockquote>
        </ScrollReveal>
      </div>
    </MultiLayerParallax>
  )
}
