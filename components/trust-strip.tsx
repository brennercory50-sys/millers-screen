import { Star, Shield, Heart, DollarSign } from 'lucide-react'

const trustItems = [
  { icon: Star, title: '5-STAR RATED', subtitle: 'LOCAL COMPANY' },
  { icon: Shield, title: 'PREMIUM QUALITY', subtitle: 'BUILT TO LAST' },
  { icon: Heart, title: 'FAMILY OWNED', subtitle: '& OPERATED' },
  { icon: DollarSign, title: 'FINANCING', subtitle: 'AVAILABLE' },
]

export default function TrustStrip() {
  return (
    <section className="bg-bg-0 border-y border-line py-5 md:py-6">
      <div className="section-container">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6 md:gap-4">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-red/15 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-accent-red" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary uppercase tracking-wide leading-tight">{item.title}</p>
                <p className="text-[10px] text-muted uppercase tracking-wide leading-tight">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
