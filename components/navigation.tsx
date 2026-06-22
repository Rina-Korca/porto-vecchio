"use client"

import { useState, useEffect } from "react"
import { X, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { companyInfo } from "@/lib/company-info"

const navLinks = [
  { href: "#willkommen", label: "Willkommen" },
  { href: "#kueche", label: "Küche" },
  { href: "#restaurant", label: "Das Restaurant" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reservierung", label: "Reservierung" },
  { href: "#veranstaltungen", label: "Feiern" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)

      const sections = navLinks
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href.slice(1))
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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5"
          : "bg-gradient-to-b from-carbon/60 via-carbon/20 to-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-6 lg:px-10 flex items-center justify-between min-h-[70px]">
        {/* Logo */}
        <a
          href="/"
          className="block shrink-0"
          aria-label="Porto Vecchio Startseite"
        >
          <Image
            src="/images/porto/logo-white.png"
            alt="Porto Vecchio"
            width={210}
            height={75}
            className={cn(
              "h-[84px] w-auto transition-all duration-500",
              isScrolled ? "brightness-0" : ""
            )}
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative whitespace-nowrap px-2 xl:px-3 py-2 text-[11px] xl:text-[12px] uppercase tracking-[0.12em] xl:tracking-[0.15em] font-medium transition-all duration-300",
                    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-mahogany after:transition-all after:duration-300",
                    isActive ? "after:w-4" : "after:w-0 hover:after:w-4",
                    isScrolled
                      ? isActive
                        ? "text-mahogany"
                        : "text-carbon/70 hover:text-carbon"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href={companyInfo.phoneHref}
          className={cn(
            "hidden lg:inline-flex shrink-0 whitespace-nowrap items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border",
            isScrolled
              ? "border-mahogany/30 text-mahogany hover:bg-mahogany hover:text-white"
              : "border-white/40 text-white hover:bg-white/10"
          )}
        >
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>{companyInfo.phoneDisplay}</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 rounded-full transition-colors duration-300",
            isScrolled
              ? "text-carbon hover:bg-smoke"
              : "text-white hover:bg-white/10"
          )}
          aria-label="Menü öffnen"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="relative w-5 h-5 flex flex-col justify-center items-center">
            <span
              className={cn(
                "absolute w-5 h-[1.5px] rounded-full transition-all duration-300",
                isScrolled ? "bg-carbon" : "bg-white",
                isMobileMenuOpen ? "rotate-45" : "-translate-y-[5px]"
              )}
            />
            <span
              className={cn(
                "absolute w-5 h-[1.5px] rounded-full transition-all duration-300",
                isScrolled ? "bg-carbon" : "bg-white",
                isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
              )}
            />
            <span
              className={cn(
                "absolute w-5 h-[1.5px] rounded-full transition-all duration-300",
                isScrolled ? "bg-carbon" : "bg-white",
                isMobileMenuOpen ? "-rotate-45" : "translate-y-[5px]"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-[#0b090a] transition-all duration-400",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute top-5 right-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Menü schließen"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full px-8">
          <Image
            src="/images/porto/logo-white.png"
            alt="Porto Vecchio"
            width={240}
            height={84}
            className="h-[96px] w-auto mb-10"
          />

          <ul className="flex flex-col items-center gap-5">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={cn(
                  "transition-all duration-400",
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 40 + 80}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-xl font-serif transition-colors duration-300",
                    activeSection === link.href.slice(1)
                      ? "text-mahogany-2"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Contact links on mobile */}
          <div
            className={cn(
              "mt-12 flex flex-col items-center gap-4 transition-all duration-400",
              isMobileMenuOpen ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-3"
            )}
          >
            <a
              href={companyInfo.phoneHref}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-mahogany/40 text-white hover:bg-mahogany/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-mahogany" />
              <span className="text-sm font-medium">{companyInfo.phoneDisplay}</span>
            </a>
            <a
              href={companyInfo.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{companyInfo.addressDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
