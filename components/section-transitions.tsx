"use client"

import { useEffect, useRef, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  id?: string
  // Background colors
  bgColor?: "smoke" | "cream" | "carbon" | "white" | "transparent"
  // Fade transitions
  fadeTop?: boolean
  fadeBottom?: boolean
  // Overlap with previous section
  overlap?: "none" | "sm" | "md" | "lg"
  // Show decorative divider
  divider?: "none" | "silver" | "burgundy"
  dividerPosition?: "top" | "bottom"
  // Flow connector
  flowConnector?: boolean
  // Animate on scroll
  animate?: boolean
}

const bgColorClasses = {
  smoke: "bg-smoke",
  cream: "bg-cream",
  carbon: "bg-carbon",
  white: "bg-white",
  transparent: "bg-transparent",
}

const fadeTopClasses = {
  smoke: "section-fade-top",
  cream: "section-fade-top-cream",
  carbon: "section-fade-top-dark",
  white: "section-fade-top",
  transparent: "",
}

const fadeBottomClasses = {
  smoke: "section-fade-bottom",
  cream: "section-fade-bottom-cream",
  carbon: "section-fade-bottom-dark",
  white: "section-fade-bottom",
  transparent: "",
}

const overlapClasses = {
  none: "",
  sm: "section-overlap-sm",
  md: "section-overlap",
  lg: "section-overlap-lg",
}

export function SectionTransition({
  children,
  className,
  id,
  bgColor = "smoke",
  fadeTop = false,
  fadeBottom = false,
  overlap = "none",
  divider = "none",
  dividerPosition = "top",
  flowConnector = false,
  animate = true,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!animate) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [animate])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative section-transition",
        bgColorClasses[bgColor],
        fadeTop && fadeTopClasses[bgColor],
        fadeBottom && fadeBottomClasses[bgColor],
        overlapClasses[overlap],
        animate && "section-enter",
        animate && isInView && "in-view",
        className
      )}
    >
      {/* Top divider */}
      {divider !== "none" && dividerPosition === "top" && (
        <div
          className={cn(
            "section-divider absolute top-0 left-0 right-0",
            divider === "burgundy" && "section-divider-burgundy"
          )}
        />
      )}

      {/* Flow connector */}
      {flowConnector && (
        <div className="flow-connector flow-connector-top" />
      )}

      {children}

      {/* Bottom divider */}
      {divider !== "none" && dividerPosition === "bottom" && (
        <div
          className={cn(
            "section-divider absolute bottom-0 left-0 right-0",
            divider === "burgundy" && "section-divider-burgundy"
          )}
        />
      )}
    </section>
  )
}

// Gradient blend section for smooth color transitions
interface GradientBlendProps {
  children: ReactNode
  className?: string
  from?: "smoke" | "cream" | "carbon" | "transparent"
  to?: "smoke" | "cream" | "carbon" | "transparent"
}

export function GradientBlend({
  children,
  className,
  from = "transparent",
  to = "smoke",
}: GradientBlendProps) {
  const gradientMap: Record<string, Record<string, string>> = {
    transparent: {
      smoke: "bg-blend-to-smoke",
      cream: "bg-blend-to-cream",
      carbon: "bg-blend-to-carbon",
      transparent: "",
    },
    smoke: {
      transparent: "bg-blend-from-smoke",
      cream: "",
      carbon: "",
      smoke: "",
    },
    cream: {
      transparent: "bg-blend-from-cream",
      smoke: "",
      carbon: "",
      cream: "",
    },
    carbon: {
      transparent: "bg-blend-from-carbon",
      smoke: "",
      cream: "",
      carbon: "",
    },
  }

  return (
    <div className={cn(gradientMap[from][to], className)}>
      {children}
    </div>
  )
}

// Crossfade content wrapper for smooth opacity transitions
interface CrossfadeContentProps {
  children: ReactNode
  className?: string
  stagger?: boolean
}

export function CrossfadeContent({
  children,
  className,
  stagger = true,
}: CrossfadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        stagger ? "section-content-reveal" : "section-crossfade",
        isInView && (stagger ? "in-view" : "visible"),
        className
      )}
    >
      {children}
    </div>
  )
}

// Section spacer with optional decorative element
interface SectionSpacerProps {
  size?: "sm" | "md" | "lg" | "xl"
  decorative?: boolean
  className?: string
}

const spacerSizes = {
  sm: "h-12 md:h-16",
  md: "h-16 md:h-24",
  lg: "h-24 md:h-32",
  xl: "h-32 md:h-48",
}

export function SectionSpacer({
  size = "md",
  decorative = false,
  className,
}: SectionSpacerProps) {
  return (
    <div className={cn("relative", spacerSizes[size], className)}>
      {decorative && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-silver/50 to-transparent" />
        </div>
      )}
    </div>
  )
}
