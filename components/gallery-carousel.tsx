'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import type { ProjectCard } from '@/lib/companycam'

interface ApiResponse {
  projects: ProjectCard[]
  error?: string
}

async function fetchActiveProjects(): Promise<ApiResponse> {
  try {
    const res = await fetch('/api/companycam?per_page=20')
    if (!res.ok) return { projects: [] }
    return res.json()
  } catch {
    return { projects: [] }
  }
}

const ITEMS_PER_PAGE = 4

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
}

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['active-projects-home'],
    queryFn: fetchActiveProjects,
    staleTime: 60_000,
  })

  const activeProjects = (data?.projects ?? []).filter(p => p.coverImageUrl)
  const totalPages = Math.max(1, Math.ceil(activeProjects.length / ITEMS_PER_PAGE))

  const scrollNext = () => {
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % totalPages)
  }

  const scrollPrev = () => {
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages)
  }

  const visibleProjects = activeProjects.slice(
    currentIndex * ITEMS_PER_PAGE,
    currentIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  return (
    <section className="py-12 md:py-16 bg-bg-1">
      <div className="section-container">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center">
            Active Projects
          </h2>
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-panel animate-pulse" />
            ))}
          </div>
        ) : activeProjects.length === 0 ? (
          <div className="text-center py-8 text-muted">
            No active jobs right now — check back soon.
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleProjects.map(project => (
                      <Link
                        key={project.id}
                        href="/jobs"
                        className="relative aspect-[4/3] rounded-lg overflow-hidden bg-panel group block"
                      >
                        <Image
                          src={project.coverImageUrl}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-white text-xs font-medium truncate">{project.name}</p>
                          {project.city && (
                            <p className="text-white/60 text-[10px] truncate">{project.city}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-bg-0" />
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-bg-0" />
                </button>
              </>
            )}
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1)
                  setCurrentIndex(i)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-accent-red' : 'bg-white/20'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-red hover:bg-accent-red-hover text-white font-semibold rounded-lg transition-colors duration-150"
          >
            View All Active Jobs
          </Link>
        </div>
      </div>
    </section>
  )
}
