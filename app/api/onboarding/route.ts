import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createSupabaseServer()

    const { error } = await supabase.from('onboarding').insert({
      session_id: body?.sessionId || null,
      business_name: body?.businessName || null,
      industry: body?.industry || null,
      discovery: body?.discovery || null,
      other_source: body?.otherSource || null,
      experience: body?.experience || null,
    })

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error)?.message || 'failed' }, { status: 500 })
  }
}
