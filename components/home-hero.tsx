'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Users, Award, ArrowRight, Phone } from 'lucide-react'
import HeroLeadForm from './hero-lead-form'

const trustBadges = [
  { icon: Award, label: '40+', text: 'YEARS EXPERIENCE' },
  { icon: Users, label: '', text: 'IN-HOUSE CREWS ONLY' },
  { icon: Shield, label: '', text: 'LICENSED CBC#1262142' },
]

export default function HomeHero() {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[90vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/home-hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          onPlay={(e) => (e.currentTarget.style.opacity = '1')}
          style={{ opacity: 0, transition: 'opacity 0.6s ease-in' }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-bg-0/95 via-bg-0/80 to-bg-0/50" />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-accent-red font-bold text-xs sm:text-sm tracking-[3px] uppercase mb-4">
              Volusia County&apos;s Trusted Experts
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl font-black leading-[1.05] mb-6">
              <span className="text-text-primary block">POOL ENCLOSURES &amp;</span>
              <span className="text-accent-red block">SCREEN ROOMS DONE RIGHT.</span>
            </h1>

            <p className="text-base md:text-lg text-muted mb-8 max-w-lg leading-relaxed">
              In-house crews. Top-quality materials. Licensed, permitted, and built to Florida code.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 md:gap-5 mb-8">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-accent-red/15 flex items-center justify-center flex-shrink-0">
                      <badge.icon className="w-4 h-4 text-accent-red" />
                    </div>
                    <div>
                      {badge.label && (
                        <span className="text-text-primary font-black text-lg leading-none block">{badge.label}</span>
                      )}
                      <span className="text-[10px] sm:text-xs text-muted font-semibold uppercase tracking-wider leading-tight block">
                        {badge.text}
                      </span>
                    </div>
                  </div>
                  {i < trustBadges.length - 1 && (
                    <div className="hidden md:block w-px h-10 bg-white/15" />
                  )}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Link
                href="/contact#form"
                className="btn-primary text-base md:text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2"
              >
                GET MY FREE QUOTE
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+13867568770"
                className="btn-secondary text-base md:text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                386-756-8770
              </a>
            </div>

            {/* Office hours */}
            <p className="text-xs text-muted/60">
              Mon–Fri 8am–5pm &nbsp;·&nbsp; We answer — no voicemail maze
            </p>
          </motion.div>

          {/* Right Column — Lead Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <HeroLeadForm />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
