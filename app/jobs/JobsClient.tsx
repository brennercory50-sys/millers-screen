'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, AlertCircle } from 'lucide-react'
import JobsList from '@/components/JobsList'
import type { JobProject } from '@/lib/companycam'

async function fetchJobsData(): Promise<{ jobs: JobProject[]; locations: any[]; error?: string }> {
  try {
    const response = await fetch('/api/companycam')
    if (!response.ok) {
      const data = await response.json()
      return { jobs: [], locations: [], error: data.error || 'Failed to fetch jobs' }
    }
    return response.json()
  } catch (error) {
    return { jobs: [], locations: [], error: 'Failed to connect to jobs service' }
  }
}

export default function JobsClient() {
  const [jobs, setJobs] = useState<JobProject[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    const data = await fetchJobsData()
    if (data.error) {
      setError(data.error)
    } else {
      setJobs(data.jobs || [])
      setLocations(data.locations || [])
      setLastUpdated(new Date())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="section-container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                  Jobs in Progress
                </h1>
                <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-text-secondary">
                Current projects across Volusia County
              </p>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-panel hover:bg-panel/80 text-text-primary rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {lastUpdated && (
          <p className="text-text-secondary/60 text-sm mb-6">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}

        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-accent-red/10 border border-accent-red/30 rounded-lg p-6 text-center"
          >
            <AlertCircle className="w-12 h-12 mx-auto text-accent-red mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Unable to load jobs
            </h3>
            <p className="text-text-secondary mb-4">{error}</p>
            <p className="text-text-secondary/70 text-sm">
              Make sure COMPANYCAM_API_KEY is configured in the environment variables.
            </p>
          </motion.div>
        ) : (
          <JobsList jobs={jobs} locations={locations} loading={loading} />
        )}

        <div className="mt-12 flex items-center justify-center gap-2 text-text-secondary/60 text-sm">
          <span>Powered by</span>
          <span className="font-semibold">CompanyCam</span>
        </div>
      </div>
    </div>
  )
}
