"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bot, MessageSquare, Send, X, User, CheckCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Msg = { role: "user" | "assistant"; content: string; timestamp: Date }
type ChatSession = {
  id: string
  title: string
  createdAt: number
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>("")

  // Helpers for localStorage keys
  const SESSIONS_KEY = "mf_chats"
  const CURRENT_KEY = "mf_current_chat"
  const MESSAGES_PREFIX = "mf_chat_msgs_"

  // Scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Load sessions and current chat on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const raw = localStorage.getItem(SESSIONS_KEY)
      const list: ChatSession[] = raw ? JSON.parse(raw) : []
      setSessions(list)
      
      const cur = localStorage.getItem(CURRENT_KEY) || ""
      setCurrentSessionId(cur)
      
      if (cur) {
        const storedMsgs = localStorage.getItem(MESSAGES_PREFIX + cur)
        if (storedMsgs) {
          setMessages(JSON.parse(storedMsgs))
        }
      } else if (list.length === 0) {
        // First-time visitor: auto-create a chat
        createSessionInternal("New chat")
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error)
    }
  }, [])

  // Persist messages per session
  useEffect(() => {
    if (!currentSessionId) return
    try {
      localStorage.setItem(MESSAGES_PREFIX + currentSessionId, JSON.stringify(messages))
      // auto-title by first user message
      const firstUser = messages.find(m => m.role === "user")
      if (firstUser) {
        setSessions(prev => {
          const updated = prev.map(s => s.id === currentSessionId ? { ...s, title: firstUser.content.slice(0, 32) } : s)
          localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated))
          return updated
        })
      }
    } catch {}
  }, [messages, currentSessionId])

  const createId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

  const createSessionInternal = (title: string): ChatSession => {
    const s: ChatSession = { id: createId(), title, createdAt: Date.now() }
    const next = [s, ...sessions]
    setSessions(next)
    
    try { 
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(next))
      localStorage.setItem(CURRENT_KEY, s.id)
      
      // Initialize empty messages for this session
      const seed: Msg[] = []
      localStorage.setItem(MESSAGES_PREFIX + s.id, JSON.stringify(seed))
      setMessages(seed)
      setCurrentSessionId(s.id)
    } catch (error) {
      console.error("Error initializing session:", error)
    }
    
    return s
  }

  const send = async () => {
    if (!input.trim() || loading || !currentSessionId) return
    
    const userMsg: Msg = { role: "user", content: input.trim(), timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)
    setIsTyping(true)
    
    try {
      // Call our Gemini API
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `You are a sales assistant for a business consulting company. Please provide a helpful, professional response to this customer inquiry: "${input.trim()}". 
          Keep your response concise but informative, focusing on how our AI-powered sales automation services can help businesses. 
          Use a friendly, approachable tone. Never mention that you're an AI or that you're waiting. Just provide helpful responses.
          
          Company Information:
          - We specialize in AI-powered sales automation
          - We help businesses increase conversions, speed up follow-ups, and scale revenue
          - Our services include intelligent prospecting, conversational AI, hyper-personalized outreach, and automated sales workflows
          - We work with B2B companies, SaaS businesses, and e-commerce brands`,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setIsTyping(false)
        const assistantMsg: Msg = { 
          role: "assistant", 
          content: data.response, 
          timestamp: new Date() 
        }
        setMessages(prev => [...prev, assistantMsg])
        setLoading(false)
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      setIsTyping(false)
      const assistantMsg: Msg = { 
        role: "assistant", 
        content: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to ask more questions about our services.", 
        timestamp: new Date() 
      }
      setMessages(prev => [...prev, assistantMsg])
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  // Format time for messages
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Format date for separators
  const formatDate = (date: Date) => {
    const d = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (d.toDateString() === today.toDateString()) {
      return "Today"
    } else if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  // Group messages by date
  const groupMessagesByDate = () => {
    const grouped: { [key: string]: Msg[] } = {}
    messages.forEach(msg => {
      const date = new Date(msg.timestamp)
      const dateKey = date.toDateString()
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(msg)
    })
    return grouped
  }

  const groupedMessages = groupMessagesByDate()

  return (
    <>
      {/* Collapsed Chat Bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Open chat"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6A00FF] to-[#7B1FFF] shadow-2xl overflow-hidden flex items-center justify-center transition-all group-hover:scale-110 group-active:scale-95 hover:shadow-[0_0_20px_rgba(106,0,255,0.5)]">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]"></div>
                <MessageSquare className="relative w-6 h-6 text-white" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed z-50 bottom-0 right-0 left-0 md:bottom-6 md:left-auto md:right-6 w-full md:w-[320px] lg:w-[350px]"
          >
            <Card className="border border-gray-200 shadow-2xl overflow-hidden rounded-t-3xl md:rounded-2xl h-[70vh] md:h-[450px] bg-white text-gray-900 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6A00FF] flex items-center justify-center text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="font-medium text-gray-900">Team Support</div>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Messages Container */}
                <div 
                  ref={scrollRef} 
                  className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50"
                >
                  {/* Welcome Message */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#6A00FF] flex items-center justify-center text-white flex-shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900 mb-1">Team Support</div>
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 text-sm border border-gray-200 shadow-sm">
                          <p className="mb-2">👋 Hi there! I'm your AI assistant. How can I help you today?</p>
                          <p className="text-gray-500 text-xs">Usually responds in 5 mins</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Messages grouped by date */}
                  {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
                    <div key={dateKey}>
                      <div className="flex items-center my-3">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="mx-2 text-xs text-gray-500 font-medium">
                          {formatDate(new Date(dateKey))}
                        </span>
                        <div className="flex-1 border-t border-gray-200"></div>
                      </div>
                      
                      {dateMessages.map((msg, index) => (
                        <motion.div
                          key={`${dateKey}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3 mb-4`}
                        >
                          {msg.role === 'assistant' && (
                            <div className="w-10 h-10 rounded-full bg-[#6A00FF] flex items-center justify-center text-white flex-shrink-0">
                              <Bot className="w-5 h-5" />
                            </div>
                          )}
                          
                          <div className={`flex-1 ${msg.role === 'user' ? 'order-first' : ''}`}>
                            {msg.role === 'assistant' && (
                              <div className="font-medium text-sm text-gray-900 mb-1">Team Support</div>
                            )}
                            <div className={`rounded-2xl px-4 py-3 text-sm border break-words max-w-[85%] md:max-w-[90%] ${
                              msg.role === 'user' 
                                ? 'bg-[#6A00FF] text-white border-[#6A00FF] rounded-br-none ml-auto' 
                                : 'bg-white text-gray-900 border-gray-200 rounded-tl-none shadow-sm'
                            }`}>
                              {msg.content}
                              <div className={`flex items-center justify-end mt-1 ${
                                msg.role === 'user' ? 'text-[#e0d0ff]' : 'text-gray-400'
                              }`}>
                                <span className="text-xs">{formatTime(new Date(msg.timestamp))}</span>
                                {msg.role === 'user' && (
                                  <CheckCheck className="w-3.5 h-3.5 ml-1" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {msg.role === 'user' && (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 flex-shrink-0">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#6A00FF] flex items-center justify-center text-white flex-shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="flex-1 bg-white rounded-2xl rounded-tl-none px-4 py-3 text-sm border border-gray-200 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Composer */}
                <div className="border-t border-gray-200 p-3 bg-white shrink-0">
                  <div className="flex gap-2 items-end">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 rounded-full border border-gray-300 bg-white text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A00FF] focus:border-transparent placeholder:text-gray-400 min-h-[48px] max-h-[120px]"
                    />
                    <Button 
                      onClick={send} 
                      disabled={loading || !input.trim() || !currentSessionId} 
                      className="rounded-full w-12 h-12 bg-[#6A00FF] hover:bg-[#7B1FFF] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all flex-shrink-0"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Team Support • Responds in 5 mins
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}