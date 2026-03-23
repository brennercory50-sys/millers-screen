'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi! I'm Chip, your screen enclosure assistant. How can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    if (!input?.trim?.() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input?.trim?.() ?? ''
    }

    setMessages(prev => [...(prev ?? []), userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...(messages ?? []), userMessage]?.map(m => ({
            role: m?.role ?? 'user',
            content: m?.content ?? ''
          }))
        })
      })

      if (!response?.ok) throw new Error('Failed to get response')

      const reader = response?.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      const assistantId = (Date.now() + 1).toString()
      setMessages(prev => [...(prev ?? []), { id: assistantId, role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader?.read?.() ?? { done: true, value: undefined }
        if (done) break
        
        const chunk = decoder?.decode?.(value, { stream: true }) ?? ''
        const lines = chunk?.split?.('\n') ?? []
        
        for (const line of lines) {
          if (line?.startsWith?.('data: ')) {
            const data = line?.slice?.(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const content = parsed?.choices?.[0]?.delta?.content ?? ''
              if (content) {
                assistantMessage += content
                setMessages(prev => 
                  (prev ?? [])?.map?.(m => 
                    m?.id === assistantId ? { ...m, content: assistantMessage } : m
                  ) ?? []
                )
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error('Chatbot error:', error)
      setMessages(prev => [...(prev ?? []), {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't process that. Please call us at 386-756-8770 for immediate assistance."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 w-14 h-14 bg-accent-red rounded-full flex items-center justify-center shadow-lg hover:bg-accent-red-hover transition-all duration-200 hover:scale-105 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm bg-panel rounded-lg shadow-2xl border border-line overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-1 border-b border-line">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-accent-red" />
                <span className="font-semibold text-text-primary">Chip</span>
                <span className="text-xs text-muted">Screen Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-muted hover:text-text-primary transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages?.map?.((message) => (
                <div
                  key={message?.id ?? Math.random()}
                  className={`flex gap-2 ${message?.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message?.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-accent-red/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-accent-red" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message?.role === 'user'
                        ? 'bg-accent-red text-white'
                        : 'bg-bg-1 text-text-primary'
                    }`}
                  >
                    {message?.content ?? ''}
                  </div>
                  {message?.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-steel-highlight flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-muted" />
                    </div>
                  )}
                </div>
              )) ?? null}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-accent-red/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent-red" />
                  </div>
                  <div className="bg-bg-1 px-3 py-2 rounded-lg">
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

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-line bg-bg-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e?.target?.value ?? '')}
                  placeholder="Ask about screen enclosures..."
                  className="flex-1 px-3 py-2 bg-panel text-text-primary text-sm rounded-md border border-line chatbot-input placeholder:text-muted"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim?.()}
                  className="p-2 bg-accent-red text-white rounded-md hover:bg-accent-red-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
