"use client"

import { Instagram, Facebook } from "lucide-react"

const footerLinks = {
  navigation: [
    { href: "#willkommen", label: "Willkommen" },
    { href: "#kueche", label: "Küche" },
    { href: "#speisekarte", label: "Speisekarte" },
    { href: "#galerie", label: "Galerie" },
    { href: "#reservierung", label: "Reservierung" },
    { href: "#kontakt", label: "Kontakt" },
  ],
  legal: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/agb", label: "AGB" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-carbon text-white">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block font-serif text-3xl text-white mb-6">
              Bonfini
            </a>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              Authentische italienische Küche im Herzen von Berlin. Erleben Sie
              unvergessliche kulinarische Momente in eleganter Atmosphäre.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-mahogany transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-mahogany transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-strawberry transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-strawberry transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Ristorante Bonfini. Alle Rechte
            vorbehalten.
          </p>
          <p className="text-white/40 text-sm">
            Designed with passion in Berlin
          </p>
        </div>
      </div>
    </footer>
  )
}
