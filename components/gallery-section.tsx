"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { X } from "lucide-react"

const galleryImages = [
  { src: "/images/gallery-interior-1.jpg", alt: "Restaurant Interieur", category: "interieur" },
  { src: "/images/gallery-dish-1.jpg", alt: "Gericht", category: "gerichte" },
  { src: "/images/gallery-wine.jpg", alt: "Weinkeller", category: "wein" },
  { src: "/images/gallery-terrace.jpg", alt: "Terrasse", category: "terrasse" },
  { src: "/images/gallery-dish-2.jpg", alt: "Pasta Gericht", category: "gerichte" },
  { src: "/images/gallery-exterior.jpg", alt: "Aussenansicht", category: "exterior" },
  { src: "/images/gallery-interior-2.jpg", alt: "Bar Bereich", category: "interieur" },
  { src: "/images/gallery-dish-3.jpg", alt: "Dessert", category: "gerichte" },
]

const categories = [
  { id: "alle", label: "Alle" },
  { id: "interieur", label: "Interieur" },
  { id: "gerichte", label: "Gerichte" },
  { id: "wein", label: "Wein" },
  { id: "terrasse", label: "Terrasse" },
]

export function GallerySection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState("alle")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredImages =
    activeCategory === "alle"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <section id="galerie" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className={cn(
              "inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Galerie
          </span>
          <h2
            className={cn(
              "font-serif text-4xl md:text-5xl text-carbon mb-6 leading-tight transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Einblicke in unser <span className="text-mahogany">Ristorante</span>
          </h2>
          <div className="thin-divider w-24 mx-auto" />
        </div>

        {/* Category Filter */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-400",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-2 text-sm uppercase tracking-wider transition-all rounded-full",
                activeCategory === cat.id
                  ? "bg-mahogany text-white"
                  : "bg-smoke text-carbon hover:bg-silver"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.src}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden cursor-pointer group transition-all duration-700",
                isInView
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: `${500 + index * 50}ms` }}
              onClick={() => setLightboxImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-serif text-lg">
                  Ansehen
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-carbon/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-strawberry transition-colors"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
