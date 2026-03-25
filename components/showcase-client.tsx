'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/hero-section'
import GuidedFilter from '@/components/guided-filter'
import MasonryGallery from '@/components/masonry-gallery'
import ImageModal from '@/components/image-modal'
import { projects, filterProjects, Category, Style, Build } from '@/lib/projects'

export default function ShowcaseClient() {
  const [category, setCategory] = useState<Category | null>(null)
  const [style, setStyle] = useState<Style | null>(null)
  const [build, setBuild] = useState<Build | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = useMemo(() => {
    return filterProjects(category, style, build)
  }, [category, style, build])

  const handleViewSimilar = (style: Style, build: Build) => {
    setCategory(null)
    setStyle(style)
    setBuild(build)
  }

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GuidedFilter
              category={category}
              style={style}
              build={build}
              onCategoryChange={setCategory}
              onStyleChange={setStyle}
              onBuildChange={setBuild}
            />
          </motion.div>

          <div className="mt-12">
            <MasonryGallery
              projects={filteredProjects}
              onImageClick={setSelectedProject}
            />
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact#form" className="btn-primary">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <ImageModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onViewSimilar={handleViewSimilar}
      />
    </>
  )
}
