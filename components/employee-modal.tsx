'use client'

import { useEffect, useRef, useState } from 'react'
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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const handleBackdropClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleBackdropClick)
    return () => document.removeEventListener('mousedown', handleBackdropClick)
  }, [isOpen, onClose])

  if (!isMounted || !isOpen || !member) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        />
        
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-panel rounded-2xl overflow-hidden shadow-2xl border border-line"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-72 md:h-80 bg-bg-0">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{member.name}</h2>
              <p className={`text-base font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'}`}>
                {member.role}
              </p>
              {member.subtitle && (
                <p className="text-sm text-white/70 mt-1">{member.subtitle}</p>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">About</h3>
              <p className="text-text-primary leading-relaxed">{member.bio}</p>
            </div>

            {member.specialties && member.specialties.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-accent-red/10 text-accent-red text-sm rounded-full font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.gallery && member.gallery.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Gallery</h3>
                <div className="grid grid-cols-3 gap-3">
                  {member.gallery.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-bg-0">
                      <Image
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover"
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