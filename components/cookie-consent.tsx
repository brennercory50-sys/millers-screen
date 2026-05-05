'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const STORAGE_KEY = 'ms_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = (() => {
      try { return localStorage.getItem(STORAGE_KEY) } catch { return null }
    })()
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const setConsent = (value: 'accepted' | 'declined') => {
    try { localStorage.setItem(STORAGE_KEY, value) } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-4 pb-20 lg:pb-4"
        >
          <div className="max-w-4xl mx-auto bg-panel border border-line rounded-xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-text-primary flex-1 leading-relaxed">
              We use cookies and analytics to improve our site and ads.{' '}
              <Link href="/privacy" className="text-accent-red hover:underline">
                Learn more
              </Link>
              .
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setConsent('declined')}
                className="px-4 py-2 text-sm text-muted hover:text-text-primary transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => setConsent('accepted')}
                className="px-5 py-2 text-sm font-semibold bg-accent-red hover:bg-accent-red-hover text-white rounded-lg transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => setConsent('declined')}
                aria-label="Close"
                className="p-1 text-muted hover:text-text-primary transition-colors sm:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
