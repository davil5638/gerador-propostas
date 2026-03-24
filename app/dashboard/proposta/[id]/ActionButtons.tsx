'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Copy, Trash2, MessageCircle, Tag } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'

interface Props {
  proposalId: string
  proposalUrl: string
  clientName: string
  proposalTitle: string
  proposalData: Record<string, unknown>
  clientPhone?: string | null
  currentStatus?: string
}

const statusOptions = [
  { value: 'ativa', label: 'Ativa', color: 'text-blue-600' },
  { value: 'visualizada', label: 'Visualizada', color: 'text-green-600' },
  { value: 'em_negociacao', label: 'Em negociação', color: 'text-amber-600' },
  { value: 'aceita', label: 'Aceita', color: 'text-emerald-600' },
  { value: 'perdida', label: 'Perdida', color: 'text-red-600' },
]

export default function ActionButtons({ proposalId, proposalUrl, clientName, proposalTitle, proposalData, clientPhone, currentStatus }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [duplicating, setDuplicating] = useState(false)
  const [status, setStatus] = useState(currentStatus || 'ativa')
  const [savingStatus, setSavingStatus] = useState(false)

  const whatsappMsg = encodeURIComponent(
    `Olá ${clientName}! Preparei uma proposta especialmente para você. Acesse pelo link: ${proposalUrl}`
  )
  const phone = clientPhone ? clientPhone.replace(/\D/g, '') : ''
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${whatsappMsg}`
    : `https://api.whatsapp.com/send?text=${whatsappMsg}`

  async function handleStatusChange(newStatus: string) {
    setSavingStatus(true)
    const supabase = createClient()
    await supabase.from('proposals').update({ status: newStatus }).eq('id', proposalId)
    setStatus(newStatus)
    setSavingStatus(false)
    router.refresh()
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

      {/* Status manual */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <Tag size={15} className="text-gray-400 flex-shrink-0" />
        <span className="text-sm text-gray-500 flex-shrink-0">Status:</span>
        <select
          value={status}
          onChange={e => handleStatusChange(e.target.value)}
          disabled={savingStatus}
          className="flex-1 text-sm font-medium bg-transparent focus:outline-none cursor-pointer disabled:opacity-50"
        >
          {statusOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {savingStatus && <span className="text-xs text-gray-400">Salvando...</span>}
      </div>

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
