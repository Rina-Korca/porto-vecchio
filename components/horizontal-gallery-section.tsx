"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "Alle" },
  { id: "interieur", label: "Interieur" },
  { id: "exterieur", label: "Exterieur" },
  { id: "terrasse", label: "Terrasse" },
  { id: "kueche", label: "Küche" },
  { id: "gerichte", label: "Gerichte" },
  { id: "wein", label: "Wein" },
]

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery-interior-1.jpg",
    alt: "Elegantes Restaurant Interieur",
    category: "interieur",
  },
  {
    id: 2,
    src: "/images/rec-pasta.jpg",
    alt: "Hausgemachte Pasta",
    category: "gerichte",
  },
  {
    id: 3,
    src: "/images/gallery-wine.jpg",
    alt: "Italienische Weine",
    category: "wein",
  },
  {
    id: 4,
    src: "/images/gallery-terrace.jpg",
    alt: "Sommerterrasse",
    category: "terrasse",
  },
  {
    id: 5,
    src: "/images/chef-cooking.jpg",
    alt: "Küche in Aktion",
    category: "kueche",
  },
  {
    id: 6,
    src: "/images/gallery-exterior.jpg",
    alt: "Restaurant Außenansicht",
    category: "exterieur",
  },
  {
    id: 7,
    src: "/images/rec-antipasti.jpg",
    alt: "Frische Antipasti",
    category: "gerichte",
  },
  {
    id: 8,
    src: "/images/gallery-interior-2.jpg",
    alt: "Bar Bereich",
    category: "interieur",
  },
  {
    id: 9,
    src: "/images/rec-wine.jpg",
    alt: "Weinauswahl",
    category: "wein",
  },
  {
    id: 10,
    src: "/images/interior-detail.jpg",
    alt: "Tischdetails",
    category: "interieur",
  },
  {
    id: 11,
    src: "/images/rec-dolci.jpg",
    alt: "Dolci della Casa",
    category: "gerichte",
  },
  {
    id: 12,
    src: "/images/private-dining.jpg",
    alt: "Private Dining",
    category: "interieur",
  },
]

function GalleryCard({
  image,
  index,
  parallaxOffset,
  onClick,
}: {
  image: (typeof galleryImages)[0]
  index: number
  parallaxOffset: number
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative h-full w-[85vw] flex-shrink-0 snap-center px-2 sm:w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw]"
      style={{
        transform: `translateY(${parallaxOffset * (index % 2 === 0 ? 1 : -1) * 0.5}px)`,
        transition: "transform 0.1s linear",
      }}
    >
      <div
        className="group relative h-full cursor-pointer overflow-hidden rounded-sm"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              isHovered ? "scale-110" : "scale-100"
            )}
          />

          {/* Gradient overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-carbon/90 via-mahogany/40 to-transparent transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Always visible subtle gradient at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-carbon/60 to-transparent" />
        </div>

        {/* Hover content */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="mb-4 rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <ZoomIn className="h-6 w-6 text-white" />
          </div>
          <span className="font-serif text-xl text-white tracking-wide">
            {categories.find((c) => c.id === image.category)?.label}
          </span>
        </div>

        {/* Bottom info - always visible */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div
            className={cn(
              "transition-all duration-500",
              isHovered ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            )}
          >
            <span className="text-sm font-medium uppercase tracking-widest text-white/70">
              {categories.find((c) => c.id === image.category)?.label}
            </span>
            <h3 className="mt-1 font-serif text-xl text-white">{image.alt}</h3>
          </div>
        </div>

        {/* Corner accents */}
        <div
          className={cn(
            "absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 transition-all duration-500",
            isHovered ? "border-white/80" : "border-transparent"
          )}
        />
        <div
          className={cn(
            "absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 transition-all duration-500",
            isHovered ? "border-white/80" : "border-transparent"
          )}
        />
        <div
          className={cn(
            "absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 transition-all duration-500",
            isHovered ? "border-white/80" : "border-transparent"
          )}
        />
        <div
          className={cn(
            "absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 transition-all duration-500",
            isHovered ? "border-white/80" : "border-transparent"
          )}
        />

        {/* Index number */}
        <div className="absolute right-6 top-6">
          <span className="font-serif text-5xl font-light text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const currentImage = images[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-carbon/95 backdrop-blur-md" onClick={onClose} />

      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Schließen"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:left-8"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:right-8"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="relative mx-4 max-h-[85vh] max-w-5xl overflow-hidden rounded-sm md:mx-16">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-auto object-contain"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="font-serif text-lg text-white">{currentImage.alt}</p>
          <p className="mt-1 text-sm text-white/70">
            {categories.find((c) => c.id === currentImage.category)?.label} · {currentIndex + 1} /{" "}
            {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export function HorizontalGallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [horizontalScroll, setHorizontalScroll] = useState(0)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1)

  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Check for mobile and track window width
  useEffect(() => {
    const checkMobile = () => {
      setWindowWidth(window.innerWidth)
      setIsMobile(
        window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Vertical to horizontal scroll conversion (desktop only)
  useEffect(() => {
    if (isMobile) return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect()
          const sectionTop = rect.top
          const sectionHeight = section.offsetHeight
          const viewportHeight = window.innerHeight

          // Calculate scroll progress through the section
          const scrollStart = viewportHeight
          const scrollEnd = -sectionHeight + viewportHeight
          const scrollRange = scrollStart - scrollEnd
          const currentScroll = scrollStart - sectionTop
          const progress = Math.max(0, Math.min(1, currentScroll / scrollRange))

          // Calculate horizontal translation
          const trackWidth = track.scrollWidth
          const containerWidth = track.parentElement?.offsetWidth || 0
          const maxScroll = trackWidth - containerWidth

          setHorizontalScroll(progress * maxScroll)
          setParallaxOffset((progress - 0.5) * 30)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    )
  }, [])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))
  }, [])

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className={cn("relative bg-smoke", isMobile ? "py-16" : "h-[100vh]")}
    >
      {/* Sticky container for desktop */}
      <div className={cn(isMobile ? "" : "sticky top-0 h-screen overflow-hidden")}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-smoke via-smoke to-silver/30" />

        {/* Header - Fixed position on desktop */}
        <div
          className={cn(
            "relative z-10 mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8",
            isMobile ? "pb-8" : "pb-6"
          )}
        >
          <div
            className={cn(
              "transition-all duration-1000",
              isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            <span className="mb-4 inline-block font-serif text-sm italic tracking-widest text-mahogany">
              Galleria
            </span>
            <h2 className="font-serif text-4xl leading-tight text-carbon md:text-5xl lg:text-6xl">
              Einblicke ins Bonfini
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-mahogany to-transparent" />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-carbon/70">
              Momente aus Küche, Raum und Gastfreundschaft.
            </p>
          </div>
        </div>

        {/* Gallery Track */}
        {isMobile ? (
          // Mobile: Native horizontal scroll with snap
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto px-4 pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="relative h-[60vh] w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-sm"
                onClick={() => openLightbox(index)}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon/80 to-transparent p-4">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/70">
                    {categories.find((c) => c.id === image.category)?.label}
                  </span>
                  <h3 className="mt-1 font-serif text-lg text-white">{image.alt}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop: Vertical-to-horizontal scroll conversion
          <div className="relative flex h-[calc(100vh-200px)] items-center overflow-hidden">
            {/* Side gradients for depth */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-smoke to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-smoke to-transparent" />

            {/* Horizontal track */}
            <div
              ref={trackRef}
              className="flex h-[75%] items-stretch gap-0 pl-16"
              style={{
                transform: `translateX(-${horizontalScroll}px)`,
                transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
                willChange: "transform",
              }}
            >
              {galleryImages.map((image, index) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  index={index}
                  parallaxOffset={parallaxOffset}
                  onClick={() => openLightbox(index)}
                />
              ))}

              {/* End spacer */}
              <div className="w-32 flex-shrink-0" />
            </div>
          </div>
        )}

        {/* Progress indicator (desktop only) */}
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-carbon/50">Scrollen Sie weiter</span>
              <div className="h-1 w-32 overflow-hidden rounded-full bg-carbon/10">
                <div
                  className="h-full rounded-full bg-mahogany transition-all duration-150"
                  style={{ width: `${(horizontalScroll / ((trackRef.current?.scrollWidth || 1) - windowWidth)) * 100}%` }}
                />
              </div>
              <span className="text-sm text-carbon/50">
                {galleryImages.length} Bilder
              </span>
            </div>
          </div>
        )}

        {/* Scroll hint for mobile */}
        {isMobile && (
          <div className="pb-4 text-center">
            <p className="text-sm text-carbon/50">Wischen Sie für mehr Bilder</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </section>
  )
}
