'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Pool Enclosures',
    copy: 'Strong, clean lines. Built to Florida wind standards. Fully permitted.',
    href: '/pool-enclosures',
    image: '/projects/project-72554.jpg',
  },
  {
    title: 'Screen Rooms',
    copy: 'Comfortable, bug-free living space with a premium finish.',
    href: '/screen-rooms',
    image: '/projects/project-72561.jpg',
  },
  {
    title: 'MegaView® Enclosures',
    copy: 'The open-view enclosure option designed to reduce visual posts.',
    href: '/megaview',
    image: '/images/megaview-1.jpg',
  },
]

export default function ServiceTiles() {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-text-primary mb-12"
        >
          Build the outdoor space you actually use.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services?.map?.((service, index) => (
            <motion.div
              key={service?.title ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={service?.href ?? '#'} className="group block card h-full">
                <div className="relative aspect-[4/3] rounded-img overflow-hidden mb-4">
                  <Image
                    src={service?.image ?? ''}
                    alt={service?.title ?? ''}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {service?.title ?? ''}
                </h3>
                <p className="text-muted text-sm mb-4">
                  {service?.copy ?? ''}
                </p>
                <span className="inline-flex items-center gap-1 text-accent-red font-medium text-sm group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          )) ?? null}
        </div>
      </div>
    </section>
  )
}
