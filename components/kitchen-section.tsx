"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"

const features = [
  {
    title: "Italienische Seele",
    description: "Authentische Rezepte aus den Regionen Italiens",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Frische Produkte",
    description: "Täglich ausgewählte Zutaten höchster Qualität",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Kunst & Erfahrung",
    description: "Jahrzehnte kulinarischer Meisterschaft",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Raffinierte Umsetzung",
    description: "Perfektion in jedem Detail",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
]

export function KitchenSection() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect()
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
        setParallaxOffset(clampedProgress * 50 - 25)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="kitchen"
      className="relative py-24 md:py-32 bg-[#f5f3f4] overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Sticky Image */}
          <div
            ref={imageContainerRef}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="relative">
              {/* Main Image */}
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl transition-all duration-1000 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Image
                  src="/images/chef-cooking.jpg"
                  alt="Koch bei der Zubereitung eines italienischen Gerichts"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out"
                  style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 via-transparent to-transparent" />
              </div>

              {/* Decorative frame */}
              <div
                className={`absolute -bottom-4 -right-4 w-full h-full border-2 border-[#722f37]/30 rounded-sm -z-10 transition-all duration-1000 delay-300 ${
                  isInView ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Floating accent card */}
              <div
                className={`absolute -bottom-6 -left-6 bg-white p-4 shadow-lg rounded-sm transition-all duration-700 delay-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-[#722f37] font-serif text-lg italic">
                  &ldquo;La cucina è arte&rdquo;
                </p>
                <p className="text-[#4a4a4a] text-sm mt-1">
                  Die Küche ist Kunst
                </p>
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="lg:py-12">
            {/* Section Label */}
            <div
              className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="w-12 h-px bg-[#722f37]" />
              <span className="text-[#722f37] text-sm tracking-[0.2em] uppercase font-medium">
                Kulinarische Exzellenz
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 transition-all duration-700 delay-100 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Unsere Küche
            </h2>

            {/* Italian Subtitle */}
            <p
              className={`font-serif text-xl md:text-2xl text-[#722f37] italic mb-8 transition-all duration-700 delay-200 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              l&apos;anima della nostra ospitalità
            </p>

            {/* Main Text */}
            <div
              className={`space-y-6 mb-12 transition-all duration-700 delay-300 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-[#4a4a4a] text-lg leading-relaxed">
                Die Seele unserer Gastfreundschaft. Ursprung eines leidenschaftlichen 
                Schaffensprozesses, der Kunst und Erfahrung verbindet. Zwei Begrifflichkeiten, 
                die sofort aufhorchen lassen und in Bonfini&apos;s Küche raffiniert umgesetzt werden.
              </p>
              <p className="text-[#1a1a1a] text-xl font-medium">
                Unser Anspruch: dass Sie mehr bekommen, als Sie erwarten.
              </p>
            </div>

            {/* Decorative Divider */}
            <div
              className={`flex items-center gap-4 mb-12 transition-all duration-700 delay-400 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex-1 h-px bg-gradient-to-r from-[#722f37]/40 to-transparent" />
              <div className="w-2 h-2 rotate-45 bg-[#722f37]/40" />
              <div className="flex-1 h-px bg-gradient-to-l from-[#722f37]/40 to-transparent" />
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group p-5 bg-white/80 backdrop-blur-sm border border-[#e5e5e5] rounded-sm hover:border-[#722f37]/30 hover:shadow-lg transition-all duration-500 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#722f37]/10 text-[#722f37] rounded-sm group-hover:bg-[#722f37] group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1a1a1a] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#6b6b6b]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#722f37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#722f37]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
