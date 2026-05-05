import { Metadata } from 'next'
import ShowcaseClient from '@/components/showcase-client'

export const metadata: Metadata = {
  title: "Our Screen Enclosure Projects | View Completed Jobs",
  description: "Browse our portfolio of completed pool enclosures, screen rooms, and MegaView® projects. 1000+ completed jobs across Volusia County. See the quality of our craftsmanship.",
  keywords: ['portfolio', 'projects', 'completed work', 'pool enclosure photos', 'screen room gallery', 'volusia county'],
  alternates: { canonical: 'https://millersscreen.com/showcase' },
  openGraph: {
    title: "Our Screen Enclosure Projects | Miller's Screen",
    description: "Browse our portfolio of completed pool enclosures, screen rooms, and MegaView® projects. 1000+ completed jobs across Volusia County.",
  },
}

export default function ShowcasePage() {
  return <ShowcaseClient />
}
