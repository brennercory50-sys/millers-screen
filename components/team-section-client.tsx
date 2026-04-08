'use client'

import { useTeamModal } from '@/context/TeamModalContext'
import { TEAM_DATA, TeamCategory, TeamMember } from '@/lib/team'
import TeamCard from '@/components/team-card'
import EmployeeModal from '@/components/employee-modal'
import { AnimatePresence } from 'framer-motion'
import { Users, Award, Briefcase, Wrench, Building, HardHat } from 'lucide-react'

const iconMap: Record<TeamCategory, typeof Award> = {
  'Leadership': Award,
  'Office & Sales': Briefcase,
  'Installation Crew': Wrench,
  'Concrete Division': HardHat,
  'Shop Crew': Building,
  'Helpers': Users,
}

function TeamSection({ title, icon: Icon, members }: { title: TeamCategory; icon: typeof Award; members: TeamMember[] }) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-accent-red" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-text-primary uppercase tracking-wide leading-tight">{title}</h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-5">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export default function TeamSectionClient() {
  const { selectedMember, closeModal } = useTeamModal()

  return (
    <>
      <section id="team" className="py-16 md:py-24 bg-bg-1">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-red" />
              </div>
              <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Our Team</span>
            </div>
            <h2 className="text-text-primary text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">MEET THE PEOPLE BEHIND THE WORK</h2>
            <p className="text-muted mt-3 max-w-2xl mx-auto">
              <span className="hidden md:inline">Click any team member to learn more about them</span>
              <span className="md:hidden">Tap any team member to read their bio</span>
            </p>
          </div>

          {TEAM_DATA.map((section) => {
            const Icon = iconMap[section.title]
            return (
              <TeamSection
                key={section.title}
                title={section.title}
                icon={Icon}
                members={section.members}
              />
            )
          })}
        </div>
      </section>

      <AnimatePresence>
        {selectedMember && (
          <EmployeeModal
            member={selectedMember}
            isOpen={true}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  )
}
