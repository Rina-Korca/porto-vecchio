"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Award, Star, Trophy } from "lucide-react"

const awards = [
  {
    icon: Star,
    title: "Tripadvisor",
    subtitle: "Travellers' Choice 2024",
    description: "Top 10% der Restaurants weltweit",
  },
  {
    icon: Award,
    title: "Michelin Guide",
    subtitle: "Empfohlen",
    description: "Ausgezeichnete Qualität seit 2018",
  },
  {
    icon: Trophy,
    title: "Berlin Food Award",
    subtitle: "Bestes Italienisches Restaurant",
    description: "Gewinner 2023",
  },
]

export function AwardsSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-smoke">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {awards.map((award, index) => (
            <div
              key={award.title}
              className={cn(
                "text-center transition-all duration-700",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
                <award.icon className="w-8 h-8 text-mahogany" />
              </div>
              <h3 className="font-serif text-2xl text-carbon mb-2">
                {award.title}
              </h3>
              <p className="text-mahogany font-medium mb-2">{award.subtitle}</p>
              <p className="text-muted-foreground text-sm">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
