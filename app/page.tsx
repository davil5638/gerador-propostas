import Link from 'next/link'
import { CheckCircle, Eye, Bell, FileText, Zap, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-600" size={24} />
          <span className="font-bold text-xl text-gray-900">PropostaTrack</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Entrar
          </Link>
          <Link href="/cadastro" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap size={14} />
          Saiba exatamente quando seu cliente abriu sua proposta
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Crie propostas profissionais<br />
          <span className="text-blue-600">e rastreie cada visualização</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Chega de ficar no escuro depois de enviar uma proposta. Receba uma notificação
          instantânea quando o cliente abrir, e faça o follow-up no momento certo.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/cadastro" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Criar proposta grátis →
          </Link>
          <Link href="#como-funciona" className="text-gray-600 hover:text-gray-900 px-6 py-4 font-medium">
            Ver como funciona
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">Grátis para até 3 propostas/mês. Sem cartão.</p>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-6">Usado por freelancers e agências de todo o Brasil</p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {[
              { value: '+2.400', label: 'propostas enviadas' },
              { value: '+380', label: 'freelancers ativos' },
              { value: '68%', label: 'mais conversão com rastreamento' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Como funciona</h2>
        <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
          Em menos de 5 minutos você cria, envia e já sabe quando o cliente abriu.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: '01', icon: <FileText className="text-blue-600" size={28} />, title: 'Crie sua proposta', desc: 'Preencha as informações do cliente, serviços e valor. Templates prontos para design, desenvolvimento, marketing e mais.' },
            { step: '02', icon: <Zap className="text-blue-600" size={28} />, title: 'Envie o link', desc: 'Cada proposta gera um link único. Envie pelo WhatsApp ou email. Nada de PDF esquecido na caixa de entrada.' },
            { step: '03', icon: <Bell className="text-blue-600" size={28} />, title: 'Receba a notificação', desc: 'Assim que o cliente abrir, você recebe um email instantâneo. Hora certa para fazer o follow-up.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Passo {item.step}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            Tudo que você precisa para fechar mais clientes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Eye size={20} />, title: 'Rastreamento em tempo real', desc: 'Saiba exatamente quando, quantas vezes e por quanto tempo o cliente ficou na proposta.' },
              { icon: <Bell size={20} />, title: 'Notificação instantânea', desc: 'Email imediato quando o cliente abre. Faça o follow-up no momento que ele está engajado.' },
              { icon: <FileText size={20} />, title: 'Templates por nicho', desc: 'Design, desenvolvimento, marketing, consultoria. Templates profissionais prontos para usar.' },
              { icon: <CheckCircle size={20} />, title: 'Link compartilhável', desc: 'Envie por WhatsApp, email ou onde preferir. O cliente abre no navegador, sem baixar nada.' },
              { icon: <Zap size={20} />, title: 'Crie em minutos', desc: 'Formulário simples e rápido. Proposta bonita gerada automaticamente.' },
              { icon: <Users size={20} />, title: 'Histórico de visualizações', desc: 'Veja todas as vezes que a proposta foi aberta, com data e hora.' },
            ].map((feat) => (
              <div key={feat.title} className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Planos simples e honestos</h2>
        <p className="text-center text-gray-500 mb-14">Comece grátis. Pague só quando crescer.</p>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="border border-gray-200 rounded-2xl p-8">
            <p className="font-semibold text-gray-900 mb-1">Grátis</p>
            <p className="text-4xl font-extrabold text-gray-900 mb-1">R$0</p>
            <p className="text-gray-400 text-sm mb-8">para sempre</p>
            <ul className="space-y-3 mb-8">
              {['3 propostas por mês', 'Rastreamento básico', 'Templates padrão', 'Link compartilhável'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/cadastro" className="block text-center border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition">
              Começar grátis
            </Link>
          </div>
          <div className="border-2 border-blue-600 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              MAIS POPULAR
            </div>
            <p className="font-semibold text-gray-900 mb-1">Pro</p>
            <p className="text-4xl font-extrabold text-gray-900 mb-1">R$39</p>
            <p className="text-gray-400 text-sm mb-8">por mês</p>
            <ul className="space-y-3 mb-8">
              {['Propostas ilimitadas', 'Notificação em tempo real', 'Todos os templates', 'Histórico completo de views', "Sem marca d'água", 'Suporte prioritário'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/cadastro" className="block text-center bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Começar agora →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pare de enviar proposta e ficar sem resposta</h2>
          <p className="text-blue-100 mb-8 text-lg">Crie sua conta grátis agora e saiba exatamente quando seu próximo cliente abrir sua proposta.</p>
          <Link href="/cadastro" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition">
            Criar conta grátis →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={18} />
            <span className="font-bold text-gray-900">PropostaTrack</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 PropostaTrack. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
