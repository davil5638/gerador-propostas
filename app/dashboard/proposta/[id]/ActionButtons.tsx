'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Copy, Trash2, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'

interface Props {
  proposalId: string
  proposalUrl: string
  clientName: string
  proposalTitle: string
  proposalData: Record<string, unknown>
  clientPhone?: string | null
}

export default function ActionButtons({ proposalId, proposalUrl, clientName, proposalTitle, proposalData, clientPhone }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [duplicating, setDuplicating] = useState(false)

  const whatsappMsg = encodeURIComponent(
    `Olá ${clientName}! Preparei uma proposta especialmente para você. Acesse pelo link: ${proposalUrl}`
  )
  // Se tem telefone, abre direto no contato. Se não, abre seletor de contato.
  const phone = clientPhone ? clientPhone.replace(/\D/g, '') : ''
  const whatsappUrl = phone
    ? `https://wa.me/${phone}?text=${whatsappMsg}`
    : `https://api.whatsapp.com/send?text=${whatsappMsg}`

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
    await supabase.from('proposals').delete().eq('id', proposalId)
    router.push('/dashboard')
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium text-sm transition"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>

      {/* Editar */}
      <Link
        href={`/dashboard/proposta/${proposalId}/editar`}
        className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium text-sm transition"
      >
        <Pencil size={16} />
        Editar
      </Link>

      {/* Duplicar */}
      <button
        onClick={handleDuplicate}
        disabled={duplicating}
        className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium text-sm transition disabled:opacity-60"
      >
        <Copy size={16} />
        {duplicating ? 'Duplicando...' : 'Duplicar'}
      </button>

      {/* Deletar */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-3 rounded-xl font-medium text-sm transition disabled:opacity-60"
      >
        <Trash2 size={16} />
        {deleting ? 'Excluindo...' : 'Excluir'}
      </button>
    </div>
  )
}
