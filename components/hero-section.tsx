'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Phone } from 'lucide-react'

interface HeroSectionProps {
  headline: string
  headlineLine2?: string
  subheadline: string
  image: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  trustBullets?: string[]
  isHomepage?: boolean
  urgencyBadge?: string
}

export default function HeroSection({
  headline,
  headlineLine2,
  subheadline,
  image,
  ctaPrimary,
  ctaSecondary,
  trustBullets,
  isHomepage,
  urgencyBadge = 'Free Estimates • Licensed & Insured',
}: HeroSectionProps) {
  return (
    <section className={`relative ${isHomepage ? 'min-h-[85vh] md:min-h-[90vh]' : 'min-h-[60vh] md:min-h-[70vh]'} flex items-center`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image ?? ''}
          alt={headline ?? ''}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-0 via-bg-0/90 to-bg-0/40" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-16 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-2">
            {headline ?? ''}
          </h1>
          {headlineLine2 && (
            <h1 className="text-text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 md:mb-6">
              {headlineLine2}
            </h1>
          )}
          <p className="text-base md:text-xl text-muted mb-6 md:mb-8 leading-relaxed max-w-xl">
            {subheadline ?? ''}
          </p>

          {/* Trust Bullets */}
          {trustBullets && trustBullets.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 md:mb-8">
              {trustBullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm md:text-base text-text-primary font-medium">{bullet}</span>
                </div>
              ))}
            </div>
          )}

          {isHomepage && (
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              {urgencyBadge}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {ctaPrimary && (
              <Link href={ctaPrimary?.href ?? '#'} className="btn-primary text-base md:text-lg px-8 py-4 min-h-[52px] text-center">
                {ctaPrimary?.label ?? ''}
              </Link>
            )}
            {ctaSecondary && (
              isHomepage ? (
                <a href="tel:386-756-8770" className="btn-secondary text-base md:text-lg px-8 py-4 min-h-[52px] text-center flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  {ctaSecondary?.label ?? ''}
                </a>
              ) : (
                <Link href={ctaSecondary?.href ?? '#'} className="btn-secondary text-base md:text-lg px-8 py-4 min-h-[52px] text-center">
                  {ctaSecondary?.label ?? ''}
                </Link>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
