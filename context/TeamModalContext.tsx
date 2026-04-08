'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { TeamMember } from '@/lib/team'

interface TeamModalContextType {
  selectedMember: TeamMember | null
  openModal: (member: TeamMember) => void
  closeModal: () => void
}

const TeamModalContext = createContext<TeamModalContextType | null>(null)

export function TeamModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const openModal = useCallback((member: TeamMember) => {
    setSelectedMember(member)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedMember(null)
  }, [])

  return (
    <TeamModalContext.Provider value={{ selectedMember, openModal, closeModal }}>
      {children}
    </TeamModalContext.Provider>
  )
}

export function useTeamModal() {
  const context = useContext(TeamModalContext)
  if (!context) {
    throw new Error('useTeamModal must be used within TeamModalProvider')
  }
  return context
}
