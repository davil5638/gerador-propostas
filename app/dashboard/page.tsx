import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { Plus, FileText, Eye, Clock, CheckCircle, XCircle, Zap } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: proposals } = await supabase
    .from('proposals')
    .select('*, proposal_views(count)')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, plan_expires_at')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan === 'pro'

  const nomeRaw = user.user_metadata?.full_name?.split(' ')[0] || 'Freelancer'
  const nome = nomeRaw.charAt(0).toUpperCase() + nomeRaw.slice(1).toLowerCase()

  const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    ativa: { label: 'Ativa', color: 'bg-blue-50 text-blue-700', icon: <Clock size={12} /> },
    visualizada: { label: 'Visualizada', color: 'bg-green-50 text-green-700', icon: <Eye size={12} /> },
    aceita: { label: 'Aceita', color: 'bg-emerald-50 text-emerald-700', icon: <CheckCircle size={12} /> },
    recusada: { label: 'Recusada', color: 'bg-red-50 text-red-700', icon: <XCircle size={12} /> },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Image src="/logo.png" alt="PropostaTrack" width={280} height={80} style={{ height: "56px", width: "auto" }} />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">Olá, {nome}!</span>
            <form action="/api/auth/logout" method="POST">
              <button className="text-xs sm:text-sm text-gray-500 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg">Sair</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Banner upgrade — only shown for free users */}
        {isPro ? (
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-5 mb-6 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm flex items-center gap-2">
                Plano Pro ativo
                <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">PRO</span>
              </p>
              <p className="text-emerald-100 text-xs">Propostas ilimitadas + notificações em tempo real</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Plano Grátis — 3 propostas/mês</p>
                <p className="text-blue-200 text-xs">Faça upgrade para propostas ilimitadas + notificações em tempo real</p>
              </div>
            </div>
            <Link href="/dashboard/upgrade" className="bg-white text-blue-600 px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-50 transition whitespace-nowrap">
              Ver Plano Pro →
            </Link>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Suas Propostas</h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              {proposals?.length === 1 ? '1 proposta criada' : `${proposals?.length || 0} propostas criadas`}
            </p>
          </div>
          <Link
            href="/dashboard/nova-proposta"
            className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition text-xs sm:text-sm"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Nova proposta</span>
            <span className="sm:hidden">Nova</span>
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
                <div key={proposal.id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:shadow-sm transition">
                  <div className="flex items-start justify-between gap-3">
                    {/* Ícone + info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="text-blue-600" size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{proposal.title}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{proposal.client_name}</p>
                        <p className="text-xs text-gray-400">{formatDate(proposal.created_at)}</p>
                        {proposal.price && (
                          <p className="text-sm text-emerald-600 font-semibold mt-1">
                            R$ {Number(proposal.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Ver → */}
                    <Link
                      href={`/dashboard/proposta/${proposal.id}`}
                      className="text-sm text-blue-600 font-bold hover:underline flex-shrink-0"
                    >
                      Ver →
                    </Link>
                  </div>

                  {/* Footer do card: views + status */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye size={12} />
                      {views} {views === 1 ? 'view' : 'views'}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </span>
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
