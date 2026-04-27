"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function StorytellingSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 })

  return (
    <section
      id="willkommen"
      ref={ref}
      className="py-24 md:py-32 lg:py-40 bg-smoke overflow-hidden relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Editorial text block */}
          <div className="max-w-lg">
            {/* Burgundy accent line */}
            <div
              className={cn(
                "decorative-line mb-8 transition-all duration-700 ease-luxury",
                isInView ? "opacity-100 scale-x-100 origin-left" : "opacity-0 scale-x-0"
              )}
            />
            
            {/* Main heading */}
            <h2
              className={cn(
                "font-serif text-6xl md:text-7xl lg:text-8xl text-carbon mb-8 italic transition-all duration-800 delay-100 ease-luxury",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
            >
              Bravo!
            </h2>
            
            {/* Storytelling paragraphs */}
            <div className="space-y-6">
              <p
                className={cn(
                  "text-carbon/75 text-lg md:text-xl leading-relaxed font-light transition-all duration-800 delay-200 ease-luxury",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Im Herzen Berlins, in einer Straße der Moderne und des Aufbruchs, 
                bieten wir einen Raum für <span className="text-mahogany font-normal">Freude</span>, <span className="text-mahogany font-normal">Genuß</span> und <span className="text-mahogany font-normal">Geselligkeit</span>.
              </p>
              
              <p
                className={cn(
                  "text-carbon/75 text-lg md:text-xl leading-relaxed font-light transition-all duration-800 delay-400 ease-luxury",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Unser Ziel ist es, Nahrung zu schaffen, die wiederherstellt, 
                wieder auffüllt und belebt.
              </p>
            </div>
            
            {/* Signature element */}
            <div
              className={cn(
                "mt-12 flex items-center gap-4 transition-all duration-800 delay-600 ease-luxury",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="w-12 h-px bg-silver" />
              <span className="font-serif text-sm text-silver italic tracking-wide">
                Seit 2008 in Berlin
              </span>
            </div>
          </div>
          
          {/* Right side - Overlapping images */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Image 1 - Large main image */}
            <div
              className={cn(
                "absolute top-0 right-0 w-[75%] h-[55%] overflow-hidden shadow-premium-lg transition-all duration-1000 delay-200 ease-luxury",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 translate-x-8"
              )}
            >
              <div className="animate-float-slow w-full h-full">
                <Image
                  src="/images/interior-detail.jpg"
                  alt="Restaurant Ambiente"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/20 to-transparent" />
              </div>
            </div>
            
            {/* Image 2 - Fresh ingredients */}
            <div
              className={cn(
                "absolute top-[18%] left-0 w-[45%] h-[38%] overflow-hidden shadow-premium transition-all duration-1000 delay-400 ease-luxury z-10",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 -translate-x-8"
              )}
            >
              <div className="animate-float-medium w-full h-full">
                <Image
                  src="/images/gallery-dish-1.jpg"
                  alt="Frische Zutaten"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-mahogany/10 to-transparent" />
              </div>
            </div>
            
            {/* Image 3 - Pasta dish */}
            <div
              className={cn(
                "absolute bottom-[12%] left-[8%] w-[48%] h-[35%] overflow-hidden shadow-premium transition-all duration-1000 delay-600 ease-luxury z-20",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 -translate-x-4"
              )}
            >
              <div className="animate-float-fast w-full h-full">
                <Image
                  src="/images/dish-pasta.jpg"
                  alt="Hausgemachte Pasta"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/25 to-transparent" />
              </div>
            </div>
            
            {/* Image 4 - Wine */}
            <div
              className={cn(
                "absolute bottom-[2%] right-[3%] w-[38%] h-[32%] overflow-hidden shadow-premium transition-all duration-1000 delay-800 ease-luxury z-10",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 translate-x-8"
              )}
            >
              <div className="animate-float-subtle w-full h-full">
                <Image
                  src="/images/gallery-wine.jpg"
                  alt="Erlesene Weine"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-garnet/15 to-transparent" />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div
              className={cn(
                "absolute top-[8%] left-[22%] w-16 h-16 border border-mahogany/15 rounded-full transition-all duration-1000 delay-1000 ease-luxury",
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
            />
            <div
              className={cn(
                "absolute bottom-[28%] right-[-2%] w-24 h-24 border border-silver/20 transition-all duration-1000 delay-1100 ease-luxury",
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
