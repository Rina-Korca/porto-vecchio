"use client"

import { ArrowRight } from "lucide-react"
import { ScrollReveal, ImageReveal, ParallaxElement, HeadlineScroll } from "@/components/scroll-animations"

export function RestaurantSection() {
  return (
    <section
      id="restaurant"
      className="relative py-32 lg:py-40 overflow-hidden bg-cream"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-mahogany/5 blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-mahogany/5 blur-3xl opacity-30" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="relative">
          {/* Layered Image Grid */}
          <div className="relative lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start">
            
            {/* Large Main Image with diagonal mask reveal */}
            <ParallaxElement speed={0.1} className="lg:col-span-7 relative z-10">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-sm shadow-2xl overflow-hidden">
                <ImageReveal
                  src="/images/gallery-interior-1.jpg"
                  alt="Bonfini Restaurant Interior"
                  reveal="diagonal"
                  delay={0}
                  containerClassName="w-full h-full"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
              </div>
              
              {/* Decorative frame accent */}
              <ScrollReveal direction="scale" delay={400}>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-mahogany/30 rounded-sm -z-10" />
              </ScrollReveal>
            </ParallaxElement>

            {/* Two Smaller Images - Stacked on Right with parallax */}
            <div className="lg:col-span-5 mt-8 lg:mt-24 space-y-6">
              {/* Upper small image with right mask reveal */}
              <ParallaxElement speed={0.2}>
                <div className="relative aspect-[3/2] rounded-sm shadow-xl overflow-hidden">
                  <ImageReveal
                    src="/images/interior-detail.jpg"
                    alt="Restaurant Ambiance Detail"
                    reveal="right"
                    delay={200}
                    containerClassName="w-full h-full"
                  />
                </div>
              </ParallaxElement>

              {/* Lower small image with vertical curtain reveal */}
              <ParallaxElement speed={0.25}>
                <div className="relative aspect-[3/2] rounded-sm shadow-xl overflow-hidden">
                  <ImageReveal
                    src="/images/gallery-interior-2.jpg"
                    alt="Restaurant Bar Area"
                    reveal="curtain-vertical"
                    delay={400}
                    containerClassName="w-full h-full"
                  />
                </div>
              </ParallaxElement>
            </div>
          </div>

          {/* Dark Burgundy Text Card - Overlapping with parallax */}
          <ParallaxElement speed={0.15} className="relative lg:absolute lg:bottom-16 lg:right-0 lg:w-[55%] xl:w-[50%] mt-8 lg:mt-0 z-20">
            <ScrollReveal direction="up" delay={500}>
              <div className="relative p-10 lg:p-14 rounded-sm shadow-2xl bg-[#2d0a0a]">
                {/* Decorative corner accents */}
                <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-white/15" />
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-white/15" />

                {/* Section label */}
                <ScrollReveal direction="left" delay={600}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-gold" />
                    <span className="text-xs tracking-[0.25em] uppercase font-light text-gold">
                      Atmosphäre
                    </span>
                  </div>
                </ScrollReveal>

                {/* Heading with parallax */}
                <HeadlineScroll speed={0.04}>
                  <ScrollReveal direction="up" delay={700}>
                    <h2 className="font-serif text-4xl lg:text-5xl text-smoke mb-4">
                      Das Restaurant
                    </h2>
                  </ScrollReveal>
                </HeadlineScroll>

                {/* Italian subtitle */}
                <ScrollReveal direction="up" delay={800}>
                  <p className="font-serif text-lg italic text-gold/90 mb-8">
                    Un luogo di armonia
                  </p>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal direction="up" delay={900}>
                  <p className="text-base lg:text-lg leading-relaxed mb-10 font-light text-smoke/85">
                    Das Bonfini – ein Ort der Harmonie. In der Übertreibung liegt bekanntermaßen 
                    das beste Verständnis. Wir aber bleiben bescheiden und dürfen behaupten, dass 
                    guter Geschmack sich bei uns nicht nur auf dem Teller oder im Weinglas wiederfindet. 
                    Kommen Sie doch einfach rein!
                  </p>
                </ScrollReveal>

                {/* CTA Button */}
                <ScrollReveal direction="up" delay={1000}>
                  <a
                    href="#gallery"
                    className="group inline-flex items-center gap-3 transition-all duration-300"
                  >
                    <span className="text-sm tracking-wide uppercase font-medium text-smoke">
                      Atmosphäre entdecken
                    </span>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full border border-smoke/30 bg-smoke/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-smoke/10">
                      <ArrowRight className="w-4 h-4 text-smoke transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </ScrollReveal>

                {/* Decorative line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-24 rounded-full bg-mahogany hidden lg:block" />
              </div>
            </ScrollReveal>
          </ParallaxElement>

          {/* Floating quote element */}
          <ScrollReveal direction="scale" delay={700} className="hidden lg:block absolute top-8 left-[60%] z-30">
            <div className="px-6 py-4 rounded-sm shadow-lg backdrop-blur-sm bg-white/95">
              <p className="font-serif text-sm italic text-mahogany">
                &ldquo;Dove il buon gusto incontra l&apos;armonia&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
