'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeftRight } from 'lucide-react'
import { Project } from '@/lib/projects'

interface ImageModalProps {
  project: Project | null
  onClose: () => void
  onViewSimilar: (style: Project['style'], build: Project['build']) => void
}

export default function ImageModal({ project, onClose, onViewSimilar }: ImageModalProps) {
  const [showBefore, setShowBefore] = useState(false)

  const hasBeforeAfter = project?.beforeImage

  const handleViewSimilar = () => {
    if (project) {
      onViewSimilar(project.style, project.build)
      onClose()
    }
  }

  const handleClose = () => {
    setShowBefore(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
          >
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative flex-1 min-h-0 bg-black rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${project.id}-${showBefore}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={showBefore ? project.beforeImage! : project.image}
                    alt={showBefore ? `${project.label} - Before` : project.label}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {hasBeforeAfter && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={() => setShowBefore(!showBefore)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded hover:bg-white/20 transition-colors"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                    {showBefore ? 'View After' : 'View Before'}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-white text-xl font-semibold">
                  {project.label}
                </h3>
                <p className="text-muted text-sm">
                  {project.category}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleViewSimilar}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent-red text-white rounded hover:bg-accent-red-hover transition-colors"
              >
                View Similar Builds
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
