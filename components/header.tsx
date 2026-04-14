'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Nav Data ---

const services = [
  { label: 'Screen Rooms', href: '/screen-rooms' },
  { label: 'Rescreening', href: '/rescreen' },
  { label: 'Repairs', href: '/repair' },
  { label: 'Concrete / Pavers', href: '/concrete-pavers' },
  { label: 'MegaView®', href: '/megaview' },
]

type NavItem = {
  label: string
  href?: string
  hasDropdown?: boolean
  featured?: boolean
}

const navItems: NavItem[] = [
  { label: 'Services', hasDropdown: true },
  { label: 'MegaView®', href: '/megaview', featured: true },
  { label: 'Active Projects', href: '/jobs' },
  { label: 'Gallery', href: '/showcase' },
  { label: 'Financing', href: '/financing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// --- Dev href validation ---
if (process.env.NODE_ENV === 'development') {
  const allHrefs = [
    ...services.map(s => s.href),
    ...navItems.filter(n => n.href).map(n => n.href as string),
  ]
  allHrefs.forEach(href => {
    if (!href.startsWith('/') && !href.startsWith('http')) {
      console.warn('[Nav] Broken href:', href)
    }
  })
}

// --- cx utility ---
function cx(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// --- Header ---
export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setIsMenuOpen(false)
    setIsMobileServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    if (isServicesOpen) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isServicesOpen])

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsServicesOpen(false)
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [])

  // 200ms hover-intent to prevent dropdown flicker
  const onServicesEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsServicesOpen(true)
  }, [])

  const onServicesLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setIsServicesOpen(false), 200)
  }, [])

  const toggleMenu = useCallback(() => setIsMenuOpen(p => !p), [])
  const toggleMobileServices = useCallback(() => setIsMobileServicesOpen(p => !p), [])

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + '/'),
    [pathname]
  )

  const desktopLinkCls = (href: string, featured?: boolean) => {
    if (featured) {
      return cx(
        'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 text-white',
        isActive(href) ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
      )
    }
    return cx(
      'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
      isActive(href) ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
    )
  }

  const dropdownItemCls = (href: string) =>
    cx(
      'block px-4 py-2.5 text-sm transition-colors duration-150',
      isActive(href) ? 'text-green-700 bg-green-50 font-medium' : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
    )

  const mobileLinkCls = (href: string, featured?: boolean) => {
    if (featured) {
      return cx(
        'block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors duration-150 text-white',
        isActive(href) ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
      )
    }
    return cx(
      'block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors duration-150',
      isActive(href) ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
    )
  }

  const mobileDropdownItemCls = (href: string) =>
    cx(
      'block px-3 py-2.5 rounded-md text-sm transition-colors duration-150',
      isActive(href) ? 'text-green-700 bg-green-50 font-medium' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
    )

  return (
    <>
      <header
        className={cx(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
          isScrolled ? 'shadow-md' : 'shadow-sm'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2" aria-label="Miller's Screen - Home">
              <Image
                src="/logo.png"
                alt="Miller's Screen logo"
                width={140}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map(item => {
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      ref={servicesRef}
                      className="relative"
                      onMouseEnter={onServicesEnter}
                      onMouseLeave={onServicesLeave}
                    >
                      <button
                        id="services-menu-button"
                        aria-haspopup="true"
                        aria-expanded={isServicesOpen}
                        aria-controls="services-dropdown"
                        onClick={() => setIsServicesOpen(p => !p)}
                        className={cx(
                          'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
                          isServicesOpen ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={cx('transition-transform duration-200', isServicesOpen ? 'rotate-180' : '')}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            id="services-dropdown"
                            role="menu"
                            aria-labelledby="services-menu-button"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[9999]"
                            onMouseEnter={onServicesEnter}
                            onMouseLeave={onServicesLeave}
                          >
                            {services.map(service => (
                              <Link
                                key={service.href}
                                href={service.href}
                                role="menuitem"
                                onClick={() => setIsServicesOpen(false)}
                                className={dropdownItemCls(service.href)}
                              >
                                {service.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={desktopLinkCls(item.href!, item.featured)}
                    aria-current={isActive(item.href!) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+13865551234"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors duration-150"
                aria-label="Call us"
              >
                <Phone size={16} aria-hidden="true" />
                <span className="hidden lg:inline">Call Now</span>
              </a>
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-150"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 bg-white shadow-2xl flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link href="/" onClick={() => setIsMenuOpen(false)} aria-label="Home">
                <Image src="/logo.png" alt="Miller's Screen" width={120} height={36} className="h-9 w-auto" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-green-700 hover:bg-green-50 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4">
              {navItems.map(item => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="mb-1">
                      <button
                        onClick={toggleMobileServices}
                        aria-expanded={isMobileServicesOpen}
                        aria-controls="mobile-services-list"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={cx('transition-transform duration-200', isMobileServicesOpen ? 'rotate-180' : '')}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isMobileServicesOpen && (
                          <motion.div
                            id="mobile-services-list"
                            key="mobile-services"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 border-l-2 border-green-100 py-1">
                              {services.map(service => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className={mobileDropdownItemCls(service.href)}
                                >
                                  {service.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setIsMenuOpen(false)}
                    className={mobileLinkCls(item.href!, item.featured)}
                    aria-current={isActive(item.href!) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="p-4 border-t border-gray-100 space-y-3">
              <a
                href="tel:+13865551234"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Call us now"
              >
                <Phone size={18} aria-hidden="true" />
                Call Now
              </a>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 border-2 border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-150"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  )
}
