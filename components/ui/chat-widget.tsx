"use client"
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bot, MessageSquare, Send, Trash2, X } from "lucide-react"

type Msg = { role: "user" | "assistant"; content: string }
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>("")
  const [showSessions, setShowSessions] = useState(false)

  // Helpers for localStorage keys
  const SESSIONS_KEY = "mf_chats"
  const CURRENT_KEY = "mf_current_chat"
  const MESSAGES_PREFIX = "mf_chat_msgs_"

  useEffect(() => {
    if (!open) return
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  // Load sessions and current chat on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSIONS_KEY)
      const list: ChatSession[] = raw ? JSON.parse(raw) : []
      setSessions(list)
      const cur = localStorage.getItem(CURRENT_KEY) || ""
      setCurrentSessionId(cur)
      if (cur) {
        const storedMsgs = localStorage.getItem(MESSAGES_PREFIX + cur)
        if (storedMsgs) setMessages(JSON.parse(storedMsgs))
      } else if (list.length === 0) {
        // First-time visitor: auto-create a chat
        const s = createSessionInternal("New chat")
        setShowSessions(false)
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(next)) } catch {}
    try { localStorage.setItem(CURRENT_KEY, s.id) } catch {}
    // start empty; user will initiate the conversation
    const seed: Msg[] = []
    try { localStorage.setItem(MESSAGES_PREFIX + s.id, JSON.stringify(seed)) } catch {}
    setMessages(seed)
    setCurrentSessionId(s.id)
    return s
  }

  const newChat = () => {
    createSessionInternal("New chat")
  }

  const switchChat = (id: string) => {
    setCurrentSessionId(id)
    try { localStorage.setItem(CURRENT_KEY, id) } catch {}
    const raw = localStorage.getItem(MESSAGES_PREFIX + id)
    setMessages(raw ? JSON.parse(raw) : [{ role: "assistant", content: "New chat. How can I help?" }])
  }

  const deleteChat = (id: string) => {
    const next = sessions.filter(s => s.id !== id)
    setSessions(next)
    try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(next)) } catch {}
    try { localStorage.removeItem(MESSAGES_PREFIX + id) } catch {}
    if (currentSessionId === id) {
      if (next.length) {
        switchChat(next[0].id)
      } else {
        const s = createSessionInternal("New chat")
        switchChat(s.id)
      }
    }
  }

  // newChat is defined above via createSessionInternal; remove duplicate

  const send = async () => {
    if (!input.trim() || loading || !currentSessionId) return
    const userMsg: Msg = { role: "user", content: input.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      // Enhanced AI response with business analysis capabilities
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: next, 
          sessionId: currentSessionId || undefined,
          businessContext: true, // Enable business-specific context
          analysisMode: true // Enable deeper business analysis
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Chat failed")
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm here to help analyze your business challenges. Could you tell me more about your specific business needs or challenges you're facing?" }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => {
          // Ensure a session exists when opening
          if (!open) {
            const hasSession = currentSessionId || sessions.length > 0
            if (!hasSession) {
              const s = createSessionInternal("New chat")
              setCurrentSessionId(s.id)
            }
          }
          setOpen((v) => !v)
        }}
        className="fixed bottom-5 right-5 z-50 group"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#003459] via-[#007ea7] to-[#00a8e8] shadow-2xl overflow-hidden flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]"></div>
            <MessageSquare className="relative w-6 h-6 text-white" />
          </div>
          {!open && (
            <span className="absolute -top-2 -left-2 text-xs bg-white/95 text-slate-800 rounded-full px-2 py-0.5 shadow">Chat</span>
          )}
        </div>
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed z-50 inset-0 md:bottom-3 md:left-auto md:right-6 md:inset-auto md:w-[560px]">
          <Card className="border border-slate-700 shadow-2xl overflow-hidden rounded-none md:rounded-xl h-full md:h-[500px] bg-slate-900 text-slate-100">
            <div className="flex h-full">
              {/* No permanent left rail to keep size small; use overlay for chats */}

              {/* Right column */}
              <section className="flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-slate-600 bg-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-white text-xs font-bold shadow-sm">AI</span>
                    <span className="text-sm md:text-base font-bold text-white">marketflow Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowSessions(s => !s)} 
                      className="h-11 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-md touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Chats
                    </button>
                    <button 
                      onClick={() => setOpen(false)} 
                      className="h-11 w-11 flex items-center justify-center text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-xl border-2 border-white/20 touch-manipulation"
                      aria-label="Close chat"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <X className="w-7 h-7" strokeWidth={3.5} />
                    </button>
                  </div>
                </div>

                {/* Mobile sessions overlay */}
                {showSessions && (
                  <div className="absolute inset-0 bg-black/40">
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-700 shadow">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
                        <span className="text-sm font-medium text-slate-100">Chats</span>
                        <Button variant="ghost" onClick={newChat} className="h-8 px-2 text-xs text-slate-100 hover:bg-slate-800">New</Button>
                      </div>
                      <div className="h-[calc(100%-40px)] overflow-y-auto p-2 space-y-1">
                        {sessions.map((s) => (
                          <div key={s.id} className={`flex items-center justify-between rounded-md px-2 py-1 hover:bg-slate-800 ${currentSessionId === s.id ? 'bg-slate-800' : ''}`}>
                            <button className="text-left truncate flex-1 pr-2 text-sm text-slate-100" onClick={() => { setShowSessions(false); switchChat(s.id) }} title={s.title}>
                              {s.title || 'Untitled chat'}
                            </button>
                            <button className="text-slate-400 hover:text-red-400 text-[11px]" onClick={() => deleteChat(s.id)}>
                              Delete
                            </button>
                          </div>
                        ))}
                        {sessions.length === 0 && (
                          <div className="text-xs text-slate-400">No chats yet.</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 md:px-4 py-3 md:py-4 space-y-3 bg-slate-900">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-md bg-blue-500/20 text-blue-300 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div className={`max-w-[86%] md:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed border shadow-sm ${m.role === 'user' ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-slate-800 text-slate-100 border-slate-700'}`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && <div className="text-xs text-slate-400">Thinking…</div>}
                </div>

                {/* Composer */}
                <div className="border-t border-slate-700 p-2.5 md:p-3 flex gap-2 bg-slate-900">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Send a message..."
                    className="text-sm flex-1 rounded-full border border-slate-700 bg-slate-800 text-slate-100 px-4 py-3 md:py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                  />
                  <Button onClick={send} disabled={loading || !input.trim() || !currentSessionId} className="inline-flex gap-1 rounded-full px-5 h-11 md:h-9">
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
                {!currentSessionId && (
                  <div className="text-[12px] text-slate-400 px-4 pb-3">Create a new chat from Chats to start.</div>
                )}
              </section>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
