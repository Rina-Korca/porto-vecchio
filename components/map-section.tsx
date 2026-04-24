"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function MapSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative h-[500px] w-full">
      <div
        className={cn(
          "absolute inset-0 transition-all duration-1000",
          isInView ? "opacity-100" : "opacity-0"
        )}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.9046892749364!2d13.388860076882775!3d52.51763467981162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sUnter%20den%20Linden%2042%2C%2010117%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ristorante Bonfini Location"
        />
      </div>
      {/* Overlay with info */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-white rounded-xl p-6 md:p-8 shadow-2xl max-w-sm z-10">
        <h3 className="font-serif text-2xl text-carbon mb-4">
          Ristorante Bonfini
        </h3>
        <p className="text-muted-foreground mb-4">
          Unter den Linden 42
          <br />
          10117 Berlin-Mitte
        </p>
        <a
          href="https://maps.google.com/?q=Unter+den+Linden+42,+10117+Berlin"
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn inline-block bg-mahogany text-white px-6 py-3 text-sm uppercase tracking-widest font-medium hover:bg-garnet transition-colors rounded"
        >
          Route planen
        </a>
      </div>
    </section>
  )
}
