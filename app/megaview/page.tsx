import { Metadata } from 'next'
import MegaviewContent from '@/components/megaview-content'
import { generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: "MegaView® Enclosures Volusia County | Premium Open-View Screen Design",
  description: "Miller's Screen is the ONLY authorized MegaView® builder in Volusia County. Experience enclosures with no vertical bars, no visual obstruction, just pure open views. Request a MegaView consultation today.",
  keywords: ['megaview enclosure', 'cableless enclosure', 'unobstructed view enclosure', 'modern screen enclosure', 'premium pool enclosure', 'florida megaview'],
  alternates: { canonical: 'https://millersscreen.com/megaview' },
  openGraph: {
    title: "MegaView® Enclosures | Miller's Screen",
    description: "The only MegaView® builder in Volusia County. No bars. No obstruction. Just your view.",
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
      <MegaviewContent />
    </>
  )
}
