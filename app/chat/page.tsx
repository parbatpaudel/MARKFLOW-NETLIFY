"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Sparkles } from "lucide-react"

type Msg = { role: "user" | "assistant"; content: string }

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant" as const, content: "Hi! I'm your marketflow AI assistant. How can I help?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const listRef = useRef<HTMLDivElement>(null)

  // Generate or retrieve session ID on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId')
    if (storedSessionId) {
      setSessionId(storedSessionId)
    } else {
      const newSessionId = 'sess_' + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('chatSessionId', newSessionId)
      setSessionId(newSessionId)
    }
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const newMsgs = [...messages, { role: "user" as const, content: input.trim() }]
    setMessages(newMsgs)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMsgs,
          sessionId: sessionId
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Chat failed")
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I ran into an issue. Please try again." }])
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
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero header matching theme */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI Chat</h1>
              <p className="text-gray-600">Powered by Gemini 2.0 Flash with smart memory.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-0">
              {/* Chat area */}
              <div ref={listRef} className="h-[60vh] overflow-y-auto p-6 space-y-4 bg-white">
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && (
                      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow ${m.role === "user" ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : "bg-gray-100 text-gray-900"}`}>
                      {m.content}
                    </div>
                    {m.role === "user" && (
                      <div className="w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-700" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="text-sm text-gray-500">Thinking…</div>
                )}
              </div>

              {/* Composer */}
              <div className="border-t border-gray-100 p-4 flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask anything about marketflow or your project…"
                  className="flex-1"
                />
                <Button onClick={send} disabled={loading || !input.trim()} className="inline-flex gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
