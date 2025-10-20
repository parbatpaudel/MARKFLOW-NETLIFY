import { NextResponse } from 'next/server'

// Types for request/response
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequestBody {
  messages: ChatMessage[]
  sessionId?: string
  contactFormData?: {
    name: string
    email: string
    businessName: string
    industry: string
    message: string
  }
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId, contactFormData }: ChatRequestBody = await req.json()

    // Handle contact form submission through chat
    if (contactFormData) {
      try {
        // Import Supabase client
        const { createSupabaseServer } = await import('@/lib/supabaseClient')
        const supabase = createSupabaseServer()
        
        // Store to database
        const { error } = await supabase.from('contacts').insert({
          name: contactFormData.name,
          email: contactFormData.email,
          business_name: contactFormData.businessName,
          industry: contactFormData.industry,
          message: contactFormData.message,
          source: 'chat',
        })
        
        if (error) {
          console.error('Contact form submission error:', error)
          return NextResponse.json({ 
            reply: "I apologize, but there was an error submitting your contact information. Please try using our contact page or try again later.",
            contactSubmitted: false,
            error: error.message 
          })
        }
        
        // Send email notification (non-blocking)
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-notification`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contactFormData.name,
            email: contactFormData.email,
            businessName: contactFormData.businessName,
            industry: contactFormData.industry,
            message: contactFormData.message,
            source: 'chat'
          })
        }).catch(err => console.error('Chat notification error:', err))
        
        return NextResponse.json({ 
          reply: `Thank you, ${contactFormData.name}! I've successfully submitted your contact information to our team. Someone from marketflow will reach out to you at ${contactFormData.email} within 24 hours to discuss how we can help your business in the ${contactFormData.industry} industry. Is there anything else I can help you with?`,
          contactSubmitted: true 
        })
      } catch (e) {
        console.error('Contact form processing error:', e)
        return NextResponse.json({ 
          reply: "There was an issue processing your contact request. Please use our contact page as an alternative.",
          contactSubmitted: false,
          error: String(e) 
        })
      }
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array is required' }, { status: 400 })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY
    const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Server missing GEMINI_API_KEY' }, { status: 500 })
    }

    // Construct Gemini request payload using the last user message and simple context
    const systemPreamble = {
      role: 'system',
      content:
        [
          'You are the AI assistant for marketflow, a modern marketing agency. Follow the brand voice and policy strictly.',
          '',
          'Business Overview: We combine AI technology with human insight to help businesses grow. We do not sell fixed services; everything is customized to the client\'s needs.',
          'Core Belief: Automation should support human strategy, not replace it. Every brand is different; we begin by understanding the business and design custom solutions.',
          'What We Do: We analyze their brand, marketing systems, and growth barriers. Then we build strategies using the right mix of AI tools and marketing methods (e.g., sales automation, content strategy) based on needs.',
          'Our Edge:',
          '- Custom Solutions: No fixed packages; plans are built from the client\'s goals.',
          '- AI + Human Expertise: AI handles data and speed; humans handle creativity and communication.',
          '- Result-Driven: Every move is measurable and linked to business growth.',
          '',
          'CONTACT FORM CAPABILITY:',
          'When a user expresses interest in getting in touch, scheduling a consultation, or wants to be contacted, you can help them submit their information directly through the chat.',
          'Ask for: Full Name, Email, Business Name, Industry (from: Technology, E-commerce, Healthcare, Finance, Education, Retail, Manufacturing, Real Estate, Food & Beverage, Consulting, Other), and a brief message about their needs.',
          'Once you have all required information, tell them you\'ll submit it to the team and they\'ll be contacted within 24 hours.',
          'Format your collection naturally in conversation - don\'t make it feel like a rigid form.',
          '',
          'Tone & Style:',
          '- Speak clearly and confidently.',
          '- Explain that we don\'t sell "packages" — we design strategies around the client\'s business.',
          '- Suggest a free consultation to create a personalized plan when appropriate.',
          '- When collecting contact info, be conversational and friendly.',
          '- Avoid technical jargon unless the user asks for it.',
          '',
          'Answer concisely. Use helpful markdown formatting (short paragraphs, bullets). If pricing is asked, clarify that costs depend on goals and scope, and propose a free consultation.',
        ].join('\n')
    } satisfies ChatMessage

    const conversation = [systemPreamble, ...messages].slice(-20) // limit context

    const geminiRequestBody = {
      contents: conversation.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      // Safety settings and generation config can be tuned here
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }

    const callGemini = async (model: string) => {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiRequestBody),
      })
      return res
    }

    let geminiRes = await callGemini(GEMINI_MODEL)
    // Fallback to a widely available model if the configured one fails
    if (!geminiRes.ok) {
      const primaryErr = await geminiRes.text()
      console.error('Gemini primary model error:', { model: GEMINI_MODEL, primaryErr })
      const fallbackModel = 'gemini-1.5-flash'
      try {
        const fallbackRes = await callGemini(fallbackModel)
        if (!fallbackRes.ok) {
          const fbErr = await fallbackRes.text()
          console.error('Gemini fallback model error:', { model: fallbackModel, fbErr })
          return NextResponse.json({ error: 'Gemini API error', details: primaryErr, fallbackDetails: fbErr, modelTried: [GEMINI_MODEL, fallbackModel] }, { status: 502 })
        }
        geminiRes = fallbackRes
      } catch (e) {
        console.error('Gemini network or fetch error on fallback:', e)
        return NextResponse.json({ error: 'Gemini API network error', details: primaryErr, modelTried: [GEMINI_MODEL, fallbackModel] }, { status: 502 })
      }
    }

    const geminiData = await geminiRes.json()
    // Parse response text (v1beta models return candidates[0].content.parts[].text)
    const text = geminiData?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join('\n') || 'Sorry, I could not generate a response.'

    // Super AI Memory integration
    const MEMORY_API_URL = 'https://api.super.ai/v1/memories'
    const MEMORY_KEY = 'sm_Jn5LgxYXtkmcFX6kGKzZjE_JIZIffPlHTQCWmRKpQvyUoPfLECLpaxtrRkwAxlQaGMrQfzpakWoFkanKdaJFOMA'

    let memorySaved = false
    let memoryFetched = false
    let memoryFetchCount: number | null = null
    let memoryError: string | undefined

    try {
      // Save interaction: user message + assistant response
      const lastUser = [...messages].reverse().find((m) => m.role === 'user')
      const sid = sessionId || 'default'
      
      // Save to Super Memory
      await fetch(MEMORY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MEMORY_KEY}`,
        },
        body: JSON.stringify({
          sessionId: sid,
          userText: lastUser?.content || '',
          assistantText: text,
          timestamp: Date.now(),
          metadata: {
            source: 'marketflow-chat',
            environment: process.env.NODE_ENV || 'development'
          }
        }),
      })
      memorySaved = true
      
      // Retrieve conversation history for context
      const memoryResponse = await fetch(`${MEMORY_API_URL}?sessionId=${encodeURIComponent(sid)}`, {
        headers: {
          'Authorization': `Bearer ${MEMORY_KEY}`,
        },
      })
      
      if (memoryResponse.ok) {
        const memories = await memoryResponse.json()
        // You can use the retrieved memories to enhance the context if needed
        console.log('Retrieved memories:', memories)
        memoryFetched = true
        memoryFetchCount = Array.isArray(memories) ? memories.length : (memories?.items?.length ?? null)
      }
      
    } catch (e) {
      // Best-effort memory; do not fail the chat on memory errors
      console.warn('Memory operation failed:', e)
      memoryError = (e as Error)?.message || String(e)
    }

    return NextResponse.json({ reply: text, memorySaved, memoryFetched, memoryFetchCount, memoryError })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
