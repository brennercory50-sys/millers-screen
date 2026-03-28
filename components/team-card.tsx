'use client'

import { useState } from 'react'
import Image from 'next/image'
import EmployeeGallery from './employee-gallery'

interface TeamMember {
  name: string
  role: string
  subtitle?: string
  image: string
  memorial?: boolean
  bio?: string
  galleryImages?: string[]
}

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)

  const allImages = [member.image, ...(member.galleryImages || [])]
  const hasGallery = (member.galleryImages?.length || 0) > 0

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      setExpanded(prev => !prev)
    }
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasGallery) {
      setGalleryOpen(true)
    }
  }

  const handleImageTouch = (e: React.TouchEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <div className="group">
        <div
          onClick={handleClick}
          className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-panel ${member.memorial ? 'ring-2 ring-accent-red' : 'ring-1 ring-line'} transition-all duration-500 md:hover:ring-accent-red md:hover:shadow-lg md:hover:shadow-accent-red/20 ${expanded ? 'ring-accent-red shadow-lg shadow-accent-red/20 cursor-pointer' : 'cursor-pointer md:cursor-default'}`}
        >
          <div
            onClick={handleImageClick}
            onTouchEnd={handleImageTouch}
            className="absolute inset-0"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className={`object-cover object-top transition-all duration-700 md:group-hover:scale-110 md:group-hover:brightness-[0.35] ${expanded ? 'scale-110 brightness-[0.35]' : ''}`}
            />
          </div>
          
          <div className={`absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/30 to-transparent transition-opacity duration-500 md:group-hover:opacity-0 ${expanded ? 'opacity-0' : 'opacity-100'}`} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/95 to-bg-0/80 opacity-0 md:group-hover:opacity-100 transition-all duration-500 hidden md:flex flex-col justify-end p-5">
            <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-lg font-bold text-text-primary mb-1">{member.name}</h3>
              <p className={`text-sm font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'} mb-2`}>
                {member.role}
              </p>
              {member.subtitle && <p className="text-xs text-muted mb-2">{member.subtitle}</p>}
              <p className="text-sm text-muted leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>

          <div className={`absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/95 to-bg-0/80 transition-all duration-500 flex flex-col justify-end p-4 md:hidden ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h3 className="text-base font-bold text-text-primary mb-1">{member.name}</h3>
            <p className={`text-sm font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'} mb-1`}>
              {member.role}
            </p>
            {member.subtitle && <p className="text-xs text-muted mb-1">{member.subtitle}</p>}
          </div>
          
          <div className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 md:group-hover:opacity-0 ${expanded ? 'opacity-0' : 'opacity-100'}`}>
            <h3 className="text-base md:text-lg font-bold text-text-primary">{member.name}</h3>
            <p className={`text-sm font-medium ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'}`}>
              {member.role}
            </p>
            {member.subtitle && <p className="text-xs text-muted mt-0.5">{member.subtitle}</p>}
          </div>
          
          {hasGallery && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-accent-red opacity-0 md:group-hover:opacity-100 hidden md:flex">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          )}

          <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 md:hidden ${expanded ? 'bg-accent-red opacity-100' : 'bg-white/20 opacity-70'}`}>
            <span className="text-white text-xs font-bold">{expanded ? '−' : '+'}</span>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="bg-panel rounded-lg p-4 border border-line">
            <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
          </div>
        </div>
      </div>

      <EmployeeGallery
        images={allImages}
        memberName={member.name}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  )
}
