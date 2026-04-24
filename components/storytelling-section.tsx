"use client"

import { ScrollReveal, ImageReveal, ParallaxElement, HeadlineScroll } from "@/components/scroll-animations"

export function StorytellingSection() {
  return (
    <section id="willkommen" className="py-24 md:py-32 lg:py-40 bg-smoke overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-50" />
      
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-mahogany/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-garnet/5 blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Editorial text block */}
          <div className="max-w-lg">
            {/* Burgundy accent line */}
            <ScrollReveal direction="left" delay={0}>
              <div className="decorative-line mb-8" />
            </ScrollReveal>
            
            {/* Main heading with parallax */}
            <HeadlineScroll speed={0.08}>
              <ScrollReveal direction="up" delay={100}>
                <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-carbon mb-8 italic">
                  Bravo!
                </h2>
              </ScrollReveal>
            </HeadlineScroll>
            
            {/* Storytelling paragraphs with staggered reveal */}
            <div className="space-y-6">
              <ScrollReveal direction="up" delay={200}>
                <p className="text-carbon/75 text-lg md:text-xl leading-relaxed font-light">
                  Im Herzen Berlins, in einer Straße der Moderne und des Aufbruchs, 
                  bieten wir einen Raum für <span className="text-mahogany font-normal">Freude</span>, <span className="text-mahogany font-normal">Genuß</span> und <span className="text-mahogany font-normal">Geselligkeit</span>.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={350}>
                <p className="text-carbon/75 text-lg md:text-xl leading-relaxed font-light">
                  Unser Ziel ist es, Nahrung zu schaffen, die wiederherstellt, 
                  wieder auffüllt und belebt.
                </p>
              </ScrollReveal>
            </div>
            
            {/* Signature element */}
            <ScrollReveal direction="up" delay={500}>
              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-px bg-silver" />
                <span className="font-serif text-sm text-silver italic tracking-wide">
                  Seit 2008 in Berlin
                </span>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Right side - Overlapping images with parallax */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Image 1 - Large main image with curtain reveal */}
            <ParallaxElement speed={0.15} className="absolute top-0 right-0 w-[75%] h-[55%] z-0">
              <ImageReveal
                src="/images/interior-detail.jpg"
                alt="Restaurant Ambiente"
                reveal="curtain"
                delay={200}
                containerClassName="w-full h-full shadow-premium-lg"
              />
            </ParallaxElement>
            
            {/* Image 2 - Fresh ingredients with left mask reveal */}
            <ParallaxElement speed={0.25} className="absolute top-[18%] left-0 w-[45%] h-[38%] z-10">
              <ImageReveal
                src="/images/gallery-dish-1.jpg"
                alt="Frische Zutaten"
                reveal="left"
                delay={400}
                containerClassName="w-full h-full shadow-premium"
              />
            </ParallaxElement>
            
            {/* Image 3 - Pasta dish with bottom reveal */}
            <ParallaxElement speed={0.35} className="absolute bottom-[12%] left-[8%] w-[48%] h-[35%] z-20">
              <ImageReveal
                src="/images/dish-pasta.jpg"
                alt="Hausgemachte Pasta"
                reveal="up"
                delay={600}
                containerClassName="w-full h-full shadow-premium"
              />
            </ParallaxElement>
            
            {/* Image 4 - Wine with split reveal */}
            <ParallaxElement speed={0.2} className="absolute bottom-[2%] right-[3%] w-[38%] h-[32%] z-10">
              <ImageReveal
                src="/images/gallery-wine.jpg"
                alt="Erlesene Weine"
                reveal="split"
                delay={800}
                containerClassName="w-full h-full shadow-premium"
              />
            </ParallaxElement>
            
            {/* Decorative elements */}
            <ScrollReveal direction="scale" delay={1000}>
              <div className="absolute top-[8%] left-[22%] w-16 h-16 border border-mahogany/15 rounded-full" />
            </ScrollReveal>
            <ScrollReveal direction="scale" delay={1100}>
              <div className="absolute bottom-[28%] right-[-2%] w-24 h-24 border border-silver/20" />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
