'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RefreshCw, Home, ArrowRight, Star } from 'lucide-react'

const packages = [
  {
    title: 'Rescreen',
    description: 'Full panel replacement for worn-out or damaged screens.',
    price: 'Custom Quote',
    icon: RefreshCw,
    features: ['Full panel replacement', 'New spline & hardware', 'Screen material options', 'Fast turnaround'],
    ctaText: 'Get Free Estimate',
    href: '/contact#form',
    highlighted: false,
  },
  {
    title: 'Full Enclosure',
    description: 'Complete build or rebuild of your pool or patio enclosure.',
    price: 'Custom Quote',
    icon: Home,
    features: ['Engineered to FL code', 'Fully permitted', 'In-house crews only', 'Lifetime warranty'],
    ctaText: 'Start My Enclosure',
    href: '/contact#form',
    highlighted: true,
  },
  {
    title: 'MegaView®',
    description: 'Premium cable-supported enclosure for unobstructed views.',
    price: 'Custom Quote',
    icon: Star,
    features: ['Only authorized builder', 'Zero visual posts', 'Modern design', 'Premium finish'],
    ctaText: 'Get MegaView Info',
    href: '/megaview',
    highlighted: false,
  },
]

export default function ServicePackages() {
  return (
    <section className="py-12 md:py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-text-primary mb-3">CHOOSE YOUR SERVICE</h2>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto">
            From quick fixes to full builds — pick what fits your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon
            return (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`relative rounded-xl p-6 md:p-8 h-full flex flex-col ${
                  pkg.highlighted
                    ? 'bg-accent-red/10 border-2 border-accent-red shadow-lg shadow-accent-red/10'
                    : 'bg-panel border border-line'
                }`}>
                  {pkg.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-red text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> MOST POPULAR
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    pkg.highlighted ? 'bg-accent-red' : 'bg-accent-red/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${pkg.highlighted ? 'text-white' : 'text-accent-red'}`} />
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-1">{pkg.title}</h3>
                  <p className="text-accent-red font-semibold text-lg mb-3">{pkg.price}</p>
                  <p className="text-muted text-sm mb-5">{pkg.description}</p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-green-400 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={pkg.href}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-base min-h-[48px] transition-all ${
                      pkg.highlighted
                        ? 'bg-accent-red text-white hover:bg-accent-red-hover'
                        : 'bg-bg-1 text-text-primary border border-line hover:border-accent-red/50'
                    }`}
                  >
                    {pkg.ctaText} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-center text-xs text-muted mt-3">
                    Licensed • Insured • Local Crew
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
