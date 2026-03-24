'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Clock, FileText, ThumbsUp } from 'lucide-react'

interface Servico {
  nome: string
  descricao: string
}

interface Proposal {
  id: string
  slug: string
  title: string
  client_name: string
  nicho: string
  intro: string
  services: Servico[]
  price: number | null
  price_description: string | null
  validity_days: number
  created_at: string
  status: string
  logo_url?: string | null
}

interface Props {
  proposal: Proposal
}

const nichoLabels: Record<string, string> = {
  design: 'Design Gráfico / UI',
  desenvolvimento: 'Desenvolvimento Web / App',
  marketing: 'Marketing Digital',
  consultoria: 'Consultoria',
  video: 'Vídeo / Edição',
  copywriting: 'Copywriting / Redação',
  geral: 'Serviços',
}

export default function PropostaView({ proposal }: Props) {
  const [accepted, setAccepted] = useState(proposal.status === 'aceita')
  const [accepting, setAccepting] = useState(false)

  const validadeDate = new Date(proposal.created_at)
  validadeDate.setDate(validadeDate.getDate() + proposal.validity_days)
  const isExpired = new Date() > validadeDate
  const validadeStr = validadeDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  const daysRemaining = Math.ceil((validadeDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  useEffect(() => {
    if (!isExpired) {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId: proposal.id, slug: proposal.slug }),
      })
    }
  }, [proposal.id, proposal.slug, isExpired])

  async function handleAccept() {
    setAccepting(true)
    await fetch('/api/proposals/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proposalId: proposal.id }),
    })
    setAccepted(true)
    setAccepting(false)
  }

  // Proposta expirada
  if (isExpired && !accepted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="text-red-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Proposta expirada</h1>
          <p className="text-gray-500 mb-2">
            A proposta <strong>"{proposal.title}"</strong> para <strong>{proposal.client_name}</strong> expirou em {validadeStr}.
          </p>
          <p className="text-gray-400 text-sm">Entre em contato com quem enviou esta proposta para solicitar uma nova.</p>
        </div>
      </div>
    )
  }

  // Proposta aceita
  if (accepted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Proposta aceita!</h1>
          <p className="text-gray-500">
            Você aceitou a proposta <strong>"{proposal.title}"</strong>. Em breve entraremos em contato para os próximos passos.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contador regressivo */}
      {!isExpired && daysRemaining <= 3 && (
        <div className={`w-full text-center py-3 px-4 text-sm font-semibold ${daysRemaining <= 1 ? 'bg-red-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
          {daysRemaining <= 0
            ? '⚠️ Esta proposta expira hoje!'
            : `⏳ Esta proposta expira em ${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'}! Não perca esta oportunidade.`}
        </div>
      )}

      {/* Header */}
      <div className="bg-blue-600 text-white py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {proposal.logo_url && (
            <img src={proposal.logo_url} alt="Logo" className="h-10 object-contain mb-6 rounded" />
          )}
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <FileText size={16} />
            <span className="text-sm">{nichoLabels[proposal.nicho] || 'Proposta'}</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">{proposal.title}</h1>
          <p className="opacity-80">Preparado especialmente para <strong>{proposal.client_name}</strong></p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
        {/* Introdução */}
        {proposal.intro && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-3">Apresentação</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{proposal.intro}</p>
          </div>
        )}

        {/* Serviços */}
        {proposal.services && proposal.services.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">O que está incluído</h2>
            <div className="space-y-3">
              {proposal.services.map((servico, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{servico.nome}</p>
                    {servico.descricao && (
                      <p className="text-gray-500 text-sm mt-0.5">{servico.descricao}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investimento */}
        {proposal.price && (
          <div className="bg-blue-600 rounded-2xl p-6 text-white">
            <h2 className="font-bold mb-4">Investimento</h2>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-lg opacity-80">R$</span>
              <span className="text-5xl font-extrabold">
                {proposal.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            {proposal.price_description && (
              <p className="opacity-80 text-sm">{proposal.price_description}</p>
            )}
          </div>
        )}

        {/* Validade */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <Clock className="text-amber-500" size={20} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Validade da proposta</p>
            <p className="text-gray-500 text-sm">Esta proposta é válida até <strong>{validadeStr}</strong></p>
          </div>
        </div>

        {/* Botão Aceitar */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <p className="text-white font-bold text-xl mb-2">Gostou da proposta?</p>
          <p className="text-gray-400 text-sm mb-6">Clique abaixo para aceitar e dar início ao projeto</p>
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="w-full bg-green-500 hover:bg-green-400 text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <ThumbsUp size={20} />
            {accepting ? 'Confirmando...' : 'Aceitar proposta'}
          </button>
          <p className="text-gray-500 text-xs mt-4">Ao aceitar, o contratante será notificado imediatamente</p>
        </div>

        <p className="text-center text-gray-400 text-xs pb-4">
          Proposta criada com PropostaTrack
        </p>
      </div>
    </div>
  )
}
