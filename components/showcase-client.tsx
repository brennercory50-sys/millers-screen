'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/hero-section'

const filters = ['All', 'Pool Enclosures', 'Screen Rooms', 'MegaView®']

const projects = [
  { category: 'Pool Enclosures', image: '/projects/project-122978.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-122980.jpg' },
  { category: 'MegaView®', image: '/projects/project-122977.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-122981.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72552.jpg' },
  { category: 'Screen Rooms', image: '/projects/project-72553.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72554.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72555.jpg' },
  { category: 'Screen Rooms', image: '/projects/project-72556.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72557.jpg' },
  { category: 'MegaView®', image: '/projects/project-72558.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72559.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72560.jpg' },
  { category: 'Screen Rooms', image: '/projects/project-72561.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72562.jpg' },
  { category: 'MegaView®', image: '/projects/project-72563.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72564.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72565.jpg' },
  { category: 'Screen Rooms', image: '/projects/project-72566.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72567.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72568.jpg' },
  { category: 'MegaView®', image: '/projects/project-72569.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72570.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72571.jpg' },
  { category: 'Screen Rooms', image: '/projects/project-72572.jpg' },
  { category: 'Pool Enclosures', image: '/projects/project-72573.jpg' },
]

export default function ShowcaseClient() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects?.filter?.(p => p?.category === activeFilter) ?? []

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

      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="flex flex-wrap gap-2 mb-8">
            {filters?.map?.((filter) => (
              <button
                key={filter ?? ''}
                onClick={() => setActiveFilter(filter ?? 'All')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-accent-red text-white'
                    : 'bg-panel text-muted hover:text-text-primary hover:bg-steel-highlight'
                }`}
              >
                {filter ?? ''}
              </button>
            )) ?? null}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects?.map?.((project, index) => (
                <motion.button
                  key={`${project?.image ?? ''}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedImage(project?.image ?? null)}
                  className="relative aspect-[4/3] rounded-img overflow-hidden group"
                >
                  <Image
                    src={project?.image ?? ''}
                    alt={project?.category ?? 'Project'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-3 left-3">
                      <span className="text-sm font-medium text-white">
                        {project?.category ?? ''}
                      </span>
                    </div>
                  </div>
                </motion.button>
              )) ?? null}
            </AnimatePresence>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact#form" className="btn-primary">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-accent-red transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e?.stopPropagation?.()}
            >
              <Image
                src={selectedImage ?? ''}
                alt="Selected project"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
