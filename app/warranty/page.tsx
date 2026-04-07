import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import { Shield, Droplets, Brush, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Warranty & Maintenance | Miller's Screen",
  description: "Miller's Screen workmanship warranty and maintenance guide. One-year warranty on all installations. Learn how to care for your screen enclosure.",
  keywords: ['warranty', 'maintenance', 'screen enclosure care', 'pool cage maintenance', 'screen repair'],
  openGraph: {
    title: "Warranty & Maintenance | Miller's Screen",
    description: "Miller's Screen workmanship warranty and maintenance guide. One-year warranty on all installations.",
  },
}

export default function WarrantyPage() {
  return (
    <>
      <HeroSection
        headline="WARRANTY INFORMATION"
        subheadline="Clear expectations. Simple maintenance. Strong work."
        image="/projects/project-72559.jpg"
        ctaPrimary={{ label: 'Call Us', href: 'tel:386-756-8770' }}
      />

      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Workmanship Warranty */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-red" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Workmanship Warranty</h2>
              </div>
              <p className="text-muted leading-relaxed">
                Miller&apos;s Screen provides a one-year warranty on workmanship. Warranty period begins the day the job is finished.
              </p>
            </div>

            {/* Preventative Action */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-accent-red" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Preventative Action</h2>
              </div>
              <p className="text-muted leading-relaxed">
                Keep gutters clear and draining properly. Debris buildup can cause overflow issues that look like leaks.
              </p>
            </div>

            {/* Maintenance Cleaning */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                  <Brush className="w-5 h-5 text-accent-red" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Maintenance Cleaning</h2>
              </div>
              <p className="text-muted leading-relaxed">
                Gently brush loose debris with a soft-bristle broom. Use mild soap and warm water or Simple Green. Avoid high-pressure washers directly on screening.
              </p>
            </div>

            {/* Important Notes */}
            <div className="card border border-accent-red/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-accent-red" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Important Notes</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-2 flex-shrink-0" />
                  Service calls outside the warranty window may be billable.
                </li>
                <li className="flex items-start gap-3 text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-2 flex-shrink-0" />
                  Acts of God (storms, hurricanes, flooding, etc.) are typically excluded from standard warranty coverage.
                </li>
                <li className="flex items-start gap-3 text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-2 flex-shrink-0" />
                  Do not drill holes or modify the enclosure before final inspection; changes may affect warranty.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
