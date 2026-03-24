'use client'

import Link from 'next/link'
import { Phone, ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactStrip() {
  return (
    <section className="py-12 md:py-20 bg-bg-1">
      <div className="section-container">
        {/* Mini testimonial before CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-8 md:mb-10"
        >
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent-red text-accent-red" />
            ))}
          </div>
          <p className="text-muted italic text-base md:text-lg leading-relaxed mb-2">
            &quot;Fast, professional, and affordable. Had my screen fixed in one day.&quot;
          </p>
          <p className="text-sm text-muted">— Verified Volusia County Customer</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-text-primary mb-4">TALK TO A LOCAL EXPERT</h2>
          <p className="text-muted text-base md:text-lg mb-8 max-w-xl mx-auto">
            Get a free estimate on your screen enclosure project. Our team responds within 1 hour.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="tel:386-756-8770" className="btn-secondary flex items-center gap-2 min-h-[52px] w-full sm:w-auto justify-center">
              <Phone className="w-5 h-5" />
              386-756-8770
            </a>
            <Link href="/contact#form" className="btn-primary flex items-center gap-2 min-h-[52px] w-full sm:w-auto justify-center">
              Get My Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
