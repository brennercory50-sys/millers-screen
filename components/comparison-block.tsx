'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface ComparisonBlockProps {
  title: string
  leftLabel: string
  leftImage: string
  rightLabel: string
  rightImage: string
  bullets: string[]
}

export default function ComparisonBlock({
  title,
  leftLabel,
  leftImage,
  rightLabel,
  rightImage,
  bullets,
}: ComparisonBlockProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-primary text-center mb-12"
        >
          {title ?? ''}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-panel">
              <Image
                src={leftImage ?? ''}
                alt={leftLabel ?? ''}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-bg-0/80 backdrop-blur-sm rounded-md">
              <span className="text-sm font-semibold text-text-primary">{leftLabel ?? ''}</span>
            </div>
          </motion.div>

          {/* MegaView */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-panel ring-2 ring-accent-red">
              <Image
                src={rightImage ?? ''}
                alt={rightLabel ?? ''}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-red rounded-md">
              <span className="text-sm font-semibold text-white">{rightLabel ?? ''}</span>
            </div>
          </motion.div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {bullets?.map?.((bullet, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent-red/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-accent-red" />
              </div>
              <span className="text-text-primary font-medium">{bullet ?? ''}</span>
            </div>
          )) ?? null}
        </motion.div>
      </div>
    </section>
  )
}
