"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CuisineSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="kueche" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative transition-all duration-1000",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12",
            )}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/food/BonfiniRestaurant_AnnaNesterenko-14.jpg"
                alt="Gegrillter Wolfsbarsch mit mediterranem Gemüse - sorgfältig angerichtetes Gericht aus der Bonfini Kueche"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-mahogany/10 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12",
            )}
          >
            <span className="inline-block text-mahogany uppercase tracking-[0.3em] text-sm mb-6">
              Unsere Küche
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-carbon mb-8 leading-tight">
              Tradition trifft <span className="text-mahogany">Moderne</span>
            </h2>
            <div className="thin-divider w-16 mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Unsere Küche verbindet die zeitlosen Rezepte der italienischen
              Tradition mit modernen Kochtechniken. Jede Zutat wird sorgfältig
              ausgewählt, von handgemachter Pasta bis hin zu frischen Kräutern
              aus unserem eigenen Garten.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Küchenchef Marco Bonfini legt besonderen Wert auf Saisonalität und
              Regionalität. Olivenöl aus der Toskana, Trüffel aus dem Piemont
              und Mozzarella di Bufala aus Kampanien sind nur einige der
              Premium-Zutaten, die unsere Gerichte unvergesslich machen.
            </p>
            <a
              href="#speisekarte"
              className="magnetic-btn inline-block bg-mahogany text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded"
            >
              Zur Speisekarte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
