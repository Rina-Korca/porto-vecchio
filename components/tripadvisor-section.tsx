"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

function AnimatedCounter({ target, duration = 2000, isActive }: { target: number; duration?: number; isActive: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isActive, target, duration])

  return <span>{count}</span>
}

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-[#00aa6c] fill-current"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      ))}
    </div>
  )
}

export function TripadvisorSection() {
  const { ref, isInView } = useInView({ threshold: 0.4 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <section ref={ref} className="py-24 bg-[#f5f3f4]">
      <div className="container mx-auto px-6">
        <div 
          className={cn(
            "max-w-2xl mx-auto transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Premium Card */}
          <div className="relative bg-white rounded-sm border border-silver/40 shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-10 md:p-14 text-center">
            {/* Burgundy accent line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-garnet to-mahogany" />
            
            {/* Tripadvisor Logo/Badge */}
            <div 
              className={cn(
                "mb-8 transition-all duration-700 delay-200",
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00aa6c]/10 mb-4">
                <svg 
                  className="w-9 h-9 text-[#00aa6c]" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <StarRating />
            </div>

            {/* Main Content */}
            <div 
              className={cn(
                "transition-all duration-700 delay-300",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mb-4">
                Tripadvisor
              </p>
              
              <h2 className="font-serif text-2xl md:text-3xl text-carbon leading-relaxed mb-6">
                Ristorante Bonfini wurde von{" "}
                <span className="text-garnet font-semibold">
                  <AnimatedCounter target={208} isActive={hasAnimated} />
                </span>{" "}
                Reisenden als{" "}
                <span className="italic">&ldquo;Ausgezeichnet&rdquo;</span>{" "}
                bewertet
              </h2>

              {/* Certificate Badge */}
              <div 
                className={cn(
                  "inline-flex items-center gap-3 bg-smoke/60 rounded-full px-6 py-3 mb-8 transition-all duration-700 delay-500",
                  isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-[#00aa6c] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="font-medium text-carbon">
                  Zertifikat für Exzellenz 2018
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <a
                href="#"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-garnet text-white font-medium rounded-sm hover:bg-mahogany transition-all duration-300"
              >
                Bewertungen lesen
                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-carbon/20 text-carbon font-medium rounded-sm hover:border-garnet hover:text-garnet transition-all duration-300"
              >
                <svg className="w-5 h-5 text-[#00aa6c]" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Tripadvisor
              </a>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-silver/30" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-silver/30" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-silver/30" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-silver/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
