import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import ClaimBlock from '@/components/claim-block'
import ComparisonBlock from '@/components/comparison-block'
import VideoEmbed from '@/components/video-embed'
import CTABlock from '@/components/cta-block'
import FAQSection from '@/components/faq-section'
import { generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: "MegaView® Enclosures Volusia County | Exclusive Cable-Free Design",
  description: "Miller's Screen is the ONLY authorized MegaView® builder in Volusia County. Experience the clearest views with our exclusive cable-supported, post-free enclosure design. Request a MegaView consultation today.",
  keywords: ['megaview enclosure', 'cableless enclosure', 'unobstructed view enclosure', 'modern screen enclosure', 'premium pool enclosure', 'florida megaview'],
  openGraph: {
    title: "MegaView® Enclosures | Miller's Screen",
    description: "Miller's Screen is the ONLY authorized MegaView® builder in Volusia County. Experience the clearest views with our exclusive cable-supported design.",
  },
}

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": generateFAQSchema('megaview').map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function MegaviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "MegaView® Enclosure Installation",
            "description": "Exclusive MegaView® cable-supported, post-free enclosure installation in Volusia County. Miller's Screen is the ONLY authorized MegaView builder.",
            "provider": {
              "@id": "https://millersscreen.com/#business"
            },
            "areaServed": {
              "@type": "State",
              "name": "Florida"
            },
            "serviceType": "Premium Screen Enclosure Construction"
          })
        }}
      />
      <HeroSection
        headline="MEGAVIEW® ENCLOSURES"
        subheadline="The open-view enclosure option designed to reduce visual posts."
        image="/images/megaview-1.jpg"
        ctaPrimary={{ label: 'Talk to Us', href: '/contact#form' }}
        ctaSecondary={{ label: 'See MegaView® Projects', href: '/showcase' }}
      />
      <ClaimBlock
        title="Home of the real MegaView®"
        copy="MegaView® removes vertical posts and horizontal railing found on many traditional enclosures to help give you a cleaner view of your surroundings."
      />
      <ComparisonBlock
        title="Traditional vs. MegaView®"
        leftLabel="Traditional"
        leftImage="/projects/project-72554.jpg"
        rightLabel="MegaView®"
        rightImage="/images/megaview-1.jpg"
        bullets={[
          'Cleaner sightlines',
          'Modern look',
          'Premium structural approach',
        ]}
      />
      <VideoEmbed
        title="See it in action"
        videoUrl="https://www.youtube.com/embed/omlz6gh4Rfg"
      />
      <FAQSection />
      <CTABlock
        title="Want MegaView® at your home?"
        cta={{ label: 'Request an Estimate', href: '/contact#form' }}
      />
    </>
  )
}
