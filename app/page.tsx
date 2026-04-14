import HomeHero from '@/components/home-hero'
import TrustStrip from '@/components/trust-strip'
import GalleryCarousel from '@/components/gallery-carousel'
import TestimonialsSection from '@/components/testimonials-section'
import AuthorityStrip from '@/components/authority-strip'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <GalleryCarousel />
      <TestimonialsSection />
      <AuthorityStrip />
    </>
  )
}