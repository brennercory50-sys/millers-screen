'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TeamMember } from '@/lib/team'

interface EmployeeModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}

export default function EmployeeModal({ member, isOpen, onClose }: EmployeeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setImageError(false)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const handleBackdropClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleBackdropClick)
    return () => document.removeEventListener('mousedown', handleBackdropClick)
  }, [isOpen, handleClose])

  if (!isMounted || !isOpen || !member) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        />
        
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          style={{ maxHeight: '90vh' }}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative flex-shrink-0" style={{ height: '280px' }}>
            {!imageError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-bg-1 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent-red/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent-red">
                    {member.name.charAt(0)}
                  </span>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5">{member.name}</h2>
              <p className={`text-sm sm:text-base font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'}`}>
                {member.role}
              </p>
              {member.subtitle && (
                <p className="text-xs sm:text-sm text-white/70 mt-1">{member.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">About</h3>
              <p className="text-text-primary leading-relaxed text-sm sm:text-base">{member.bio}</p>
            </div>

            {member.specialties && member.specialties.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-accent-red/10 text-accent-red text-xs sm:text-sm rounded-full font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.gallery && member.gallery.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Gallery</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {member.gallery.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-bg-0">
                      <Image
                        src={img}
                        alt={`${member.name} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}