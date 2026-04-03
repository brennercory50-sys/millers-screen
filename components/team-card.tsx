'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TeamMember } from '@/lib/team'
import EmployeeModal from '@/components/employee-modal'

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = () => {
    setModalOpen(true)
  }

  return (
    <>
      <div 
        onClick={handleClick}
        className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-panel ring-1 ring-line cursor-pointer transition-all duration-500 hover:ring-accent-red hover:shadow-lg hover:shadow-accent-red/20"
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-all duration-700 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/30 to-transparent" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/95 to-bg-0/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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

        <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-base md:text-lg font-bold text-text-primary">{member.name}</h3>
          <p className={`text-sm font-medium ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'}`}>
            {member.role}
          </p>
          {member.subtitle && <p className="text-xs text-muted mt-0.5">{member.subtitle}</p>}
        </div>
        
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-accent-red/0 opacity-0 group-hover:bg-accent-red group-hover:opacity-100">
          <span className="text-white text-xs font-bold">+</span>
        </div>
      </div>

      <EmployeeModal
        member={member}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}