'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MegaviewBanner() {
  return (
    <section className="py-16 md:py-20 bg-bg-0">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-red/10 rounded-full mb-6">
              <Award className="w-4 h-4 text-accent-red" />
              <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Exclusive Builder</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-tight mb-6">
              THE ONLY AUTHORIZED<br />
              <span className="text-accent-red">MEGAVIEW®</span> BUILDER<br />
              IN VOLUSIA COUNTY
            </h2>
            
            <p className="text-muted text-lg mb-8 max-w-md">
              MegaView® removes vertical posts and horizontal railing found on traditional enclosures, giving you a cleaner view of your surroundings.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/megaview" className="btn-primary">
                Learn About MegaView®
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/showcase" className="btn-secondary">
                See Examples
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/megaview-1.jpg"
                alt="MegaView enclosure with open views"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Corner accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-red rounded-lg flex flex-col items-center justify-center shadow-xl">
              <span className="text-white text-xs font-medium">OPEN</span>
              <span className="text-white text-2xl font-black">VIEW</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
