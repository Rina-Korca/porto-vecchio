"use client"

import React, { useEffect, useRef, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "scale"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 900,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  const directionClasses = {
    up: "scroll-animate",
    down: "scroll-animate-down",
    left: "scroll-slide-left",
    right: "scroll-slide-right",
    scale: "scroll-scale",
  }

  return (
    <div
      ref={ref}
      className={cn(directionClasses[direction], isInView && "in-view", className)}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxElementProps {
  children: ReactNode
  className?: string
  speed?: number // -1 to 1, negative = slower, positive = faster
  direction?: "vertical" | "horizontal"
}

export function ParallaxElement({
  children,
  className,
  speed = 0.3,
  direction = "vertical",
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const elementCenter = rect.top + rect.height / 2
          const viewportCenter = windowHeight / 2
          const distanceFromCenter = elementCenter - viewportCenter
          
          // Only apply parallax when element is in or near viewport
          if (rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5) {
            setOffset(distanceFromCenter * speed * -0.15)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  const transform = direction === "vertical" 
    ? `translateY(${offset}px)` 
    : `translateX(${offset}px)`

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform }}
    >
      {children}
    </div>
  )
}

interface ScrollImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  zoomAmount?: number // 1.0 to 1.2 typically
  parallaxSpeed?: number
  reveal?: "left" | "right" | "up" | "none"
}

export function ScrollImage({
  src,
  alt,
  className,
  containerClassName,
  zoomAmount = 1.08,
  parallaxSpeed = 0.2,
  reveal = "left",
}: ScrollImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          // Check if in view
          const inView = rect.top < windowHeight && rect.bottom > 0
          setIsInView(inView)
          
          if (inView) {
            // Calculate progress through viewport (0 to 1)
            const start = windowHeight
            const end = -rect.height
            const current = rect.top
            const progress = Math.max(0, Math.min(1, 1 - (current - end) / (start - end)))
            setScrollProgress(progress)
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scale = 1 + (zoomAmount - 1) * scrollProgress
  const translateY = scrollProgress * parallaxSpeed * -50

  const revealClasses = {
    left: "mask-reveal",
    right: "mask-reveal-right", 
    up: "mask-reveal-up",
    none: "",
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        revealClasses[reveal],
        isInView && "in-view",
        containerClassName
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  )
}

interface ProgressiveTextProps {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  threshold?: number
}

export function ProgressiveText({
  children,
  className,
  as: Component = "p",
  threshold = 0.2,
}: ProgressiveTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  const words = children.split(" ")

  return (
    <Component
      ref={ref as any}
      className={cn("text-progressive", isInView && "in-view", className)}
    >
      {words.map((word, index) => (
        <span key={index} className="word">
          {word}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Component>
  )
}

interface HeadlineScrollProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function HeadlineScroll({
  children,
  className,
  speed = 0.1,
}: HeadlineScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          if (rect.top < windowHeight && rect.bottom > 0) {
            const elementCenter = rect.top + rect.height / 2
            const viewportCenter = windowHeight / 2
            const distanceFromCenter = elementCenter - viewportCenter
            setOffset(distanceFromCenter * speed * -1)
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  )
}

// Multi-Layer Parallax Component for cinematic depth
interface MultiLayerParallaxProps {
  backgroundImage: string
  backgroundAlt?: string
  midLayerContent?: ReactNode
  children: ReactNode
  className?: string
  minHeight?: string
  overlayColor?: string
  disableOnMobile?: boolean
}

export function MultiLayerParallax({
  backgroundImage,
  backgroundAlt = "Background",
  midLayerContent,
  children,
  className,
  minHeight = "90vh",
  overlayColor = "rgba(11, 9, 10, 0.5)",
  disableOnMobile = true,
}: MultiLayerParallaxProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [bgTransform, setBgTransform] = useState({ y: 0, scale: 1 })
  const [midTransform, setMidTransform] = useState({ y: 0 })
  const [fgTransform, setFgTransform] = useState({ y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for mobile/reduced motion
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (disableOnMobile && isMobile) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false
            return
          }

          const rect = containerRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const sectionHeight = containerRef.current.offsetHeight

          // Calculate scroll progress through section (-0.5 to 1.5 range for smooth entry/exit)
          const rawProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight)
          const progress = Math.max(-0.2, Math.min(1.2, rawProgress))
          const normalizedProgress = (progress + 0.2) / 1.4 // Normalize to 0-1

          // Background layer: slowest movement (0.3x), slight zoom
          const bgY = (normalizedProgress - 0.5) * 80 * 0.3
          const bgScale = 1 + normalizedProgress * 0.1

          // Mid layer: medium movement (0.6x)
          const midY = (normalizedProgress - 0.5) * 80 * 0.6

          // Foreground: faster movement (creates depth)
          const fgY = (normalizedProgress - 0.5) * 40

          setBgTransform({ y: bgY, scale: bgScale })
          setMidTransform({ y: midY })
          setFgTransform({ y: fgY })

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile, disableOnMobile])

  const shouldAnimate = !disableOnMobile || !isMobile

  return (
    <section
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      {/* Background Layer - Slowest (0.3x scroll speed), slight blur */}
      <div
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
        style={{
          transform: shouldAnimate
            ? `translateY(${bgTransform.y}px) scale(${bgTransform.scale})`
            : "none",
          willChange: shouldAnimate ? "transform" : "auto",
          transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat",
            shouldAnimate && "blur-[2px]"
          )}
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          role="img"
          aria-label={backgroundAlt}
        />
        {/* Cinematic gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom, ${overlayColor} 0%, transparent 30%, transparent 70%, ${overlayColor} 100%)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon/30 via-transparent to-carbon/30" />
      </div>

      {/* Mid Layer - Medium speed (0.6x) */}
      {midLayerContent && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            transform: shouldAnimate ? `translateY(${midTransform.y}px)` : "none",
            willChange: shouldAnimate ? "transform" : "auto",
            transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          {midLayerContent}
        </div>
      )}

      {/* Foreground Layer - Normal/Fast speed, sharp content */}
      <div
        className="relative z-20 flex items-center justify-center"
        style={{
          minHeight,
          transform: shouldAnimate ? `translateY(${fgTransform.y}px)` : "none",
          willChange: shouldAnimate ? "transform" : "auto",
          transition: "transform 0.08s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      >
        {children}
      </div>

      {/* Top and bottom fade for smooth section transitions */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-smoke to-transparent z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-smoke to-transparent z-30 pointer-events-none" />
    </section>
  )
}

// Floating Card with depth shadow for use in parallax sections
interface DepthCardProps {
  children: ReactNode
  className?: string
  glassEffect?: boolean
}

export function DepthCard({
  children,
  className,
  glassEffect = true,
}: DepthCardProps) {
  return (
    <div
      className={cn(
        "relative",
        glassEffect && "backdrop-blur-xl bg-white/95",
        "rounded-sm shadow-2xl",
        // Multi-layer shadow for depth
        "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_12px_24px_-8px_rgba(0,0,0,0.2),0_4px_8px_-4px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {/* Subtle inner highlight for glass effect */}
      {glassEffect && (
        <div className="absolute inset-0 rounded-sm border border-white/50 pointer-events-none" />
      )}
      {children}
    </div>
  )
}

// Enhanced Image Reveal with mask/clip-path animations
interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  reveal?: "left" | "right" | "up" | "down" | "diagonal" | "center" | "curtain" | "curtain-vertical" | "split"
  delay?: number
  threshold?: number
  aspectRatio?: string
}

export function ImageReveal({
  src,
  alt,
  className,
  containerClassName,
  reveal = "left",
  delay = 0,
  threshold = 0.15,
  aspectRatio,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  const revealClasses: Record<string, string> = {
    left: "mask-reveal",
    right: "mask-reveal-right",
    up: "mask-reveal-up",
    down: "mask-reveal-down",
    diagonal: "mask-reveal-diagonal",
    center: "mask-reveal-center",
    curtain: "curtain-reveal",
    "curtain-vertical": "curtain-reveal-vertical",
    split: "split-reveal",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        revealClasses[reveal],
        isInView && "in-view",
        containerClassName
      )}
      style={{
        transitionDelay: `${delay}ms`,
        aspectRatio: aspectRatio,
      }}
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
      />
    </div>
  )
}

// Image reveal with parallax zoom effect
interface ImageRevealZoomProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  reveal?: "left" | "right" | "up" | "down"
  zoomFrom?: number
  zoomTo?: number
  delay?: number
  threshold?: number
}

export function ImageRevealZoom({
  src,
  alt,
  className,
  containerClassName,
  reveal = "up",
  zoomFrom = 1.15,
  zoomTo = 1,
  delay = 0,
  threshold = 0.1,
}: ImageRevealZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    if (!isInView) return
    
    const element = containerRef.current
    if (!element) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          
          if (rect.top < windowHeight && rect.bottom > 0) {
            const start = windowHeight
            const end = -rect.height
            const current = rect.top
            const progress = Math.max(0, Math.min(1, 1 - (current - end) / (start - end)))
            setScrollProgress(progress)
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isInView])

  const scale = zoomFrom + (zoomTo - zoomFrom) * Math.min(scrollProgress * 2, 1)

  const revealClasses: Record<string, string> = {
    left: "mask-reveal",
    right: "mask-reveal-right",
    up: "mask-reveal-up",
    down: "mask-reveal-down",
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        revealClasses[reveal],
        isInView && "in-view",
        containerClassName
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      />
    </div>
  )
}

interface StaggeredGridProps {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  staggerDelay?: number
  threshold?: number
}

export function StaggeredGrid({
  children,
  className,
  itemClassName,
  staggerDelay = 100,
  threshold = 0.1,
}: StaggeredGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(
            "scroll-animate",
            isInView && "in-view",
            itemClassName
          )}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
