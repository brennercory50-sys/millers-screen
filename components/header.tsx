'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { label: 'Pool Enclosures', href: '/pool-enclosures' },
  { label: 'Screen Rooms', href: '/screen-rooms' },
  { label: 'Concrete / Pavers', href: '/concrete-pavers' },
]

const navItems = [
  { label: 'Services', hasDropdown: true },
  { label: 'MegaView®', href: '/megaview', featured: true },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Gallery', href: '/showcase' },
  { label: 'Financing', href: '/financing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleServicesHover = (open: boolean) => {
    setIsServicesOpen(open)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-0/85 backdrop-blur-md border-b border-white/06">
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
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onMouseEnter={() => handleServicesHover(true)}
                onMouseLeave={() => handleServicesHover(false)}
                onFocus={() => handleServicesHover(true)}
                onBlur={() => handleServicesHover(false)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted hover:text-text-primary transition-colors"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="bg-bg-0/95 backdrop-blur-md border border-white/06 rounded-lg shadow-xl py-1 min-w-[180px]">
                      {services.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsServicesOpen(false)}
                          className="block px-4 py-2.5 text-sm text-muted hover:text-text-primary hover:bg-white/[0.06] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Items */}
            {navItems.filter(item => !item.hasDropdown).map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  item.featured
                    ? 'text-text-primary font-semibold hover:underline underline-offset-4 decoration-accent-red decoration-2'
                    : 'text-muted hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:3867568770"
              className="text-muted hover:text-text-primary transition-colors"
              title="Call us: 386-756-8770"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Link href="/contact#form" className="btn-primary text-sm">
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-text-primary"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-bg-1 border-t border-line overflow-hidden"
          >
            <nav className="section-container py-4 space-y-1">
              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="flex items-center justify-between w-full py-3 text-base font-medium text-muted hover:text-text-primary transition-colors border-b border-line"
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {services.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-sm text-muted hover:text-text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Nav Items */}
              {navItems.filter(item => !item.hasDropdown).map((item) => (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 text-base font-medium border-b border-line last:border-0 transition-colors ${
                    item.featured
                      ? 'text-text-primary font-semibold'
                      : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 space-y-3">
                <Link
                  href="/contact#form"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-3 bg-accent-red text-white font-semibold rounded"
                >
                  Get Free Quote
                </Link>
                <a
                  href="tel:3867568770"
                  className="flex items-center justify-center gap-2 py-3 text-muted hover:text-text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  386-756-8770
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
