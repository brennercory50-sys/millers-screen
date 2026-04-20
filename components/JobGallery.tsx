'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, MapPin, ImageIcon } from 'lucide-react'
import type { CompanyCamPhoto } from '@/lib/companycam'
import { formatTimestamp } from '@/lib/companycam'

interface JobGalleryProps {
  photos: CompanyCamPhoto[]
  loading?: boolean
}

export default function JobGallery({ photos, loading }: JobGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<CompanyCamPhoto | null>(null)

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-lg bg-panel animate-pulse" />
        ))}
      </div>
    )
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-16">
        <ImageIcon className="w-16 h-16 mx-auto text-text-secondary mb-4" />
        <p className="text-text-secondary text-lg">No job photos yet</p>
        <p className="text-text-secondary/70 text-sm mt-2">
          Photos from your active jobs will appear here
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-panel">
              <Image
                src={photo.thumbnail_url || photo.url}
                alt={photo.title || `Job photo ${photo.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium truncate">
                  {photo.project?.name || 'Untitled Project'}
                </p>
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(photo.created_at)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setSelectedPhoto(null)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title || `Job photo ${selectedPhoto.id}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-white">
              <h3 className="text-lg font-semibold">
                {selectedPhoto.project?.name || 'Untitled Project'}
              </h3>
              {selectedPhoto.project?.address && (
                <div className="flex items-center gap-1 text-white/70 text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {[
                      selectedPhoto.project.address,
                      selectedPhoto.project.city,
                      selectedPhoto.project.state,
                      selectedPhoto.project.zip,
                    ].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1 text-white/60 text-sm mt-2">
                <Clock className="w-4 h-4" />
                <span>{formatTimestamp(selectedPhoto.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
