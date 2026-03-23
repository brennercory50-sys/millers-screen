'use client'

import Link from 'next/link'
import { CreditCard, ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FinancingBanner() {
  return (
    <section className="py-16 md:py-20 bg-bg-1">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-accent-red rounded-xl overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Content */}
              <div className="text-center lg:text-left">
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none">
                      0% <span className="text-white/80">NO PAYMENTS</span>
                    </h2>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                      18 MONTHS
                    </h3>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">No credit check needed</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">Fast approval</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Check className="w-5 h-5" />
                    <span className="text-sm font-medium">Flexible terms</span>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="flex-shrink-0">
                <Link 
                  href="/financing" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-red font-bold rounded-lg text-lg hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  See Financing Options
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
