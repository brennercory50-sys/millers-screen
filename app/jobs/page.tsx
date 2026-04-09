import { Metadata } from 'next'
import JobsClient from './JobsClient'
import { Metadata as OpenGraphMetadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs in Progress | Miller\'s Screen',
  description: 'Live view of our current construction projects. See photos and locations of active pool enclosures, screen rooms, and concrete work across Volusia County.',
  keywords: ['jobs', 'projects', 'construction', 'active work', 'pool enclosure progress', 'screen room progress', 'volusia county'],
  openGraph: {
    title: 'Jobs in Progress | Miller\'s Screen',
    description: 'Live view of our current construction projects across Volusia County.',
  },
}

export const dynamic = 'force-dynamic'

export default function JobsPage() {
  return <JobsClient />
}
