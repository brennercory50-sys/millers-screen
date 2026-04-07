'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Award, MapPin, Phone, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import FAQSection from '@/components/faq-section'

const benefits = [
  { icon: Check, text: 'No vertical bars blocking your view' },
  { icon: Check, text: 'Cleaner, more modern appearance' },
  { icon: Check, text: 'Perfect for pools and open backyards' },
  { icon: Check, text: 'Premium upgrade option' },
]

const serviceAreas = [
  'Daytona Beach',
  'Port Orange',
  'New Smyrna Beach',
  'Ormond Beach',
]

export default function MegaviewContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/megaview-1.jpg"
            alt="MegaView enclosure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-0 via-bg-0/90 to-bg-0/30" />
        </div>

        <div className="section-container relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-text-primary text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-4">
              MegaView Screens
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white mb-6">
              No Bars. No Distractions. Just Your View.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/contact#form" className="btn-primary text-lg px-8 py-4 min-h-[52px] text-center">
                Get a Free MegaView Quote
              </Link>
              <Link href="/showcase" className="btn-secondary text-lg px-8 py-4 min-h-[52px] text-center flex items-center justify-center gap-2">
                See Real Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 text-text-primary font-medium">
                <Check className="w-5 h-5 text-green-400" /> No vertical bars
              </span>
              <span className="flex items-center gap-2 text-text-primary font-medium">
                <Check className="w-5 h-5 text-green-400" /> No horizontal rails
              </span>
              <span className="flex items-center gap-2 text-text-primary font-medium">
                <Check className="w-5 h-5 text-green-400" /> Wide open view
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You're Looking At */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/megaview-1.jpg"
                  alt="MegaView enclosure"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-red rounded-md">
                  <span className="text-sm font-bold text-white">MegaView®</span>
                </div>
              </div>
              <p className="text-center text-sm text-muted mt-3">Port Orange install</p>
            </motion.div>

            {/* Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  What You&apos;re Seeing
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-text-primary">Clean open view</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-text-primary">No visual obstruction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-text-primary">Premium finish</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-line pt-8">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  What You Don&apos;t See
                </h2>
                <ul className="space-y-3 text-muted">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-red text-lg">—</span>
                    <span>Extra framing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-red text-lg">—</span>
                    <span>Bars breaking your view</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-red text-lg">—</span>
                    <span>Visual clutter</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Power Positioning */}
      <section className="py-16 md:py-20 bg-accent-red">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Exclusive Authorization
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              We Are The ONLY Company In Volusia County Offering MegaView®
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              This means you&apos;re getting a system most companies cannot install — built for homeowners who want the cleanest possible enclosure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-bg-1">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          >
            Why MegaView®
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-panel rounded-xl p-6 border border-line text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent-red/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-accent-red" />
                </div>
                <p className="text-text-primary font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12"
          >
            See The Difference
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-panel">
                <Image
                  src="/projects/project-72554.jpg"
                  alt="Traditional enclosure"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm font-semibold text-muted uppercase tracking-wider">Traditional</span>
                <p className="text-muted text-sm mt-1">Vertical bars every 10 feet</p>
              </div>
            </motion.div>

            {/* MegaView */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-2 ring-accent-red">
                <Image
                  src="/images/megaview-1.jpg"
                  alt="MegaView enclosure"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">MegaView®</span>
                <p className="text-text-primary text-sm mt-1 font-medium">No bars. Just your view.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-bg-1">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4"
          >
            Installed Across Volusia County
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {serviceAreas.map((area, index) => (
              <span key={index} className="flex items-center gap-2 text-muted">
                <MapPin className="w-4 h-4 text-accent-red" />
                {area}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group"
              >
                <Image
                  src="/images/megaview-1.jpg"
                  alt={`MegaView project ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-bg-0">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary mb-6">
              Want This Look On Your Enclosure?
            </h2>
            <p className="text-xl text-muted mb-10 max-w-xl mx-auto">
              Find out if MegaView is right for your project.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact#form" 
                className="btn-primary text-lg px-10 py-5 min-h-[56px]"
              >
                Check If My Enclosure Can Use MegaView
              </Link>
              <a 
                href="tel:386-756-8770" 
                className="btn-secondary text-lg px-10 py-5 min-h-[56px] flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
