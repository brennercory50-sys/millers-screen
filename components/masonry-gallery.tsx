'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/lib/projects'

interface MasonryGalleryProps {
  projects: Project[]
  onImageClick: (project: Project) => void
}

export default function MasonryGallery({ projects, onImageClick }: MasonryGalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-muted">
        No projects match your filters.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ImageCard 
              project={project} 
              onClick={() => onImageClick(project)} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ImageCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md group cursor-pointer bg-panel"
    >
      <Image
        src={project.image}
        alt={project.label}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white font-semibold text-sm md:text-base">
          {project.category}
        </span>
        <span className="text-white/80 text-xs md:text-sm">
          {project.label}
        </span>
      </div>
      {project.beforeImage && (
        <div className="absolute top-3 right-3 bg-accent-red text-white text-xs font-medium px-2.5 py-1 rounded-md">
          Before/After
        </div>
      )}
    </button>
  )
}

