import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    if (proposal) {
      // Buscar email do dono
      const { data: { user } } = await supabase.auth.admin.getUserById(proposal.user_id)

      if (user?.email && process.env.RESEND_API_KEY) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

        await resend.emails.send({
          from: 'PropostaTrack <notificacoes@propostatrack.com.br>',
          to: user.email,
          subject: `🔔 ${proposal.client_name} abriu sua proposta!`,
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #1d4ed8; margin-bottom: 8px;">Sua proposta foi visualizada!</h2>
              <p style="color: #6b7280; margin-bottom: 24px;">
                <strong style="color: #111827;">${proposal.client_name}</strong> acabou de abrir a proposta
                <strong style="color: #111827;">"${proposal.title}"</strong>.
              </p>
              <p style="color: #374151; margin-bottom: 8px;">
                Este é o momento certo para fazer o follow-up enquanto a proposta está fresca na mente do cliente!
              </p>
              <a href="${appUrl}/dashboard"
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
                Ver no Dashboard →
              </a>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px;">PropostaTrack · Você recebeu este email porque tem notificações ativas.</p>
            </div>
          `,
        })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Track error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
