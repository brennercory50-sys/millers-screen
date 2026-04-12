'use client'

import JobGrid from './JobGrid'
import type { ProjectCard } from '@/lib/companycam'

interface JobsListProps {
  projects: ProjectCard[]
  loading?: boolean
}

// Thin wrapper for backwards compatibility
export default function JobsList({ projects, loading = false }: JobsListProps) {
  return <JobGrid projects={projects} loading={loading} />
}
