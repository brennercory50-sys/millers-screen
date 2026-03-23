'use client'

import { Award, Users, FileCheck, Wind, Shield } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 40, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 1000, suffix: '+', label: 'Projects Completed', icon: FileCheck },
  { value: 100, suffix: '%', label: 'In-House Crews', icon: Users },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function AuthorityStrip() {
  return (
    <section className="bg-bg-1 py-12 md:py-16">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Large 40+ Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-accent-red rounded-lg flex flex-col items-center justify-center shadow-2xl">
                <span className="text-5xl md:text-6xl font-black text-white leading-none">
                  <AnimatedNumber value={40} suffix="+" />
                </span>
                <span className="text-white text-sm font-medium mt-1 opacity-90">YEARS</span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-bg-0 rounded flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-red" />
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-accent-red font-semibold uppercase tracking-wider mb-2"
            >
              Authority Block
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold text-text-primary mb-6"
            >
              Volusia County&apos;s Trusted Screen Experts
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats?.map?.((stat, index) => {
                const Icon = stat?.icon ?? Award
                return (
                  <motion.div
                    key={stat?.label ?? index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent-red" />
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-text-primary">
                        <AnimatedNumber value={stat?.value ?? 0} suffix={stat?.suffix ?? ''} />
                      </div>
                      <p className="text-sm text-muted">{stat?.label ?? ''}</p>
                    </div>
                  </motion.div>
                )
              }) ?? null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
