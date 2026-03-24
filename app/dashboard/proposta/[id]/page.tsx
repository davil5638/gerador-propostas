import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate, generateSlug } from '@/lib/utils'
import { ArrowLeft, Eye, Clock, FileText, ExternalLink, Pencil, Copy, Trash2 } from 'lucide-react'
import CopyButton from './CopyButton'
import ActionButtons from './ActionButtons'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PropostaDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!proposal) notFound()

  const { data: views } = await supabase
    .from('proposal_views')
    .select('*')
    .eq('proposal_id', id)
    .order('viewed_at', { ascending: false })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const proposalUrl = `${appUrl}/p/${proposal.slug}`

  const statusConfig: Record<string, { label: string; color: string }> = {
    ativa: { label: 'Ativa', color: 'bg-blue-50 text-blue-700' },
    visualizada: { label: 'Visualizada', color: 'bg-green-50 text-green-700' },
    aceita: { label: 'Aceita ✓', color: 'bg-emerald-50 text-emerald-700' },
    recusada: { label: 'Recusada', color: 'bg-red-50 text-red-700' },
  }
  const status = statusConfig[proposal.status] || statusConfig.ativa

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-900 truncate">{proposal.title}</span>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Link da proposta */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <p className="font-bold mb-1">Link da proposta</p>
          <p className="text-blue-100 text-sm mb-4">Envie este link para {proposal.client_name} pelo WhatsApp ou email</p>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
            <p className="text-sm flex-1 truncate font-mono">{proposalUrl}</p>
            <CopyButton url={proposalUrl} />
            <Link href={proposalUrl} target="_blank" className="text-white/70 hover:text-white">
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>

        {/* Ações */}
        <ActionButtons
          proposalId={id}
          proposalUrl={proposalUrl}
          clientName={proposal.client_name}
          proposalTitle={proposal.title}
          proposalData={proposal}
          clientPhone={proposal.client_phone}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">Visualizações</p>
            <p className="text-3xl font-bold text-gray-900">{views?.length || 0}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className="text-lg font-bold text-gray-900 capitalize">{proposal.status}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-1">Criada em</p>
            <p className="text-lg font-bold text-gray-900">{formatDate(proposal.created_at)}</p>
          </div>
        </div>

        {/* Histórico de views */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Eye size={18} className="text-blue-600" />
            Histórico de visualizações
          </h2>
          {!views || views.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="text-gray-300 mx-auto mb-3" size={32} />
              <p className="text-gray-500 text-sm">Nenhuma visualização ainda.</p>
              <p className="text-gray-400 text-xs mt-1">Envie o link para o cliente e aguarde.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {views.map((view) => (
                <div key={view.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                      <Eye size={14} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Proposta visualizada</p>
                      <p className="text-xs text-gray-400">{view.user_agent?.split('(')[0]?.trim() || 'Navegador'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(view.viewed_at).toLocaleString('pt-BR', {
                      day: '2-digit', month: '2-digit', year: '2-digit',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Detalhes</h2>
          <dl className="space-y-3">
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32 flex-shrink-0">Cliente</dt>
              <dd className="text-sm font-medium text-gray-900">{proposal.client_name}</dd>
            </div>
            {proposal.client_email && (
              <div className="flex gap-4">
                <dt className="text-sm text-gray-500 w-32 flex-shrink-0">Email</dt>
                <dd className="text-sm font-medium text-gray-900">{proposal.client_email}</dd>
              </div>
            )}
            {proposal.price && (
              <div className="flex gap-4">
                <dt className="text-sm text-gray-500 w-32 flex-shrink-0">Valor</dt>
                <dd className="text-sm font-medium text-gray-900">
                  R$ {proposal.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </dd>
              </div>
            )}
            <div className="flex gap-4">
              <dt className="text-sm text-gray-500 w-32 flex-shrink-0">Validade</dt>
              <dd className="text-sm font-medium text-gray-900">{proposal.validity_days} dias</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  )
}
