'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Users, Award, ArrowRight } from 'lucide-react'
import HeroLeadForm from './hero-lead-form'

const trustBadges = [
  { icon: Award, label: '40+', text: 'YEARS EXPERIENCE' },
  { icon: Users, label: '', text: 'IN-HOUSE CREWS NOT SUBCONTRACTORS' },
  { icon: Shield, label: '', text: 'LICENSED & INSURED CBC#1262142' },
]

export default function HomeHero() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className="relative min-h-[60vh] lg:min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero.jpg"
          alt="Custom pool enclosure by Miller's Screen"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-0 via-bg-0/85 to-bg-0/50" />
        <div
          className="hero-glow"
          style={{ '--mouse-x': `${mousePosition.x}%`, '--mouse-y': `${mousePosition.y}%` } as React.CSSProperties}
        />
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
              <span className="text-text-primary block">QUALITY YOU CAN SEE.</span>
              <span className="text-accent-red block">BUILT TO LAST.</span>
            </h1>

            <p className="text-base md:text-lg text-muted mb-8 max-w-lg leading-relaxed">
              In-house crews. Top-quality materials.<br className="hidden sm:block" />
              Results that speak for themselves.
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
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact#form"
                className="btn-primary text-base md:text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2"
              >
                GET MY FREE QUOTE
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/showcase"
                className="btn-secondary text-base md:text-lg px-8 py-4 min-h-[52px] text-center"
              >
                VIEW OUR PROJECTS
              </Link>
            </div>
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
