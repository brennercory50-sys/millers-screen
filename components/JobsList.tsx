'use client'

import { useState, useMemo } from 'react'
import { Filter, X } from 'lucide-react'
import JobCard from './JobCard'
import JobMap from './JobMap'
import type { JobProject, JobType } from '@/lib/companycam'
import { getJobTypeLabel } from '@/lib/companycam'

interface JobsListProps {
  jobs: JobProject[]
  locations: any[]
  loading?: boolean
}

type SortOption = 'recent' | 'oldest' | 'crew' | 'job-type'

export default function JobsList({ jobs, locations, loading }: JobsListProps) {
  const [crewFilter, setCrewFilter] = useState<string>('all')
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [showMap, setShowMap] = useState(false)

  const crewMembers = useMemo(() => {
    const members = new Set(jobs.map(j => j.crew))
    return Array.from(members).sort()
  }, [jobs])

  const jobTypes: JobType[] = ['pool-enclosure', 'screen-room', 'concrete-pavers', 'repairs', 'other']

  const filteredJobs = useMemo(() => {
    let result = [...jobs]

    if (crewFilter !== 'all') {
      result = result.filter(j => j.crew === crewFilter)
    }

    if (jobTypeFilter !== 'all') {
      result = result.filter(j => j.jobType === jobTypeFilter)
    }

    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => b.latestPhotoDate - a.latestPhotoDate)
        break
      case 'oldest':
        result.sort((a, b) => a.latestPhotoDate - b.latestPhotoDate)
        break
      case 'crew':
        result.sort((a, b) => a.crew.localeCompare(b.crew))
        break
      case 'job-type':
        result.sort((a, b) => a.jobType.localeCompare(b.jobType))
        break
    }

    return result
  }, [jobs, crewFilter, jobTypeFilter, sortBy])

  const clearFilters = () => {
    setCrewFilter('all')
    setJobTypeFilter('all')
    setSortBy('recent')
  }

  const hasFilters = crewFilter !== 'all' || jobTypeFilter !== 'all' || sortBy !== 'recent'

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-panel rounded-lg overflow-hidden">
            <div className="aspect-[4/3] bg-panel animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-panel animate-pulse rounded w-3/4" />
              <div className="h-3 bg-panel animate-pulse rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>

          <select
            value={crewFilter}
            onChange={(e) => setCrewFilter(e.target.value)}
            className="bg-panel border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-red"
          >
            <option value="all">All Crew Members</option>
            {crewMembers.map((crew) => (
              <option key={crew} value={crew}>{crew}</option>
            ))}
          </select>

          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="bg-panel border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-red"
          >
            <option value="all">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>{getJobTypeLabel(type)}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-panel border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-red"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="crew">By Crew Member</option>
            <option value="job-type">By Job Type</option>
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-accent-red hover:text-accent-red/80"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 lg:ml-auto">
          <button
            onClick={() => setShowMap(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !showMap ? 'bg-accent-red text-white' : 'bg-panel text-text-secondary hover:text-text-primary'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setShowMap(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showMap ? 'bg-accent-red text-white' : 'bg-panel text-text-secondary hover:text-text-primary'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">No jobs found</p>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="mt-2 text-accent-red hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : showMap ? (
        <JobMap locations={locations} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      )}

      {filteredJobs.length > 0 && !showMap && (
        <p className="text-center text-text-secondary/60 text-sm mt-6">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      )}
    </div>
  )
}
