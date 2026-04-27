"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, MapPin } from "lucide-react"
import Image from "next/image"
import { companyInfo, openingHours } from "@/lib/company-info"

export function ReservationSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    area: "keine-praeferenz",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        area: "keine-praeferenz",
        message: "",
      })
    }, 3000)
  }

  const inputClasses = (fieldName: string) => cn(
    "w-full pl-12 pr-4 py-4 bg-smoke border-2 rounded-lg transition-all duration-300 text-carbon placeholder:text-silver",
    focusedField === fieldName 
      ? "border-mahogany shadow-[0_0_0_3px_rgba(164,22,26,0.1)]" 
      : "border-transparent hover:border-silver/50"
  )

  const labelClasses = (fieldName: string) => cn(
    "absolute left-12 transition-all duration-300 pointer-events-none",
    focusedField === fieldName || formData[fieldName as keyof typeof formData]
      ? "-top-2.5 text-xs bg-white px-2 text-mahogany font-medium"
      : "top-1/2 -translate-y-1/2 text-silver"
  )

  return (
    <section id="reservierung" ref={ref} className="py-24 md:py-32 bg-smoke">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div 
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-4">
            Reservierung
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-carbon mb-6 leading-tight text-balance">
            Reservieren Sie einen Tisch bei uns
          </h2>
          <div className="thin-divider w-24 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Side - Form */}
          <div
            className={cn(
              "transition-all duration-1000 delay-200",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-carbon/5">
              {/* Terrace Note */}
              <div className="mb-8 p-4 bg-smoke rounded-xl border-l-4 border-mahogany">
                <p className="text-sm text-carbon leading-relaxed">
                  <span className="font-semibold">Hinweis:</span> Für die Terrasse können wir leider nur begrenzt Reservierungen annehmen.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Name"
                      className={inputClasses("name")}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="E-Mail"
                      className={inputClasses("email")}
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Telefon"
                      className={inputClasses("phone")}
                    />
                  </div>

                  {/* Guests */}
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      onFocus={() => setFocusedField("guests")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(inputClasses("guests"), "appearance-none cursor-pointer pr-10")}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Person" : "Personen"}
                        </option>
                      ))}
                      <option value="10+">Mehr als 10 Personen</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      onFocus={() => setFocusedField("date")}
                      onBlur={() => setFocusedField(null)}
                      min={new Date().toISOString().split('T')[0]}
                      className={cn(inputClasses("date"), "cursor-pointer")}
                    />
                  </div>

                  {/* Time */}
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      onFocus={() => setFocusedField("time")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={cn(inputClasses("time"), "appearance-none cursor-pointer pr-10")}
                    >
                      <option value="">Uhrzeit wählen</option>
                      <optgroup label="Mittagessen">
                        {["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"].map((time) => (
                          <option key={time} value={time}>{time} Uhr</option>
                        ))}
                      </optgroup>
                      <optgroup label="Abendessen">
                        {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"].map((time) => (
                          <option key={time} value={time}>{time} Uhr</option>
                        ))}
                      </optgroup>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Area Selection */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver z-10" />
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    onFocus={() => setFocusedField("area")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(inputClasses("area"), "appearance-none cursor-pointer pr-10")}
                  >
                    <option value="keine-praeferenz">Keine Präferenz</option>
                    <option value="innenbereich">Innenbereich</option>
                    <option value="terrasse">Terrasse (begrenzt verfügbar)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-silver z-10" />
                  <textarea
                    placeholder="Nachricht / besondere Wünsche"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-smoke border-2 rounded-lg transition-all duration-300 text-carbon placeholder:text-silver resize-none",
                      focusedField === "message" 
                        ? "border-mahogany shadow-[0_0_0_3px_rgba(164,22,26,0.1)]" 
                        : "border-transparent hover:border-silver/50"
                    )}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={cn(
                    "magnetic-btn w-full py-4 text-sm uppercase tracking-widest font-medium rounded-lg transition-all duration-300",
                    isSubmitted 
                      ? "bg-green-600 text-white cursor-default"
                      : "bg-mahogany text-white hover:bg-garnet active:scale-[0.98]",
                    isSubmitting && "opacity-80 cursor-wait"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Anfrage gesendet!
                    </span>
                  ) : (
                    "Reservierung anfragen"
                  )}
                </button>
              </form>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-dust">
                <p className="text-sm text-muted-foreground mb-4">Oder kontaktieren Sie uns direkt:</p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <a 
                    href={companyInfo.phoneHref}
                    className="flex items-center gap-3 text-carbon hover:text-mahogany transition-colors group"
                  >
                    <div className="w-10 h-10 bg-smoke rounded-full flex items-center justify-center group-hover:bg-mahogany/10 transition-colors">
                      <Phone className="w-4 h-4 text-mahogany" />
                    </div>
                    <span className="font-medium">{companyInfo.phoneDisplay}</span>
                  </a>
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-3 text-carbon hover:text-mahogany transition-colors group"
                  >
                    <div className="w-10 h-10 bg-smoke rounded-full flex items-center justify-center group-hover:bg-mahogany/10 transition-colors">
                      <Mail className="w-4 h-4 text-mahogany" />
                    </div>
                    <span className="font-medium">{companyInfo.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Opening Hours Overlay */}
          <div
            className={cn(
              "transition-all duration-1000 delay-400",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-carbon/10 h-full min-h-[500px] lg:min-h-[700px]">
              <Image
                src="/images/interior.jpg"
                alt="Elegantes Restaurant Interieur"
                fill
                className="object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/90 via-carbon/30 to-transparent" />
              
              {/* Opening Hours Card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
                  <h3 className="font-serif text-2xl text-carbon mb-6">Öffnungszeiten</h3>
                  <div className="space-y-4">
                    {openingHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between gap-4 pb-3 border-b border-dust last:border-0 last:pb-0"
                      >
                        <span className="text-carbon font-medium">{item.day}</span>
                        <span className="text-right text-muted-foreground">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Küchenschluss 30 Minuten vor Schließung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
