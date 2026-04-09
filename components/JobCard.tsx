'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, MapPin, Wrench, User } from 'lucide-react'
import type { JobProject, JobType } from '@/lib/companycam'
import { getJobTypeLabel } from '@/lib/companycam'

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

function getJobTypeColor(type: JobType): string {
  switch (type) {
    case 'pool-enclosure': return 'bg-blue-500/20 text-blue-400'
    case 'screen-room': return 'bg-green-500/20 text-green-400'
    case 'concrete-pavers': return 'bg-amber-500/20 text-amber-400'
    case 'repairs': return 'bg-red-500/20 text-red-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}

interface JobCardProps {
  job: JobProject
  index: number
  onClick?: () => void
}

export default function JobCard({ job, index, onClick }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-panel rounded-lg overflow-hidden border border-white/06 hover:border-accent-red/50 transition-colors">
        <div className="relative aspect-[4/3]">
          <Image
            src={job.latestPhotoUrl}
            alt={job.projectName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
              {getJobTypeLabel(job.jobType)}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span className="font-medium text-sm">{job.crew}</span>
              </div>
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(job.latestPhotoDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-accent-red flex-shrink-0 mt-0.5" />
            <span className="text-text-secondary text-sm line-clamp-2">
              {job.address}
            </span>
          </div>
          {job.photoCount > 1 && (
            <div className="mt-2 text-text-secondary/60 text-xs">
              {job.photoCount} photos
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
