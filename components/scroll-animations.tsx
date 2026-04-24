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
