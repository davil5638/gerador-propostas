import Link from 'next/link'
import Image from 'next/image'

export default function PrivacidadePage() {
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Política de Privacidade</h1>
          <p className="text-gray-500 text-sm">Última atualização: março de 2025</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Coleta de dados</h2>
            <p className="leading-relaxed mb-3">
              O PropostaTrack coleta as seguintes informações quando você utiliza nossa plataforma:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Dados de cadastro:</strong> nome completo, endereço de e-mail e senha (armazenada de forma criptografada).</li>
              <li><strong>Dados das propostas:</strong> nome do cliente, título, descrição dos serviços, valores e demais informações que você inserir ao criar uma proposta.</li>
              <li><strong>Dados de rastreamento:</strong> endereço IP e user-agent do visitante que acessa o link da proposta, além de data e hora de acesso.</li>
              <li><strong>Dados de navegação:</strong> informações técnicas sobre como você utiliza a plataforma, como páginas visitadas e ações realizadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Uso dos dados</h2>
            <p className="leading-relaxed mb-3">
              Utilizamos os dados coletados exclusivamente para os seguintes fins:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Fornecer e operar os serviços da plataforma PropostaTrack.</li>
              <li>Enviar notificações por e-mail quando uma proposta é visualizada pelo cliente.</li>
              <li>Processar pagamentos e gerenciar assinaturas de planos pagos.</li>
              <li>Melhorar a experiência de uso e corrigir problemas técnicos.</li>
              <li>Comunicar atualizações importantes sobre o serviço.</li>
              <li>Cumprir obrigações legais e regulatórias aplicáveis.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies</h2>
            <p className="leading-relaxed mb-3 text-sm">
              O PropostaTrack utiliza cookies essenciais para o funcionamento da plataforma, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Cookies de sessão:</strong> necessários para manter você autenticado na plataforma.</li>
              <li><strong>Cookies de preferências:</strong> para lembrar suas configurações de uso.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Não utilizamos cookies de rastreamento de terceiros para publicidade. Você pode desabilitar cookies no seu navegador, mas isso pode afetar o funcionamento de algumas funcionalidades da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Compartilhamento de dados</h2>
            <p className="leading-relaxed mb-3 text-sm">
              Seus dados podem ser compartilhados com os seguintes parceiros tecnológicos estritamente necessários para a operação do serviço:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Supabase:</strong> banco de dados e autenticação (servidores localizados nos EUA, com adequação às normas de proteção de dados).</li>
              <li><strong>Resend:</strong> serviço de envio de e-mails transacionais (notificações de visualização de propostas).</li>
              <li><strong>Kiwify:</strong> processamento de pagamentos para planos pagos.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Todos os parceiros são contratualmente obrigados a proteger seus dados e utilizá-los somente para as finalidades específicas acordadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Segurança</h2>
            <p className="leading-relaxed text-sm">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, destruição ou alteração. Suas senhas são armazenadas com criptografia robusta e nunca são acessadas em texto simples. A comunicação entre seu navegador e nossos servidores é protegida por criptografia TLS/HTTPS. Realizamos backups regulares dos dados para garantir sua disponibilidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Direitos do usuário</h2>
            <p className="leading-relaxed mb-3 text-sm">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), você possui os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Acesso:</strong> solicitar uma cópia de todos os dados que temos sobre você.</li>
              <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li><strong>Exclusão:</strong> solicitar a exclusão de seus dados pessoais, observadas as obrigações legais de retenção.</li>
              <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado e legível por máquina.</li>
              <li><strong>Revogação do consentimento:</strong> revogar consentimentos concedidos anteriormente.</li>
              <li><strong>Oposição:</strong> opor-se ao tratamento de dados em determinadas circunstâncias.</li>
            </ul>
            <p className="leading-relaxed mt-3 text-sm">
              Para exercer qualquer um desses direitos, entre em contato conosco pelo e-mail indicado abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contato</h2>
            <p className="leading-relaxed text-sm">
              Se você tiver dúvidas sobre esta Política de Privacidade, quiser exercer seus direitos ou reportar uma violação de dados, entre em contato com nosso time:
            </p>
            <p className="mt-3 text-sm">
              <strong>E-mail:</strong>{' '}
              <a href="mailto:contato@propostatrack.com.br" className="text-blue-600 hover:underline">
                contato@propostatrack.com.br
              </a>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Respondemos a todas as solicitações em até 15 dias úteis, conforme previsto na LGPD.
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
