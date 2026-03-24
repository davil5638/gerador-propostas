import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { proposalId, slug } = await req.json()

    if (!proposalId) {
      return NextResponse.json({ error: 'proposalId required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Registrar a visualização
    await supabase.from('proposal_views').insert({
      proposal_id: proposalId,
      ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
    })

    // Atualizar status para "visualizada"
    await supabase
      .from('proposals')
      .update({ status: 'visualizada' })
      .eq('id', proposalId)
      .eq('status', 'ativa')

    // Buscar proposta e dono para enviar notificação
    const { data: proposal } = await supabase
      .from('proposals')
      .select('title, client_name, slug, user_id')
      .eq('id', proposalId)
      .single()

    // EMAIL TEMPORARIAMENTE DESATIVADO - reativar após 02/05
    // if (proposal) {
    //   const { data: { user } } = await supabase.auth.admin.getUserById(proposal.user_id)
    //   if (user?.email && process.env.RESEND_API_KEY) {
    //     const resend = new Resend(process.env.RESEND_API_KEY)
    //     const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    //     await resend.emails.send({ ... })
    //   }
    // }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Track error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
