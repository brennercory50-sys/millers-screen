'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const defaultFaqs = [
  {
    question: "Do I need a permit for a pool enclosure in Volusia County?",
    answer: "Yes, a building permit is required for pool enclosures in Volusia County, Florida. At Miller's Screen, we handle all permitting for you. Our team submits the permit application, provides engineering drawings, and coordinates with local building departments in Daytona Beach, Port Orange, Ormond Beach, New Smyrna Beach, DeLand, Deltona, and throughout Volusia County. This is included in our service at no extra charge."
  },
  {
    question: "How long does it take to build a pool enclosure?",
    answer: "Most pool enclosure projects take 1-3 days for installation once permits are approved. The permitting process typically takes 2-4 weeks depending on your municipality. Total timeline from signing to completion is usually 3-6 weeks. We use our own in-house crews (no subcontractors) which means faster, more reliable scheduling."
  },
  {
    question: "What is a MegaView enclosure?",
    answer: "MegaView is a premium frameless screen enclosure system that provides unobstructed views of your pool and backyard. Unlike traditional enclosures with vertical screen panels every 10 feet, MegaView uses horizontal cable supports allowing for massive uninterrupted spans. Miller's Screen is the ONLY authorized MegaView builder in Volusia County."
  },
  {
    question: "Do you offer financing for screen enclosures?",
    answer: "Yes! We offer 0% interest financing for 18 months with no payments during that period. This makes it easy to get your dream pool enclosure or screen room without the financial burden upfront. Ask about our financing options when you schedule your free estimate."
  },
  {
    question: "What areas do you serve?",
    answer: "Miller's Screen serves all of Volusia County including Daytona Beach, South Daytona, Port Orange, Ormond Beach, Holly Hill, New Smyrna Beach, Edgewater, DeLand, Deltona, Orange City, DeBary, and surrounding areas. We've been serving the community for over 40 years."
  },
  {
    question: "What's included in a free estimate?",
    answer: "Our free estimate includes an on-site visit to measure your space, discuss your needs, review material options, and provide a detailed written quote. We'll explain the permit process, timeline, and answer all your questions. There's no obligation and no pressure."
  }
]

interface FAQSectionProps {
  faqs?: Array<{ question: string; answer: string }>
  title?: string
}

export default function FAQSection({ faqs = defaultFaqs, title }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-accent-red" />
          </div>
          <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">FAQ</span>
        </div>
        <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-10">FREQUENTLY ASKED QUESTIONS</h2>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs?.map?.((faq, index) => (
            <div
              key={index}
              className="bg-panel rounded-lg border border-line overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-text-primary pr-4">{faq?.question ?? ''}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-muted leading-relaxed">
                      {faq?.answer ?? ''}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )) ?? null}
        </div>
      </div>
    </section>
  )
}
