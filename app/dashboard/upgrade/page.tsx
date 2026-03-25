import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowLeft, Zap, Star } from 'lucide-react'

const KIWIFY_URL = 'https://pay.kiwify.com.br/xYKGneP'

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PropostaTrack" width={220} height={60} style={{ height: "56px", width: "auto" }} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-100">
            <Zap size={14} />
            Desbloqueie todo o potencial
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            Faça upgrade para o Plano Pro
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Propostas ilimitadas, notificações em tempo real e todos os recursos para fechar mais clientes todo mês.
          </p>
        </div>

        {/* Comparação de planos */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Plano Grátis */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 opacity-75">
            <p className="font-semibold text-gray-500 mb-1">Plano Grátis</p>
            <p className="text-4xl font-extrabold text-gray-400 mb-1">R$0</p>
            <p className="text-gray-400 text-sm mb-6">atual</p>
            <ul className="space-y-3">
              {[
                { text: '3 propostas por mês', ok: true },
                { text: 'Rastreamento básico', ok: true },
                { text: 'Link compartilhável', ok: true },
                { text: 'Propostas ilimitadas', ok: false },
                { text: 'Notificação instantânea', ok: false },
                { text: 'Sem marca d\'água', ok: false },
                { text: 'Suporte prioritário', ok: false },
              ].map(item => (
                <li key={item.text} className="flex items-center gap-3 text-sm">
                  <span className={item.ok ? 'text-green-500' : 'text-gray-300'}>
                    {item.ok ? '✓' : '✗'}
                  </span>
                  <span className={item.ok ? 'text-gray-700' : 'text-gray-400 line-through'}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plano Pro */}
          <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={10} fill="white" />
              RECOMENDADO
            </div>
            <p className="font-semibold text-blue-100 mb-1">Plano Pro</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl text-blue-300 line-through font-semibold">R$79,99</span>
              <span className="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">50% OFF</span>
            </div>
            <p className="text-4xl font-extrabold mb-1">R$39,99</p>
            <p className="text-blue-200 text-sm mb-1">por mês · cancele quando quiser</p>
            <p className="text-xs text-orange-300 font-medium mb-6">🔥 Oferta de lançamento — por tempo limitado</p>
            <ul className="space-y-3 mb-8">
              {[
                'Propostas ilimitadas',
                'Notificação instantânea por email',
                'Todos os templates por nicho',
                'Histórico completo de visualizações',
                'Sem marca d\'água',
                'Botão "Aceitar proposta" para o cliente',
                'Upload de logo na proposta',
                'Suporte prioritário',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle size={16} className="text-green-300 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition"
            >
              Assinar Plano Pro → R$39,99/mês
            </a>
            <p className="text-blue-200 text-xs text-center mt-3">
              Pagamento seguro via Kiwify · Cancele a qualquer momento
            </p>
          </div>
        </div>

        {/* FAQ rápido */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Perguntas frequentes</h3>
          <div className="space-y-4">
            {[
              { q: 'Como funciona o pagamento?', a: 'O pagamento é processado com segurança pelo Kiwify. Você pode pagar com cartão de crédito ou Pix.' },
              { q: 'Posso cancelar quando quiser?', a: 'Sim. Você cancela quando quiser diretamente no painel do Kiwify, sem burocracia.' },
              { q: 'Quanto tempo leva para ativar?', a: 'Imediatamente após a confirmação do pagamento sua conta é atualizada.' },
              { q: 'E se eu já tiver propostas criadas?', a: 'Todas as suas propostas existentes continuam funcionando normalmente.' },
            ].map(item => (
              <div key={item.q} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-gray-900 text-sm mb-1">{item.q}</p>
                <p className="text-gray-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
