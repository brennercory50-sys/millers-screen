'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Images, Map } from 'lucide-react'
import { clsx } from 'clsx'
import JobGallery from './JobGallery'
import JobMap from './JobMap'
import type { CompanyCamPhoto, JobLocation } from '@/lib/companycam'

interface JobsTabsProps {
  photos: CompanyCamPhoto[]
  locations: JobLocation[]
  loading?: boolean
}

export default function JobsTabs({ photos, locations, loading }: JobsTabsProps) {
  const tabs = [
    { name: 'Gallery', icon: Images },
    { name: 'Map', icon: Map },
  ]

  return (
    <Tab.Group>
      <Tab.List className="flex gap-2 p-1 bg-panel rounded-lg w-fit mb-8">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all outline-none',
                selected
                  ? 'bg-accent-red text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              )
            }
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <JobGallery photos={photos} loading={loading} />
        </Tab.Panel>
        <Tab.Panel>
          <JobMap locations={locations} loading={loading} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
