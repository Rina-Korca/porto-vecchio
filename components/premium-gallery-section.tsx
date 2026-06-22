"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Alle" },
  { id: "interieur", label: "Interieur" },
  { id: "rheinblick", label: "Rheinblick" },
  { id: "kueche", label: "Küche" },
  { id: "gerichte", label: "Gerichte" },
  { id: "feiern", label: "Feiern" },
];

const galleryImages = [
  {
    id: 1,
    src: "/images/porto/gallery-03.jpg",
    alt: "Heller Gastraum im Porto Vecchio",
    category: "interieur",
    size: "large",
  },
  {
    id: 2,
    src: "/images/porto/dining-terrace.jpg",
    alt: "Holzofen-Pizza im Porto Vecchio",
    category: "gerichte",
    size: "small",
  },
  {
    id: 3,
    src: "/images/porto/gallery-02.jpg",
    alt: "Nebenraum mit gedeckten Tischen",
    category: "feiern",
    size: "medium",
  },
  {
    id: 4,
    src: "/images/porto/gallery-09.jpg",
    alt: "Gastraum mit Blick auf den Rhein",
    category: "rheinblick",
    size: "large",
  },
  {
    id: 5,
    src: "/images/porto/restaurant-view.jpg",
    alt: "Vorbereitung eines Fleischgerichts",
    category: "kueche",
    size: "medium",
  },
  {
    id: 6,
    src: "/images/porto/promenade.jpg",
    alt: "Frisches Brot im Porto Vecchio",
    category: "kueche",
    size: "small",
  },
  {
    id: 7,
    src: "/images/porto/gallery-07.jpg",
    alt: "Bar und Innenbereich des Porto Vecchio",
    category: "interieur",
    size: "medium",
  },
  {
    id: 8,
    src: "/images/porto/gallery-01.jpg",
    alt: "Mediterranes Detail im Porto Vecchio",
    category: "interieur",
    size: "small",
  },
  {
    id: 9,
    src: "/images/porto/gallery-11.jpg",
    alt: "Gedeckter Bereich für Gäste",
    category: "feiern",
    size: "large",
  },
  {
    id: 10,
    src: "/images/porto/gallery-04.jpg",
    alt: "Mediterranes Gericht im Porto Vecchio",
    category: "gerichte",
    size: "small",
  },
  {
    id: 11,
    src: "/images/porto/gallery-05.jpg",
    alt: "Gericht aus der italienisch-mediterranen Küche",
    category: "gerichte",
    size: "medium",
  },
  {
    id: 12,
    src: "/images/porto/gallery-12.jpg",
    alt: "Innenbereich für gesellige Abende",
    category: "feiern",
    size: "large",
  },
];

function GalleryImage({
  image,
  index,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  onClick: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setIsRevealed(true), 100 + index * 80);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
    large: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  };

  const heightClasses = {
    small: "h-48 md:h-56",
    medium: "h-64 md:h-[400px]",
    large: "h-72 md:h-[450px]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        sizeClasses[image.size as keyof typeof sizeClasses],
        "group relative cursor-pointer overflow-hidden rounded-sm",
      )}
      onClick={onClick}
    >
      {/* Reveal mask */}
      <div
        className={cn(
          "absolute inset-0 z-20 bg-[#f5f3f4] transition-transform duration-1000 ease-out origin-left",
          isRevealed ? "scale-x-0" : "scale-x-100",
        )}
        style={{ transformOrigin: "right" }}
      />

      {/* Image container */}
      <div
        className={cn(
          heightClasses[image.size as keyof typeof heightClasses],
          "relative w-full overflow-hidden",
          "opacity-0 transition-opacity duration-500",
          isVisible && "opacity-100",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-purple)]/90 via-[var(--stormy-teal)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="mb-3 rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <ZoomIn className="h-6 w-6 text-white" />
          </div>
          <span className="font-serif text-lg text-white tracking-wide">
            {categories.find((c) => c.id === image.category)?.label}
          </span>
          <span className="mt-1 text-sm text-white/80">{image.alt}</span>
        </div>

        {/* Corner accents */}
        <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-white/0 transition-all duration-500 group-hover:border-white/60" />
        <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-white/0 transition-all duration-500 group-hover:border-white/60" />
        <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/0 transition-all duration-500 group-hover:border-white/60" />
        <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/0 transition-all duration-500 group-hover:border-white/60" />
      </div>
    </div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a1a1a]/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Schließen"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation */}
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

      {/* Image */}
      <div className="relative mx-4 max-h-[85vh] max-w-5xl overflow-hidden rounded-sm md:mx-16">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-auto object-contain"
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="font-serif text-lg text-white">{currentImage.alt}</p>
          <p className="mt-1 text-sm text-white/70">
            {categories.find((c) => c.id === currentImage.category)?.label} ·{" "}
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PremiumGallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : null,
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null,
    );
  }, [filteredImages.length]);

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="relative overflow-hidden bg-[#f5f3f4] py-24 md:py-32"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #c0c0c0 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-[var(--stormy-teal)]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-[var(--deep-purple)]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            className={cn(
              "transition-all duration-1000",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            )}
          >
            <span className="mb-4 inline-block font-serif text-sm italic tracking-widest text-mahogany">
              Galleria
            </span>
            <h2 className="font-serif text-4xl leading-tight text-carbon md:text-5xl lg:text-6xl">
              Einblicke ins Porto Vecchio
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-mahogany to-transparent" />
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-carbon/70">
              Momente aus Küche, Gastraum und Gastfreundschaft am Rhein.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className={cn(
            "mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3",
            "transition-all delay-200 duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300",
                "rounded-full border",
                activeCategory === category.id
                  ? "border-mahogany bg-mahogany text-white"
                  : "border-dust bg-white text-carbon/70 hover:border-mahogany/50 hover:text-mahogany",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div
          className={cn(
            "grid auto-rows-auto grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
            "transition-all delay-300 duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          {filteredImages.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* View more hint */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#6a6a6a]">
            Klicken Sie auf ein Bild für die Vollansicht
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </section>
  );
}
