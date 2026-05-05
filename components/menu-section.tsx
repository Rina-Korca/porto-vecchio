"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { companyInfo } from "@/lib/company-info"
import { MENU_PDF_HREF } from "@/lib/menu"
import { FileText, Download } from "lucide-react"

export function MenuSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <section id="speisekarte" ref={ref} className="py-24 md:py-32 bg-carbon text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={cn(
              "inline-block text-strawberry uppercase tracking-[0.3em] text-sm mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Speisekarte
          </span>
          <h2
            className={cn(
              "font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Entdecken Sie unsere{" "}
            <span className="text-strawberry">vollständige Karte</span>
          </h2>
          <p
            className={cn(
              "text-white/70 text-lg md:text-xl leading-relaxed mb-12 transition-all duration-700 delay-400",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Von authentischen Antipasti über hausgemachte Pasta bis hin zu
            erlesenen Dolci. Laden Sie unsere aktuelle Speisekarte herunter und
            lassen Sie sich inspirieren.
          </p>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <a
              href={companyInfo.menuHref}
              className="magnetic-btn inline-flex items-center justify-center gap-3 bg-mahogany text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded"
            >
              <FileText className="w-5 h-5" />
              Speisekarte ansehen
            </a>
            <a
              href={MENU_PDF_HREF}
              download
              className="magnetic-btn inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/10 transition-colors rounded"
            >
              <Download className="w-5 h-5" />
              PDF herunterladen
            </a>
          </div>

          {/* Menu Categories */}
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-700 delay-800",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {["Antipasti", "Primi Piatti", "Secondi", "Dolci"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
                >
                  <p className="font-serif text-xl text-white">{category}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
