import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { StorytellingSection } from "@/components/storytelling-section"
import { TripadvisorSection } from "@/components/tripadvisor-section"
import { AwardsSection } from "@/components/awards-section"
import { KitchenSection } from "@/components/kitchen-section"
import { RestaurantSection } from "@/components/restaurant-section"
import { RecommendationsSection } from "@/components/recommendations-section"
import { MenuPdfSection } from "@/components/menu-pdf-section"
import { ParallaxStorytellingSection } from "@/components/parallax-storytelling-section"
import { CuisineSection } from "@/components/cuisine-section"
import { InteriorSection } from "@/components/interior-section"
import { DishesSection } from "@/components/dishes-section"
import { MenuSection } from "@/components/menu-section"
import { ParallaxSection } from "@/components/parallax-section"
import { PremiumGallerySection } from "@/components/premium-gallery-section"
import { GallerySection } from "@/components/gallery-section"
import { ReservationSection } from "@/components/reservation-section"
import { PrivateEventsSection } from "@/components/private-events-section"
import { EventsSection } from "@/components/events-section"
import { HoursContactSection } from "@/components/hours-contact-section"
import { ContactSection } from "@/components/contact-section"
import { LocationSection } from "@/components/location-section"
import { MapSection } from "@/components/map-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <StorytellingSection />
      <TripadvisorSection />
      <AwardsSection />
      <KitchenSection />
      <RestaurantSection />
      <RecommendationsSection />
      <MenuPdfSection />
      <ParallaxStorytellingSection />
      <CuisineSection />
      <InteriorSection />
      <DishesSection />
      <MenuSection />
      <ParallaxSection />
      <PremiumGallerySection />
      <GallerySection />
      <ReservationSection />
      <PrivateEventsSection />
      <EventsSection />
      <HoursContactSection />
      <ContactSection />
      <LocationSection />
      <MapSection />
      <Footer />
    </main>
  )
}
