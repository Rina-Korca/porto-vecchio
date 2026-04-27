"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface StoryStep {
  id: string
  label: string
  title: string
  subtitle?: string
  description: string
  image: string
}

const storySteps: StoryStep[] = [
  {
    id: "philosophy",
    label: "01",
    title: "Unsere Philosophie",
    subtitle: "La nostra filosofia",
    description:
      "Im Bonfini glauben wir, dass großartiges Essen mehr ist als Nahrung – es ist eine Kunstform, ein Moment der Verbindung, ein Erlebnis für alle Sinne. Jedes Gericht erzählt eine Geschichte von Tradition, Leidenschaft und der tiefen Liebe zur italienischen Küche.",
    image: "/images/chef-cooking.jpg",
  },
  {
    id: "ingredients",
    label: "02",
    title: "Beste Zutaten",
    subtitle: "I migliori ingredienti",
    description:
      "Wir beziehen unsere Produkte direkt von ausgewählten italienischen Erzeugern und regionalen Lieferanten. Frische Pasta wird täglich von Hand gefertigt, Olivenöl aus der Toskana, Käse aus dem Piemont – nur das Beste findet den Weg in unsere Küche.",
    image: "/images/gallery-dish-1.jpg",
  },
  {
    id: "experience",
    label: "03",
    title: "Das Erlebnis",
    subtitle: "L'esperienza",
    description:
      "Ein Besuch im Bonfini ist mehr als ein Abendessen. Es ist ein Eintauchen in italienische Gastfreundschaft, ein Verwöhnen aller Sinne in elegantem Ambiente, und die Gewissheit, dass Sie bei uns mehr bekommen, als Sie erwarten.",
    image: "/images/interior.jpg",
  },
]

export function PinnedStorytellingSection() {
  // Ref for the outer 300vh wrapper (this is the scroll target)
  const targetRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Framer Motion useScroll - tracks scroll progress through the target element
  // offset: ["start start", "end end"] means:
  // - progress = 0 when top of target hits top of viewport
  // - progress = 1 when bottom of target hits bottom of viewport
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Convert scrollYProgress (0-1) to active slide index (0, 1, or 2)
  // 0.00 - 0.33 = slide 0
  // 0.33 - 0.66 = slide 1
  // 0.66 - 1.00 = slide 2
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(latest)
      
      // Calculate which slide we're on
      // 0.00-0.33 = slide 0, 0.33-0.66 = slide 1, 0.66-1.00 = slide 2
      const totalSlides = storySteps.length
      const slideIndex = Math.min(
        totalSlides - 1,
        Math.floor(latest * totalSlides)
      )
      setActiveStep(slideIndex)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    // Simplified mobile layout without sticky behavior
    return (
      <section className="py-20 bg-smoke">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-garnet font-serif italic text-lg">La nostra storia</span>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mt-2">
              Drei Säulen
            </h2>
            <div className="w-16 h-px bg-garnet mx-auto mt-6" />
          </div>

          {/* Mobile Steps */}
          <div className="space-y-16">
            {storySteps.map((step) => (
              <div key={step.id} className="space-y-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-garnet text-white px-3 py-1 font-serif text-sm">
                    {step.label}
                  </div>
                </div>
                <div>
                  <span className="text-garnet font-serif italic text-sm">{step.subtitle}</span>
                  <h3 className="font-serif text-2xl text-carbon mt-1">{step.title}</h3>
                  <p className="text-carbon/70 leading-relaxed mt-4">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    // OUTER WRAPPER: 300vh tall, position relative
    // This creates the scrollable area that triggers the pinned effect
    <section
      ref={targetRef}
      className="relative bg-smoke"
      style={{ 
        height: "300vh",
        // DEBUG: Uncomment to see the outer wrapper bounds
        // outline: "4px solid red",
      }}
    >
      {/* STICKY VIEWPORT: position sticky, top 0, height 100vh */}
      {/* This stays fixed in the viewport while user scrolls through the 300vh wrapper */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          // DEBUG: Uncomment to see the sticky viewport bounds
          // outline: "4px solid blue",
        }}
      >
        <div className="h-full flex">
          {/* Left Side - Image */}
          <div className="w-1/2 h-full relative overflow-hidden">
            {/* All images stacked, with opacity transitions */}
            {storySteps.map((step, index) => {
              const isActive = index === activeStep
              
              return (
                <motion.div
                  key={step.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1.02 : 1,
                  }}
                  transition={{
                    opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-smoke/30" />
                </motion.div>
              )
            })}

            {/* Step indicator on image */}
            <div className="absolute bottom-12 left-12 z-10">
              <div className="flex items-center gap-3">
                {storySteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      index === activeStep 
                        ? "w-12 bg-white" 
                        : index < activeStep 
                          ? "w-6 bg-white/60"
                          : "w-6 bg-white/30"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Current step number overlay */}
            <div className="absolute top-12 left-12 z-10">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white/90 font-serif text-sm tracking-widest"
              >
                {storySteps[activeStep].label} / 0{storySteps.length}
              </motion.div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="w-1/2 h-full flex items-center justify-center relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-garnet/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-silver/20 rounded-full blur-2xl" />
            </div>

            {/* Section title - always visible */}
            <div className="absolute top-12 right-12">
              <span className="text-garnet font-serif italic text-sm">La nostra storia</span>
            </div>

            {/* Text steps - using AnimatePresence for smooth transitions */}
            <div className="relative w-full max-w-lg px-12 h-[60vh] flex items-center">
              {storySteps.map((step, index) => {
                const isActive = index === activeStep
                
                return (
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 flex flex-col justify-center px-12"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : index < activeStep ? -40 : 40,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Step label */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-garnet font-serif text-5xl font-light">
                        {step.label}
                      </span>
                      <div className="h-px flex-1 bg-garnet/30" />
                    </div>

                    {/* Italian subtitle */}
                    <span className="text-garnet font-serif italic text-lg mb-2">
                      {step.subtitle}
                    </span>

                    {/* Main title */}
                    <h3 className="font-serif text-4xl xl:text-5xl text-carbon mb-6 leading-tight">
                      {step.title}
                    </h3>

                    {/* Decorative line */}
                    <div className="w-16 h-px bg-garnet mb-6" />

                    {/* Description */}
                    <p className="text-carbon/70 text-lg leading-relaxed">
                      {step.description}
                    </p>

                    {/* Navigation dots */}
                    <div className="flex gap-3 mt-10">
                      {storySteps.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            dotIndex === index
                              ? "bg-garnet w-8"
                              : "bg-silver/50 w-2"
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Scroll hint at bottom */}
            <motion.div 
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              animate={{ opacity: progress > 0.9 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-2 text-carbon/40">
                <span className="text-xs uppercase tracking-widest">Weiter scrollen</span>
                <motion.div 
                  className="w-px h-8 bg-gradient-to-b from-carbon/20 to-transparent"
                  animate={{ scaleY: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-silver/20">
          <motion.div
            className="h-full bg-garnet origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  )
}
