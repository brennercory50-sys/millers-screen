'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/projects'

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  
  // Deduplicate by label - only ONE entry per unique project name (job)
  const seen = new Set<string>()
  const uniqueProjects: typeof projects = []
  for (const project of projects) {
    if (!seen.has(project.label)) {
      seen.add(project.label)
      uniqueProjects.push(project)
    }
  }
  
  const featuredProjects = uniqueProjects.slice(0, 12)

  const scrollNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1))
  }

  const scrollPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1))
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section className="py-12 md:py-16 bg-bg-1">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8 text-center">
          Our Work
        </h2>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div className="flex gap-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((offset) => {
                      const index = (currentIndex + offset) % featuredProjects.length
                      const project = featuredProjects[index]
                      return (
                        <div
                          key={`${currentIndex}-${offset}`}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden bg-panel"
                        >
                          <Image
                            src={project.image}
                            alt={project.label}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-white text-xs font-medium truncate">{project.label}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

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
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {featuredProjects.slice(0, 8).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-accent-red' : 'bg-text-secondary/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
