import { createClient } from '@/lib/supabase/client'

const FREE_LIMIT = 3

export async function getMonthlyProposalCount(userId: string): Promise<number> {
  const supabase = createClient()
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count } = await supabase
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString())

  return count || 0
}

export async function canCreateProposal(userId: string): Promise<{ allowed: boolean; count: number; limit: number }> {
  const count = await getMonthlyProposalCount(userId)
  return { allowed: count < FREE_LIMIT, count, limit: FREE_LIMIT }
}
