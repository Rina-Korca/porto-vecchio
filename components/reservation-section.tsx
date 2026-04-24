"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Calendar, Clock, Users, Mail, Phone, User } from "lucide-react"

export function ReservationSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.")
  }

  return (
    <section id="reservierung" ref={ref} className="py-24 md:py-32 bg-smoke">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Content */}
          <div
            className={cn(
              "transition-all duration-1000",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <span className="inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6">
              Reservierung
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight">
              Reservieren Sie Ihren{" "}
              <span className="text-mahogany">Tisch</span>
            </h2>
            <div className="thin-divider w-16 mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Wir empfehlen eine Reservierung, um Ihnen den bestmöglichen
              Service und Ihr bevorzugtes Ambiente zu garantieren. Für Gruppen
              ab 8 Personen oder besondere Anlässe kontaktieren Sie uns bitte
              direkt.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5 text-mahogany" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium text-carbon">+49 30 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Mail className="w-5 h-5 text-mahogany" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-Mail</p>
                  <p className="font-medium text-carbon">
                    reservierung@bonfini.de
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-8 shadow-xl"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <input
                    type="text"
                    placeholder="Ihr Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon placeholder:text-silver"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <input
                    type="email"
                    placeholder="E-Mail Adresse"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon placeholder:text-silver"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <input
                    type="tel"
                    placeholder="Telefonnummer"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon placeholder:text-silver"
                  />
                </div>

                {/* Guests */}
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Person" : "Personen"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon"
                  />
                </div>

                {/* Time */}
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <select
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    required
                    className="w-full pl-12 pr-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon appearance-none cursor-pointer"
                  >
                    <option value="">Uhrzeit wählen</option>
                    {[
                      "12:00",
                      "12:30",
                      "13:00",
                      "13:30",
                      "18:00",
                      "18:30",
                      "19:00",
                      "19:30",
                      "20:00",
                      "20:30",
                      "21:00",
                      "21:30",
                    ].map((time) => (
                      <option key={time} value={time}>
                        {time} Uhr
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <textarea
                  placeholder="Besondere Wünsche oder Anmerkungen (optional)"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-smoke border border-transparent rounded-lg focus:border-mahogany focus:outline-none transition-colors text-carbon placeholder:text-silver resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="magnetic-btn w-full mt-6 bg-mahogany text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded-lg"
              >
                Tisch reservieren
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
