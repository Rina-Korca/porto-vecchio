"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import Image from "next/image"

const dishes = [
  {
    name: "Tagliatelle al Tartufo",
    description:
      "Hausgemachte Bandnudeln mit frischem schwarzem Trüffel und Parmigiano Reggiano",
    price: "38",
    image: "/images/dish-pasta.jpg",
  },
  {
    name: "Branzino alla Griglia",
    description:
      "Gegrillter Wolfsbarsch mit mediterranem Gemüse und Zitronenöl",
    price: "42",
    image: "/images/dish-fish.jpg",
  },
  {
    name: "Filetto di Manzo",
    description:
      "Rinderfilet mit Barolo-Reduktion, Trüffelkartoffeln und Spinat",
    price: "52",
    image: "/images/dish-steak.jpg",
  },
  {
    name: "Risotto ai Funghi Porcini",
    description: "Cremiges Risotto mit Steinpilzen und frischen Kräutern",
    price: "32",
    image: "/images/dish-risotto.jpg",
  },
]

export function DishesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Empfehlungen
          </span>
          <h2
            className={cn(
              "font-serif text-4xl md:text-5xl text-carbon mb-6 leading-tight transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Unsere <span className="text-mahogany">Signature Dishes</span>
          </h2>
          <div className="thin-divider w-24 mx-auto" />
        </div>

        {/* Dishes Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {dishes.map((dish, index) => (
            <div
              key={dish.name}
              className={cn(
                "group bg-smoke rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-2xl text-carbon group-hover:text-mahogany transition-colors">
                      {dish.name}
                    </h3>
                    <span className="text-mahogany font-serif text-xl">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
