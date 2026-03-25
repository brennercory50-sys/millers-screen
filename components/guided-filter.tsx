'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { Category, Style, Build, CATEGORIES, STYLES, BUILDS, getStylesForCategory, getBuildsForStyle } from '@/lib/projects'

interface GuidedFilterProps {
  category: Category | null
  style: Style | null
  build: Build | null
  onCategoryChange: (category: Category | null) => void
  onStyleChange: (style: Style | null) => void
  onBuildChange: (build: Build | null) => void
}

export default function GuidedFilter({
  category,
  style,
  build,
  onCategoryChange,
  onStyleChange,
  onBuildChange,
}: GuidedFilterProps) {
  const handleCategorySelect = (cat: Category) => {
    onCategoryChange(cat)
    onStyleChange(null)
    onBuildChange(null)
  }

  const handleStyleSelect = (stl: Style) => {
    onStyleChange(stl)
    onBuildChange(null)
  }

  const handleReset = () => {
    onCategoryChange(null)
    onStyleChange(null)
    onBuildChange(null)
  }

  const availableStyles = category ? getStylesForCategory(category) : []
  const availableBuilds = style ? getBuildsForStyle(style) : []

  const hasSelection = category || style || build

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary text-3xl md:text-4xl font-bold">
          Real Work. Real Homes.
        </h2>
        {hasSelection && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-accent-red transition-colors rounded"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        )}
      </div>
      
      <p className="text-muted text-lg">
        Explore different styles, builds, and custom projects we&apos;ve completed.
      </p>

      <div className="space-y-5">
        <FilterStep
          label="Step 1 — Project Type"
          options={CATEGORIES}
          selected={category}
          onSelect={handleCategorySelect}
        />

        <AnimatePresence>
          {category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FilterStep
                label="Step 2 — Style"
                options={availableStyles}
                selected={style}
                onSelect={handleStyleSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {style && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FilterStep
                label="Step 3 — Build Type"
                options={availableBuilds}
                selected={build}
                onSelect={onBuildChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasSelection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-2"
        >
          <span className="text-muted text-sm">
            {category && `Showing: ${category}`}
            {style && ` › ${style}`}
            {build && ` › ${build}`}
          </span>
        </motion.div>
      )}
    </div>
  )
}

interface FilterStepProps<T extends string> {
  label: string
  options: T[]
  selected: T | null
  onSelect: (option: T) => void
}

function FilterStep<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: FilterStepProps<T>) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-muted uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <motion.button
            key={option}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(option)}
            className={`px-4 py-2.5 text-sm font-medium rounded transition-all duration-200 ${
              selected === option
                ? 'bg-accent-red text-white'
                : 'bg-panel text-muted hover:text-text-primary hover:bg-steel-highlight border border-transparent hover:border-line'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
