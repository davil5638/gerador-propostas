import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Notificar o dono por email
    const { data: { user } } = await supabase.auth.admin.getUserById(proposal.user_id)

    if (user?.email && process.env.RESEND_API_KEY) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      await resend.emails.send({
        from: 'PropostaTrack <notificacoes@propostatrack.com.br>',
        to: user.email,
        subject: `🎉 ${proposal.client_name} aceitou sua proposta!`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #059669; margin-bottom: 8px;">Proposta aceita! 🎉</h2>
            <p style="color: #6b7280; margin-bottom: 16px;">
              <strong style="color: #111827;">${proposal.client_name}</strong> acabou de aceitar a proposta
              <strong style="color: #111827;">"${proposal.title}"</strong>.
            </p>
            <p style="color: #374151;">Entre em contato agora para dar os próximos passos!</p>
            <a href="${appUrl}/dashboard"
               style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
              Ver no Dashboard →
            </a>
          </div>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Accept error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
