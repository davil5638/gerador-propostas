import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PropostaView from './PropostaView'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function PropostaPublicaPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!proposal) notFound()

  // Buscar email do dono para notificação
  const { data: ownerData } = await supabase
    .from('proposals')
    .select('user_id')
    .eq('slug', slug)
    .single()

  return <PropostaView proposal={proposal} />
}
