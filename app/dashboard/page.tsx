import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Plus, FileText, Eye, Clock, CheckCircle, XCircle } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: proposals } = await supabase
    .from('proposals')
    .select('*, proposal_views(count)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const nome = user.user_metadata?.full_name?.split(' ')[0] || 'Freelancer'

  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    ativa: { label: 'Ativa', color: 'bg-blue-50 text-blue-700', icon: <Clock size={12} /> },
    visualizada: { label: 'Visualizada', color: 'bg-green-50 text-green-700', icon: <Eye size={12} /> },
    aceita: { label: 'Aceita', color: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle size={12} /> },
    recusada: { label: 'Recusada', color: 'bg-red-50 text-red-700', icon: <XCircle size={12} /> },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={22} />
            <span className="font-bold text-gray-900">PropostaTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Olá, {nome}!</span>
            <form action="/api/auth/logout" method="POST">
              <button className="text-sm text-gray-500 hover:text-gray-900">Sair</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Suas Propostas</h1>
            <p className="text-gray-500 text-sm mt-1">{proposals?.length || 0} proposta(s) criada(s)</p>
          </div>
          <Link
            href="/dashboard/nova-proposta"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition text-sm"
          >
            <Plus size={16} />
            Nova proposta
          </Link>
        </div>

        {/* Stats rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: proposals?.length || 0, color: 'text-gray-900' },
            { label: 'Visualizadas', value: proposals?.filter(p => p.status === 'visualizada' || p.status === 'aceita').length || 0, color: 'text-green-600' },
            { label: 'Aceitas', value: proposals?.filter(p => p.status === 'aceita').length || 0, color: 'text-emerald-600' },
            { label: 'Ativas', value: proposals?.filter(p => p.status === 'ativa').length || 0, color: 'text-blue-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Lista de propostas */}
        {!proposals || proposals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="text-blue-600" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Nenhuma proposta ainda</h3>
            <p className="text-gray-500 text-sm mb-6">Crie sua primeira proposta e comece a rastrear seus clientes.</p>
            <Link href="/dashboard/nova-proposta" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              <Plus size={16} />
              Criar primeira proposta
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {proposals.map((proposal) => {
              const views = proposal.proposal_views?.[0]?.count || 0
              const status = statusConfig[proposal.status] || statusConfig.ativa
              return (
                <div key={proposal.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-sm transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <FileText className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{proposal.title}</p>
                      <p className="text-sm text-gray-500">{proposal.client_name} · {formatDate(proposal.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Eye size={14} />
                      {views} {views === 1 ? 'view' : 'views'}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </span>
                    <Link
                      href={`/dashboard/proposta/${proposal.id}`}
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      Ver →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
