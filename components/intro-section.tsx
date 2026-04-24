"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function IntroSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <section
      id="willkommen"
      ref={ref}
      className="py-24 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={cn(
              "inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Willkommen
          </span>
          <h2
            className={cn(
              "font-serif text-4xl md:text-5xl lg:text-6xl text-carbon mb-8 leading-tight transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Eine Reise durch die{" "}
            <span className="text-mahogany">italienische Küche</span>
          </h2>
          <div className="thin-divider w-24 mx-auto mb-8" />
          <p
            className={cn(
              "text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 transition-all duration-700 delay-400",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Seit 2008 begrüßen wir unsere Gäste im Ristorante Bonfini. Unser
            Küchenchef Marco Bonfini bringt die Aromen seiner Heimat Toskana
            nach Berlin. Jedes Gericht erzählt eine Geschichte von Tradition,
            Leidenschaft und höchster Qualität.
          </p>
          <p
            className={cn(
              "text-muted-foreground text-lg md:text-xl leading-relaxed transition-all duration-700 delay-500",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Wir laden Sie ein, die authentischen Geschmäcker Italiens zu
            entdecken, begleitet von erlesenen Weinen aus den besten Regionen
            des Landes.
          </p>
        </div>
      </div>
    </section>
  )
}
