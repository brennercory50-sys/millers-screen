'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Pool Enclosures', href: '/pool-enclosures' },
  { label: 'Screen Rooms', href: '/screen-rooms' },
  { label: 'MegaView®', href: '/megaview' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Financing', href: '/financing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-0/95 backdrop-blur-sm border-b border-line">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-32 h-10 md:w-40 md:h-12">
              <Image
                src="/logo.png"
                alt="Miller's Screen Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems?.map((item) => (
              <Link
                key={item?.href ?? ''}
                href={item?.href ?? '/'}
                className="px-3 py-2 text-sm font-medium text-muted hover:text-text-primary transition-colors"
              >
                {item?.label ?? ''}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:386-756-8770" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-text-primary transition-colors">
              <Phone className="w-4 h-4" />
              386-756-8770
            </a>
            <Link href="/contact#form" className="btn-primary text-sm">
              Start Your Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-primary"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-bg-1 border-t border-line overflow-hidden"
          >
            <nav className="section-container py-4">
              {navItems?.map((item) => (
                <Link
                  key={item?.href ?? ''}
                  href={item?.href ?? '/'}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-base font-medium text-muted hover:text-text-primary transition-colors border-b border-line last:border-0"
                >
                  {item?.label ?? ''}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
