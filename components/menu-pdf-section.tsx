"use client"

import { useRef } from "react"
import { FileText, Download, ExternalLink } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const menuCards = [
  {
    id: 1,
    title: "Speisekarte",
    subtitle: "La Carta",
    description: "Entdecken Sie unsere Auswahl an authentischen italienischen Gerichten, von traditionellen Antipasti bis zu raffinierten Hauptspeisen.",
    icon: FileText,
  },
  {
    id: 2,
    title: "Weinkarte",
    subtitle: "I Vini",
    description: "Eine sorgfältig kuratierte Sammlung italienischer Weine aus den besten Weinregionen, perfekt abgestimmt auf unsere Küche.",
    icon: FileText,
  },
  {
    id: 3,
    title: "Mittagskarte",
    subtitle: "Pranzo",
    description: "Genießen Sie unser exklusives Mittagsangebot mit ausgewählten Gerichten für die perfekte Pause.",
    icon: FileText,
  },
]

export function MenuPdfSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="speisekarte"
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#f5f3f4" }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(192, 192, 192, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(245, 245, 245, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(220, 220, 220, 0.2) 0%, transparent 70%)
            `,
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(128, 0, 32, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128, 0, 32, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "#800020" }}
      />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "#c0c0c0" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px" style={{ backgroundColor: "#800020" }} />
              <div
                className="w-2 h-2 rotate-45"
                style={{ backgroundColor: "#800020" }}
              />
              <div className="w-12 h-px" style={{ backgroundColor: "#800020" }} />
            </div>

            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4"
              style={{ color: "#1a1a1a" }}
            >
              Unsere Speisekarten
            </h2>
            <p
              className="font-serif text-xl md:text-2xl italic"
              style={{ color: "#800020" }}
            >
              im PDF-Format
            </p>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {menuCards.map((card, index) => (
            <div
              key={card.id}
              className={`transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div
                className="group relative bg-white rounded-sm p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2"
                style={{
                  border: "1px solid rgba(128, 0, 32, 0.15)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(128, 0, 32, 0.12)"
                  e.currentTarget.style.borderColor = "rgba(128, 0, 32, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.04)"
                  e.currentTarget.style.borderColor = "rgba(128, 0, 32, 0.15)"
                }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, transparent 50%, rgba(128, 0, 32, 0.05) 50%)",
                  }}
                />

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: "rgba(128, 0, 32, 0.05)",
                      border: "1px solid rgba(128, 0, 32, 0.1)",
                    }}
                  >
                    <card.icon
                      className="w-7 h-7 transition-colors duration-300"
                      style={{ color: "#800020" }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-2xl mb-1"
                  style={{ color: "#1a1a1a" }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-serif text-sm italic mb-4"
                  style={{ color: "#800020" }}
                >
                  {card.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-8 flex-grow"
                  style={{ color: "#666666" }}
                >
                  {card.description}
                </p>

                {/* Button */}
                <button
                  className="group/btn flex items-center gap-3 px-6 py-3 rounded-sm text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(128, 0, 32, 0.3)",
                    color: "#800020",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#800020"
                    e.currentTarget.style.color = "#ffffff"
                    e.currentTarget.style.borderColor = "#800020"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "#800020"
                    e.currentTarget.style.borderColor = "rgba(128, 0, 32, 0.3)"
                  }}
                >
                  <Download className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                  <span>PDF öffnen</span>
                  <ExternalLink className="w-3 h-3 opacity-0 -ml-2 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:ml-0" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div
          className={`flex items-center justify-center mt-16 transition-all duration-1000 delay-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ backgroundColor: "rgba(128, 0, 32, 0.3)" }} />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#800020" }}
            />
            <div className="w-8 h-px" style={{ backgroundColor: "rgba(128, 0, 32, 0.3)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
