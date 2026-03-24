'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Copy, Trash2, MessageCircle, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'

interface Props {
  proposalId: string
  proposalUrl: string
  clientName: string
  proposalTitle: string
  proposalData: Record<string, unknown>
  clientPhone?: string | null
  clientEmail?: string | null
}

export default function ActionButtons({ proposalId, proposalUrl, clientName, proposalTitle, proposalData, clientPhone, clientEmail }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [duplicating, setDuplicating] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailMsg, setEmailMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const whatsappMsg = encodeURIComponent(
    `Olá ${clientName}! Preparei uma proposta especialmente para você. Acesse pelo link: ${proposalUrl}`
  )
  const phone = clientPhone ? clientPhone.replace(/\D/g, '') : ''
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${whatsappMsg}`
    : `https://api.whatsapp.com/send?text=${whatsappMsg}`

  async function handleSendEmail(overrideEmail?: string) {
    setSendingEmail(true)
    setEmailMsg(null)
    try {
      const res = await fetch('/api/proposals/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId, emailOverride: overrideEmail }),
      })
      const data = await res.json()
      if (!res.ok) {
        setEmailMsg({ type: 'error', text: data.error || 'Erro ao enviar email.' })
      } else {
        setEmailMsg({ type: 'success', text: data.message })
        setShowEmailInput(false)
        setEmailInput('')
      }
    } catch {
      setEmailMsg({ type: 'error', text: 'Erro ao enviar email. Tente novamente.' })
    } finally {
      setSendingEmail(false)
    }
  }

  function handleEmailClick() {
    setEmailMsg(null)
    if (clientEmail) {
      handleSendEmail()
    } else {
      setShowEmailInput(true)
    }
  }

  async function handleDuplicate() {
    setDuplicating(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase.from('proposals').insert({
      user_id: user.id,
      slug: generateSlug(),
      title: `${proposalData.title} (cópia)`,
      client_name: proposalData.client_name,
      client_email: proposalData.client_email,
      nicho: proposalData.nicho,
      intro: proposalData.intro,
      services: proposalData.services,
      price: proposalData.price,
      price_description: proposalData.price_description,
      validity_days: proposalData.validity_days,
    }).select().single()

    if (data) router.push(`/dashboard/proposta/${data.id}`)
    setDuplicating(false)
  }

  async function handleDelete() {
    if (!confirm(`Tem certeza que deseja excluir a proposta "${proposalData.title}"? Esta ação não pode ser desfeita.`)) return
    setDeleting(true)
    const supabase = createClient()
    // Soft delete: marca como deletada mas mantém no banco para contagem do limite mensal
    await supabase.from('proposals').update({ deleted_at: new Date().toISOString() }).eq('id', proposalId)
    router.push('/dashboard')
  }

  return (
    <div className="space-y-3">
      {/* Envios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-sm transition"
        >
          <MessageCircle size={16} />
          Enviar proposta pelo WhatsApp
        </a>

        {/* Email */}
        <button
          onClick={handleEmailClick}
          disabled={sendingEmail}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
        >
          <Mail size={16} />
          {sendingEmail ? 'Enviando...' : 'Enviar proposta por Email'}
        </button>
      </div>

      {/* Email input (quando não tem email cadastrado) */}
      {showEmailInput && (
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Digite o email do cliente"
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendEmail(emailInput)}
            disabled={sendingEmail || !emailInput}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition disabled:opacity-60"
          >
            {sendingEmail ? 'Enviando...' : 'Enviar'}
          </button>
          <button
            onClick={() => setShowEmailInput(false)}
            className="border border-gray-200 text-gray-500 hover:bg-gray-50 px-3 py-2.5 rounded-xl text-sm transition"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Feedback de email */}
      {emailMsg && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${emailMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <span>{emailMsg.type === 'success' ? '✓' : '✗'}</span>
          <span>{emailMsg.text}</span>
          <button onClick={() => setEmailMsg(null)} className="ml-auto text-current opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Ações secundárias */}
      <div className="grid grid-cols-3 gap-3">
        {/* Editar */}
        <Link
          href={`/dashboard/proposta/${proposalId}/editar`}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium text-sm transition"
        >
          <Pencil size={15} />
          Editar
        </Link>

        {/* Duplicar */}
        <button
          onClick={handleDuplicate}
          disabled={duplicating}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium text-sm transition disabled:opacity-60"
        >
          <Copy size={15} />
          {duplicating ? 'Duplicando...' : 'Duplicar'}
        </button>

        {/* Deletar */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-medium text-sm transition disabled:opacity-60"
        >
          <Trash2 size={15} />
          {deleting ? 'Excluindo...' : 'Excluir'}
        </button>
      </div>
    </div>
  )
}
