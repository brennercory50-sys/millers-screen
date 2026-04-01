'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TeamMember {
  id?: string
  name: string
  role: string
  subtitle?: string
  image: string
  memorial?: boolean
  bio?: string
  galleryImages?: string[]
}

interface BioModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
  onGalleryImageClick?: (index: number) => void
}

export default function BioModal({ member, isOpen, onClose, onGalleryImageClick }: BioModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!member) return null

  const galleryImages = member.galleryImages || []
  const showGallery = galleryImages.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-panel rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <div className="aspect-[4/3] md:aspect-[16/10] relative rounded-t-2xl overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 text-white/80 hover:text-white transition-colors bg-black/30 hover:bg-black/50 rounded-full md:top-4 md:right-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 md:p-6">
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-1">{member.name}</h2>
                <p className={`text-sm font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'}`}>
                  {member.role}
                </p>
                {member.subtitle && (
                  <p className="text-xs text-muted mt-1">{member.subtitle}</p>
                )}
              </div>

              {member.bio && (
                <p className="text-muted leading-relaxed text-sm md:text-base">{member.bio}</p>
              )}

                  {showGallery && (
                    <div className="mt-6 pt-6 border-t border-line">
                      <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4">
                        More Photos
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {galleryImages.slice(0, 4).map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => onGalleryImageClick?.(idx)}
                            className="aspect-square relative rounded-lg overflow-hidden bg-bg-1 ring-1 ring-line focus:outline-none focus:ring-2 focus:ring-accent-red"
                          >
                            <Image
                              src={img}
                              alt={`${member.name} photo ${idx + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 33vw, 15vw"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
