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
          src="https://www.google.com/maps?q=Chausseestra%C3%9Fe%2015%2C%2010115%20Berlin%2C%20Germany&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ristorante Bonfini Location"
        />
      </div>
      {/* Overlay with info */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-white rounded-xl p-6 md:p-8 shadow-2xl max-w-sm z-10">
        <img
          src="/images/logo/logo-red.png"
          alt="Bonfini"
          className="mb-4 h-auto w-40 object-contain"
          loading="lazy"
          decoding="async"
        />
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
