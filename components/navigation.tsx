"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#willkommen", label: "Willkommen" },
  { href: "#kueche", label: "Küche" },
  { href: "#restaurant", label: "Das Restaurant" },
  { href: "#empfehlungen", label: "Empfehlungen" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reservierung", label: "Reservierung" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
      
      // Track active section
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury",
        isScrolled
          ? "bg-white/98 backdrop-blur-lg shadow-[0_1px_0_rgba(177,167,166,0.2)] py-3"
          : "bg-gradient-to-b from-carbon/50 to-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className={cn(
            "font-serif text-2xl md:text-3xl tracking-wide transition-all duration-500 hover:opacity-80",
            isScrolled ? "text-garnet" : "text-white"
          )}
        >
          <span className="font-medium">Bonfini</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative text-[13px] uppercase tracking-[0.15em] font-normal transition-all duration-300 link-hover",
                  isScrolled 
                    ? activeSection === link.href.slice(1)
                      ? "text-mahogany"
                      : "text-carbon/80 hover:text-mahogany"
                    : activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="tel:+493095614848"
          className={cn(
            "hidden lg:flex items-center gap-2 text-sm transition-all duration-300",
            isScrolled
              ? "text-mahogany hover:text-garnet"
              : "text-white/90 hover:text-white"
          )}
        >
          <Phone className="w-4 h-4" />
          <span className="font-medium">030 95 61 48 48</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 transition-colors duration-300 rounded-md",
            isScrolled 
              ? "text-carbon hover:bg-smoke" 
              : "text-white hover:bg-white/10"
          )}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="relative w-6 h-6">
            <span
              className={cn(
                "absolute left-0 w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-carbon" : "bg-white",
                isMobileMenuOpen ? "top-[11px] rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[11px] w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-carbon" : "bg-white",
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute left-0 w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-carbon" : "bg-white",
                isMobileMenuOpen ? "top-[11px] -rotate-45" : "top-[19px]"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-onyx transition-all duration-500 ease-luxury",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Close button area */}
        <div className="absolute top-5 right-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Mobile menu content */}
        <div className="flex flex-col items-center justify-center h-full px-6">
          {/* Logo */}
          <span className="font-serif text-3xl text-mahogany mb-12">Bonfini</span>
          
          {/* Navigation links */}
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={cn(
                  "transition-all duration-500",
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50 + 100}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white/90 hover:text-mahogany-2 transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Contact info */}
          <div
            className={cn(
              "mt-16 text-center transition-all duration-500 delay-500",
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <a
              href="tel:+493095614848"
              className="flex items-center justify-center gap-3 text-white/70 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 text-mahogany" />
              <span className="text-lg">030 95 61 48 48</span>
            </a>
            <p className="mt-4 text-sm text-white/40">
              Chausseestr. 15, 10115 Berlin
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
