'use client'

import { useState } from 'react'
import { User, Phone, Mail, MapPin, ListChecks, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { LEAD_PROJECT_TYPES } from '@/lib/validations'

export default function HeroLeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    projectType: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          city: formData.zipCode.trim(),
          message: '',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result?.message ?? 'Failed to submit. Please try again.')
        throw new Error(result?.message ?? 'Failed to submit')
      }

      toast.success("Quote request sent! We'll call you within 1 hour.")
      setStatus('success')
      setFormData({ fullName: '', phone: '', email: '', zipCode: '', projectType: '' })
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
        className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-primary mb-2">Quote Request Sent!</h3>
        <p className="text-muted mb-6">We&apos;ll call you back within 1 hour.</p>
        <a
          href="tel:386-756-8770"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg"
        >
          <Phone className="w-5 h-5" />
          Call 386-756-8770
        </a>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 block mx-auto text-sm text-muted hover:text-text-primary transition-colors"
        >
          Submit Another Request
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
      <h3 className="text-xl lg:text-2xl font-bold text-text-primary text-center mb-6">
        GET YOUR <span className="text-accent-red font-black">FREE</span> QUOTE
      </h3>

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
          <Mail className={iconBase} />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputBase}
            placeholder="Email Address"
            autoComplete="email"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <MapPin className={iconBase} />
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={inputBase}
              placeholder="Zip Code"
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
        <Lock className="w-3 h-3" />
        <span>No obligation. Fast response.</span>
      </div>
    </form>
  )
}
