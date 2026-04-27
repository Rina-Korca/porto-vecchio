"use client"

import { ScrollReveal, ParallaxElement, HeadlineScroll, ImageReveal, StaggeredGrid } from "@/components/scroll-animations"

const features = [
  {
    title: "Italienische Seele",
    description: "Authentische Rezepte aus den Regionen Italiens",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Frische Produkte",
    description: "Täglich ausgewählte Zutaten höchster Qualität",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Kunst & Erfahrung",
    description: "Jahrzehnte kulinarischer Meisterschaft",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Raffinierte Umsetzung",
    description: "Perfektion in jedem Detail",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
]

export function KitchenSection() {
  return (
    <section
      id="kueche"
      className="relative py-24 md:py-32 lg:py-40 bg-smoke overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-40" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Sticky Image with Parallax */}
          <div className="lg:sticky lg:top-32 h-fit">
            <ParallaxElement speed={0.12}>
              <div className="relative">
                {/* Main Image with center expand reveal */}
                <div className="relative aspect-[4/5] shadow-premium-lg overflow-hidden">
                  <ImageReveal
                    src="/images/chef-cooking.jpg"
                    alt="Koch bei der Zubereitung eines italienischen Gerichts"
                    reveal="center"
                    delay={0}
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/25 via-transparent to-transparent pointer-events-none z-10" />
                </div>

                {/* Decorative frame */}
                <ScrollReveal direction="scale" delay={300}>
                  <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-mahogany/20 -z-10" />
                </ScrollReveal>

                {/* Floating accent card */}
                <ScrollReveal direction="up" delay={500}>
                  <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-premium z-10">
                    <p className="text-mahogany font-serif text-lg italic">
                      &ldquo;La cucina è arte&rdquo;
                    </p>
                    <p className="text-carbon/60 text-sm mt-1">
                      Die Küche ist Kunst
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </ParallaxElement>
          </div>

          {/* Right - Text Content with scroll reveals */}
          <div className="lg:py-8">
            {/* Section Label */}
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-center gap-4 mb-8">
                <div className="decorative-line" />
                <span className="text-mahogany text-xs tracking-[0.2em] uppercase font-medium">
                  Kulinarische Exzellenz
                </span>
              </div>
            </ScrollReveal>

            {/* Heading with parallax */}
            <HeadlineScroll speed={0.06}>
              <ScrollReveal direction="up" delay={100}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-carbon mb-6">
                  Unsere Küche
                </h2>
              </ScrollReveal>
            </HeadlineScroll>

            {/* Italian Subtitle */}
            <ScrollReveal direction="up" delay={200}>
              <p className="font-serif text-xl md:text-2xl text-mahogany italic mb-8">
                l&apos;anima della nostra ospitalità
              </p>
            </ScrollReveal>

            {/* Main Text */}
            <ScrollReveal direction="up" delay={300}>
              <div className="space-y-5 mb-12">
                <p className="text-carbon/70 text-base md:text-lg leading-relaxed font-light">
                  Die Seele unserer Gastfreundschaft. Ursprung eines leidenschaftlichen 
                  Schaffensprozesses, der <span className="text-mahogany">Kunst</span> und <span className="text-mahogany">Erfahrung</span> verbindet. Zwei Begrifflichkeiten, 
                  die sofort aufhorchen lassen und in Bonfini&apos;s Küche raffiniert umgesetzt werden.
                </p>
                <p className="text-carbon text-lg md:text-xl font-medium">
                  Unser Anspruch: dass Sie mehr bekommen, als Sie erwarten.
                </p>
              </div>
            </ScrollReveal>

            {/* Decorative Divider */}
            <ScrollReveal direction="scale" delay={400}>
              <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-gradient-to-r from-mahogany/30 to-transparent" />
                <div className="w-1.5 h-1.5 rotate-45 bg-mahogany/40" />
                <div className="flex-1 h-px bg-gradient-to-l from-mahogany/30 to-transparent" />
              </div>
            </ScrollReveal>

            {/* Feature Cards with staggered animation */}
            <StaggeredGrid 
              className="grid sm:grid-cols-2 gap-4"
              staggerDelay={120}
              threshold={0.15}
            >
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-5 bg-white/90 backdrop-blur-sm border border-silver/30 hover:border-mahogany/30 hover:shadow-premium transition-all duration-500 ease-luxury card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-mahogany/10 text-mahogany group-hover:bg-mahogany group-hover:text-white transition-all duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-carbon text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-carbon/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredGrid>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
