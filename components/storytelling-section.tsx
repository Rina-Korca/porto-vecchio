"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function StorytellingSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section
      id="willkommen"
      ref={ref}
      className="py-24 md:py-32 lg:py-40 bg-smoke overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Editorial text block */}
          <div className="max-w-xl">
            {/* Burgundy accent line */}
            <div
              className={cn(
                "w-16 h-[2px] bg-mahogany mb-8 transition-all duration-700",
                isInView ? "opacity-100 scale-x-100 origin-left" : "opacity-0 scale-x-0"
              )}
            />
            
            {/* Main heading */}
            <h2
              className={cn(
                "font-serif text-6xl md:text-7xl lg:text-8xl text-carbon mb-8 italic transition-all duration-700 delay-200",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
            >
              Bravo!
            </h2>
            
            {/* Storytelling paragraphs */}
            <div className="space-y-6">
              <p
                className={cn(
                  "text-carbon/80 text-lg md:text-xl leading-relaxed transition-all duration-700 delay-300",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Im Herzen Berlins, in einer Straße der Moderne und des Aufbruchs, 
                bieten wir einen Raum für Freude, Genuß und Geselligkeit.
              </p>
              
              <p
                className={cn(
                  "text-carbon/80 text-lg md:text-xl leading-relaxed transition-all duration-700 delay-500",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Unser Ziel ist es, Nahrung zu schaffen, die wiederherstellt, 
                wieder auffüllt und belebt.
              </p>
            </div>
            
            {/* Signature or decorative element */}
            <div
              className={cn(
                "mt-12 flex items-center gap-4 transition-all duration-700 delay-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <div className="w-12 h-[1px] bg-silver" />
              <span className="font-serif text-sm text-silver italic tracking-wide">
                Seit 2008
              </span>
            </div>
          </div>
          
          {/* Right side - Overlapping images */}
          <div className="relative h-[600px] md:h-[700px] lg:h-[750px]">
            {/* Image 1 - Large background image (restaurant detail) */}
            <div
              className={cn(
                "absolute top-0 right-0 w-[70%] h-[55%] rounded-sm overflow-hidden shadow-2xl transition-all duration-1000 delay-200 animate-float-slow",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 translate-x-8"
              )}
            >
              <Image
                src="/images/interior-detail.jpg"
                alt="Restaurant Ambiente"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/20 to-transparent" />
            </div>
            
            {/* Image 2 - Fresh ingredients (overlapping top left) */}
            <div
              className={cn(
                "absolute top-[15%] left-0 w-[45%] h-[40%] rounded-sm overflow-hidden shadow-xl transition-all duration-1000 delay-400 animate-float-medium z-10",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 -translate-x-8"
              )}
            >
              <Image
                src="/images/gallery-dish-1.jpg"
                alt="Frische Zutaten"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-mahogany/10 to-transparent" />
            </div>
            
            {/* Image 3 - Pasta dish (center bottom) */}
            <div
              className={cn(
                "absolute bottom-[10%] left-[10%] w-[50%] h-[38%] rounded-sm overflow-hidden shadow-xl transition-all duration-1000 delay-600 animate-float-fast z-20",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 -translate-x-4"
              )}
            >
              <Image
                src="/images/dish-pasta.jpg"
                alt="Hausgemachte Pasta"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/30 to-transparent" />
            </div>
            
            {/* Image 4 - Wine (bottom right) */}
            <div
              className={cn(
                "absolute bottom-0 right-[5%] w-[40%] h-[35%] rounded-sm overflow-hidden shadow-xl transition-all duration-1000 delay-800 animate-float-medium z-10",
                isInView ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-12 translate-x-8"
              )}
            >
              <Image
                src="/images/gallery-wine.jpg"
                alt="Erlesene Weine"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-garnet/20 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div
              className={cn(
                "absolute top-[5%] left-[20%] w-20 h-20 border border-mahogany/20 rounded-full transition-all duration-1000 delay-1000",
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
            />
            <div
              className={cn(
                "absolute bottom-[25%] right-0 w-32 h-32 border border-silver/30 transition-all duration-1000 delay-1200",
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
