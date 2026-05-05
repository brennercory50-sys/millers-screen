import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Pool Enclosure & Screen Room Resources',
  description: 'Guides, pricing breakdowns, and maintenance tips for pool enclosures and screen rooms in Volusia County. Written by the team at Miller\'s Screen.',
  alternates: { canonical: 'https://millersscreen.com/blog' },
  openGraph: {
    title: "Miller's Screen — Resources & Guides",
    description: 'Guides, pricing breakdowns, and maintenance tips for pool enclosures and screen rooms in Volusia County.',
  },
}

export default function BlogIndexPage() {
  return (
    <main className="bg-bg-0 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-accent-red font-bold text-xs sm:text-sm tracking-[3px] uppercase mb-3">Resources</p>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4">
            Guides &amp; Insights
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Real pricing, buying guides, and maintenance tips from 40+ years of installing screen enclosures in Volusia County.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-panel border border-line rounded-xl overflow-hidden hover:border-accent-red/50 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-accent-red text-white text-xs font-semibold rounded-md">
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted mb-3">
                  <Clock className="w-3 h-3" />
                  <span>{post.readMinutes} min read</span>
                </div>
                <h2 className="text-lg font-bold text-text-primary mb-2 leading-tight group-hover:text-accent-red transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-1 text-accent-red text-sm font-semibold">
                  Read article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 bg-panel border border-line rounded-xl text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            Have a question we haven&apos;t covered?
          </h2>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Call us or request a free quote — we&apos;ll walk you through any aspect of the project, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact#form" className="btn-primary px-6 py-3">
              Request a Free Quote
            </Link>
            <a href="tel:+13867568770" className="btn-secondary px-6 py-3">
              Call 386-756-8770
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
