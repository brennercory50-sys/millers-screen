'use client'

import { useState, useRef } from 'react'
import { User, Phone, ListChecks, Lock, ArrowRight, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { LEAD_PROJECT_TYPES } from '@/lib/validations'
import { track, getStoredUtm } from '@/lib/analytics'

const NEXT_STEPS = [
  { step: '1', title: 'We call you back', desc: 'Within 1 hour during business hours' },
  { step: '2', title: 'In-person walkthrough', desc: 'One of our crew visits your property — not a salesperson' },
  { step: '3', title: 'Fixed quote in 48 hrs', desc: 'Detailed, no-surprise price. No obligation to sign' },
]

export default function HeroLeadForm() {
  const [formData, setFormData] = useState({ fullName: '', phone: '', projectType: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const startedRef = useRef(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (!startedRef.current) {
      startedRef.current = true
      track('form_start', { form_id: 'hero_lead_form' })
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    track('form_submit', { form_id: 'hero_lead_form', project_type: formData.projectType })

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: '',
          projectType: formData.projectType,
          source: 'hero_form',
          utm: getStoredUtm(),
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        toast.error(result?.message ?? 'Failed to submit. Please try again.')
        throw new Error(result?.message ?? 'Failed to submit')
      }

      track('generate_lead', { form_id: 'hero_lead_form', project_type: formData.projectType, value: 1, currency: 'USD' })
      setStatus('success')
      setFormData({ fullName: '', phone: '', projectType: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl"
      >
        <div className="text-center mb-6">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-text-primary mb-1">Request Received!</h3>
          <p className="text-sm text-muted">Here&apos;s what happens next:</p>
        </div>

        <div className="space-y-3 mb-6">
          {NEXT_STEPS.map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-accent-red flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">{step}</span>
              </div>
              <div>
                <p className="text-text-primary text-sm font-semibold leading-tight">{title}</p>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="tel:+13867568770"
          className="w-full bg-accent-red hover:bg-accent-red-hover text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now: 386-756-8770
        </a>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 w-full text-center text-xs text-muted/60 hover:text-muted transition-colors"
        >
          Submit another request
        </button>
      </motion.div>
    )
  }

  const inputBase = 'w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-lg text-text-primary placeholder:text-muted/50 focus:border-accent-red focus:outline-none transition-colors text-sm'
  const iconBase = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl"
    >
      <h3 className="text-xl lg:text-2xl font-bold text-text-primary text-center mb-1">
        GET YOUR <span className="text-accent-red font-black">FREE</span> QUOTE
      </h3>
      <p className="text-center text-xs text-muted/70 mb-5">Spring schedule filling fast — request your slot now</p>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errorMessage || 'Something went wrong. Please try again.'}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <div className="relative">
          <User className={iconBase} />
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className={inputBase}
            placeholder="Full Name"
          />
        </div>

        <div className="relative">
          <Phone className={iconBase} />
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className={inputBase}
            placeholder="Phone Number"
            autoComplete="tel"
          />
        </div>

        <div className="relative">
          <ListChecks className={iconBase} />
          <select
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className={`${inputBase} appearance-none cursor-pointer ${!formData.projectType ? 'text-muted/50' : ''}`}
          >
            <option value="">Project Type</option>
            {LEAD_PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-accent-red hover:bg-accent-red-hover text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              GET MY FREE QUOTE
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-muted/50 text-xs">
        <Clock className="w-3 h-3" />
        <span>Responding within 1 hour &nbsp;·&nbsp; No obligation</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1.5 text-muted/40 text-xs">
        <Lock className="w-3 h-3" />
        <span>Your info is never sold or shared</span>
      </div>
    </form>
  )
}
