'use client'

import { useState, useRef } from 'react'
import { Send, CheckCircle, AlertCircle, Phone, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { LEAD_PROJECT_TYPES } from '@/lib/validations'
import { track, getStoredUtm } from '@/lib/analytics'

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: '',
    city: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const startedRef = useRef(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (!startedRef.current) {
      startedRef.current = true
      track('form_start', { form_id: 'contact_lead_form' })
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    track('form_submit', { form_id: 'contact_lead_form', project_type: formData.projectType })

    const payload = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType,
      city: formData.city.trim(),
      message: formData.message.trim(),
      source: 'contact_form',
      utm: getStoredUtm(),
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result?.message ?? 'Failed to submit form. Please try again.')
        throw new Error(result?.message ?? 'Failed to submit form')
      }

      track('generate_lead', {
        form_id: 'contact_lead_form',
        project_type: formData.projectType,
        value: 1,
        currency: 'USD',
      })
      toast.success("Quote request sent! We'll call you within 1 hour.")
      setStatus('success')
      setFormData({ fullName: '', phone: '', email: '', projectType: '', city: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-panel rounded-lg p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-primary mb-2">Quote Request Sent!</h3>
        <p className="text-muted mb-2">We&apos;ll call you back within 1 hour.</p>
        <p className="text-sm text-green-500 font-medium mb-6">Or call now for instant response:</p>
        <a 
          href="tel:386-756-8770" 
          className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg"
        >
          <Phone className="w-5 h-5" />
          Call 386-756-8770
        </a>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 block mx-auto btn-secondary text-sm"
        >
          Submit Another Request
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-panel rounded-xl p-6 md:p-8 border border-line">
      <h3 className="text-xl font-bold text-text-primary mb-2">Request an Estimate</h3>
      <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
        <Clock className="w-3.5 h-3.5" />
        We respond within 1 hour
      </div>
      
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

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-muted mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line focus:border-accent-red focus:outline-none transition-colors"
            placeholder="John Smith"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line focus:border-accent-red focus:outline-none transition-colors"
              placeholder="(386) 555-1234"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line focus:border-accent-red focus:outline-none transition-colors"
              placeholder="john@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-muted mb-1">
              Project Type *
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              value={formData.projectType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line focus:border-accent-red focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="">Select project type</option>
              {LEAD_PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-muted mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line focus:border-accent-red focus:outline-none transition-colors"
              placeholder="South Daytona"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">
            Tell us about your project <span className="text-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line focus:border-accent-red focus:outline-none transition-colors resize-none"
            placeholder="Pool size, location, timeline... anything helpful"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Request an Estimate
            </>
          )}
        </button>

        <p className="text-xs text-muted text-center">
          By submitting this form, you agree to be contacted about your quote request.
        </p>
      </div>

      <p className="mt-4 text-xs text-muted text-center">
        Or call us directly at{' '}
        <a href="tel:386-756-8770" className="text-accent-red hover:underline">
          386-756-8770
        </a>
      </p>
      <p className="mt-2 text-center text-xs text-green-500 font-medium">
        Free Estimate • No Obligation • No Spam
      </p>
    </form>
  )
}
