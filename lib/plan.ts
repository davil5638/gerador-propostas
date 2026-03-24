import { createClient } from '@/lib/supabase/client'

const FREE_LIMIT = 3

export async function getUserPlan(userId: string): Promise<'free' | 'pro'> {
  const supabase = createClient()
  const { data } = await supabase
    .from('profiles')
    .select('plan, plan_expires_at')
    .eq('id', userId)
    .single()

  if (!data || data.plan !== 'pro') return 'free'
  if (data.plan_expires_at && new Date(data.plan_expires_at) < new Date()) return 'free'
  return 'pro'
}

export async function getMonthlyProposalCount(userId: string): Promise<number> {
  const supabase = createClient()
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  // Conta TODAS as propostas criadas no mês, incluindo deletadas
  // Isso evita que o usuário burle o limite deletando e recriando
  const { count } = await supabase
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString())

  return count || 0
}

export async function canCreateProposal(userId: string): Promise<{ allowed: boolean; count: number; limit: number }> {
  const plan = await getUserPlan(userId)
  if (plan === 'pro') return { allowed: true, count: 0, limit: Infinity }

  const count = await getMonthlyProposalCount(userId)
  return { allowed: count < FREE_LIMIT, count, limit: FREE_LIMIT }
}
