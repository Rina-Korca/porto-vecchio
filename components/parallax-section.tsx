"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function ParallaxSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center parallax-bg"
      style={{
        backgroundImage: "url('/images/parallax-wine.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-carbon/70" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <blockquote
          className={cn(
            "transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-relaxed mb-8 italic">
            &ldquo;La vita e troppo breve per bere vino cattivo&rdquo;
          </p>
          <footer className="text-white/70 text-lg uppercase tracking-widest">
            Das Leben ist zu kurz, um schlechten Wein zu trinken
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
