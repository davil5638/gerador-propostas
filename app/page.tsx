import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Eye, Bell, FileText, Zap, Users, AlertTriangle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Urgency bar */}
      <div className="bg-amber-500 text-white text-center text-xs sm:text-sm py-2.5 px-4 font-medium">
        🔥 Oferta de lançamento: Plano Pro com <span className="font-bold">50% OFF no primeiro mês</span> · Por tempo limitado
      </div>

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center">
          <Image src="/logo.png" alt="PropostaTrack" width={360} height={120} style={{ height: "100px", width: "auto" }} />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="text-gray-700 hover:text-blue-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 hover:border-blue-300 transition">
            Entrar
          </Link>
          <Link href="/cadastro" className="bg-blue-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200 whitespace-nowrap">
            Começar grátis →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">

          {/* Texto */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full mb-5 border border-red-100">
              <AlertTriangle size={13} />
              Pare de enviar PDF que ninguém responde
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
              Você envia a proposta.<br />
              <span className="text-blue-600">O cliente some.<br />E você fica esperando.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 mb-3">
              Com o PropostaTrack, você recebe uma notificação no segundo em que o cliente abrir sua proposta.
              Faça o follow-up na hora certa e feche mais negócios.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Sem PDF. Sem "será que ele leu?". Sem oportunidade perdida.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
              <Link href="/cadastro" className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Criar proposta grátis →
              </Link>
              <Link href="#como-funciona" className="text-gray-600 hover:text-gray-900 px-4 py-3 font-medium text-sm sm:text-base">
                Ver como funciona
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-4">Grátis para até 3 propostas/mês. Sem cartão.</p>
          </div>

          {/* Imagem do produto + cards flutuantes */}
          <div className="flex-1 relative flex items-center justify-center w-full mt-6 lg:mt-0">

            <Image
              src="/mockup.png"
              alt="PropostaTrack em uso"
              width={600}
              height={400}
              className="w-full rounded-2xl shadow-2xl"
              style={{ height: "auto" }}
            />

            {/* Card de notificação flutuante */}
            <div className="absolute -bottom-4 left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 animate-bounce" style={{ animationDuration: '3s', maxWidth: '220px' }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell size={15} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">🔔 João Silva abriu!</p>
                <p className="text-xs text-gray-400">agora mesmo</p>
              </div>
            </div>

            {/* Card de aceite flutuante */}
            <div className="absolute -top-4 right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-3 sm:p-4 flex items-center gap-2 sm:gap-3" style={{ maxWidth: '200px' }}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle size={15} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">🎉 Aceita!</p>
                <p className="text-xs text-gray-400">R$ 3.500,00</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm mb-6">Usado por freelancers e agências de todo o Brasil</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
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
      <section id="como-funciona" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">Como funciona</h2>
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

      {/* Testimonials */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">O que dizem nossos usuários</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Freelancers e agências que mudaram a forma de fechar clientes.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Lucas Mendes',
                role: 'Designer Freelancer',
                initials: 'LM',
                color: 'bg-blue-500',
                text: 'Fechei 3 clientes na mesma semana que comecei a usar. Agora sei exatamente quando ligar para fazer o follow-up.',
              },
              {
                name: 'Ana Carolina',
                role: 'Agência de Marketing',
                initials: 'AC',
                color: 'bg-purple-500',
                text: 'Acabou aquela ansiedade de "será que ele viu?". Quando o cliente abre, já entro em contato e a taxa de fechamento dobrou.',
              },
              {
                name: 'Rafael Torres',
                role: 'Dev Freelancer',
                initials: 'RT',
                color: 'bg-emerald-500',
                text: 'Simples, rápido e profissional. Meus clientes ficam impressionados com a proposta e eu fico impressionado com o rastreamento.',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
                <div className="flex text-amber-400 text-base gap-0.5">
                  {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10 sm:mb-14">
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
              <div key={feat.title} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
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
      <section id="precos" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">Planos simples e honestos</h2>
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl text-gray-400 line-through font-semibold">R$79,99</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">50% OFF</span>
            </div>
            <p className="text-4xl font-extrabold text-gray-900 mb-1">R$39,99</p>
            <p className="text-gray-400 text-sm mb-1">por mês · oferta de lançamento</p>
            <p className="text-xs text-orange-500 font-medium mb-8">🔥 Por tempo limitado</p>
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

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">Perguntas frequentes</h2>
          <p className="text-center text-gray-500 mb-12">Tire suas dúvidas sobre o PropostaTrack.</p>
          <div className="space-y-4">
            {[
              {
                q: 'O cliente precisa criar uma conta para ver a proposta?',
                a: 'Não. O cliente recebe um link e abre direto no navegador, sem instalar nada ou criar conta.',
              },
              {
                q: 'Como funciona a notificação?',
                a: 'Assim que o cliente abrir o link da proposta, você recebe um email instantâneo com o nome do cliente e horário de acesso.',
              },
              {
                q: 'Posso personalizar a proposta com minha logo?',
                a: 'Sim! No plano Pro você pode adicionar sua logo e ela aparece no topo da proposta vista pelo cliente.',
              },
              {
                q: 'Funciona pelo celular?',
                a: 'Sim. Tanto o painel de criação quanto a proposta vista pelo cliente são 100% responsivos.',
              },
              {
                q: 'Posso cancelar quando quiser?',
                a: 'Sim. O cancelamento é feito diretamente no Kiwify, sem burocracia, a qualquer momento.',
              },
              {
                q: 'O que acontece quando minhas 3 propostas do plano grátis acabam?',
                a: 'Você pode fazer upgrade para o Plano Pro a qualquer momento e ter propostas ilimitadas.',
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-6">
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Chega de mandar PDF e ficar no escuro</h2>
          <p className="text-blue-100 mb-2 text-lg">Seu próximo cliente vai abrir a proposta. Você vai saber na hora.</p>
          <p className="text-blue-200 mb-8">Faça o follow-up no momento certo e feche o negócio.</p>
          <Link href="/cadastro" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition">
            Criar conta grátis agora →
          </Link>
          <p className="text-blue-300 text-sm mt-4">Grátis para começar. Sem cartão de crédito.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PropostaTrack" width={220} height={60} style={{ height: "56px", width: "auto" }} />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacidade" className="text-gray-400 text-sm hover:text-gray-600 transition">Política de Privacidade</Link>
            <span className="text-gray-300 text-sm">·</span>
            <Link href="/termos" className="text-gray-400 text-sm hover:text-gray-600 transition">Termos de Uso</Link>
          </div>
          <p className="text-gray-400 text-sm">© 2025 PropostaTrack. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
