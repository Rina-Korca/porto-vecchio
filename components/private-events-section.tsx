"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { Building2, Users, MessageCircle, Sparkles, ArrowRight } from "lucide-react"
import { companyInfo } from "@/lib/company-info"

const features = [
  {
    icon: Building2,
    title: "Zwei Etagen",
    description: "Großzügige Räumlichkeiten auf zwei Ebenen"
  },
  {
    icon: Users,
    title: "Bis ca. 60 Personen",
    description: "Perfekt für größere Gruppen und Feiern"
  },
  {
    icon: MessageCircle,
    title: "Persönliche Beratung",
    description: "Individuelle Planung Ihrer Veranstaltung"
  },
  {
    icon: Sparkles,
    title: "Italienisches Ambiente",
    description: "Authentische Atmosphäre für besondere Anlässe"
  }
]

export function PrivateEventsSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })
  const [imageRevealed, setImageRevealed] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setImageRevealed(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="veranstaltungen"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#f5f3f4" }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 100% 50%, rgba(128, 0, 32, 0.08), transparent 70%)"
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image with reveal animation */}
          <div 
            className={`relative transition-all duration-1000 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Image container with reveal mask */}
            <div className="relative overflow-hidden rounded-sm shadow-2xl">
              {/* Reveal mask */}
              <div 
                className="absolute inset-0 z-10 transition-transform duration-1000 ease-out"
                style={{
                  backgroundColor: "#800020",
                  transform: imageRevealed ? "translateX(100%)" : "translateX(0)"
                }}
              />
              
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/interier/O-1.jpg"
                  alt="Oberer Gastraum des Bonfini fuer private Veranstaltungen"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative frame */}
              <div className="absolute inset-4 border border-white/30 pointer-events-none" />
            </div>

            {/* Floating accent card */}
            <div 
              className={`absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 shadow-xl transition-all duration-700 delay-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ maxWidth: "220px" }}
            >
              <div 
                className="w-10 h-0.5 mb-3"
                style={{ backgroundColor: "#800020" }}
              />
              <p 
                className="font-serif italic text-sm"
                style={{ color: "#800020" }}
              >
                &ldquo;Il vostro evento, la nostra passione&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ihre Veranstaltung, unsere Leidenschaft
              </p>
            </div>

            {/* Decorative element */}
            <div 
              className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 opacity-30"
              style={{ borderColor: "#800020" }}
            />
          </div>

          {/* Right: Content */}
          <div className="lg:pl-8">
            {/* Label */}
            <div 
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div 
                className="w-8 h-0.5"
                style={{ backgroundColor: "#800020" }}
              />
              <span 
                className="text-sm tracking-widest uppercase"
                style={{ color: "#800020" }}
              >
                Exklusive Räumlichkeiten
              </span>
            </div>

            {/* Heading */}
            <h2 
              className={`font-serif text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-700 delay-100 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ color: "#1a1a1a" }}
            >
              Feiern &<br />
              <span style={{ color: "#800020" }}>Veranstaltungen</span>
            </h2>

            {/* Description */}
            <p 
              className={`text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ color: "#4a4a4a" }}
            >
              Wir bieten Ihnen Platz auf zwei Etagen. Die obere Etage können Sie auch gerne für Gruppen und Veranstaltungen bis ca. 60 Personen mieten. Sprechen Sie uns einfach darauf an.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group p-4 bg-white rounded-sm border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ 
                    borderColor: "#e5e5e5",
                    transitionDelay: `${300 + index * 100}ms`
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors group-hover:bg-opacity-100"
                    style={{ backgroundColor: "rgba(128, 0, 32, 0.1)" }}
                  >
                    <feature.icon 
                      className="w-5 h-5 transition-colors"
                      style={{ color: "#800020" }}
                    />
                  </div>
                  <h3 
                    className="font-medium text-sm mb-1"
                    style={{ color: "#1a1a1a" }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-xs leading-relaxed"
                    style={{ color: "#6a6a6a" }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div 
              className={`transition-all duration-700 delay-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href="#reservierung"
                className="group inline-flex items-center gap-3 px-8 py-4 text-white font-medium tracking-wide transition-all duration-300 hover:gap-5"
                style={{ backgroundColor: "#800020" }}
              >
                <span>Veranstaltung anfragen</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              {/* Additional contact hint */}
              <p 
                className="mt-4 text-sm"
                style={{ color: "#6a6a6a" }}
              >
                Oder rufen Sie uns direkt an:{" "}
                <a 
                  href={companyInfo.phoneHref}
                  className="underline underline-offset-2 transition-colors hover:no-underline"
                  style={{ color: "#800020" }}
                >
                  {companyInfo.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ 
          background: "linear-gradient(90deg, transparent, rgba(128, 0, 32, 0.2), transparent)" 
        }}
      />
    </section>
  )
}
