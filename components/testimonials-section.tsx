'use client'

import { useState, useEffect } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "As a customer Miller Screen is easy to work with. The team leader Terrence is very knowledgeable, pays attention to small details and very customer focused. I love my new screened in Lanai and it was done at a reasonable price. Great job all around.",
    author: "Bob Bragdon",
    location: "Volusia County"
  },
  {
    quote: "This past September, Miller's Screen completed the expanded screen enclosure at 274 Compass Rose Drive. My wife and I wish to complement the staff and crew. Nate and Chris did an outstanding job of not only doing meticulous work during the installation, but they also left the worksite completely void of any loose debris. Additionally, Mark was very cooperative regarding the scheduling and follow-up of the installation. I am very happy to highly recommend Miller's Screen and would be pleased to serve as a reference for prospective customers.",
    author: "Joe Halasz",
    location: "274 Compass Rose Drive, Daytona Beach, FL 32124"
  },
  {
    quote: "Miller's Screen is the only company in Volusia County offering the Megaview Extrusions Enclosure Solution. They are a family-owned and operated business with over 40 years of experience in the aluminum construction business. Superior quality, excellent service, and above all else, integrity!",
    author: "Verified Customer",
    location: "Volusia County, FL"
  }
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entries[0].target)
        }
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('testimonials-section')
    if (section) observer.observe(section)
    return () => { if (section) observer.unobserve(section) }
  }, [])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials-section" className={`reveal-on-scroll py-16 md:py-20${isVisible ? ' is-visible' : ''}`}>
      <div className="section-container">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
            <Quote className="w-5 h-5 text-accent-red" />
          </div>
          <span className="section-eyebrow">Testimonials</span>
        </div>
        <h2 className="text-text-primary text-3xl md:text-4xl font-medium mb-10">WHAT OUR CUSTOMERS SAY</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Card */}
          <div 
            className="relative p-8 md:p-12"
            style={{
              background: 'linear-gradient(145deg, #1e1e1e, #161616)',
              border: '1px solid rgba(255,255,255,.06)',
              boxShadow: '0 4px 20px rgba(0,0,0,.4), 0 1px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.04)',
              borderRadius: '12px',
              transition: 'transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease',
              transitionDelay: '0.1s',
            }}
          >
            {/* Large decorative quote */}
            <Quote 
              className="absolute top-[-20px] left-[-10px] text-[120px] leading-none pointer-events-none"
              style={{ color: 'rgba(200,30,30,.1)' }}
            />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)]?.map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-red text-accent-red" />
                ))}
              </div>

              <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-8 italic">
                {`"${testimonials[current]?.quote ?? ''}"`}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">{testimonials[current]?.author ?? ''}</p>
                  <p className="text-muted text-sm">{testimonials[current]?.location ?? ''}</p>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:text-text-primary hover:border-accent-red/50 transition-colors"
                    style={{
                      background: 'linear-gradient(145deg, #1e1e1e, #161616)',
                      border: '1px solid rgba(255,255,255,.06)',
                    }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:text-text-primary hover:border-accent-red/50 transition-colors"
                    style={{
                      background: 'linear-gradient(145deg, #1e1e1e, #161616)',
                      border: '1px solid rgba(255,255,255,.06)',
                    }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials?.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`min-w-[36px] min-h-[36px] rounded-full transition-all flex items-center justify-center ${i === current ? '' : 'hover:bg-muted/30'}`}
                style={{
                  background: i === current 
                    ? 'linear-gradient(135deg, #d42020, #9a1515)'
                    : 'rgba(255,255,255,0.06)',
                  boxShadow: i === current ? '0 2px 8px rgba(200,20,20,.4)' : 'none',
                  transition: 'all .3s cubic-bezier(.22,1,.36,1)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
