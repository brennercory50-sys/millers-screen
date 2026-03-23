'use client'

import { useState } from 'react'
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

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-20 bg-bg-1">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
            <Quote className="w-5 h-5 text-accent-red" />
          </div>
          <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Testimonials</span>
        </div>
        <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-10">WHAT OUR CUSTOMERS SAY</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote */}
          <div className="bg-panel rounded-lg p-8 md:p-12 border border-line relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-accent-red/20" />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)]?.map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-red text-accent-red" />
                ))}
              </div>

              <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[current]?.quote ?? ''}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-text-primary">{testimonials[current]?.author ?? ''}</p>
                  <p className="text-muted text-sm">{testimonials[current]?.location ?? ''}</p>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-lg bg-bg-1 border border-line flex items-center justify-center text-muted hover:text-text-primary hover:border-accent-red/50 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-lg bg-bg-1 border border-line flex items-center justify-center text-muted hover:text-text-primary hover:border-accent-red/50 transition-colors"
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
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-accent-red' : 'bg-line hover:bg-muted'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
