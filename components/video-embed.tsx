'use client'

import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

interface VideoEmbedProps {
  title: string
  videoUrl: string
}

export default function VideoEmbed({ title, videoUrl }: VideoEmbedProps) {
  return (
    <section className="py-16 md:py-20 bg-bg-1">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-accent-red" />
            <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Video</span>
          </div>
          <h2 className="text-text-primary">{title ?? ''}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-lg overflow-hidden bg-panel max-w-4xl mx-auto"
        >
          <iframe
            src={videoUrl ?? ''}
            title={title ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
