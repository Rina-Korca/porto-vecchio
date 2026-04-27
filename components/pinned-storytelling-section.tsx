"use client"

import { useEffect, useRef, useState } from "react"
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
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }

          const rect = sectionRef.current.getBoundingClientRect()
          const sectionHeight = sectionRef.current.offsetHeight
          const windowHeight = window.innerHeight

          // Check if section is in view
          const inView = rect.top < windowHeight && rect.bottom > 0
          setIsInView(inView)

          if (!inView) {
            ticking = false
            return
          }

          // Calculate progress through the section (0 to 1)
          const scrollStart = rect.top
          const scrollEnd = rect.bottom - windowHeight
          const totalScroll = sectionHeight - windowHeight
          const currentScroll = -scrollStart
          const progress = Math.max(0, Math.min(1, currentScroll / totalScroll))

          setScrollProgress(progress)

          // Determine active step based on progress (scale to fit steps properly)
          const adjustedProgress = progress * 0.95 // Leave room at end to see last step fully
          const stepIndex = Math.min(
            storySteps.length - 1,
            Math.floor(adjustedProgress * storySteps.length)
          )
          setActiveStep(stepIndex)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate individual step progress for smoother transitions
  const getStepProgress = (index: number) => {
    const stepSize = 1 / storySteps.length
    const stepStart = index * stepSize
    const stepEnd = (index + 1) * stepSize
    const relativeProgress = (scrollProgress - stepStart) / stepSize
    return Math.max(0, Math.min(1, relativeProgress))
  }

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
            {storySteps.map((step, index) => (
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
    <section
      ref={sectionRef}
      className="relative bg-smoke"
      style={{ height: `${(storySteps.length + 0.5) * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex">
          {/* Left Side - Sticky Image */}
          <div className="w-1/2 h-full relative overflow-hidden">
            {/* All images stacked, with opacity transitions */}
            {storySteps.map((step, index) => {
              const isActive = index === activeStep
              const stepProgress = getStepProgress(index)
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scale(${1 + stepProgress * 0.08})`,
                      transition: "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                    }}
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-smoke/30" />
                </div>
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
              <div className="text-white/90 font-serif text-sm tracking-widest">
                {storySteps[activeStep].label} / 0{storySteps.length}
              </div>
            </div>
          </div>

          {/* Right Side - Scrolling Text Content */}
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

            {/* Text steps */}
            <div className="relative w-full max-w-lg px-12">
              {storySteps.map((step, index) => {
                const isActive = index === activeStep
                const isPast = index < activeStep
                const isFuture = index > activeStep
                
                return (
                  <div
                    key={step.id}
                    className={cn(
                      "absolute inset-0 flex flex-col justify-center transition-all duration-700",
                      isActive && "opacity-100 translate-y-0",
                      isPast && "opacity-0 -translate-y-16 pointer-events-none",
                      isFuture && "opacity-0 translate-y-16 pointer-events-none"
                    )}
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
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
                            "w-2 h-2 rounded-full transition-all duration-300",
                            dotIndex === index
                              ? "bg-garnet w-8"
                              : "bg-silver/50"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Scroll hint at bottom */}
            <div 
              className={cn(
                "absolute bottom-12 left-1/2 -translate-x-1/2 transition-opacity duration-500",
                scrollProgress > 0.9 ? "opacity-0" : "opacity-100"
              )}
            >
              <div className="flex flex-col items-center gap-2 text-carbon/40">
                <span className="text-xs uppercase tracking-widest">Weiter scrollen</span>
                <div className="w-px h-8 bg-gradient-to-b from-carbon/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-silver/20">
          <div
            className="h-full bg-garnet transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
