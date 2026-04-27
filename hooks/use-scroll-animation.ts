"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

interface ScrollProgress {
  progress: number // 0 to 1, how far element has scrolled through viewport
  isInView: boolean
  scrollY: number
  elementTop: number
  viewportHeight: number
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = false } = options
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setHasAnimated(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isInView: once ? hasAnimated : isInView }
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null)
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
          setOffset(distanceFromCenter * speed * -1)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { ref, offset }
}

export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState<ScrollProgress>({
    progress: 0,
    isInView: false,
    scrollY: 0,
    elementTop: 0,
    viewportHeight: 0,
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let ticking = false

    const updateProgress = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height
      
      // Calculate progress: 0 when element enters viewport, 1 when it leaves
      const start = windowHeight // Element bottom at viewport top
      const end = -elementHeight // Element top at viewport bottom
      const current = rect.top
      
      const rawProgress = 1 - (current - end) / (start - end)
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))
      
      setProgress({
        progress: clampedProgress,
        isInView: rect.top < windowHeight && rect.bottom > 0,
        scrollY: window.scrollY,
        elementTop: rect.top,
        viewportHeight: windowHeight,
      })
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return { ref, ...progress }
}

export function useStaggeredReveal(itemCount: number, baseDelay: number = 100) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2, once: true })
  
  const getDelay = useCallback((index: number) => {
    return index * baseDelay
  }, [baseDelay])

  return { ref, isInView, getDelay }
}
