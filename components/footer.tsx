"use client"

import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react"
import { companyInfo, openingHours } from "@/lib/company-info"
import { BrandWordmark } from "@/components/brand-wordmark"

const navigationLinks = [
  { href: "#willkommen", label: "Start" },
  { href: "#kueche", label: "Unsere Küche" },
  { href: "#restaurant", label: "Das Restaurant" },
  { href: "#empfehlungen", label: "Empfehlungen" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reservierung", label: "Reservierung" },
  { href: "#veranstaltungen", label: "Feiern" },
  { href: "#kontakt", label: "Kontakt" },
]

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
]

const socialLinks = [
  {
    href: companyInfo.instagramHref,
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: companyInfo.facebookHref,
    label: "Facebook",
    Icon: Facebook,
  },
]

export function Footer() {
  return (
    <footer className="bg-onyx text-smoke relative overflow-hidden">
      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-garnet to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-garnet/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-mahogany/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 py-16 md:py-20 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <div className="mb-8">
              <a href="/" className="inline-block group" aria-label="Porto Vecchio Startseite">
                <BrandWordmark className="text-white transition-opacity duration-300 group-hover:opacity-85" />
                <div className="mt-3 h-px w-0 bg-garnet transition-all duration-500 group-hover:w-full" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a 
                href={companyInfo.mapsHref}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-smoke/70 hover:text-strawberry transition-colors duration-300 group"
              >
                <MapPin className="w-5 h-5 mt-0.5 text-garnet/70 group-hover:text-garnet transition-colors duration-300 flex-shrink-0" />
                <span>{companyInfo.addressDisplay}</span>
              </a>
              <a 
                href={companyInfo.phoneHref}
                className="flex items-center gap-3 text-smoke/70 hover:text-strawberry transition-colors duration-300 group"
              >
                <Phone className="w-5 h-5 text-garnet/70 group-hover:text-garnet transition-colors duration-300 flex-shrink-0" />
                <span>{companyInfo.phoneDisplay}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-garnet hover:bg-garnet/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="font-serif text-lg text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-garnet" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-smoke/70 hover:text-strawberry hover:pl-2 transition-all duration-300 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-garnet" />
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-smoke/70 hover:text-strawberry hover:pl-2 transition-all duration-300 inline-block text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Opening indicator */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-smoke/50">
                <Clock className="h-4 w-4 text-garnet/70" />
                <span>Öffnungszeiten</span>
              </p>
              <div className="space-y-1.5">
                {openingHours.map((item) => (
                  <div key={item.day} className="flex justify-between gap-4 text-sm text-smoke/70">
                    <span>{item.day}</span>
                    <span className="text-right">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-smoke/40 text-sm">
              &copy; 2026 Porto Vecchio. Alle Rechte vorbehalten.
            </p>
            
            {/* Decorative Italian text */}
            <p className="text-smoke/30 text-sm italic font-serif">
              L&apos;arte della cucina italiana
            </p>
          </div>
          <p className="text-smoke/40 text-sm text-center mt-6">
            Powered by{" "}
            <a
              href="https://clearline-ai.tech/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke/60 hover:text-strawberry transition-colors duration-300 underline"
            >
              Clearline Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
