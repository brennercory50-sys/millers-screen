'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface CTABlockProps {
  title: string
  cta: {
    label: string
    href: string
  }
}

export default function CTABlock({ title, cta }: CTABlockProps) {
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
          <Link href={cta?.href ?? '#'} className="btn-primary text-lg px-8 py-4">
            {cta?.label ?? ''}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
