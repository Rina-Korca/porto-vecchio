"use client"

import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react"

const navigationLinks = [
  { href: "#willkommen", label: "Start" },
  { href: "#kueche", label: "Unsere Küche" },
  { href: "#restaurant", label: "Das Restaurant" },
  { href: "#empfehlungen", label: "Empfehlungen" },
  { href: "#galerie", label: "Galerie" },
  { href: "#reservierung", label: "Reservierung" },
]

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
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
            {/* Logo/Text Mark */}
            <div className="mb-8">
              <a href="#" className="inline-block group">
                <div className="flex items-center gap-3">
                  {/* Decorative mark */}
                  <div className="w-12 h-12 border border-garnet/50 flex items-center justify-center group-hover:border-garnet transition-colors duration-300">
                    <span className="font-serif text-2xl text-garnet">B</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl text-white tracking-wide">
                      Ristorante Bonfini
                    </span>
                    <div className="h-px w-0 group-hover:w-full bg-garnet transition-all duration-500" />
                  </div>
                </div>
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a 
                href="https://maps.google.com/?q=Chausseestr.+15,+10115+Berlin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-smoke/70 hover:text-strawberry transition-colors duration-300 group"
              >
                <MapPin className="w-5 h-5 mt-0.5 text-garnet/70 group-hover:text-garnet transition-colors duration-300 flex-shrink-0" />
                <span>Chausseestr. 15, 10115 Berlin</span>
              </a>
              <a 
                href="tel:+493095614848"
                className="flex items-center gap-3 text-smoke/70 hover:text-strawberry transition-colors duration-300 group"
              >
                <Phone className="w-5 h-5 text-garnet/70 group-hover:text-garnet transition-colors duration-300 flex-shrink-0" />
                <span>030 95 61 48 48</span>
              </a>
              <a 
                href="mailto:reservierung@bonfini.de"
                className="flex items-center gap-3 text-smoke/70 hover:text-strawberry transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 text-garnet/70 group-hover:text-garnet transition-colors duration-300 flex-shrink-0" />
                <span>reservierung@bonfini.de</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-garnet hover:bg-garnet/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-garnet hover:bg-garnet/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
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
              <p className="text-xs text-smoke/50 uppercase tracking-wider mb-2">Öffnungszeiten</p>
              <p className="text-smoke/70 text-sm">Mo–Fr: 11:30–23:00</p>
              <p className="text-smoke/70 text-sm">Sa–So: 12:00–23:00</p>
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
        </div>
      </div>
    </footer>
  )
}
