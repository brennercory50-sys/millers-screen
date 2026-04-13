'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <section className="py-16 md:py-20">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-primary"
          >
            Recent Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/showcase" className="inline-flex items-center gap-2 text-accent-red font-semibold hover:gap-3 transition-all">
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
