'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const bullets = [
  'Stainless steel fasteners always used',
  'Expert layout & design',
  'Committed to customer satisfaction',
  'No subcontracting',
  'State certified contractor',
  'Quality control systems',
  'Prompt and courteous service',
  'Fair pricing',
  'Family owned & operated',
  'Locally owned',
]

export default function FeatureBlock() {
  return (
    <section className="py-16 md:py-24 bg-bg-1">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-text-primary mb-8">
              Why homeowners choose Miller's Screen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bullets?.map?.((bullet, index) => (
                <motion.div
                  key={bullet ?? index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-accent-red/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent-red" />
                  </div>
                  <span className="text-sm text-muted">{bullet ?? ''}</span>
                </motion.div>
              )) ?? null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-img overflow-hidden"
          >
            <Image
              src="/projects/project-72563.jpg"
              alt="Miller's Screen professional team"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
