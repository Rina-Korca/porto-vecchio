"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { companyInfo } from "@/lib/company-info"

export function MapSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative h-[500px] w-full">
      <div
        className={cn(
          "absolute inset-0 transition-all duration-1000",
          isInView ? "opacity-100" : "opacity-0"
        )}
      >
        <iframe
          src="https://www.google.com/maps?q=Porto%20Vecchio%20Im%20Hafenbecken%2011%2067346%20Speyer&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Porto Vecchio Location"
        />
      </div>
      {/* Overlay with info */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-white rounded-xl p-6 md:p-8 shadow-2xl max-w-sm z-10">
        <span className="block mb-4 font-serif text-xl text-carbon">Porto Vecchio</span>
        <p className="text-muted-foreground mb-4">
          {companyInfo.addressLine1}
          <br />
          {companyInfo.addressLine2}
          <br />
          {companyInfo.country}
        </p>
        <a
          href={companyInfo.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn inline-block bg-mahogany text-white px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded"
        >
          Route planen
        </a>
      </div>
    </section>
  )
}
