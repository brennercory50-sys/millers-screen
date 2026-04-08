'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryGridProps {
  title?: string
  images: string[]
}

export default function GalleryGrid({ title, images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const items = document.querySelectorAll('.gallery-item')
    items.forEach((item) => {
      item.classList.add('reveal-on-scroll')
      observer.observe(item)
    })

    return () => {
      items.forEach((item) => observer.unobserve(item))
    }
  }, [])

  return (
    <section className="py-12 md:py-16">
      <div className="section-container">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-text-primary mb-8"
          >
            {title}
          </motion.h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images?.map?.((image, index) => (
            <motion.button
              key={image ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImage(image ?? null)}
              className="gallery-item relative aspect-[4/3] rounded-xl overflow-hidden group"
              style={{
                background: 'linear-gradient(145deg, #1e1e1e, #161616)',
                border: '1px solid rgba(255,255,255,.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,.4), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.04)',
                transition: 'transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.5), 0 2px 8px rgba(180,30,30,.15), inset 0 1px 0 rgba(255,255,255,.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.4), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.04)'
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image ?? ''}
                  alt={`Project ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, #161616 0%, transparent 40%)'
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.button>
          )) ?? null}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-accent-red transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e?.stopPropagation?.()}
            >
              <Image
                src={selectedImage ?? ''}
                alt="Selected project"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
