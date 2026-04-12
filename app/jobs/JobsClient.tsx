'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { RefreshCw, AlertCircle, ChevronLeft, ChevronRight, ImageIcon, Phone } from 'lucide-react'
import Link from 'next/link'
import JobGrid from '@/components/JobGrid'
import JobSkeleton from '@/components/JobSkeleton'
import type { ProjectCard, JobLocation } from '@/lib/companycam'

interface ApiResponse {
  projects: ProjectCard[]
  locations: JobLocation[]
  pagination?: {
    page: number
    perPage: number
    count: number
    hasMore: boolean
  }
  error?: string
}

async function fetchProjects(page: number = 1): Promise<ApiResponse> {
  try {
    const response = await fetch(`/api/companycam?page=${page}&per_page=50`)
    if (!response.ok) {
      const data = await response.json()
      return { projects: [], locations: [], error: data.error || 'Failed to fetch projects' }
    }
    return response.json()
  } catch {
    return { projects: [], locations: [], error: 'Failed to connect to CompanyCam' }
  }
}

export default function JobsClient() {
  const [page, setPage] = useState(1)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchProjects(page),
    refetchInterval: 60000,
  })

  const projects = data?.projects ?? []
  const pagination = data?.pagination
  const errorMessage = error ? 'Failed to load projects' : data?.error

  return (
    <div className="min-h-screen bg-bg-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                  Jobs in Progress
                </h1>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-muted">
                Current projects across Volusia County
              </p>
            </div>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-text-primary rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Error state */}
        {errorMessage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Unable to load projects</h3>
            <p className="text-muted mb-4">{errorMessage}</p>
            <p className="text-muted/60 text-sm">
              Make sure COMPANYCAM_API_KEY is configured in the environment variables.
            </p>
          </motion.div>
        ) : isLoading ? (
          <JobSkeleton />
        ) : projects.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/[0.04] flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-muted/40" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              No active jobs yet
            </h3>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Check back soon to see our latest projects across Volusia County.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/showcase"
                className="px-6 py-3 bg-accent-red hover:bg-accent-red-hover text-white font-medium rounded-lg transition-colors"
              >
                View Gallery
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-text-primary font-medium rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            <JobGrid projects={projects} loading={false} />

            {/* Pagination */}
            {pagination && pagination.hasMore && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-muted text-sm">Page {page}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!pagination.hasMore || isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg disabled:opacity-30 transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-14 flex items-center justify-center gap-2 text-muted/40 text-sm">
          <span>Powered by</span>
          <span className="font-semibold">CompanyCam</span>
        </div>
      </div>
    </div>
  )
}
