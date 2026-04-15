'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import HeroSection from '@/components/hero-section'
import type { GalleryProject, GalleryApiResponse } from '@/app/api/companycam/gallery/route'

async function fetchGallery(): Promise<GalleryApiResponse> {
  const res = await fetch('/api/companycam/gallery')
  if (!res.ok) throw new Error('Gallery fetch failed')
  return res.json()
}

const SHOWCASE_CATEGORIES = [
  'Flat',
  'Gable',
  'Dome',
  'Mansard',
  'Hip',
  'Elite Room',
  'Under Existing',
] as const

const STATIC_FALLBACK_IMAGE_IDS: Record<(typeof SHOWCASE_CATEGORIES)[number], string[]> = {
  Flat: ['72557', '72561', '72562', '72564', '72566', '72568', '72570', '72573', '72580', '72584'],
  Gable: ['72553', '72554', '72558', '72559', '72563', '72567', '72569', '72571', '72572', '72574'],
  Dome: ['122977', '72552', '72575', '72576', '72577', '72578', '72579', '72581', '72582', '72583'],
  Mansard: ['72565', '72585', '72586', '72587', '72588', '72589', '72590', '72591', '72592', '72593'],
  Hip: ['122978', '122980', '122981', '72555', '72556', '72594', '72595', '72596', '72597', '72598'],
  'Elite Room': ['72557', '72558', '72559', '72560', '72561', '72562', '72563', '72564', '72565', '72566'],
  'Under Existing': ['72560', '72567', '72568', '72569', '72570', '72571', '72572', '72573', '72574', '72575'],
}

function buildStaticFallbackProjects(category: (typeof SHOWCASE_CATEGORIES)[number]): GalleryProject[] {
  return STATIC_FALLBACK_IMAGE_IDS[category].map((imageId, index) => ({
    id: `static-${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
    name: `${category} Project ${index + 1}`,
    city: '',
    coverImageUrl: `/projects/project-${imageId}.jpg`,
    thumbnailUrl: `/projects/project-${imageId}.jpg`,
    publicUrl: '/contact#form',
    category,
  }))
}

export default function ShowcaseClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null)

  const { data, isLoading, isError } = useQuery<GalleryApiResponse>({
    queryKey: ['showcase-gallery'],
    queryFn: fetchGallery,
    staleTime: 300_000,
    retry: 2,
  })

  const useLiveData = !isError && !!data

  const displayCategories = SHOWCASE_CATEGORIES as readonly string[]

  function getProjectsForCategory(cat: string): GalleryProject[] {
    const fallback = buildStaticFallbackProjects(cat as (typeof SHOWCASE_CATEGORIES)[number])
    if (!useLiveData) return fallback

    const liveProjects = (data?.categories[cat] ?? []).slice(0, 10)
    return liveProjects.length > 0 ? liveProjects : fallback
  }

  function getCategoryCoverUrl(category: string): string {
    if (useLiveData && data?.categories[category]?.[0]?.coverImageUrl) {
      return data.categories[category][0].coverImageUrl
    }
    return buildStaticFallbackProjects(category as (typeof SHOWCASE_CATEGORIES)[number])[0].coverImageUrl
  }

  const filteredProjects = selectedCategory ? getProjectsForCategory(selectedCategory) : []

  return (
    <>
      <HeroSection
        headline="OUR PROJECTS"
        subheadline="Real builds. Real photos. Clean work."
        image="/projects/project-122978.jpg"
        ctaPrimary={{ label: 'Start Your Project', href: '/contact#form' }}
      />

      <section className="py-12 bg-bg-1">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-accent-red" />
            </div>
            <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Watch Us Work</span>
          </div>
          <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6">SEE OUR CRAFTSMANSHIP</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-panel max-w-4xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/omlz6gh4Rfg?si=otcFOhKwJbqMxQAn"
              title="Miller's Screen Installation Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-bg-0">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Real Project Gallery</span>
            <h2 className="text-text-primary text-3xl md:text-4xl font-bold mt-2">
              Browse Screen Room &amp; Enclosure Styles
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl mx-auto">
              Tap a style below to instantly view real projects we&apos;ve built.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl bg-panel animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {displayCategories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                    selectedCategory === category
                      ? 'ring-2 ring-accent-red scale-[1.02]'
                      : 'hover:scale-[1.02] hover:shadow-xl'
                  }`}
                >
                  <Image
                    src={getCategoryCoverUrl(category)}
                    alt={category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-accent-red/0 group-hover:bg-accent-red/10 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <span className="text-white font-bold text-sm md:text-base drop-shadow-lg">
                      {category}
                    </span>
                  </div>
                  {selectedCategory === category && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-accent-red rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-12 md:mt-16"
              >
                <div className="text-center mb-8">
                  <h3 className="text-text-primary text-2xl md:text-3xl font-bold">
                    {selectedCategory} Projects
                  </h3>
                  <p className="text-muted mt-2">
                    Real completed examples of {selectedCategory.toLowerCase()} builds.
                  </p>
                  <p className="text-muted/70 text-sm mt-1">
                    Looking for something similar?{' '}
                    <Link href="/contact#form" className="text-accent-red hover:underline">
                      Request a free quote for this style.
                    </Link>
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredProjects.map((project, index) => (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      onClick={() => setSelectedProject(project)}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer bg-panel hover:shadow-xl transition-shadow duration-300"
                    >
                      <Image
                        src={project.coverImageUrl}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                        <span className="text-white font-medium text-xs md:text-sm line-clamp-2 text-left">
                          {project.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-muted hover:text-text-primary transition-colors text-sm"
                  >
                    View All Styles
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedCategory && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <Link href="/contact#form" className="btn-primary">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative flex-1 min-h-0 bg-black rounded-lg overflow-hidden aspect-video">
                <Image
                  src={selectedProject.coverImageUrl}
                  alt={selectedProject.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-white text-xl font-semibold">
                    {selectedProject.name}
                  </h3>
                  <p className="text-muted text-sm">
                    {selectedProject.category}
                    {selectedProject.city ? ` • ${selectedProject.city}` : ''}
                  </p>
                </div>

                <Link
                  href="/contact#form"
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent-red text-white rounded hover:bg-accent-red-hover transition-colors"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
