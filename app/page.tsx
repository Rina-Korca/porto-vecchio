import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StorytellingSection } from "@/components/storytelling-section"
import { TripadvisorSection } from "@/components/tripadvisor-section"
import { CinematicStorytellingSection } from "@/components/cinematic-storytelling-section"
import { KitchenSection } from "@/components/kitchen-section"
import { RestaurantSection } from "@/components/restaurant-section"
import { RecommendationsSection } from "@/components/recommendations-section"
import { MenuPdfSection } from "@/components/menu-pdf-section"
import { ParallaxStorytellingSection } from "@/components/parallax-storytelling-section"
import { HorizontalGallerySection } from "@/components/horizontal-gallery-section"
import { ReservationSection } from "@/components/reservation-section"
import { PrivateEventsSection } from "@/components/private-events-section"
import { HoursContactSection } from "@/components/hours-contact-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      
      {/* Hero - Full screen entry */}
      <HeroSection />
      
      {/* Storytelling - Overlaps hero with fade */}
      <div className="relative -mt-20 pt-20 bg-gradient-to-b from-transparent via-smoke/50 to-smoke">
        <StorytellingSection />
      </div>
      
      {/* Tripadvisor - Smooth continuation */}
      <div className="relative bg-smoke section-fade-bottom">
        <TripadvisorSection />
      </div>
      
      {/* Cinematic Storytelling - Smooth scroll experience */}
      <CinematicStorytellingSection />
      
      {/* Kitchen - Overlaps with blend */}
      <div className="relative -mt-16 pt-16 bg-gradient-to-b from-transparent to-smoke">
        <KitchenSection />
      </div>
      
      {/* Restaurant - Seamless transition */}
      <div className="relative bg-smoke">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-smoke to-transparent pointer-events-none" />
        <RestaurantSection />
      </div>
      
      {/* Recommendations - Continues flow */}
      <div className="relative bg-smoke section-fade-bottom">
        <RecommendationsSection />
      </div>
      
      {/* Menu PDF - Subtle background shift */}
      <div className="relative bg-gradient-to-b from-smoke via-cream to-cream">
        <MenuPdfSection />
      </div>
      
      {/* Parallax Storytelling - Dramatic visual break */}
      <ParallaxStorytellingSection />
      
      {/* Gallery - Overlaps parallax */}
      <div className="relative bg-smoke">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-carbon/20 to-transparent pointer-events-none" />
        <HorizontalGallerySection />
      </div>
      
      {/* Reservation - Smooth continuation */}
      <div className="relative bg-smoke">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-smoke to-transparent pointer-events-none" />
        <ReservationSection />
      </div>
      
      {/* Private Events - Seamless */}
      <div className="relative bg-smoke section-fade-bottom">
        <PrivateEventsSection />
      </div>
      
      {/* Hours & Contact - Background transition to cream */}
      <div className="relative bg-gradient-to-b from-smoke to-cream">
        <HoursContactSection />
      </div>
      
      {/* Location - Continues cream */}
      <div className="relative bg-cream section-fade-bottom-cream">
        <LocationSection />
      </div>
      
      {/* Footer - Dark with overlap blend */}
      <div className="relative -mt-8 bg-gradient-to-b from-cream via-carbon/20 to-carbon pt-16">
        <Footer />
      </div>
    </main>
  )
}
