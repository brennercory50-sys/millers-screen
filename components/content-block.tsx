'use client'

import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContentBlockProps {
  title: string
  copy?: string
  bullets?: string[]
}

export default function ContentBlock({ title, copy, bullets }: ContentBlockProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-text-primary mb-4">{title ?? ''}</h2>
          {copy && (
            <p className="text-muted text-lg leading-relaxed">{copy}</p>
          )}
          {bullets && bullets?.length > 0 && (
            <ul className="space-y-3 mt-4">
              {bullets?.map?.((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-red/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent-red" />
                  </div>
                  <span className="text-muted text-lg">{bullet ?? ''}</span>
                </li>
              )) ?? null}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  )
}
