import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/*
 * IMPORTANT — run this SQL in your Supabase dashboard before using this webhook:
 *
 *   ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan text DEFAULT 'free';
 *   ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan_expires_at timestamptz;
 *
 */

export async function POST(req: NextRequest) {
  try {
    // Validar token secreto do webhook
    const token = req.nextUrl.searchParams.get('token')
    if (!process.env.KIWIFY_WEBHOOK_SECRET || token !== process.env.KIWIFY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const orderStatus: string = body?.order_status ?? ''
    const subscriptionStatus: string = body?.subscription_status ?? ''
    const email: string = body?.customer?.email ?? ''

    if (!email) {
      return NextResponse.json({ error: 'Missing customer email' }, { status: 400 })
    }

    const supabase = await createClient()

    const isPaid = orderStatus === 'paid' || orderStatus === 'approved'
    const isCancelled =
      orderStatus === 'refunded' || subscriptionStatus === 'cancelled'

    if (isPaid) {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      const { error } = await supabase
        .from('profiles')
        .update({
          plan: 'pro',
          plan_expires_at: expiresAt.toISOString(),
        })
        .eq('email', email)

      if (error) {
        console.error('Kiwify webhook — error updating plan to pro:', error)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }

      return NextResponse.json({ ok: true, action: 'upgraded_to_pro', email })
    }

    if (isCancelled) {
      const { error } = await supabase
        .from('profiles')
        .update({
          plan: 'free',
          plan_expires_at: null,
        })
        .eq('email', email)

      if (error) {
        console.error('Kiwify webhook — error reverting plan to free:', error)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }

      return NextResponse.json({ ok: true, action: 'reverted_to_free', email })
    }

    // Unhandled status — acknowledge receipt without action
    return NextResponse.json({ ok: true, action: 'no_op', order_status: orderStatus })
  } catch (err) {
    console.error('Kiwify webhook error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
