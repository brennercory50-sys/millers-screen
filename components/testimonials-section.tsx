'use client'

import { useState, useEffect } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "I couldn't be happier with Miller's Screen. They did an excellent job designing and installing the screen enclosure for my new pool. They were punctual, professional and very polite. They did a top quality job! I highly recommend them for any screen enclosure. You won't regret it.",
    author: "Susan Z.",
    location: "Verified Google Review"
  },
  {
    quote: "These guys did an exceptional job on my new screen porch. Quality work and materials. Very professional crew. Bowen was super customer oriented.",
    author: "Clint Watwood",
    location: "Verified Google Review"
  },
  {
    quote: "Miller's Screen was exceptional to work with, and the final product is outstanding! We selected the MegaView feature, and it gives us an uninterrupted view of the pond. So happy to have worked with Bowen Miller.",
    author: "Kari Crameri",
    location: "Verified Google Review"
  },
  {
    quote: "The two young men that came and installed my pool enclosure, Nicco and Joseph, were very professional and did an amazing job. Observing these men gives me much hope for this generation. Integrity, respect and a great work ethic.",
    author: "Randall Killian",
    location: "Verified Google Review"
  },
  {
    quote: "We just had Miller Screen install a large screen enclosure with a MegaView. The salesman, Mark, was easy to work with and the construction crew was very professional. Several of our friends comment is Wow! I would definitely recommend Miller Screen.",
    author: "Agatha Clark",
    location: "Verified Google Review"
  },
  {
    quote: "Miller's Screen did an outstanding job on our pool screen enclosure. The project was completed on time, the results look fantastic, and they even followed up with a quality control check to ensure everything was perfect.",
    author: "Joe Clark",
    location: "Verified Google Review"
  },
  {
    quote: "Working with Miller Screen is always a pleasure. Joseph did an excellent job on my repairs today. He was friendly and a delight to work with. Bowen is always prompt, professional, and efficient in communicating and getting work scheduled.",
    author: "Eve Schauer",
    location: "Verified Google Review"
  }
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

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

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
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
