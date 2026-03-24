'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, FileText, Lock, ImageIcon, Eye, X, CheckCircle, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { generateSlug } from '@/lib/utils'
import { canCreateProposal } from '@/lib/plan'
import { templates } from '@/lib/templates'

const nichos = [
  { value: 'design', label: 'Design Gráfico / UI' },
  { value: 'desenvolvimento', label: 'Desenvolvimento Web / App' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'consultoria', label: 'Consultoria' },
  { value: 'video', label: 'Vídeo / Edição' },
  { value: 'copywriting', label: 'Copywriting / Redação' },
  { value: 'outro', label: 'Outro (especificar)' },
]

interface Servico { nome: string; descricao: string }

export default function NovaProposta() {
  const router = useRouter()
  const [step, setStep] = useState<'template' | 'form'>('template')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [planLimit, setPlanLimit] = useState<{ allowed: boolean; count: number; limit: number } | null>(null)

  useEffect(() => {
    async function checkLimit() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const result = await canCreateProposal(user.id)
      setPlanLimit(result)
    }
    checkLimit()
  }, [])

  const [logoUrl, setLogoUrl] = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [clienteNome, setClienteNome] = useState('')
  const [clienteEmail, setClienteEmail] = useState('')
  const [clienteTelefone, setClienteTelefone] = useState('')
  const [nicho, setNicho] = useState('desenvolvimento')
  const [nichoCustom, setNichoCustom] = useState('')
  const [intro, setIntro] = useState('')
  const [servicos, setServicos] = useState<Servico[]>([{ nome: '', descricao: '' }])
  const [preco, setPreco] = useState('')
  const [precoDescricao, setPrecoDescricao] = useState('')
  const [validadeDias, setValidadeDias] = useState('15')

  function applyTemplate(tpl: typeof templates[0]) {
    setTitulo(tpl.titulo)
    setNicho(tpl.nicho)
    setIntro(tpl.intro)
    setServicos(tpl.servicos)
    setPrecoDescricao(tpl.precoDescricao)
    setValidadeDias(tpl.validadeDias)
    setStep('form')
  }

  function addServico() { setServicos([...servicos, { nome: '', descricao: '' }]) }
  function removeServico(index: number) { setServicos(servicos.filter((_, i) => i !== index)) }
  function updateServico(index: number, field: keyof Servico, value: string) {
    const updated = [...servicos]; updated[index][field] = value; setServicos(updated)
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoUploading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const ext = file.name.split('.').pop()
    const path = `${user.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('logos').upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('logos').getPublicUrl(path)
      setLogoUrl(data.publicUrl)
    }
    setLogoUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { allowed } = await canCreateProposal(user.id)
    if (!allowed) {
      setError('Você atingiu o limite de 3 propostas no plano grátis. Faça upgrade para criar propostas ilimitadas.')
      setLoading(false)
      return
    }

    const slug = generateSlug()
    const { data: newProposal, error } = await supabase.from('proposals').insert({
      user_id: user.id,
      slug,
      title: titulo,
      client_name: clienteNome,
      client_email: clienteEmail,
      client_phone: clienteTelefone || null,
      nicho: nicho === 'outro' ? (nichoCustom.trim() || 'Outro') : nicho,
      intro,
      services: servicos.filter(s => s.nome.trim()),
      price: preco ? parseFloat(preco.replace(',', '.')) : null,
      price_description: precoDescricao,
      validity_days: parseInt(validadeDias),
      logo_url: logoUrl || null,
    }).select().single()

    if (error || !newProposal) {
      setError('Erro ao criar proposta. Tente novamente.')
      setLoading(false)
      return
    }
    router.push(`/dashboard/proposta/${newProposal.id}`)
  }

  // Preview component (simplified inline render)
  const previewPrice = preco ? parseFloat(preco.replace(',', '.')) : null
  const previewValidadeDate = new Date()
  previewValidadeDate.setDate(previewValidadeDate.getDate() + parseInt(validadeDias))
  const previewValidadeStr = previewValidadeDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  // ---- STEP: TEMPLATE SELECTION ----
  if (step === 'template') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100 px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-900">Nova Proposta</span>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Escolha um template</h1>
            <p className="text-gray-500 text-sm">Comece mais rápido com um modelo pronto ou crie do zero</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {templates.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => applyTemplate(tpl)}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-400 hover:shadow-md transition group"
              >
                <span className="text-3xl mb-3 block">{tpl.icon}</span>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600">{tpl.label}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tpl.titulo}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep('form')}
            className="w-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 py-4 rounded-2xl font-medium text-sm transition"
          >
            Começar do zero →
          </button>
        </main>
      </div>
    )
  }

  // ---- STEP: FORM ----
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <p className="font-bold text-gray-900">Preview da Proposta</p>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="bg-blue-600 text-white py-10 px-6">
              {logoUrl && <img src={logoUrl} alt="Logo" className="h-10 object-contain mb-5 rounded" />}
              <p className="text-sm opacity-70 mb-2">{nicho === 'outro' ? nichoCustom || 'Outro' : nichos.find(n => n.value === nicho)?.label}</p>
              <h1 className="text-2xl font-bold mb-2">{titulo || 'Título da proposta'}</h1>
              <p className="opacity-80 text-sm">Preparado especialmente para <strong>{clienteNome || 'Cliente'}</strong></p>
            </div>
            <div className="p-6 space-y-4">
              {intro && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-bold text-gray-900 mb-2 text-sm">Apresentação</p>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap">{intro}</p>
                </div>
              )}
              {servicos.filter(s => s.nome.trim()).length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-bold text-gray-900 mb-3 text-sm">O que está incluído</p>
                  <div className="space-y-2">
                    {servicos.filter(s => s.nome.trim()).map((s, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{s.nome}</p>
                          {s.descricao && <p className="text-xs text-gray-500">{s.descricao}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {previewPrice && (
                <div className="bg-blue-600 rounded-xl p-4 text-white">
                  <p className="font-bold mb-2 text-sm">Investimento</p>
                  <p className="text-3xl font-extrabold">R$ {previewPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  {precoDescricao && <p className="text-blue-100 text-xs mt-1">{precoDescricao}</p>}
                </div>
              )}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <Clock size={16} className="text-amber-500" />
                <p className="text-sm text-gray-600">Válida até <strong>{previewValidadeStr}</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => setStep('template')} className="text-gray-500 hover:text-gray-900">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-900">Nova Proposta</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {planLimit && (
          <div className={`mb-6 px-5 py-4 rounded-2xl flex items-center justify-between ${planLimit.allowed ? 'bg-blue-50 border border-blue-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-center gap-3">
              {!planLimit.allowed && <Lock size={16} className="text-red-500 flex-shrink-0" />}
              <p className={`text-sm font-medium ${planLimit.allowed ? 'text-blue-700' : 'text-red-700'}`}>
                {planLimit.allowed
                  ? `Plano grátis: ${planLimit.count}/${planLimit.limit} propostas usadas este mês`
                  : `Limite atingido: ${planLimit.count}/${planLimit.limit} propostas este mês`}
              </p>
            </div>
            {!planLimit.allowed && (
              <Link href="/dashboard/upgrade" className="text-xs font-bold text-red-600 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-100 transition whitespace-nowrap">
                Fazer upgrade →
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-2">Logo <span className="text-gray-400 font-normal text-sm">(opcional)</span></h2>
            <p className="text-gray-400 text-xs mb-4">Aparece no topo da proposta vista pelo cliente</p>
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-14 object-contain rounded-lg border border-gray-100" />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon size={22} className="text-gray-400" />
                </div>
              )}
              <label className="cursor-pointer">
                <span className="text-sm font-medium text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                  {logoUploading ? 'Enviando...' : logoUrl ? 'Trocar logo' : 'Enviar logo'}
                </span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" disabled={logoUploading} />
              </label>
              {logoUrl && (
                <button type="button" onClick={() => setLogoUrl('')} className="text-sm text-red-500 hover:text-red-700">
                  Remover
                </button>
              )}
            </div>
          </div>

          {/* Informações básicas */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Informações da Proposta</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Título da proposta</label>
                <input type="text" required value={titulo} onChange={e => setTitulo(e.target.value)}
                  placeholder="Ex: Criação de Site para Empresa XYZ"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nicho / Área</label>
                <select value={nicho} onChange={e => setNicho(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {nichos.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                </select>
                {nicho === 'outro' && (
                  <input type="text" value={nichoCustom} onChange={e => setNichoCustom(e.target.value)}
                    placeholder="Ex: Fotografia, Arquitetura..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2" />
                )}
              </div>
            </div>
          </div>

          {/* Dados do cliente */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Dados do Cliente</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do cliente / empresa</label>
                <input type="text" required value={clienteNome} onChange={e => setClienteNome(e.target.value)}
                  placeholder="Ex: João Silva ou Empresa ABC"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email do cliente <span className="text-gray-400 font-normal">(opcional)</span></label>
                <input type="email" value={clienteEmail} onChange={e => setClienteEmail(e.target.value)}
                  placeholder="cliente@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp do cliente <span className="text-gray-400 font-normal">(opcional)</span></label>
                <input type="tel" value={clienteTelefone} onChange={e => setClienteTelefone(e.target.value)}
                  placeholder="Ex: 5511999999999"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <p className="text-xs text-gray-400 mt-1">Código do país + DDD + número. Ex: 5511999999999</p>
              </div>
            </div>
          </div>

          {/* Introdução */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Mensagem de Abertura</h2>
            <textarea value={intro} onChange={e => setIntro(e.target.value)} rows={4}
              placeholder="Ex: Olá João, é um prazer apresentar esta proposta..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          {/* Serviços */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Serviços Incluídos</h2>
              <button type="button" onClick={addServico} className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700">
                <Plus size={14} /> Adicionar serviço
              </button>
            </div>
            <div className="space-y-4">
              {servicos.map((servico, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <input type="text" value={servico.nome} onChange={e => updateServico(index, 'nome', e.target.value)}
                        placeholder="Nome do serviço (ex: Desenvolvimento Frontend)"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input type="text" value={servico.descricao} onChange={e => updateServico(index, 'descricao', e.target.value)}
                        placeholder="Descrição breve (ex: 5 páginas responsivas com React)"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {servicos.length > 1 && (
                      <button type="button" onClick={() => removeServico(index)} className="text-gray-400 hover:text-red-500 mt-1">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investimento */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-5">Investimento</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Valor total (R$)</label>
                <input type="text" value={preco} onChange={e => setPreco(e.target.value)}
                  placeholder="Ex: 2500,00"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Condições de pagamento <span className="text-gray-400 font-normal">(opcional)</span></label>
                <input type="text" value={precoDescricao} onChange={e => setPrecoDescricao(e.target.value)}
                  placeholder="Ex: 50% na aprovação + 50% na entrega"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Validade da proposta (dias)</label>
                <select value={validadeDias} onChange={e => setValidadeDias(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">1 dia</option>
                  <option value="7">7 dias</option>
                  <option value="15">15 dias</option>
                  <option value="30">30 dias</option>
                </select>
              </div>
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}

          <div className="flex gap-3">
            <button type="button" onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 px-5 py-4 rounded-xl font-semibold text-sm hover:bg-gray-50 transition">
              <Eye size={16} /> Preview
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60">
              {loading ? 'Criando proposta...' : 'Criar proposta e gerar link →'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
