'use client'

import { Phone, MessageSquare } from 'lucide-react'

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 safe-area-bottom">
      <div className="flex bg-bg-0 border-t border-line shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a
          href="tel:386-756-8770"
          className="flex-1 flex items-center justify-center gap-2 min-h-[56px] bg-panel text-text-primary font-bold text-base border-r border-line active:bg-steel-highlight transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <a
          href="/contact#form"
          className="flex-1 flex items-center justify-center gap-2 min-h-[56px] bg-accent-red text-white font-bold text-base active:bg-accent-red-hover transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          Get Quote
        </a>
      </div>
    </div>
  )
}
