'use client'

import { useState } from 'react'
import Image from 'next/image'
import BioModal from './bio-modal'
import EmployeeGallery from './employee-gallery'

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

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const [bioModalOpen, setBioModalOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryStartIndex, setGalleryStartIndex] = useState(0)

  const galleryImages = member.galleryImages || []
  const hasGallery = galleryImages.length > 0

  const allImages = [member.image, ...galleryImages]

  const handleCardClick = () => {
    setBioModalOpen(true)
  }

  const handleGalleryImageClick = (index: number) => {
    setGalleryStartIndex(index + 1)
    setGalleryOpen(true)
    setBioModalOpen(false)
  }

  const handleBioModalClose = () => {
    setBioModalOpen(false)
  }

  return (
    <>
      <div className="group">
        <div
          onClick={handleCardClick}
          className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-panel ${member.memorial ? 'ring-2 ring-accent-red' : 'ring-1 ring-line'} transition-all duration-500 md:hover:ring-accent-red md:hover:shadow-lg md:hover:shadow-accent-red/20 cursor-pointer`}
        >
          <div className="absolute inset-0">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top transition-all duration-700 md:group-hover:scale-110 md:group-hover:brightness-[0.35]"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/30 to-transparent opacity-100 md:group-hover:opacity-0 transition-opacity duration-500" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/95 to-bg-0/80 opacity-0 md:group-hover:opacity-100 transition-all duration-500 hidden md:flex flex-col justify-end p-5">
            <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-lg font-bold text-text-primary mb-1">{member.name}</h3>
              <p className={`text-sm font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'} mb-2`}>
                {member.role}
              </p>
              {member.subtitle && <p className="text-xs text-muted mb-2">{member.subtitle}</p>}
              <p className="text-sm text-muted leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 md:group-hover:opacity-0 opacity-100">
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
        </div>

        <button
          onClick={handleCardClick}
          className="mt-3 w-full text-center text-sm font-medium text-accent-red hover:text-accent-red/80 transition-colors md:opacity-0 md:group-hover:opacity-100"
        >
          View Bio
        </button>
      </div>

      <BioModal
        member={member}
        isOpen={bioModalOpen}
        onClose={handleBioModalClose}
        onGalleryImageClick={hasGallery ? handleGalleryImageClick : undefined}
      />

      <EmployeeGallery
        images={allImages}
        memberName={member.name}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryStartIndex}
      />
    </>
  )
}
