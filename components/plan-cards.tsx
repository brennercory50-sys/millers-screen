'use client'

import { ArrowRight, Check, CreditCard, Percent } from 'lucide-react'
import { motion } from 'framer-motion'

const plans = [
  {
    title: '0% Promotional Financing',
    subtitle: 'No interest if paid in full (OAC).',
    icon: Percent,
    bullets: ['Fast application', 'Approval based on credit', 'Pay over time'],
  },
  {
    title: '9.99% Fixed Plans',
    subtitle: 'Predictable payments (OAC).',
    icon: CreditCard,
    bullets: ['Fixed-rate options', 'Longer terms available', 'No surprises'],
  },
]

export default function PlanCards() {
  return (
    <section id="apply" className="py-12 md:py-16">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-text-primary text-center mb-10"
        >
          Popular options
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans?.map?.((plan, index) => {
            const Icon = plan?.icon ?? CreditCard
            return (
              <motion.div
                key={plan?.title ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card border border-line hover:border-accent-red/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-red/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent-red" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">
                  {plan?.title ?? ''}
                </h3>
                <p className="text-muted text-sm mb-4">{plan?.subtitle ?? ''}</p>
                
                <ul className="space-y-2 mb-6">
                  {plan?.bullets?.map?.((bullet, i) => (
                    <li key={bullet ?? i} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="w-4 h-4 text-accent-red flex-shrink-0" />
                      {bullet ?? ''}
                    </li>
                  )) ?? null}
                </ul>

                <button
                  className="w-full btn-primary justify-center"
                  onClick={() => alert('Financing application link will be added here')}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            )
          }) ?? null}
        </div>
      </div>
    </section>
  )
}
