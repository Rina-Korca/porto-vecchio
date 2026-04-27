"use client"

import { useInView } from "@/hooks/use-in-view"
import { Phone, Mail, MapPin, Clock, Navigation, ExternalLink } from "lucide-react"
import { companyInfo, openingHours } from "@/lib/company-info"

export function HoursContactSection() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="kontakt"
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "#f5f3f4" }}
    >
      {/* Subtle background texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(128, 128, 128, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(128, 128, 128, 0.03) 0%, transparent 50%),
                           url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23722f37' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span
            className={`inline-block text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "#722f37" }}
          >
            Besuchen Sie uns
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-700 delay-100 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ color: "#1a1a1a" }}
          >
            Öffnungszeiten & Kontakt
          </h2>
          <div
            className={`w-24 h-0.5 mx-auto transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ backgroundColor: "#722f37" }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Opening Hours Card */}
          <div
            className={`relative bg-white rounded-sm p-10 shadow-lg transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ borderTop: "3px solid #722f37" }}
          >
            {/* Decorative corner */}
            <div 
              className="absolute top-4 right-4 w-8 h-8 border-t border-r opacity-20"
              style={{ borderColor: "#722f37" }}
            />
            
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(114, 47, 55, 0.1)" }}
              >
                <Clock className="w-6 h-6" style={{ color: "#722f37" }} />
              </div>
              <h3 className="font-serif text-2xl" style={{ color: "#1a1a1a" }}>
                Öffnungszeiten
              </h3>
            </div>

            <div className="space-y-6">
              {/* Weekdays */}
              <div>
                <p className="text-sm tracking-wider uppercase mb-2" style={{ color: "#722f37" }}>
                  Heute und die Woche
                </p>
                <div className="space-y-3">
                  {openingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between gap-5 border-b pb-2 last:border-0 last:pb-0"
                      style={{ borderColor: "rgba(114, 47, 55, 0.14)" }}
                    >
                      <span className="font-medium" style={{ color: "#1a1a1a" }}>
                        {item.day}
                      </span>
                      <span className="text-right" style={{ color: "#666" }}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative bottom corner */}
            <div 
              className="absolute bottom-4 left-4 w-8 h-8 border-b border-l opacity-20"
              style={{ borderColor: "#722f37" }}
            />
          </div>

          {/* Address Card */}
          <div
            className={`relative bg-white rounded-sm p-10 shadow-lg transition-all duration-700 delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ borderTop: "3px solid #722f37" }}
          >
            {/* Decorative corner */}
            <div 
              className="absolute top-4 right-4 w-8 h-8 border-t border-r opacity-20"
              style={{ borderColor: "#722f37" }}
            />

            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(114, 47, 55, 0.1)" }}
              >
                <MapPin className="w-6 h-6" style={{ color: "#722f37" }} />
              </div>
              <h3 className="font-serif text-2xl" style={{ color: "#1a1a1a" }}>
                Adresse
              </h3>
            </div>

            <div className="mb-8">
              <img
                src="/images/logo/logo-red.png"
                alt="Bonfini"
                className="mb-3 h-auto w-36 object-contain"
                loading="lazy"
                decoding="async"
              />
              <a
                href={companyInfo.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base leading-relaxed transition-colors hover:opacity-80"
                style={{ color: "#666" }}
              >
                {companyInfo.addressLine1}<br />
                {companyInfo.addressLine2}<br />
                {companyInfo.country}
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px mb-8" style={{ backgroundColor: "rgba(114, 47, 55, 0.2)" }} />

            {/* Route Button */}
            <a
              href={companyInfo.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-sm text-white text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-lg group"
              style={{ backgroundColor: "#722f37" }}
            >
              <Navigation className="w-4 h-4" />
              <span>Route planen</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Decorative bottom corner */}
            <div 
              className="absolute bottom-4 left-4 w-8 h-8 border-b border-l opacity-20"
              style={{ borderColor: "#722f37" }}
            />
          </div>

          {/* Contact Card */}
          <div
            className={`relative bg-white rounded-sm p-10 shadow-lg transition-all duration-700 delay-400 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ borderTop: "3px solid #722f37" }}
          >
            {/* Decorative corner */}
            <div 
              className="absolute top-4 right-4 w-8 h-8 border-t border-r opacity-20"
              style={{ borderColor: "#722f37" }}
            />

            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(114, 47, 55, 0.1)" }}
              >
                <Phone className="w-6 h-6" style={{ color: "#722f37" }} />
              </div>
              <h3 className="font-serif text-2xl" style={{ color: "#1a1a1a" }}>
                Kontakt
              </h3>
            </div>

            <div className="space-y-6 mb-8">
              {/* Phone */}
              <div>
                <p className="text-sm tracking-wider uppercase mb-2" style={{ color: "#722f37" }}>
                  Telefon
                </p>
                <a 
                  href={companyInfo.phoneHref}
                  className="font-serif text-xl transition-colors hover:opacity-70"
                  style={{ color: "#1a1a1a" }}
                >
                  {companyInfo.phoneDisplay}
                </a>
              </div>

              {/* Divider */}
              <div className="w-full h-px" style={{ backgroundColor: "rgba(114, 47, 55, 0.2)" }} />

              {/* Email */}
              <div>
                <p className="text-sm tracking-wider uppercase mb-2" style={{ color: "#722f37" }}>
                  E-Mail
                </p>
                <a 
                  href={`mailto:${companyInfo.email}`}
                  className="font-serif text-lg transition-colors hover:opacity-70 break-all"
                  style={{ color: "#1a1a1a" }}
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px mb-8" style={{ backgroundColor: "rgba(114, 47, 55, 0.2)" }} />

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={companyInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-white text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: "#722f37" }}
              >
                <Phone className="w-4 h-4" />
                <span>Anrufen</span>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-md border"
                style={{ 
                  color: "#722f37",
                  borderColor: "#722f37",
                  backgroundColor: "transparent"
                }}
              >
                <Mail className="w-4 h-4" />
                <span>E-Mail</span>
              </a>
            </div>

            {/* Decorative bottom corner */}
            <div 
              className="absolute bottom-4 left-4 w-8 h-8 border-b border-l opacity-20"
              style={{ borderColor: "#722f37" }}
            />
          </div>
        </div>

        {/* Bottom decorative element */}
        <div 
          className={`flex items-center justify-center gap-4 mt-16 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(114, 47, 55, 0.3)" }} />
          <span 
            className="font-serif text-sm italic"
            style={{ color: "#722f37" }}
          >
            Wir freuen uns auf Sie
          </span>
          <div className="w-16 h-px" style={{ backgroundColor: "rgba(114, 47, 55, 0.3)" }} />
        </div>
      </div>
    </section>
  )
}
