'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Camera, Clock } from 'lucide-react'
import type { ProjectCard } from '@/lib/companycam'
import { formatTimestamp } from '@/lib/companycam'

interface JobCardProps {
  project: ProjectCard
  index: number
}

export default function JobCard({ project, index }: JobCardProps) {
  const fallbackImage = '/images/placeholder-job.jpg'

  return (
    <motion.a
      href={project.publicUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="group block"
    >
      <div className="relative rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm hover:border-accent-red/40 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-accent-red/10">
        {/* Cover image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.coverImageUrl || fallbackImage}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-xs font-semibold rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Live
            </span>
          </div>

          {/* Photo count */}
          {project.photoCount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium rounded-full">
                <Camera className="w-3 h-3" />
                {project.photoCount}
              </span>
            </div>
          )}

          {/* Bottom overlay info */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 drop-shadow-lg">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 space-y-2.5">
          {project.address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent-red flex-shrink-0 mt-0.5" />
              <span className="text-muted text-xs leading-relaxed line-clamp-2">
                {project.address}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-muted/60 text-xs">
              <Clock className="w-3 h-3" />
              <span>{formatTimestamp(project.updatedAt)}</span>
            </div>
            <span className="text-xs text-muted/50">
              {project.creatorName}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
