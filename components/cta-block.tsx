'use client'

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

interface CTABlockProps {
  title: string
  cta: {
    label: string
    href: string
  }
  showPhone?: boolean
}

export default function CTABlock({ title, cta, showPhone = true }: CTABlockProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-text-primary mb-6">{title ?? ''}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={cta?.href ?? '#'} className="btn-primary text-lg px-8 py-4 min-h-[52px] flex items-center gap-2">
              {cta?.label ?? ''}
              <ArrowRight className="w-5 h-5" />
            </Link>
            {showPhone && (
              <a href="tel:386-756-8770" className="btn-secondary text-lg px-8 py-4 min-h-[52px] flex items-center gap-2">
                <Phone className="w-5 h-5" />
                386-756-8770
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
