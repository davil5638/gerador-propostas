'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const nichos = [
  { value: 'design', label: 'Design Gráfico / UI' },
  { value: 'desenvolvimento', label: 'Desenvolvimento Web / App' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'video', label: 'Vídeo / Edição' },
  { value: 'copywriting', label: 'Copywriting / Redação' },
  { value: 'geral', label: 'Outro' },
]

interface Servico { nome: string; descricao: string }

export default function EditarProposta() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [titulo, setTitulo] = useState('')
  const [clienteNome, setClienteNome] = useState('')
  const [clienteEmail, setClienteEmail] = useState('')
  const [nicho, setNicho] = useState('geral')
  const [intro, setIntro] = useState('')
  const [servicos, setServicos] = useState<Servico[]>([{ nome: '', descricao: '' }])
  const [preco, setPreco] = useState('')
  const [precoDescricao, setPrecoDescricao] = useState('')
  const [validadeDias, setValidadeDias] = useState('15')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('proposals').select('*').eq('id', id).single()
      if (!data) { router.push('/dashboard'); return }
      setTitulo(data.title)
      setClienteNome(data.client_name)
      setClienteEmail(data.client_email || '')
      setNicho(data.nicho)
      setIntro(data.intro || '')
      setServicos(data.services?.length ? data.services : [{ nome: '', descricao: '' }])
      setPreco(data.price ? String(data.price) : '')
      setPrecoDescricao(data.price_description || '')
      setValidadeDias(String(data.validity_days))
      setFetching(false)
    }
    load()
  }, [id, router])

  function addServico() { setServicos([...servicos, { nome: '', descricao: '' }]) }
  function removeServico(i: number) { setServicos(servicos.filter((_, idx) => idx !== i)) }
  function updateServico(i: number, field: keyof Servico, value: string) {
    const updated = [...servicos]; updated[i][field] = value; setServicos(updated)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.from('proposals').update({
      title: titulo,
      client_name: clienteNome,
      client_email: clienteEmail,
      nicho,
      intro,
      services: servicos.filter(s => s.nome.trim()),
      price: preco ? parseFloat(preco.replace(',', '.')) : null,
      price_description: precoDescricao,
      validity_days: parseInt(validadeDias),
      updated_at: new Date().toISOString(),
    }).eq('id', id)

    if (error) { setError('Erro ao salvar.'); setLoading(false); return }
    router.push(`/dashboard/proposta/${id}`)
  }

  if (fetching) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Carregando...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href={`/dashboard/proposta/${id}`} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-900">Editar Proposta</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Informações da Proposta</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Título</label>
              <input type="text" required value={titulo} onChange={e => setTitulo(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nicho</label>
              <select value={nicho} onChange={e => setNicho(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {nichos.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Dados do Cliente</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
              <input type="text" required value={clienteNome} onChange={e => setClienteNome(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-gray-400 font-normal">(opcional)</span></label>
              <input type="email" value={clienteEmail} onChange={e => setClienteEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Mensagem de Abertura</h2>
            <textarea value={intro} onChange={e => setIntro(e.target.value)} rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Serviços</h2>
              <button type="button" onClick={addServico} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium">
                <Plus size={14} /> Adicionar
              </button>
            </div>
            <div className="space-y-4">
              {servicos.map((s, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 flex gap-3">
                  <div className="flex-1 space-y-2">
                    <input type="text" value={s.nome} onChange={e => updateServico(i, 'nome', e.target.value)}
                      placeholder="Nome do serviço"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" value={s.descricao} onChange={e => updateServico(i, 'descricao', e.target.value)}
                      placeholder="Descrição"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  {servicos.length > 1 && (
                    <button type="button" onClick={() => removeServico(i)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Investimento</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Valor (R$)</label>
              <input type="text" value={preco} onChange={e => setPreco(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Condições de pagamento</label>
              <input type="text" value={precoDescricao} onChange={e => setPrecoDescricao(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Validade</label>
              <select value={validadeDias} onChange={e => setValidadeDias(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="7">7 dias</option>
                <option value="15">15 dias</option>
                <option value="30">30 dias</option>
              </select>
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60">
            {loading ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </main>
    </div>
  )
}
