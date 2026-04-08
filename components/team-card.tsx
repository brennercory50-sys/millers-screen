'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { TeamMember } from '@/lib/team'
import { useTeamModal } from '@/context/TeamModalContext'

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  const { openModal } = useTeamModal()
  const hasGallery = member.gallery && member.gallery.length > 0
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const card = cardRef.current
    if (card) {
      card.classList.add('reveal-on-scroll')
      observer.observe(card)
    }

    return () => {
      if (card) observer.unobserve(card)
    }
  }, [])

  const handleClick = () => {
    openModal(member)
  }

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:ring-accent-red hover:shadow-lg hover:shadow-accent-red/20 w-full min-w-[140px] max-w-[200px] mx-auto"
      style={{
        background: 'linear-gradient(145deg, #1e1e1e, #161616)',
        border: '1px solid rgba(255,255,255,.06)',
        boxShadow: '0 4px 20px rgba(0,0,0,.4), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.04)',
        transition: 'transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.5), 0 2px 8px rgba(180,30,30,.15), inset 0 1px 0 rgba(255,255,255,.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.4), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.04)'
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={member.imagePosition ? 'object-cover transition-all duration-700 group-hover:scale-105' : 'object-cover object-[50%_20%] transition-all duration-700 group-hover:scale-105'}
          style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/30 to-transparent" />
        <div className="absolute inset-0 pointer-events-none" 
          style={{
            background: 'linear-gradient(to top, #161616 0%, transparent 40%)'
          }} 
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/95 to-bg-0/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-base font-bold text-text-primary mb-0.5 leading-tight">{member.name}</h3>
          <p className={`text-xs font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'} mb-1`}>
            {member.role}
          </p>
          {member.subtitle && <p className="text-[10px] text-muted mb-1">{member.subtitle}</p>}
          <p className="text-xs text-muted leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-sm font-bold text-text-primary leading-tight">{member.name}</h3>
        <p className={`text-xs font-medium ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'} truncate`}>
          {member.role}
        </p>
        {member.subtitle && <p className="text-[10px] text-muted mt-0.5 truncate">{member.subtitle}</p>}
      </div>

      {hasGallery && (
        <div 
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 opacity-80 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, #d42020, #9a1515)',
            boxShadow: '0 2px 8px rgba(200,20,20,.4)',
            transition: 'transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)'
            e.currentTarget.style.boxShadow = '0 3px 12px rgba(200,20,20,.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(200,20,20,.4)'
          }}
        >
          <span className="text-white text-[10px] font-bold">+</span>
        </div>
      )}
    </div>
  )
}
