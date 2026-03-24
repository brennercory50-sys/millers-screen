'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Clock, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const serviceOptions = [
  'Screen Repair',
  'Pool Enclosure',
  'Screen Room',
  'Rescreen',
  'MegaView® Enclosure',
  'Other',
]

export default function QuickQuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    projectType: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e?.target ?? {}
    setFormData(prev => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          projectType: formData.projectType,
          email: '',
          city: '',
          message: `Quick quote request for: ${formData.projectType}`,
        }),
      })

      const result = await response?.json?.()
      if (!response?.ok) throw new Error(result?.message ?? 'Failed to submit')

      setStatus('success')
      setFormData({ fullName: '', phone: '', projectType: '' })
    } catch (error) {
      console.error('Form error:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error?.message ?? 'Something went wrong' : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-panel rounded-xl p-8 text-center border border-line"
      >
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
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
        <button onClick={() => setStatus('idle')} className="mt-6 block mx-auto btn-secondary text-sm">
          Submit Another Request
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-panel rounded-xl p-6 md:p-8 border border-line">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">GET YOUR FREE QUOTE</h3>
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
          <Clock className="w-4 h-4" />
          We respond within 1 hour
        </div>
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
          <label htmlFor="qq-fullName" className="block text-sm font-medium text-muted mb-1">Your Name *</label>
          <input
            type="text"
            id="qq-fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-bg-1 text-text-primary rounded-lg border border-line focus:border-accent-red focus:outline-none transition-colors text-base"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="qq-phone" className="block text-sm font-medium text-muted mb-1">Phone Number *</label>
          <input
            type="tel"
            id="qq-phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-bg-1 text-text-primary rounded-lg border border-line focus:border-accent-red focus:outline-none transition-colors text-base"
            placeholder="(386) 555-1234"
          />
        </div>

        <div>
          <label htmlFor="qq-projectType" className="block text-sm font-medium text-muted mb-1">Service Needed *</label>
          <select
            id="qq-projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3.5 bg-bg-1 text-text-primary rounded-lg border border-line focus:border-accent-red focus:outline-none transition-colors text-base appearance-none cursor-pointer"
          >
            <option value="">Select a service</option>
            {serviceOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] rounded-lg"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Get My Free Quote
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-xs text-muted text-center">
        Or call us directly at{' '}
        <a href="tel:386-756-8770" className="text-accent-red hover:underline font-semibold">386-756-8770</a>
      </p>
      <p className="mt-2 text-center text-xs text-green-500 font-medium">
        Free Estimate • No Obligation • No Spam
      </p>
    </form>
  )
}
