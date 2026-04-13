'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiMwRjEzMTgiLz48L3N2Zz4='

const projects = [
  {
    image: '/projects/project-122978.jpg',
    alt: 'Pool enclosure project',
  },
  {
    image: '/projects/project-72561.jpg',
    alt: 'Screen room project',
  },
  {
    image: '/images/megaview-1.jpg',
    alt: 'MegaView enclosure',
  },
  {
    image: '/projects/project-72555.jpg',
    alt: 'Premium pool enclosure',
  },
]

export default function GalleryPreview() {
  return (
    <section className="py-12 md:py-16 bg-bg-1">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-text-primary"
          >
            More Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/showcase" className="inline-flex items-center gap-2 text-accent-red font-semibold hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4">
          {projects?.map?.((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href="/showcase" className="block">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-panel">
                  <Image
                    src={project?.image ?? ''}
                    alt={project?.alt ?? ''}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          )) ?? null}
        </div>
      </div>
    </section>
  )
}
