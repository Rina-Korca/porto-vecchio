"use client"

import { useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export function RestaurantSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="restaurant"
      className="relative py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: "#f8f7f5" }}
    >
      {/* Decorative background elements */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: "rgba(128, 0, 32, 0.08)" }}
      />
      <div 
        className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "rgba(128, 0, 32, 0.06)" }}
      />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="relative">
          {/* Layered Image Grid */}
          <div className="relative lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start">
            
            {/* Large Main Image */}
            <div 
              className={`lg:col-span-7 relative z-10 transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src="/images/gallery-interior-1.jpg"
                  alt="Bonfini Restaurant Interior"
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Decorative frame accent */}
              <div 
                className="absolute -bottom-4 -right-4 w-32 h-32 border-2 rounded-sm -z-10"
                style={{ borderColor: "rgba(128, 0, 32, 0.3)" }}
              />
            </div>

            {/* Two Smaller Images - Stacked on Right */}
            <div className="lg:col-span-5 mt-8 lg:mt-24 space-y-6">
              {/* Upper small image */}
              <div 
                className={`relative transition-all duration-1000 delay-200 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm shadow-xl">
                  <Image
                    src="/images/interior-detail.jpg"
                    alt="Restaurant Ambiance Detail"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Lower small image */}
              <div 
                className={`relative transition-all duration-1000 delay-400 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm shadow-xl">
                  <Image
                    src="/images/gallery-interior-2.jpg"
                    alt="Restaurant Bar Area"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dark Burgundy Text Card - Overlapping */}
          <div 
            className={`relative lg:absolute lg:bottom-16 lg:right-0 lg:w-[55%] xl:w-[50%] mt-8 lg:mt-0 z-20 transition-all duration-1000 delay-500 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div 
              className="relative p-10 lg:p-14 rounded-sm shadow-2xl"
              style={{ backgroundColor: "#2d0a0a" }}
            >
              {/* Decorative corner accents */}
              <div 
                className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2"
                style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
              />
              <div 
                className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2"
                style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
              />

              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-8 h-px"
                  style={{ backgroundColor: "#c9a050" }}
                />
                <span 
                  className="text-xs tracking-[0.25em] uppercase font-light"
                  style={{ color: "#c9a050" }}
                >
                  Atmosphäre
                </span>
              </div>

              {/* Heading */}
              <h2 
                className="font-serif text-4xl lg:text-5xl mb-4"
                style={{ color: "#f5f3f4" }}
              >
                Das Restaurant
              </h2>

              {/* Italian subtitle */}
              <p 
                className="font-serif text-lg italic mb-8"
                style={{ color: "rgba(201, 160, 80, 0.9)" }}
              >
                Un luogo di armonia
              </p>

              {/* Description */}
              <p 
                className="text-base lg:text-lg leading-relaxed mb-10 font-light"
                style={{ color: "rgba(245, 243, 244, 0.85)" }}
              >
                Das Bonfini – ein Ort der Harmonie. In der Übertreibung liegt bekanntermaßen 
                das beste Verständnis. Wir aber bleiben bescheiden und dürfen behaupten, dass 
                guter Geschmack sich bei uns nicht nur auf dem Teller oder im Weinglas wiederfindet. 
                Kommen Sie doch einfach rein!
              </p>

              {/* CTA Button */}
              <a
                href="#gallery"
                className="group inline-flex items-center gap-3 transition-all duration-300"
              >
                <span 
                  className="text-sm tracking-wide uppercase font-medium"
                  style={{ color: "#f5f3f4" }}
                >
                  Atmosphäre entdecken
                </span>
                <span 
                  className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    borderColor: "rgba(245, 243, 244, 0.3)",
                    backgroundColor: "rgba(245, 243, 244, 0.05)"
                  }}
                >
                  <ArrowRight 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" 
                    style={{ color: "#f5f3f4" }}
                  />
                </span>
              </a>

              {/* Decorative line */}
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-24 rounded-full hidden lg:block"
                style={{ backgroundColor: "#800020" }}
              />
            </div>
          </div>

          {/* Floating quote element */}
          <div 
            className={`hidden lg:block absolute top-8 left-[60%] z-30 transition-all duration-1000 delay-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <div 
              className="px-6 py-4 rounded-sm shadow-lg backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <p 
                className="font-serif text-sm italic"
                style={{ color: "#800020" }}
              >
                &ldquo;Dove il buon gusto incontra l&apos;armonia&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
