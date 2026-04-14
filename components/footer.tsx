'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { useState, useEffect } from 'react'

const quickLinks = [
  { label: 'Pool Enclosures', href: '/pool-enclosures' },
  { label: 'Screen Rooms', href: '/screen-rooms' },
  { label: 'Rescreening', href: '/rescreen' },
  { label: 'Repairs', href: '/repair' },
  { label: 'Concrete / Pavers', href: '/concrete-pavers' },
  { label: 'MegaView®', href: '/megaview' },
  { label: 'Financing', href: '/financing' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const [year, setYear] = useState(2026)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-bg-1 border-t border-line pb-20 lg:pb-0">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-36 h-11">
                <Image
                  src="/logo.png"
                  alt="Miller's Screen Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Premium screen enclosures for Volusia County. Engineered, permitted, and installed by in-house crews for over 40 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks?.map((link) => (
                <Link
                  key={link?.href ?? ''}
                  href={link?.href ?? '/'}
                  className="text-muted hover:text-text-primary transition-colors text-sm"
                >
                  {link?.label ?? ''}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:386-756-8770" className="flex items-center gap-3 text-muted hover:text-text-primary transition-colors text-sm">
                <Phone className="w-4 h-4 text-accent-red flex-shrink-0" />
                386-756-8770
              </a>
              <a href="mailto:millersscreenoffice@gmail.com" className="flex items-center gap-3 text-muted hover:text-text-primary transition-colors text-sm">
                <Mail className="w-4 h-4 text-accent-red flex-shrink-0" />
                millersscreenoffice@gmail.com
              </a>
              <div className="flex items-start gap-3 text-muted text-sm">
                <MapPin className="w-4 h-4 text-accent-red flex-shrink-0 mt-0.5" />
                3111 Opportunity Ct Suite D,<br />South Daytona, FL 32119
              </div>
              <a 
                href="https://www.facebook.com/millersscreen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-text-primary transition-colors text-sm"
              >
                <Facebook className="w-4 h-4 text-accent-red flex-shrink-0" />
                Follow us on Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line text-center">
          <p className="text-muted text-xs">
            © {year} Miller&apos;s Screen. All rights reserved.
          </p>
          <p className="text-muted text-xs mt-2">
            Built by <Link 
              href="https://buildtechsolutions.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              Build Tech Solutions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
