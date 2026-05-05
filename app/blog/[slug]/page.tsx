import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, ChevronLeft } from 'lucide-react'
import { BLOG_POSTS, getBlogPost, getAllBlogSlugs } from '@/lib/blog'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug)
  if (!post) return { title: 'Post not found' }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://millersscreen.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.coverImage }],
    },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `https://millersscreen.com${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: "Miller's Screen" },
    publisher: {
      '@type': 'Organization',
      name: "Miller's Screen",
      logo: { '@type': 'ImageObject', url: 'https://millersscreen.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://millersscreen.com/blog/${post.slug}` },
  }

  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="bg-bg-0 min-h-screen pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-text-primary transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            All articles
          </Link>

          <div className="mb-6 flex items-center gap-3 text-xs">
            <span className="px-3 py-1 bg-accent-red text-white font-semibold rounded-md">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-muted">
              <Clock className="w-3 h-3" />
              {post.readMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-text-primary mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8">{post.description}</p>

          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="space-y-8 text-text-primary">
            {post.body.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-muted leading-relaxed mb-4 text-base">{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc list-outside space-y-2 text-muted leading-relaxed pl-6 mb-4">
                    {section.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {post.faq && post.faq.length > 0 && (
            <section className="mt-16 pt-10 border-t border-line">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">Frequently asked</h2>
              <div className="space-y-6">
                {post.faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-text-primary mb-2">{item.question}</h3>
                    <p className="text-muted leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 p-8 bg-panel border border-line rounded-xl text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Ready to get a real number for your project?
            </h2>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              We&apos;ll walk the property and give you a fixed quote — no obligation, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact#form" className="btn-primary px-6 py-3">
                Request a Free Quote
              </Link>
              <a href="tel:+13867568770" className="btn-secondary px-6 py-3">
                Call 386-756-8770
              </a>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-line">
              <h2 className="text-xl font-bold text-text-primary mb-6">More articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex gap-4 p-4 bg-panel border border-line rounded-xl hover:border-accent-red/50 transition-colors"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={r.coverImage} alt={r.title} fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary text-sm leading-tight mb-2 line-clamp-2 group-hover:text-accent-red transition-colors">
                        {r.title}
                      </h3>
                      <span className="text-xs text-accent-red flex items-center gap-1">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  )
}
