"use client"

import type { SVGProps } from "react"
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react"
import { companyInfo, openingHours } from "@/lib/company-info"

const navigationLinks = [
  { href: "#willkommen", label: "Start" },
  { href: "#kueche", label: "Unsere Küche" },
  { href: "#restaurant", label: "Das Restaurant" },
  { href: "#empfehlungen", label: "Empfehlungen" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reservierung", label: "Reservierung" },
  { href: companyInfo.orderHref, label: "Bestellen" },
]

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
]

function TripadvisorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.3 10.35c.58-2.2 2.55-3.72 4.82-3.72 1.4 0 2.68.58 3.58 1.52.9-.94 2.18-1.52 3.58-1.52 2.27 0 4.24 1.52 4.82 3.72l1.4-1.52h-4.02c-1.58-.9-3.22-1.35-4.92-1.35s-3.34.45-4.92 1.35H1.9l1.4 1.52Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.82 17.42a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM15.58 17.42a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.82 14.85a.63.63 0 1 0 0-1.26.63.63 0 0 0 0 1.26ZM15.58 14.85a.63.63 0 1 0 0-1.26.63.63 0 0 0 0 1.26ZM11.7 17.1l-1.2 1.55h2.4L11.7 17.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

function YelpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.7 3.05c1.28-.34 2.42.38 2.63 1.67l.77 4.72-2.3.76-2.35-4.17c-.64-1.13.01-2.65 1.25-2.98Z"
        fill="currentColor"
      />
      <path
        d="M19.93 8.55c.72 1.12.4 2.43-.75 3.04l-4.2 2.22-1.45-1.94 3.25-3.5c.88-.95 2.44-.91 3.15.18Z"
        fill="currentColor"
      />
      <path
        d="M19.16 18.95c-.82 1.05-2.16 1.2-3.11.33l-3.5-3.2 1.38-1.99 4.38 1.9c1.18.52 1.66 1.93.85 2.96Z"
        fill="currentColor"
      />
      <path
        d="M8.9 21.04c-1.26-.42-1.87-1.62-1.41-2.84l1.67-4.45 2.32.7-.22 4.77c-.06 1.3-1.11 2.23-2.36 1.82Z"
        fill="currentColor"
      />
      <path
        d="M3.1 12.45c-.03-1.33.94-2.27 2.24-2.18l4.74.33.07 2.42-4.62 1.24c-1.25.34-2.39-.51-2.43-1.81Z"
        fill="currentColor"
      />
    </svg>
  )
}

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
  {
    href: companyInfo.tripadvisorHref,
    label: "Tripadvisor",
    Icon: TripadvisorIcon,
  },
  {
    href: companyInfo.yelpHref,
    label: "Yelp",
    Icon: YelpIcon,
  },
]

export function Footer() {
  return (
    <footer className="bg-onyx text-smoke relative overflow-hidden">
      {/* Burgundy accent line */}
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
              <a href="/" className="inline-block group" aria-label="Bonfini Startseite">
                <img
                  src="/images/logo/logo.png"
                  alt="Bonfini"
                  className="h-auto w-44 object-contain transition-opacity duration-300 group-hover:opacity-85"
                  loading="lazy"
                  decoding="async"
                />
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
              <a 
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-3 text-smoke/70 hover:text-strawberry transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 text-garnet/70 group-hover:text-garnet transition-colors duration-300 flex-shrink-0" />
                <span>{companyInfo.email}</span>
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
              &copy; 2026 Ristorante Bonfini. Alle Rechte vorbehalten.
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
