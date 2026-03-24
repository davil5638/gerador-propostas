import Link from 'next/link'
import Image from 'next/image'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Image src="/logo.png" alt="PropostaTrack" width={220} height={60} style={{ height: "56px", width: "auto" }} />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Termos de Uso</h1>
          <p className="text-gray-500 text-sm">Última atualização: março de 2025</p>
        </div>

        <div className="space-y-10 text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
            <p className="leading-relaxed text-sm">
              Ao criar uma conta ou utilizar qualquer funcionalidade da plataforma PropostaTrack, você declara que leu, compreendeu e concorda em ficar vinculado a estes Termos de Uso, bem como à nossa Política de Privacidade. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços. Estes termos se aplicam a todos os usuários da plataforma, incluindo visitantes, usuários do plano gratuito e assinantes de planos pagos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Descrição do Serviço</h2>
            <p className="leading-relaxed mb-3 text-sm">
              O PropostaTrack é uma plataforma online que permite a freelancers e agências criar propostas comerciais profissionais com links rastreáveis. A plataforma oferece:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Criação de propostas comerciais personalizadas por meio de formulários simplificados.</li>
              <li>Geração de links únicos para compartilhamento das propostas com clientes.</li>
              <li>Rastreamento de visualizações das propostas em tempo real.</li>
              <li>Notificações por e-mail no momento em que o cliente acessa a proposta.</li>
              <li>Painel de controle para gerenciar propostas e visualizar estatísticas.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Nos reservamos o direito de modificar, suspender ou descontinuar qualquer funcionalidade do serviço a qualquer momento, com aviso prévio razoável aos usuários.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Planos e Pagamentos</h2>
            <p className="leading-relaxed mb-3 text-sm">
              O PropostaTrack oferece os seguintes planos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Plano Gratuito:</strong> permite a criação de até 3 propostas por mês, sem custo. As propostas incluem marca d&apos;água do PropostaTrack.
              </li>
              <li>
                <strong>Plano Pro:</strong> assinatura mensal com propostas ilimitadas, sem marca d&apos;água, notificações em tempo real e suporte prioritário. O valor e as condições estão disponíveis na página de preços e podem ser atualizados com aviso prévio de 30 dias.
              </li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Os pagamentos do Plano Pro são processados pela Kiwify. Ao assinar, você autoriza a cobrança recorrente no período contratado. As cobranças são realizadas antecipadamente, no início de cada período de assinatura. Não realizamos reembolsos parciais por períodos não utilizados, salvo determinação legal em contrário.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Uso Aceitável</h2>
            <p className="leading-relaxed mb-3 text-sm">
              Ao utilizar o PropostaTrack, você concorda em não:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Criar propostas com conteúdo ilegal, fraudulento, enganoso ou que viole direitos de terceiros.</li>
              <li>Utilizar a plataforma para enviar spam ou comunicações não solicitadas em massa.</li>
              <li>Tentar acessar, modificar ou danificar os sistemas, servidores ou dados da plataforma.</li>
              <li>Fazer engenharia reversa, descompilar ou criar obras derivadas da plataforma.</li>
              <li>Utilizar bots, scrapers ou outros meios automatizados para acessar ou coletar dados da plataforma sem autorização.</li>
              <li>Compartilhar suas credenciais de acesso com terceiros.</li>
              <li>Utilizar o serviço de forma que sobrecarregue desproporcionalmente nossa infraestrutura.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              O descumprimento destas regras pode resultar na suspensão ou encerramento imediato de sua conta, sem direito a reembolso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitação de Responsabilidade</h2>
            <p className="leading-relaxed mb-3 text-sm">
              O PropostaTrack é fornecido &quot;como está&quot;, sem garantias expressas ou implícitas de qualquer natureza. Não garantimos que o serviço estará disponível de forma ininterrupta, livre de erros ou que atenderá a todos os seus requisitos específicos.
            </p>
            <p className="leading-relaxed mb-3 text-sm">
              Em nenhuma circunstância o PropostaTrack, seus sócios, colaboradores, fornecedores ou parceiros serão responsáveis por:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Perda de receita, lucros cessantes ou oportunidades de negócio.</li>
              <li>Perda de dados decorrente de falhas técnicas ou uso inadequado da plataforma.</li>
              <li>Danos indiretos, incidentais, especiais ou consequenciais de qualquer natureza.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Nossa responsabilidade total, em qualquer hipótese, fica limitada ao valor pago pelo usuário nos últimos 3 meses de assinatura.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cancelamento</h2>
            <p className="leading-relaxed mb-3 text-sm">
              Você pode cancelar sua assinatura do Plano Pro a qualquer momento, diretamente pelo painel da Kiwify, sem burocracia. O cancelamento é efetivo ao final do período de cobrança já pago, e você continuará tendo acesso às funcionalidades Pro até essa data.
            </p>
            <p className="leading-relaxed mb-3 text-sm">
              Após o cancelamento, sua conta é automaticamente convertida para o Plano Gratuito. Suas propostas já criadas permanecem acessíveis, respeitando os limites do plano gratuito.
            </p>
            <p className="leading-relaxed text-sm">
              O PropostaTrack se reserva o direito de encerrar contas que violem estes Termos de Uso, com ou sem aviso prévio, dependendo da gravidade da violação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contato</h2>
            <p className="leading-relaxed text-sm">
              Em caso de dúvidas sobre estes Termos de Uso, entre em contato com nossa equipe:
            </p>
            <p className="mt-3 text-sm">
              <strong>E-mail:</strong>{' '}
              <a href="mailto:contato@propostatrack.com.br" className="text-blue-600 hover:underline">
                contato@propostatrack.com.br
              </a>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de São Paulo/SP para dirimir eventuais conflitos decorrentes deste instrumento.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-gray-400 text-sm">© 2025 PropostaTrack. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="text-gray-400 text-sm hover:text-gray-600 transition">Política de Privacidade</Link>
            <span className="text-gray-300 text-sm">·</span>
            <Link href="/termos" className="text-gray-400 text-sm hover:text-gray-600 transition">Termos de Uso</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
