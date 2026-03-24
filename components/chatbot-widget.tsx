'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { MessageCircle, X, Send, Phone, ChevronRight, CheckCircle, Clock, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  action: 'service' | 'call' | 'quote'
  service?: string
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'repair', label: 'Screen Repair', icon: <span className="text-lg">🔧</span>, action: 'service', service: 'Repair' },
  { id: 'rescreen', label: 'Rescreen', icon: <span className="text-lg">🪟</span>, action: 'service', service: 'Rescreen' },
  { id: 'enclosure', label: 'New Enclosure', icon: <span className="text-lg">🏠</span>, action: 'service', service: 'Pool Enclosure' },
  { id: 'call', label: 'Talk to Someone', icon: <Phone className="w-4 h-4" />, action: 'call' },
]

const HIGH_INTENT_PHRASES = [
  'price', 'pricing', 'cost', 'how much', 'quote', 'estimate', 'call', 'phone',
  'today', 'asap', 'schedule', 'someone', 'now', 'urgent', 'leak', 'torn',
  'broken', 'fix', 'fast', 'rush', 'emergency'
]

const SERVICES = [
  'Screen Repair',
  'Pool Enclosure',
  'Screen Room',
  'MegaView® Enclosure',
  'Rescreen',
  'Other'
]

interface LeadFormData {
  fullName: string
  phone: string
  service: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  actions?: QuickAction[]
}

function isHighIntent(text: string): boolean {
  const lower = text.toLowerCase()
  return HIGH_INTENT_PHRASES.some(phrase => lower.includes(phrase))
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [stage, setStage] = useState<'initial' | 'service' | 'form' | 'confirmation' | 'chat'>('initial')
  const [selectedService, setSelectedService] = useState<string>('')
  const [leadForm, setLeadForm] = useState<LeadFormData>({ fullName: '', phone: '', service: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [triggered, setTriggered] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef?.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: '1',
          role: 'assistant',
          content: 'Need screen repair, rescreening, or a new enclosure? I can get you a quote fast.',
          actions: QUICK_ACTIONS
        }])
        setStage('initial')
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [stage])

  useEffect(() => {
    if (!isOpen && !triggered) {
      const timer = setTimeout(() => {
        const scrollTrigger = () => {
          const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
          return scrollPercent > 40
        }
        
        if (scrollTrigger()) {
          setIsOpen(true)
          setTriggered(true)
        }
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, triggered])

  const handleQuickAction = (action: QuickAction) => {
    if (action.action === 'call') {
      window.location.href = 'tel:386-756-8770'
      return
    }

    if (action.action === 'service') {
      setSelectedService(action.service || '')
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'user',
        content: action.label
      }])
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Great choice. Let\'s get your info so we can call you back fast.',
        }])
        setStage('form')
        setLeadForm(prev => ({ ...prev, service: action.service || '' }))
      }, 500)
    }
  }

  const handleServiceSelect = (service: string) => {
    setSelectedService(service)
    setLeadForm(prev => ({ ...prev, service }))
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: service
    }])
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Perfect. Drop your name and phone — we\'ll reach out shortly.'
      }])
      setStage('form')
    }, 500)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.fullName || !leadForm.phone || !leadForm.service) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadForm.fullName,
          phone: leadForm.phone,
          email: '',
          projectType: leadForm.service,
          city: '',
          message: `Quick quote from chatbot for: ${leadForm.service}`,
        })
      })

      if (response.ok) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'user',
          content: `${leadForm.fullName} • ${leadForm.phone}`
        }])
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Got it — our team will reach out shortly about your quote. Need us now? Call 386-756-8770.'
          }])
          setStage('confirmation')
        }, 500)
      }
    } catch (error) {
      console.error('Lead submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userInput = input.trim()
    setInput('')
    setIsTyping(true)

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: userInput
    }])

    if (isHighIntent(userInput)) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sounds urgent. Want to talk now or get a fast quote?',
          actions: [
            { id: 'callnow', label: 'Call Now', icon: <Phone className="w-4 h-4" />, action: 'call' },
            ...QUICK_ACTIONS.slice(0, 2)
          ]
        }])
        setIsTyping(false)
      }, 800)
      return
    }

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat({ id: Date.now().toString(), role: 'user', content: userInput })
        })
      })

      if (response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let botResponse = ''

        setMessages(prev => [...prev, {
          id: 'temp',
          role: 'assistant',
          content: ''
        }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue
              
              try {
                const parsed = JSON.parse(data)
                const content = parsed?.choices?.[0]?.delta?.content || ''
                if (content) {
                  botResponse += content
                  setMessages(prev => prev.map(m => 
                    m.id === 'temp' ? { ...m, id: 'bot-' + Date.now(), content: botResponse } : m
                  ))
                }
              } catch {}
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 w-14 h-14 bg-accent-red rounded-full flex items-center justify-center shadow-lg hover:bg-accent-red-hover transition-all duration-200 hover:scale-105 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-panel rounded-xl shadow-2xl border border-line overflow-hidden max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-bg-1 border-b border-line flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-red flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-text-primary text-sm">Miller's Screen</span>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Quick Response
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-steel-highlight"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-accent-red/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-accent-red" />
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-accent-red text-white rounded-br-md'
                        : 'bg-bg-1 text-text-primary rounded-bl-md'
                    }`}>
                      {message.content}
                    </div>
                  </div>

                  {message.actions && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-2 w-full max-w-[85%] ml-9"
                    >
                      {message.actions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleQuickAction(action)}
                          className={`flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            action.action === 'call'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-bg-1 text-text-primary hover:bg-steel-highlight border border-line'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {action.icon}
                            {action.label}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {stage === 'service' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-bg-1 rounded-xl p-4 border border-line"
                >
                  <p className="text-sm font-medium text-text-primary mb-3">Select a service:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES.map((service) => (
                      <button
                        key={service}
                        onClick={() => handleServiceSelect(service)}
                        className="px-3 py-2.5 bg-panel rounded-lg text-xs font-medium text-text-primary hover:bg-steel-highlight transition-colors text-left border border-line hover:border-accent-red"
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {stage === 'form' && (
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-bg-1 rounded-xl p-4 border border-line"
                >
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={leadForm.fullName}
                        onChange={(e) => setLeadForm(p => ({ ...p, fullName: e.target.value }))}
                        placeholder="Your name"
                        className="w-full px-3 py-3 bg-panel text-text-primary text-sm rounded-lg border border-line focus:border-accent-red focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="Phone number"
                        className="w-full px-3 py-3 bg-panel text-text-primary text-sm rounded-lg border border-line focus:border-accent-red focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !leadForm.fullName || !leadForm.phone}
                      className="w-full bg-accent-red text-white font-semibold py-3 rounded-lg hover:bg-accent-red-hover transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          Get My Free Quote
                        </>
                      )}
                    </button>
                  </form>
                  <div className="mt-3 pt-3 border-t border-line flex items-center justify-center gap-4">
                    <span className="text-xs text-muted">or</span>
                    <a href="tel:386-756-8770" className="text-xs font-medium text-green-500 hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Call 386-756-8770
                    </a>
                  </div>
                </motion.div>
              )}

              {stage === 'confirmation' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 rounded-xl p-6 border border-green-500/30 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-bold text-text-primary mb-1">Quote Request Sent!</h4>
                  <p className="text-sm text-muted mb-4">We'll reach out shortly.</p>
                  <a
                    href="tel:386-756-8770"
                    className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Need it faster? Call Now
                  </a>
                </motion.div>
              )}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent-red/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-red" />
                  </div>
                  <div className="bg-bg-1 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {(stage === 'initial' || stage === 'chat') && (
              <form onSubmit={handleInputSubmit} className="p-3 border-t border-line bg-bg-1 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-panel text-text-primary text-sm rounded-xl border border-line focus:border-accent-red focus:outline-none"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-3 bg-accent-red text-white rounded-xl hover:bg-accent-red-hover transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setStage('service')}
                    className="flex-1 text-xs font-medium text-muted hover:text-text-primary py-1.5 px-3 rounded-lg hover:bg-steel-highlight transition-colors"
                  >
                    Pick a Service
                  </button>
                  <a
                    href="tel:386-756-8770"
                    className="flex-1 text-xs font-medium text-green-500 hover:text-green-400 py-1.5 px-3 rounded-lg hover:bg-green-500/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Call Now
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
