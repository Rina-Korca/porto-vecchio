import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StorytellingSection } from "@/components/storytelling-section"
import { TripadvisorSection } from "@/components/tripadvisor-section"
import { KitchenSection } from "@/components/kitchen-section"
import { RestaurantSection } from "@/components/restaurant-section"
import { RecommendationsSection } from "@/components/recommendations-section"
import { MenuPdfSection } from "@/components/menu-pdf-section"
import { ParallaxStorytellingSection } from "@/components/parallax-storytelling-section"
import { PremiumGallerySection } from "@/components/premium-gallery-section"
import { ReservationSection } from "@/components/reservation-section"
import { PrivateEventsSection } from "@/components/private-events-section"
import { HoursContactSection } from "@/components/hours-contact-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <StorytellingSection />
      <TripadvisorSection />
      <KitchenSection />
      <RestaurantSection />
      <RecommendationsSection />
      <MenuPdfSection />
      <ParallaxStorytellingSection />
      <PremiumGallerySection />
      <ReservationSection />
      <PrivateEventsSection />
      <HoursContactSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
