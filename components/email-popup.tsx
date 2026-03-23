'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user has already seen or dismissed the popup
    const hasSeenPopup = localStorage?.getItem?.('millers_popup_seen')
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage?.setItem?.('millers_popup_seen', 'true')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    if (!email?.trim?.()) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email?.trim?.() })
      })

      if (!response?.ok) {
        throw new Error('Failed to sign up')
      }

      setIsSuccess(true)
      localStorage?.setItem?.('millers_popup_seen', 'true')
      
      // Close after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false)
      }, 3000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-[100] backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
            <div className="bg-panel rounded-lg border border-line overflow-hidden shadow-2xl">
              {/* Header with background */}
              <div className="relative bg-accent-red px-6 py-8 text-center">
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 p-1.5 text-white/80 hover:text-white transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Get 10% Off
                </h2>
                <p className="text-white/90 mt-1">
                  Your First Screen Enclosure Project
                </p>
              </div>
              
              {/* Content */}
              <div className="px-6 py-6">
                {isSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-text-primary font-semibold">You&apos;re all set!</p>
                    <p className="text-muted text-sm mt-1">
                      Check your email for your 10% off code.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-muted text-sm text-center mb-4">
                      Join our email list and save on your dream outdoor space. No spam, just exclusive offers.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value ?? '')}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-bg-1 text-text-primary rounded-md border border-line placeholder:text-muted focus:outline-none focus:border-accent-red transition-colors"
                        required
                      />
                      
                      {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-accent-red text-white font-semibold uppercase tracking-wide rounded-md hover:bg-accent-red-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Signing Up...' : 'Get My 10% Off'}
                      </button>
                    </form>
                    
                    <button
                      onClick={handleClose}
                      className="w-full mt-3 py-2 text-muted text-sm hover:text-text-primary transition-colors"
                    >
                      No thanks, I&apos;ll pay full price
                    </button>
                  </>
                )}
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
