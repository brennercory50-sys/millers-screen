'use client'

import { useMemo, useState } from 'react'
import { Filter, X } from 'lucide-react'
import JobCard from './JobCard'
import JobSkeleton from './JobSkeleton'
import type { ProjectCard } from '@/lib/companycam'

interface JobGridProps {
  projects: ProjectCard[]
  loading: boolean
}

type SortOption = 'recent' | 'oldest' | 'name'

export default function JobGrid({ projects, loading }: JobGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [crewFilter, setCrewFilter] = useState('all')

  const crewMembers = useMemo(() => {
    const members = new Set(projects.map(p => p.creatorName).filter(Boolean))
    return Array.from(members).sort()
  }, [projects])

  const filtered = useMemo(() => {
    let result = [...projects]

    if (crewFilter !== 'all') {
      result = result.filter(p => p.creatorName === crewFilter)
    }

    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => b.updatedAt - a.updatedAt)
        break
      case 'oldest':
        result.sort((a, b) => a.updatedAt - b.updatedAt)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [projects, sortBy, crewFilter])

  const hasFilters = crewFilter !== 'all' || sortBy !== 'recent'

  const clearFilters = () => {
    setCrewFilter('all')
    setSortBy('recent')
  }

  if (loading) {
    return <JobSkeleton />
  }

  return (
    <div>
      {/* Filters */}
      {projects.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-muted">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>

          {crewMembers.length > 1 && (
            <select
              value={crewFilter}
              onChange={(e) => setCrewFilter(e.target.value)}
              className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-red transition-colors"
            >
              <option value="all">All Crew</option>
              {crewMembers.map((crew) => (
                <option key={crew} value={crew}>{crew}</option>
              ))}
            </select>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-red transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="name">By Name</option>
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-accent-red hover:text-accent-red-hover transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted text-lg mb-2">No matching projects</p>
          {hasFilters && (
            <button onClick={clearFilters} className="text-accent-red hover:underline text-sm">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((project, index) => (
              <JobCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <p className="text-center text-muted/50 text-sm mt-8">
            Showing {filtered.length} of {projects.length} projects
          </p>
        </>
      )}
    </div>
  )
}
