'use client'

import { useEffect } from 'react'
import { captureUtmFromUrl } from '@/lib/analytics'

export default function UtmTracker() {
  useEffect(() => {
    captureUtmFromUrl()
  }, [])
  return null
}
