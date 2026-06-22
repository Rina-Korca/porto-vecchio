"use client"

import Image from "next/image"
import { CalendarDays, Phone, Users } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { companyInfo, openingHours } from "@/lib/company-info"
import { cn } from "@/lib/utils"

const notes = [
  {
    icon: Phone,
    title: "Telefonisch reservieren",
    description: "Reservierungen nehmen wir ausschließlich telefonisch entgegen.",
  },
  {
    icon: CalendarDays,
    title: "Terrasse ohne Reservierung",
    description: "Bitte beachten Sie, dass auf der Terrasse keine Tische reserviert werden können.",
  },
  {
    icon: Users,
    title: "Feiern & Veranstaltungen",
    description: "Für besondere Anlässe beraten wir Sie gerne persönlich am Telefon.",
  },
]

export function ReservationSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="reservierung" ref={ref} className="bg-smoke py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "mb-16 text-center transition-all duration-1000",
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <span className="mb-4 inline-block text-sm uppercase tracking-[0.3em] text-mahogany">
            Reservierung
          </span>
          <h2 className="text-balance font-serif text-4xl leading-tight text-carbon md:text-5xl lg:text-6xl">
            Reservierungen ausschließlich telefonisch
          </h2>
          <div className="thin-divider mx-auto mt-6 w-24" />
        </div>

        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div
            className={cn(
              "relative overflow-hidden rounded-sm bg-[var(--deep-space-blue)] p-8 text-white shadow-xl shadow-carbon/10 md:p-10",
              "transition-all delay-100 duration-1000",
              isInView ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--stormy-teal)]/30 via-transparent to-[var(--deep-purple)]/30" />
            <div className="relative">
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-white/60">
                Rufen Sie uns an
              </p>
              <a
                href={companyInfo.phoneHref}
                className="block font-serif text-4xl text-white transition hover:text-[var(--gold)] md:text-5xl"
              >
                {companyInfo.phoneDisplay}
              </a>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg">
                Reservieren Sie einfach und unkompliziert telefonisch einen
                Tisch in unserem Restaurant. Für Ihre Feier oder Veranstaltung
                sprechen wir gerne persönlich mit Ihnen über Wünsche, Ablauf und
                Raumoptionen.
              </p>

              <a
                href={companyInfo.phoneHref}
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-sm bg-mahogany px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-garnet"
              >
                <Phone className="h-4 w-4" />
                Jetzt anrufen
              </a>
            </div>
          </div>

          <div
            className={cn(
              "grid gap-8 transition-all delay-200 duration-1000 md:grid-cols-2",
              isInView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
            )}
          >
            <div className="relative min-h-[420px] overflow-hidden rounded-sm shadow-xl shadow-carbon/10 md:min-h-full">
              <Image
                src="/images/porto/gallery-02.jpg"
                alt="Nebenraum im Porto Vecchio für Reservierungen und Feiern"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent" />
            </div>

            <div className="rounded-sm bg-white p-8 shadow-xl shadow-carbon/5">
              <h3 className="mb-6 font-serif text-2xl text-carbon">
                Hinweise
              </h3>
              <div className="space-y-5">
                {notes.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mahogany/10 text-mahogany">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-carbon">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-dust pt-6">
                <h4 className="mb-4 font-serif text-xl text-carbon">
                  Öffnungszeiten
                </h4>
                <div className="space-y-2">
                  {openingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between gap-4 text-sm text-muted-foreground"
                    >
                      <span className="font-medium text-carbon">{item.day}</span>
                      <span className="text-right">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
