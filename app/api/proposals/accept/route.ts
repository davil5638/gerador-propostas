import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { proposalId } = await req.json()
    if (!proposalId) return NextResponse.json({ error: 'proposalId required' }, { status: 400 })

    const supabase = await createClient()

    const { data: proposal } = await supabase
      .from('proposals')
      .select('title, client_name, slug, user_id, status')
      .eq('id', proposalId)
      .single()

    if (!proposal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (proposal.status === 'aceita') return NextResponse.json({ ok: true, alreadyAccepted: true })

    await supabase
      .from('proposals')
      .update({ status: 'aceita' })
      .eq('id', proposalId)

    // EMAIL TEMPORARIAMENTE DESATIVADO - reativar após 02/05
    // const { data: { user } } = await supabase.auth.admin.getUserById(proposal.user_id)
    // if (user?.email && process.env.RESEND_API_KEY) {
    //   const resend = new Resend(process.env.RESEND_API_KEY)
    //   await resend.emails.send({ ... })
    // }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Accept error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
