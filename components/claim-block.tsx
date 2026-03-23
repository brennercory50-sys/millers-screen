'use client'

import { Award } from 'lucide-react'
import { motion } from 'framer-motion'

interface ClaimBlockProps {
  title: string
  copy: string
}

export default function ClaimBlock({ title, copy }: ClaimBlockProps) {
  return (
    <section className="py-16 md:py-20 bg-bg-1">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-red/10 rounded-full mb-6">
            <Award className="w-8 h-8 text-accent-red" />
          </div>
          <h2 className="text-text-primary mb-4">{title ?? ''}</h2>
          <p className="text-muted text-lg leading-relaxed">{copy ?? ''}</p>
        </motion.div>
      </div>
    </section>
  )
}
