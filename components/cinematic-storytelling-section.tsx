"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

const storyBlocks = [
  {
    number: "01",
    subtitle: "La nostra filosofia",
    headline: "Unsere Philosophie",
    paragraph:
      "Im Bonfini glauben wir, dass großartiges Essen mehr ist als Nahrung – es ist eine Kunstform, ein Moment der Verbindung, ein Erlebnis für alle Sinne. Jedes Gericht erzählt eine Geschichte von Tradition, Leidenschaft und der tiefen Liebe zur italienischen Küche.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Chef preparing a dish with passion and precision",
  },
  {
    number: "02",
    subtitle: "I migliori ingredienti",
    headline: "Beste Zutaten",
    paragraph:
      "Wir beziehen unsere Produkte direkt von ausgewählten italienischen Erzeugern und regionalen Lieferanten. Frische Pasta wird täglich von Hand gefertigt, Olivenöl aus der Toskana, Käse aus dem Piemont – nur das Beste findet den Weg in unsere Küche.",
    image: "https://images.unsplash.com/photo-1556269923-e4ef51d69638?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Fresh Italian ingredients beautifully arranged",
  },
  {
    number: "03",
    subtitle: "L'esperienza culinaria",
    headline: "Das Erlebnis",
    paragraph:
      "Von dem Moment an, in dem Sie eintreten, werden Sie Teil unserer Familie. Unser Team widmet sich der Schaffung unvergesslicher Momente – ob ein intimes Abendessen zu zweit oder eine lebhafte Feier mit Freunden.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Elegant restaurant interior with warm ambiance",
  },
  {
    number: "04",
    subtitle: "La tradizione",
    headline: "Tradition & Moderne",
    paragraph:
      "Seit 2008 verbinden wir authentische italienische Rezepte mit zeitgenössischer Kreativität. Jeder Besuch bei uns ist eine Reise durch die kulinarischen Regionen Italiens, interpretiert für den modernen Gaumen.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Traditional Italian dish with modern presentation",
  },
]

interface StoryBlockProps {
  block: (typeof storyBlocks)[0]
  index: number
  isReversed: boolean
}

function StoryBlock({ block, index, isReversed }: StoryBlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" })

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        isReversed && "lg:direction-rtl"
      )}
    >
      {/* Image Column */}
      <motion.div
        className={cn(
          "relative aspect-[4/5] overflow-hidden",
          isReversed ? "lg:order-2 lg:direction-ltr" : "lg:order-1"
        )}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 8, ease: "linear" }}
          viewport={{ once: true }}
        >
          <Image
            src={block.image}
            alt={block.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/20 via-transparent to-transparent" />
        
        {/* Number badge */}
        <motion.div
          className="absolute bottom-6 left-6 font-serif text-6xl text-white/30 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {block.number}
        </motion.div>
      </motion.div>

      {/* Text Column */}
      <div
        className={cn(
          "flex flex-col justify-center py-8 lg:py-16",
          isReversed ? "lg:order-1 lg:direction-ltr lg:pr-8" : "lg:order-2 lg:pl-8"
        )}
      >
        {/* Subtitle */}
        <motion.span
          className="text-mahogany text-sm font-medium tracking-[0.2em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {block.subtitle}
        </motion.span>

        {/* Headline */}
        <motion.h3
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-carbon mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {block.headline}
        </motion.h3>

        {/* Decorative line */}
        <motion.div
          className="w-16 h-px bg-mahogany mb-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Paragraph */}
        <motion.p
          className="text-carbon/70 text-base md:text-lg leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {block.paragraph}
        </motion.p>

        {/* Progress indicator for this block */}
        <motion.div
          className="flex items-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {storyBlocks.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-0.5 rounded-full transition-all duration-500",
                i === index ? "w-8 bg-mahogany" : "w-2 bg-silver/40"
              )}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function CinematicStorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerInView = useInView(sectionRef, { once: true, margin: "-50px" })

  return (
    <section
      ref={sectionRef}
      className="relative bg-smoke py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-mahogany text-xs font-medium tracking-[0.3em] uppercase mb-4 block">
            La nostra storia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-carbon mb-6">
            Unsere Geschichte
          </h2>
          <p className="text-carbon/60 text-lg max-w-2xl mx-auto">
            Eine Reise durch Leidenschaft, Tradition und kulinarische Exzellenz
          </p>
        </motion.div>

        {/* Story Blocks */}
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {storyBlocks.map((block, index) => (
            <StoryBlock
              key={block.number}
              block={block}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-24 md:mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-mahogany/30" />
            <span className="font-serif text-mahogany/50 italic text-sm">Est. 2008</span>
            <div className="w-12 h-px bg-mahogany/30" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
